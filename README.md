# React Web Components

A library of [shadcn/ui](https://ui.shadcn.com/) components wrapped as Web Components for use in any framework or vanilla JavaScript application. Each component is completely self-contained with built-in styling - no external CSS framework required.

## Features

- 🚀 **Self-contained components** - No Tailwind CSS or external dependencies required
- 🎨 **Pixel-perfect shadcn/ui styling** - Matches the official designs exactly
- ⚛️ **Dual usage** - Use as React components OR Web Components
- 🌐 **Framework agnostic** - Works with Vue, Angular, Svelte, vanilla JS, or any framework
- 🎯 **TypeScript support** - Full type safety for React usage
- 🔧 **Advanced layouts** - Includes FlexLayout for complex docking interfaces
- 🎨 **Themeable** - Customize colors with CSS variables

## Installation

```bash
bun add @mrbrunowolff/react-web-components
```

## Quick Start

### Try the showcase

```bash
bun run showcase
```

This opens a live demo showing both React and Web Component versions side-by-side.

## Usage

### Option 1: Web Components (Recommended for most apps)

Perfect for any framework or vanilla JavaScript. Components are completely self-contained.

#### Vanilla HTML
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Web Components Demo</title>
</head>
<body>
  <!-- Use the components directly -->
  <ui-button variant="default">Click Me</ui-button>
  <ui-button variant="destructive">Delete</ui-button>
  <ui-button variant="outline">Outline</ui-button>
  
  <!-- FlexLayout for advanced docking -->
  <ui-flexlayout id="layout"></ui-flexlayout>

  <!-- Import the JavaScript (no CSS needed - styles are built-in) -->
  <script src="node_modules/@mrbrunowolff/react-web-components/dist/web-components/react-web-components.umd.js"></script>
  
  <script>
    // Configure FlexLayout
    document.getElementById('layout').modelJson = {
      global: {},
      borders: [],
      layout: {
        type: 'row',
        children: [
          {
            type: 'tabset',
            children: [
              { type: 'tab', name: 'Welcome', component: 'welcome' }
            ]
          }
        ]
      }
    };
  </script>
</body>
</html>
```

#### React/Next.js/Vite apps
```js
// Import and register the web components
import '@mrbrunowolff/react-web-components';

// Then use them in JSX
function App() {
  return (
    <div>
      <ui-button variant="default">Click Me</ui-button>
      <ui-button variant="destructive">Delete</ui-button>
    </div>
  );
}
```

#### Vue apps
```vue
<template>
  <div>
    <ui-button variant="default">Click Me</ui-button>
    <ui-button variant="destructive">Delete</ui-button>
  </div>
</template>

<script setup>
// Import and register the web components
import '@mrbrunowolff/react-web-components';
</script>
```

#### Angular apps
```typescript
// In main.ts or app.module.ts
import '@mrbrunowolff/react-web-components';

// Add CUSTOM_ELEMENTS_SCHEMA to your module
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
```

```html
<!-- In your templates -->
<ui-button variant="default">Click Me</ui-button>
<ui-button variant="destructive">Delete</ui-button>
```

### Option 2: React Components (For React apps)

Use the React components directly for full TypeScript support and React integration.

```tsx
import { Button } from '@mrbrunowolff/react-web-components/components/ui/button';
import { FlexLayout } from '@mrbrunowolff/react-web-components/components/ui-extra/flexlayout';

function App() {
  const model = {
    global: {},
    borders: [],
    layout: {
      type: 'row',
      children: [
        {
          type: 'tabset',
          children: [
            { type: 'tab', name: 'Welcome', component: 'welcome' }
          ]
        }
      ]
    }
  };

  return (
    <div>
      <Button variant="default">Default</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="destructive">Delete</Button>
      
      <FlexLayout 
        modelJson={model}
        factory={(node) => <div>Content for {node.getName()}</div>}
      />
    </div>
  );
}
```

## Available Components

### Button Component

Available as `<ui-button>` (Web Component) or `Button` (React component).

**Web Component Usage:**
```html
<ui-button variant="default">Click Me</ui-button>
<ui-button variant="secondary" size="sm">Small Button</ui-button>
<ui-button variant="destructive" disabled>Disabled</ui-button>
```

**React Component Usage:**
```tsx
<Button variant="default">Click Me</Button>
<Button variant="secondary" size="sm">Small Button</Button>
<Button variant="destructive" disabled>Disabled</Button>
```

**Properties:**

| Property    | Type                                                            | Default     | Description                          |
|-------------|----------------------------------------------------------------|-------------|--------------------------------------|
| variant     | 'default' \| 'destructive' \| 'outline' \| 'secondary' \| 'ghost' \| 'link' | 'default'   | The visual style of the button       |
| size        | 'default' \| 'sm' \| 'lg' \| 'icon'                             | 'default'   | The size of the button               |
| disabled    | boolean                                                         | false       | Whether the button is disabled       |

### FlexLayout Component

Advanced docking layout component based on [caplin/FlexLayout](https://github.com/caplin/FlexLayout).

**Web Component Usage:**
```html
<ui-flexlayout id="layout"></ui-flexlayout>
<script>
  document.getElementById('layout').modelJson = {
    global: {},
    borders: [],
    layout: {
      type: 'row',
      children: [
        {
          type: 'tabset', 
          children: [
            { type: 'tab', name: 'Tab 1', component: 'panel1' },
            { type: 'tab', name: 'Tab 2', component: 'panel2' }
          ]
        }
      ]
    }
  };
</script>
```

**React Component Usage:**
```tsx
import type { IJsonModel } from 'flexlayout-react';

const model: IJsonModel = {
  global: {},
  borders: [],
  layout: {
    type: 'row',
    children: [
      {
        type: 'tabset',
        children: [
          { type: 'tab', name: 'Tab 1', component: 'panel1' },
          { type: 'tab', name: 'Tab 2', component: 'panel2' }
        ]
      }
    ]
  }
};

<FlexLayout 
  modelJson={model}
  factory={(node) => {
    switch (node.getComponent()) {
      case 'panel1': return <div>Panel 1 Content</div>;
      case 'panel2': return <div>Panel 2 Content</div>;
      default: return <div>{node.getName()}</div>;
    }
  }}
/>
```

**Properties:**

| Property    | Type                                                            | Default     | Description                          |
|-------------|----------------------------------------------------------------|-------------|--------------------------------------|
| modelJson   | IJsonModel                                                      | required    | FlexLayout model configuration       |
| factory     | (node: TabNode) => React.ReactNode                             | optional    | Function to render tab content (React only) |
| onAction    | (action: Action) => Action \| undefined                        | optional    | Action interceptor                   |
| className   | string                                                          | optional    | Additional CSS classes               |
| theme       | 'light' \| 'dark'                                              | 'light'     | Theme (Web Component only)           |

## Theming

Components are designed to work out-of-the-box with no configuration. However, you can customize colors by overriding CSS variables:

```css
:root {
  /* Primary colors (default button) */
  --color-primary: oklch(0.205 0 0); /* Dark slate */
  --color-primary-foreground: oklch(0.985 0 0); /* White */
  
  /* Secondary colors */
  --color-secondary: oklch(0.97 0 0); /* Light gray */
  --color-secondary-foreground: oklch(0.205 0 0); /* Dark slate */
  
  /* Destructive colors */
  --color-destructive: oklch(0.577 0.245 27.325); /* Red */
  
  /* Border and accents */
  --color-border: oklch(0.922 0 0); /* Light border */
  --color-accent: oklch(0.97 0 0); /* Hover backgrounds */
  --color-accent-foreground: oklch(0.205 0 0); /* Hover text */
}
```

**Custom theme example:**
```css
/* Blue theme */
:root {
  --color-primary: #3b82f6; /* Blue */
  --color-primary-foreground: #ffffff;
  --color-secondary: #f1f5f9;
  --color-secondary-foreground: #1e293b;
  --color-destructive: #ef4444; /* Red */
}
```

## Development

### Prerequisites

- Bun 1.0+

### Setup

1. Clone the repository:

```bash
git clone https://github.com/brunowolff/react-web-components.git
cd react-web-components
```

2. Install dependencies:

```bash
bun install
```

3. Start the development server:

```bash
bun run dev
```

### Building

```bash
# Build the web components for distribution
bun run build:lib

# Run the showcase demo
bun run showcase

# Build types only
bun run build:types
```

### Testing

```bash
# Run unit tests
bun test

# Run end-to-end tests
bun run test:e2e
```

## License

MIT
