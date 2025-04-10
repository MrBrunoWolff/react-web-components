# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```

# React Web Components

A library of [Shadcn UI](https://ui.shadcn.com/) components wrapped as Web Components for use in any framework or vanilla JavaScript application.

## Features

- Use Shadcn UI components in any framework
- Consistent styling between React and Web Components
- Themeable with CSS variables
- Built with React 19, TypeScript, and Tailwind CSS

## Installation

```bash
npm install react-web-components
```

## Usage

### In a vanilla HTML page

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Web Components Demo</title>
  <!-- Import the CSS -->
  <link rel="stylesheet" href="node_modules/react-web-components/dist/web-components/react-web-components.css">
</head>
<body>
  <!-- Use the components -->
  <ui-button variant="default">Click Me</ui-button>
  <ui-button variant="destructive">Delete</ui-button>
  <ui-button variant="outline">Outline</ui-button>

  <!-- Import the JavaScript -->
  <script src="node_modules/react-web-components/dist/web-components/react-web-components.umd.js"></script>
</body>
</html>
```

### In a framework

```js
// Import the components and styles
import 'react-web-components/dist/web-components/react-web-components.css';
import 'react-web-components';

// Then use them in your HTML templates
// <ui-button variant="default">Click Me</ui-button>
```

## Available Components

- `<ui-button>` - A button component with various styles

### Button Properties

| Property    | Type                                                            | Default     | Description                          |
|-------------|----------------------------------------------------------------|-------------|--------------------------------------|
| variant     | 'default' \| 'destructive' \| 'outline' \| 'secondary' \| 'ghost' \| 'link' | 'default'   | The visual style of the button       |
| size        | 'default' \| 'sm' \| 'lg'                                       | 'default'   | The size of the button               |
| disabled    | boolean                                                         | false       | Whether the button is disabled       |
| onClick     | function                                                        | undefined   | Function to call when button is clicked |

## Theming

The components use CSS variables for theming. You can customize the look by overriding these variables in your CSS:

```css
:root {
  --primary: oklch(0.205 0 0); /* Purple */
  --primary-foreground: oklch(0.985 0 0);
  --secondary: oklch(0.97 0 0);
  --secondary-foreground: oklch(0.205 0 0);
  --accent: oklch(0.97 0 0);
  --accent-foreground: oklch(0.205 0 0);
  --destructive: oklch(0.577 0.245 27.325); /* Red */
  --border: oklch(0.922 0 0);
}
```

## Development

### Prerequisites

- Node.js 18+
- npm 9+

### Setup

1. Clone the repository:

```bash
git clone https://github.com/brunowolff/react-web-components.git
cd react-web-components
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

### Building

```bash
# Build the web components
npm run build:wc

# Build the entire library for publishing
npm run build:lib
```

### Testing

```bash
# Run unit tests
npm test

# Run end-to-end tests
npm run test:e2e
```

## License

MIT
