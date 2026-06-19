# React Web Components Monorepo

Self-contained shadcn/ui components wrapped as Web Components for use in any framework - no external CSS dependencies required.

## 📁 Monorepo Structure

This monorepo contains three packages:

- **`packages/react-web-components`** - The main component library
- **`packages/showcase-react`** - React showcase using Vite + React
- **`packages/showcase-wc`** - Pure Web Components showcase using Lit

## ✨ Features

### Core Features
- **Self-contained components**: No need for Tailwind CSS setup in your consuming app
- **Pixel-perfect styling**: All components look exactly like shadcn/ui reference
- **Dual usage**: Use as React components OR Web Components
- **Framework agnostic**: Works with Vue, Angular, vanilla HTML, or any framework
- **TypeScript support**: Full type safety for React usage
- **Organized structure**: Clean separation between React components (`ui/`) and Web Components (`wc-ui/`)
- **Theming support**: CSS variables for easy customization

### Third-party Integrations
- **FlexLayout included**: Advanced docking layout manager for complex UIs
- **Third-party components**: Dedicated folders for external library integrations

## 🚀 Quick Start

### View Live Showcases

Clone the repository and start the showcases:

```bash
# Install dependencies for all packages (Bun workspaces handles everything!)
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

## 📦 Installation

```bash
npm install @mrbrunowolff/react-web-components
# or
yarn add @mrbrunowolff/react-web-components
# or
bun add @mrbrunowolff/react-web-components
```

> **Note**: React and React-DOM are included as dependencies since the Web Components are built using React internally. No additional React installation is needed.

## 🎯 Usage

### Web Components (Recommended)

For any frontend framework or vanilla HTML/JS:

#### Vanilla HTML
```html
<!DOCTYPE html>
<html>
<head>
  <!-- Include FlexLayout styles for proper layout rendering -->
  <link rel="stylesheet" href="https://unpkg.com/@mrbrunowolff/react-web-components/styles/flexlayout-light.css">
  <script type="module" src="https://unpkg.com/@mrbrunowolff/react-web-components"></script>
</head>
<body>
  <!-- Button examples -->
  <ui-button variant="default">Click me</ui-button>
  <ui-button variant="secondary" size="lg">Large Secondary</ui-button>
  <ui-button variant="destructive" disabled>Disabled Delete</ui-button>
  
  <!-- FlexLayout example -->
  <ui-flexlayout id="my-layout" theme="light"></ui-flexlayout>
  
  <script>
    // Configure FlexLayout
    const layout = document.getElementById('my-layout');
    layout.modelJson = {
      global: { tabEnableClose: true },
      layout: {
        type: "row",
        children: [{
          type: "tabset",
          children: [{
            type: "tab",
            name: "My Panel",
            component: "panel"
          }]
        }]
      }
    };
  </script>
</body>
</html>
```

#### React/Next.js/Vite
```tsx
import '@mrbrunowolff/react-web-components'
import '@mrbrunowolff/react-web-components/styles/flexlayout-light.css'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'ui-button': any
      'ui-flexlayout': any
    }
  }
}

export default function App() {
  return (
    <div>
      <ui-button variant="default">React with WC</ui-button>
      <ui-flexlayout theme="dark" />
    </div>
  )
}
```

#### Vue 3
```vue
<template>
  <div>
    <ui-button variant="secondary" @click="handleClick">Vue Button</ui-button>
    <ui-flexlayout ref="layout" theme="light" />
  </div>
</template>

<script setup>
import '@mrbrunowolff/react-web-components'
import '@mrbrunowolff/react-web-components/styles/flexlayout-light.css'
import { ref, onMounted } from 'vue'

const layout = ref()

const handleClick = () => {
  console.log('Button clicked!')
}

onMounted(() => {
  layout.value.modelJson = {
    // your layout config
  }
})
</script>
```

#### Angular
```typescript
// app.component.ts
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import '@mrbrunowolff/react-web-components'
import '@mrbrunowolff/react-web-components/styles/flexlayout-light.css'

