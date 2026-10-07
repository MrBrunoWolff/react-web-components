import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { createServer } from 'node:http';
import {
  cpSync,
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  readdirSync,
  rmSync,
  symlinkSync,
  writeFileSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, extname, join, resolve, sep } from 'node:path';
import { chromium } from '@playwright/test';

const root = resolve(import.meta.dirname, '..');
const library = join(root, 'packages/react-web-components');
const temp = mkdtempSync(join(tmpdir(), 'react-wc-consumer-'));
function run(command, args, cwd = temp) {
  const result = spawnSync(command, args, {
    cwd,
    encoding: 'utf8',
    env: { ...process.env, npm_config_cache: join(temp, 'npm-cache') },
  });
  if (result.status !== 0)
    throw new Error(`${command} failed:\n${result.stdout}\n${result.stderr}`);
  return result.stdout;
}
let browser, server;
try {
  const result = JSON.parse(
    run(
      'npm',
      ['pack', '--ignore-scripts', '--json', '--pack-destination', temp],
      library,
    ),
  );
  const packed = Array.isArray(result) ? result[0] : Object.values(result)[0];
  run('tar', ['-xzf', join(temp, packed.filename), '-C', temp]);
  const installed = join(
    temp,
    'node_modules/@mrbrunowolff/react-web-components',
  );
  mkdirSync(dirname(installed), { recursive: true });
  cpSync(join(temp, 'package'), installed, { recursive: true });
  // Resolve real dependencies while ensuring the tested library itself comes
  // exclusively from npm pack, never from the monorepo's workspace alias.
  const modules = join(root, 'node_modules');
  for (const entry of readdirSync(modules)) {
    if (entry.startsWith('@')) {
      const scope = join(temp, 'node_modules', entry);
      mkdirSync(scope, { recursive: true });
      for (const name of readdirSync(join(modules, entry))) {
        const target = join(scope, name);
        if (target !== installed)
          symlinkSync(join(modules, entry, name), target);
      }
    } else symlinkSync(join(modules, entry), join(temp, 'node_modules', entry));
  }
  writeFileSync(join(temp, 'package.json'), JSON.stringify({ type: 'module' }));
  writeFileSync(
    join(temp, 'consumer.mjs'),
    `
    import assert from 'node:assert/strict';
    import { createRequire } from 'node:module';
    import React from 'react';
    import { renderToString } from 'react-dom/server';
    import * as library from '@mrbrunowolff/react-web-components';
    import { Button } from '@mrbrunowolff/react-web-components/react';
    import { Button as direct } from '@mrbrunowolff/react-web-components/components/ui/button';
    import { Button as legacy } from '@mrbrunowolff/react-web-components/src/components/ui/button.tsx';
    import * as standalone from '@mrbrunowolff/react-web-components/wc';
    assert.equal(typeof document, 'undefined');
    assert.equal(typeof library.registerAllComponents, 'function');
    assert.equal(typeof standalone.FlexLayoutWebComponent, 'function');
    library.registerAllComponents();
    for (const Component of [Button, direct, legacy]) assert.match(renderToString(React.createElement(Component, null, 'SSR works')), /SSR works/);
    const require = createRequire(import.meta.url);
    assert.equal(typeof require('@mrbrunowolff/react-web-components').registerAllComponents, 'function');
    assert.equal(typeof require('@mrbrunowolff/react-web-components/wc').FlexLayoutWebComponent, 'function');
    assert.match(renderToString(React.createElement(require('@mrbrunowolff/react-web-components/react').Button, null, 'CJS works')), /CJS works/);
    assert.ok(require.resolve('@mrbrunowolff/react-web-components/theme.css').endsWith('/dist/theme.css'));
  `,
  );
  run('node', ['consumer.mjs']);
  console.log(
    'Packed ESM, CommonJS, legacy imports and React server rendering passed.',
  );
  writeFileSync(
    join(temp, 'consumer.tsx'),
    `
    import { Button } from '@mrbrunowolff/react-web-components/react';
    import { Button as Direct } from '@mrbrunowolff/react-web-components/components/ui/button';
    import { FlexLayout } from '@mrbrunowolff/react-web-components/components/ui/third-party/flexlayout';
    import { registerAllComponents } from '@mrbrunowolff/react-web-components';
    export const app = <><Button>Typed</Button><Direct size="sm">Typed</Direct><FlexLayout modelJson={{global:{},layout:{type:'row',children:[]}}}/></>;
    registerAllComponents();
  `,
  );
  writeFileSync(
    join(temp, 'tsconfig.json'),
    JSON.stringify({
      compilerOptions: {
        module: 'ESNext',
        moduleResolution: 'Bundler',
        target: 'ES2022',
        jsx: 'react-jsx',
        noEmit: true,
        strict: true,
        skipLibCheck: false,
      },
      include: ['consumer.tsx'],
    }),
  );
  run(join(modules, '.bin/tsc'), ['--project', join(temp, 'tsconfig.json')]);
  console.log(
    'Packed declarations passed a strict frontend consumer typecheck.',
  );
  server = createServer((req, res) => {
    if (req.url === '/') {
      res.setHeader('Content-Type', 'text/html');
      res.end(
        '<!doctype html><ui-button variant="destructive">Packed button</ui-button><script type="module" src="/dist/web-components/react-web-components.es.js"></script>',
      );
      return;
    }
    const path = resolve(
      installed,
      '.' + new URL(req.url, 'http://localhost').pathname,
    );
    if (!path.startsWith(installed + sep) || !existsSync(path)) {
      res.writeHead(404);
      res.end();
      return;
    }
    res.setHeader(
      'Content-Type',
      extname(path) === '.css' ? 'text/css' : 'text/javascript',
    );
    res.end(readFileSync(path));
  });
  await new Promise((resolve, reject) => {
    server.once('error', reject);
    server.listen(0, '127.0.0.1', resolve);
  });
  browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  page.setDefaultTimeout(10000);
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto(`http://127.0.0.1:${server.address().port}`);
  assert.deepEqual(
    errors,
    [],
    'Standalone module must load without browser errors',
  );
  const button = page.locator('ui-button button');
  await button.waitFor();
  assert.equal(await button.textContent(), 'Packed button');
  await page.waitForFunction(
    () =>
      getComputedStyle(document.querySelector('ui-button button'))
        .backgroundColor === 'rgb(220, 38, 38)',
  );
  assert.equal(
    await button.evaluate(
      (element) => getComputedStyle(element).backgroundColor,
    ),
    'rgb(220, 38, 38)',
  );
  await page.evaluate(() => {
    window.packedClicks = 0;
    document
      .querySelector('ui-button')
      .addEventListener('click', () => window.packedClicks++);
    const model = {
      global: {},
      layout: {
        type: 'row',
        children: [
          {
            type: 'tabset',
            children: [{ type: 'tab', name: 'Packed tab', component: 'text' }],
          },
        ],
      },
    };
    for (const theme of ['light', 'dark']) {
      const element = document.createElement('ui-flexlayout');
      element.id = theme;
      element.setAttribute('model-json', JSON.stringify(model));
      element.setAttribute('theme', theme);
      document.body.appendChild(element);
    }
  });
  await button.click();
  assert.equal(await page.evaluate(() => window.packedClicks), 1);
  await page.evaluate(() =>
    document.querySelector('ui-button').setAttribute('disabled', ''),
  );
  await page.waitForFunction(
    () => document.querySelector('ui-button button').disabled,
  );
  assert.equal(await button.isDisabled(), true);
  await page.locator('#light .flexlayout__layout').waitFor();
  await page.locator('#dark .flexlayout__layout').waitFor();
  const background = (selector) =>
    page
      .locator(selector)
      .evaluate((element) =>
        getComputedStyle(element).getPropertyValue('--color-background').trim(),
      );
  assert.equal(await background('#light .flexlayout__layout'), 'white');
  assert.notEqual(await background('#dark .flexlayout__layout'), 'white');
  await page.evaluate(() =>
    document.querySelector('#light').setAttribute('theme', 'dark'),
  );
  await page.waitForFunction(() =>
    document.querySelector('#light .flexlayout-theme-dark'),
  );
  assert.notEqual(await background('#light .flexlayout__layout'), 'white');
  assert.deepEqual(errors, []);
  console.log(
    'Plain-HTML standalone bundle passed: styles, clicks, attributes, FlexLayout and isolated light/dark themes.',
  );
} finally {
  await browser?.close();
  if (server) await new Promise((resolve) => server.close(resolve));
  rmSync(temp, { recursive: true, force: true });
}
