import { cpSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { dirname, relative, resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
cpSync(resolve(root, '../../README.md'), resolve(root, 'README.md'));
cpSync(resolve(root, '../../LICENSE'), resolve(root, 'LICENSE'));
cpSync(resolve(root, 'src/styles'), resolve(root, 'dist/styles'), {
  recursive: true,
});
function visit(directory) {
  for (const file of readdirSync(directory, { withFileTypes: true })) {
    const path = resolve(directory, file.name);
    if (file.isDirectory()) visit(path);
    else if (file.name.endsWith('.d.ts')) {
      // tsc preserves source aliases and extensionless imports. Make declarations
      // consumable without the library's tsconfig, including NodeNext consumers.
      const text = readFileSync(path, 'utf8').replace(
        /(['"])(@\/[^'"]+|\.\.?\/[^'"]+)\1/g,
        (match, quote, specifier) => {
          let target = specifier;
          if (target.startsWith('@/')) {
            target = relative(
              dirname(path),
              resolve(root, 'dist', target.slice(2)),
            ).replaceAll('\\', '/');
            if (!target.startsWith('.')) target = './' + target;
          }
          if (!/\.[a-z]+$/.test(target)) target += '.js';
          else if (/\.tsx?$/.test(target))
            target = target.replace(/\.tsx?$/, '.js');
          return `${quote}${target}${quote}`;
        },
      );
      writeFileSync(path, text);
    }
  }
}
visit(resolve(root, 'dist'));
