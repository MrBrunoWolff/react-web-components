# React Web Components

Components based on [shadcn/ui](https://ui.shadcn.com/), available as React components or custom elements with bundled styles, including buttons and FlexLayout docking layouts.

[![npm](https://img.shields.io/npm/v/@mrbrunowolff/react-web-components?style=flat-square)](https://www.npmjs.com/package/@mrbrunowolff/react-web-components)
[![License: MIT](https://img.shields.io/badge/license-MIT-green?style=flat-square)](LICENSE)

## Quick start

For a browser app using a bundler:

```sh
npm install @mrbrunowolff/react-web-components
```

Register the standalone Web Components:

```js
import "@mrbrunowolff/react-web-components/wc";
```

Then use their tags in HTML:

```html
<ui-button variant="default">Save</ui-button>
<ui-button variant="secondary" size="lg">Cancel</ui-button>
```

The standalone entry bundles React for plain browser use. In a React app, use `@mrbrunowolff/react-web-components/wc/peer` to reuse the app’s React instance, or import React components directly:

```tsx
import { Button } from "@mrbrunowolff/react-web-components/react";
import "@mrbrunowolff/react-web-components/theme.css";

export function SaveButton() {
  return <Button variant="default">Save</Button>;
}
```

Direct React usage requires compatible `react` and `react-dom` peer dependencies. See the [component guide](https://github.com/MrBrunoWolff/react-web-components/blob/main/docs/components.md) for CDN usage, attributes, layout properties and themes.

## Features

- Web Components for browser apps and React exports for direct React use.
- Bundled custom-element styles and an explicit theme stylesheet for React.
- Button variants, sizes and disabled state.
- FlexLayout docking with light/dark themes and configurable panels.
- TypeScript declarations and ESM/CommonJS package entry points.

## Scripts

For development, use the Bun version declared in the root package manifest, clone the repository and run `bun install --frozen-lockfile`. Commands below run from the workspace root:

| Command                  | Description                                         |
| ------------------------ | --------------------------------------------------- |
| `bun run showcase:react` | Start the React showcase                            |
| `bun run showcase:wc`    | Start the Web Components showcase                   |
| `bun run build:lib`      | Build the publishable library                       |
| `bun run typecheck`      | Check workspace types                               |
| `bun run test`           | Run workspace tests                                 |
| `bun run check:ci`       | Run code, build, security and packed-package checks |

## Development

The workspace contains the library and two showcase apps. See the [development guide](https://github.com/MrBrunoWolff/react-web-components/blob/main/docs/development.md) for structure, browser validation and contributions, and [QUALITY.md](https://github.com/MrBrunoWolff/react-web-components/blob/main/QUALITY.md) for the complete validation contract.

Package builds copy this README into the published library. Documentation links use GitHub destinations so they also work from the npm package.

## License

MIT — see [LICENSE](LICENSE).
