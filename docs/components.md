# React and Web Component usage

[Project overview](../README.md)

## Usage

### Web Components

For any frontend framework or vanilla HTML/JS:

#### Vanilla HTML

```html
<!DOCTYPE html>
<html>
  <head> </head>
  <body>
    <!-- Button examples -->
    <ui-button variant="default">Click me</ui-button>
    <ui-button variant="secondary" size="lg">Large Secondary</ui-button>
    <ui-button variant="destructive" disabled>Disabled Delete</ui-button>

    <!-- FlexLayout example -->
    <ui-flexlayout id="my-layout" theme="light"></ui-flexlayout>

    <script type="module">
      import "https://unpkg.com/@mrbrunowolff/react-web-components@1.1.0/dist/web-components/react-web-components.es.js";
      // Configure after custom elements have been registered
      const layout = document.getElementById("my-layout");
      layout.modelJson = {
        global: { tabEnableClose: true },
        layout: {
          type: "row",
          children: [
            {
              type: "tabset",
              children: [
                {
                  type: "tab",
                  name: "My Panel",
                  component: "panel",
                },
              ],
            },
          ],
        },
      };
    </script>
  </body>
</html>
```

#### React/Next.js/Vite

```tsx
"use client";
import "@mrbrunowolff/react-web-components/wc/peer";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "ui-button": any;
      "ui-flexlayout": any;
    }
  }
}

export default function App() {
  return (
    <div>
      <ui-button variant="default">React with WC</ui-button>
      <ui-flexlayout theme="dark" />
    </div>
  );
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
import "@mrbrunowolff/react-web-components/wc";
import { ref, onMounted } from "vue";

const layout = ref();

const handleClick = () => {
  console.log("Button clicked!");
};

onMounted(() => {
  layout.value.modelJson = {
    // your layout config
  };
});
</script>
```

#### Angular

```typescript
// app.component.ts
import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import "@mrbrunowolff/react-web-components/wc";

@Component({
  selector: "app-root",
  template: `
    <ui-button variant="outline" (click)="onClick()">Angular Button</ui-button>
    <ui-flexlayout #layout theme="dark"></ui-flexlayout>
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppComponent {
  onClick() {
    console.log("Clicked!");
  }
}
```

### React Components

For React applications that want to use the components directly:

```tsx
import { Button } from "@mrbrunowolff/react-web-components/react";
import "@mrbrunowolff/react-web-components/theme.css";
import { FlexLayout } from "@mrbrunowolff/react-web-components/components/ui/third-party/flexlayout";
import "@mrbrunowolff/react-web-components/styles/flexlayout-light.css";

export default function App() {
  const layoutModel = {
    global: { tabEnableClose: true },
    layout: {
      type: "row",
      children: [
        {
          type: "tabset",
          children: [
            {
              type: "tab",
              name: "Panel 1",
              component: "text",
            },
          ],
        },
      ],
    },
  };

  const factory = (node) => {
    return <div>Panel content: {node.getName()}</div>;
  };

  return (
    <div>
      <Button variant="default" size="lg">
        React Button
      </Button>

      <FlexLayout modelJson={layoutModel} factory={factory} />
    </div>
  );
}
```

## Available components

The library is organized into two main categories:

- **React Components** (`ui/`): For direct React usage
- **Web Components** (`wc-ui/`): For framework-agnostic usage

Both categories include:

- **Core components**: Standard UI components (Button, etc.)
- **Third-party components**: External library integrations (FlexLayout)

### Button

A button with variant and size attributes.

**Web Component**: `<ui-button>`

**Props/Attributes**:

- `variant`: `"default" | "secondary" | "destructive" | "outline" | "ghost" | "link"`
- `size`: `"default" | "sm" | "lg" | "icon"`
- `disabled`: `boolean`
- `class`/`className`: `string`

**Events**: Dispatches standard `click` events

### FlexLayout

A docking layout manager for tabbed interfaces.

**Web Component**: `<ui-flexlayout>`

**Props/Attributes**:

- `theme`: `"light" | "dark"`
- `modelJson`: Layout configuration object (set via JavaScript property)

**React Props** (additional):

- `factory`: `(node: TabNode) => React.ReactNode` - Function to render tab content
- `onAction`: `(action: Action) => void` - Handle layout actions

## Theming

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