@Component({
  selector: 'app-root',
  template: `
    <ui-button variant="outline" (click)="onClick()">Angular Button</ui-button>
    <ui-flexlayout #layout theme="dark"></ui-flexlayout>
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppComponent {
  onClick() {
    console.log('Clicked!')
  }
}
```

### React Components

For React applications that want to use the components directly:

```tsx
import { Button } from '@mrbrunowolff/react-web-components/components/ui/button'
import { FlexLayout } from '@mrbrunowolff/react-web-components/components/ui/third-party/flexlayout'
import '@mrbrunowolff/react-web-components/styles/flexlayout-light.css'

export default function App() {
  const layoutModel = {
    global: { tabEnableClose: true },
    layout: {
      type: "row", 
      children: [{
        type: "tabset",
        children: [{
          type: "tab",
          name: "Panel 1",
          component: "text"
        }]
      }]
    }
  }

  const factory = (node) => {
    return <div>Panel content: {node.getName()}</div>
  }

  return (
    <div>
      <Button variant="default" size="lg">
        React Button
      </Button>
      
      <FlexLayout 
        modelJson={layoutModel}
        factory={factory}
      />
    </div>
  )
}
```

## 🧩 Available Components

The library is organized into two main categories:

- **React Components** (`ui/`): For direct React usage
- **Web Components** (`wc-ui/`): For framework-agnostic usage

Both categories include:
- **Core components**: Standard UI components (Button, etc.)
- **Third-party components**: External library integrations (FlexLayout)

### Button

A versatile button component with multiple variants and sizes.

**Web Component**: `<ui-button>`

**Props/Attributes**:
- `variant`: `"default" | "secondary" | "destructive" | "outline" | "ghost" | "link"`
- `size`: `"default" | "sm" | "lg" | "icon"`
- `disabled`: `boolean`
- `class`/`className`: `string`

**Events**: Dispatches standard `click` events

### FlexLayout

A powerful docking layout manager for complex interfaces.

**Web Component**: `<ui-flexlayout>`

**Props/Attributes**:
- `theme`: `"light" | "dark"`
- `modelJson`: Layout configuration object (set via JavaScript property)

**React Props** (additional):
- `factory`: `(node: TabNode) => React.ReactNode` - Function to render tab content
- `onAction`: `(action: Action) => void` - Handle layout actions

## 🎨 Theming

Components use CSS variables for easy theming:

```css
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --primary: 222.2 47.4% 11.2%;
  --primary-foreground: 210 40% 98%;
  --secondary: 210 40% 96%;
  --secondary-foreground: 222.2 84% 4.9%;
  --muted: 210 40% 96%;
  --muted-foreground: 215.4 16.3% 46.9%;
  --accent: 210 40% 96%;
  --accent-foreground: 222.2 84% 4.9%;
  --destructive: 0 84.2% 60.2%;
  --destructive-foreground: 210 40% 98%;
  --border: 214.3 31.8% 91.4%;
  --input: 214.3 31.8% 91.4%;
  --ring: 222.2 84% 4.9%;
  --radius: 0.5rem;
}

/* Dark theme */
[data-theme="dark"] {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  /* ... other dark theme variables */
}
```

Apply themes by setting the `data-theme` attribute on a parent element or use the `theme` attribute on individual components.

## 🛠 Development

This project uses **Bun** as the package manager and runtime:

```bash
# Install dependencies for all packages (Bun workspaces handles everything!)
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

- `bun install` - Install dependencies for all packages (Bun workspaces handles everything automatically!)
- `bun run bootstrap` - Alias for `bun install` (optional)
- `bun run dev` - Start development servers for all packages
- `bun run build` - Build all packages
- `bun run build:lib` - Build the main component library
- `bun run showcase:react` - Start React showcase (port 3000)
- `bun run showcase:wc` - Start Web Components showcase (port 3001)
- `bun run format` - Format all files with oxfmt
- `bun run format:check` - Check formatting with oxfmt (no writes)
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

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes in the appropriate package
4. Add tests for new functionality
5. Run the test suite: `bun run test`
6. Test both showcases: `bun run showcase:react` and `bun run showcase:wc`
7. Submit a pull request

## 📜 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🔗 Links

- [shadcn/ui](https://ui.shadcn.com/) - Original component library
- [FlexLayout](https://github.com/caplin/FlexLayout) - Advanced layout manager
- [Vite](https://vitejs.dev/) - React showcase build tool
- [Lit](https://lit.dev/) - Web Components showcase framework
- [Bun](https://bun.sh/) - Fast JavaScript runtime and package manager
- [oxc](https://oxc.rs/) - Fast linter (oxlint) and formatter (oxfmt) for web projects