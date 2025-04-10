// Custom elements declaration
declare namespace JSX {
  interface IntrinsicElements {
    'ui-button': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & {
      variant?: string;
      size?: string;
      disabled?: boolean;
      type?: string;
      onClick?: (event: Event) => void;
    }, HTMLElement>;
  }
}

// Declare the custom element for TypeScript
interface HTMLElementTagNameMap {
  'ui-button': HTMLElement;
}

// Allows importing CSS files in TypeScript
declare module '*.css' {
  const content: { [className: string]: string };
  export default content;
}

// Allows importing SVG files in TypeScript
declare module '*.svg' {
  import * as React from 'react';
  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}

// Allows importing image files in TypeScript
declare module '*.png' {
  const content: string;
  export default content;
}

declare module '*.jpg' {
  const content: string;
  export default content;
}

declare module '*.jpeg' {
  const content: string;
  export default content;
}

declare module '*.gif' {
  const content: string;
  export default content;
}

// Extend window with custom properties
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Window {
  // This interface intentionally left blank
  // Will be extended as needed
} 