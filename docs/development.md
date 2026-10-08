# Component library development

[Project overview](../README.md)

## Project structure

This monorepo contains three packages:

- **`packages/react-web-components`** - The main component library
- **`packages/showcase-react`** - React showcase using Vite + React
- **`packages/showcase-wc`** - Pure Web Components showcase using Lit

## Quick start

### View Live Showcases

Clone the repository and start the showcases:

```bash
# Install dependencies for all packages (Bun workspaces installs all packages)
bun install

# Start React showcase (Vite + React)
bun run showcase:react
# Visit http://localhost:3000

# Start Web Components showcase (Lit)
bun run showcase:wc
# Visit http://localhost:3001
```

### Build Everything

```bash
# Build all packages
bun run build

# Build only the main library
bun run build:lib
```

## Development

This project uses **Bun** as the package manager and runtime:

```bash
# Install dependencies for all packages (Bun workspaces installs all packages)
bun install

# Start React showcase (Vite + React)
bun run showcase:react

# Start Web Components showcase (Lit)
bun run showcase:wc

# Build all packages
bun run build

# Build only the main library
bun run build:lib

# Run tests across all packages
bun run test

# Format and lint all packages with oxc (oxlint + oxfmt)
bun run format     # Format all files with oxfmt
bun run lint       # Lint with oxlint
bun run lint:fix   # Lint and auto-fix issues with oxlint
bun run check      # Lint --fix + format everything
```

### Root Scripts

- `bun install` - Install dependencies for all workspace packages
- `bun run dev` - Start development servers for all packages
- `bun run build` - Build all packages
- `bun run build:lib` - Build the main component library
- `bun run showcase:react` - Start React showcase (port 3000)
- `bun run showcase:wc` - Start Web Components showcase (port 3001)
- `bun run format` - Format all files with oxfmt
- `bun run format:check` - Check formatting with oxfmt (no writes)
- `bun run typecheck` - Typecheck every workspace
- `bun run test` - Run the test suites in every workspace
- `bun run audit` - Fail on a dependency with a high or critical advisory
- `bun run licenses` - List production dependencies grouped by licence
- `bun run lint` - Lint with oxlint
- `bun run lint:fix` - Lint and auto-fix issues with oxlint
- `bun run check` - Lint --fix + format everything
- `bun run check:ci` - Lint + format check (CI, no writes)
- `bun run test` - Test all packages
- `bun run clean` - Clean all build artifacts

### Package Structure

```
packages/
├── react-web-components/    # Main component library
│   ├── src/
│   │   ├── components/
│   │   │   ├── ui/          # React UI components (shadcn/ui)
│   │   │   │   ├── third-party/  # Third-party React components (FlexLayout)
│   │   │   │   ├── button.tsx
│   │   │   │   └── [other shadcn components]...
│   │   │   ├── wc-ui/       # Web Components
│   │   │   │   ├── third-party/  # Third-party Web Components
│   │   │   │   │   └── flexlayout.tsx
│   │   │   │   ├── button.tsx
│   │   │   │   └── index.ts
│   │   │   └── web-components.ts  # WC exports
│   │   ├── styles/          # CSS files (FlexLayout themes)
│   │   └── index.ts         # Main export
│   ├── showcase/            # Legacy showcase (being deprecated)
│   └── tests/               # Test files
├── showcase-react/          # Vite + React showcase
│   └── src/                 # React app source
└── showcase-wc/             # Lit Web Components showcase
    └── src/                 # Lit components and main
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes in the appropriate package
4. Add tests for new functionality
5. Run the test suite: `bun run test`
6. Test both showcases: `bun run showcase:react` and `bun run showcase:wc`
7. Submit a pull request

## Links

- [shadcn/ui](https://ui.shadcn.com/) - Original component library
- [FlexLayout](https://github.com/caplin/FlexLayout) - Advanced layout manager
- [Vite](https://vitejs.dev/) - React showcase build tool
- [Lit](https://lit.dev/) - Web Components showcase framework
- [Bun](https://bun.sh/) - Fast JavaScript runtime and package manager
- [oxc](https://oxc.rs/) - Fast linter (oxlint) and formatter (oxfmt) for web projects

### Packed package validation

`bun run check:ci` runs lint, formatting, types, unit tests, builds, audit, and real packed-package checks. Before running locally, install Chromium with `bunx playwright install chromium`. The package checks exercise Node ESM/CommonJS imports, React server rendering, strict frontend declarations, and a plain HTML browser with button interactions and simultaneous FlexLayout themes.
