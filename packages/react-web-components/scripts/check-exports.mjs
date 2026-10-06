import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { relative, resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const manifest = JSON.parse(
  readFileSync(resolve(root, 'package.json'), 'utf8'),
);
const files = [];
function walk(directory) {
  for (const file of readdirSync(directory, { withFileTypes: true })) {
    const path = resolve(directory, file.name);
    if (file.isDirectory()) walk(path);
    else files.push('./' + relative(root, path).replaceAll('\\', '/'));
  }
}
walk(resolve(root, 'dist'));
function validate(node) {
  if (typeof node === 'string') {
    if (node.includes('*')) {
      const [prefix, suffix] = node.split('*');
      if (
        !files.some((file) => file.startsWith(prefix) && file.endsWith(suffix))
      )
        throw new Error(`Export pattern matches no built files: ${node}`);
    } else if (!existsSync(resolve(root, node)))
      throw new Error(`Missing export: ${node}`);
  } else for (const value of Object.values(node)) validate(value);
}
validate(manifest.exports);
console.log('All package exports resolve to built files.');
