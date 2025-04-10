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

// Allow importing CSS files
declare module '*.css' {
  const content: string;
  export default content;
} 