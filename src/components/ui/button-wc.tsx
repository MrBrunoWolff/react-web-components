import * as React from "react"
import r2wc from "@r2wc/react-to-web-component"
import { type VariantProps } from "class-variance-authority"
import { buttonVariants } from "./button-variants"

// Create a combined type that includes both the HTML button props and the Shadcn button variants
type ButtonWrapperProps = React.ComponentProps<"button"> & 
  VariantProps<typeof buttonVariants> & {
    // Additional web component specific props
    textContent?: string
    children?: React.ReactNode
  }

/**
 * A simple wrapper around the Shadcn Button component that can be used as a web component
 */
const ButtonWrapper = ({ 
  children, 
  textContent, 
  variant = "default", 
  size = "default", 
  ...props 
}: ButtonWrapperProps) => {
  // Use either the children prop or textContent from the element content
  const buttonContent = children || textContent || 'Button'
  
  // Add size class to variant class if provided
  const buttonClass = size && size !== "default" 
    ? `${variant || 'default'} ${size}` 
    : variant || 'default';
  
  // Embed styles directly in the component
  const inlineStyles = `
    :host {
      --primary: var(--color-primary, oklch(0.205 0 0));
      --primary-foreground: var(--color-primary-foreground, oklch(0.985 0 0));
      --destructive: var(--color-destructive, oklch(0.577 0.245 27.325));
      --background: var(--color-background, oklch(1 0 0));
      --foreground: var(--color-foreground, oklch(0.145 0 0));
      --accent: var(--color-accent, oklch(0.97 0 0));
      --accent-foreground: var(--color-accent-foreground, oklch(0.205 0 0));
      --secondary: var(--color-secondary, oklch(0.97 0 0));
      --secondary-foreground: var(--color-secondary-foreground, oklch(0.205 0 0));
      --border: var(--color-border, oklch(0.922 0 0));
      --ring: var(--color-ring, oklch(0.708 0 0));
    }
    
    /* Direct styling for buttons - matching Shadcn's button implementation */
    button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      white-space: nowrap;
      border-radius: 0.375rem;
      text-align: center;
      font-size: 0.875rem;
      font-weight: 500;
      line-height: 1.25rem;
      transition-property: color, background-color, border-color;
      transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
      transition-duration: 150ms;
      outline: none;
    }
    
    /* DEFAULT */
    .default {
      background-color: var(--primary);
      color: var(--primary-foreground);
      box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
      height: 2.25rem; /* h-9 */
      padding: 0.5rem 1rem; /* px-4 py-2 */
    }
    
    .default:hover:not(:disabled) {
      opacity: 0.9;
    }
    
    /* DESTRUCTIVE */
    .destructive {
      background-color: var(--destructive);
      color: white;
      box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
      height: 2.25rem; /* h-9 */
      padding: 0.5rem 1rem; /* px-4 py-2 */
    }
    
    .destructive:hover:not(:disabled) {
      opacity: 0.9;
    }
    
    /* OUTLINE */
    .outline {
      border: 1px solid var(--border);
      background-color: var(--background);
      color: var(--foreground);
      box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
      height: 2.25rem; /* h-9 */
      padding: 0.5rem 1rem; /* px-4 py-2 */
    }
    
    .outline:hover:not(:disabled) {
      background-color: var(--accent);
      color: var(--accent-foreground);
    }
    
    /* SECONDARY */
    .secondary {
      background-color: var(--secondary);
      color: var(--secondary-foreground);
      box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
      height: 2.25rem; /* h-9 */
      padding: 0.5rem 1rem; /* px-4 py-2 */
    }
    
    .secondary:hover:not(:disabled) {
      opacity: 0.8;
    }
    
    /* GHOST */
    .ghost {
      background-color: transparent;
      color: var(--foreground);
      height: 2.25rem; /* h-9 */
      padding: 0.5rem 1rem; /* px-4 py-2 */
    }
    
    .ghost:hover:not(:disabled) {
      background-color: var(--accent);
      color: var(--accent-foreground);
    }
    
    /* LINK */
    .link {
      background-color: transparent;
      color: var(--primary);
      text-underline-offset: 4px;
      padding: 0;
      height: auto;
    }
    
    .link:hover:not(:disabled) {
      text-decoration-line: underline;
    }
    
    /* SIZE - SM */
    .sm {
      height: 2rem; /* h-8 */
      padding: 0 0.75rem; /* px-3 */
      border-radius: 0.375rem;
      gap: 0.375rem; /* gap-1.5 */
    }
    
    /* SIZE - LG */
    .lg {
      height: 2.5rem; /* h-10 */
      padding: 0 1.5rem; /* px-6 */
      border-radius: 0.375rem;
    }
    
    /* DISABLED STATE */
    button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
      pointer-events: none;
    }
  `;

  return (
    <>
      <style>{inlineStyles}</style>
      <button 
        className={buttonClass} 
        disabled={props.disabled}
        onClick={props.onClick}
        style={{
          border: variant !== 'outline' ? 'none' : undefined, // Only override border for non-outline variants
          cursor: 'pointer',
          fontFamily: 'inherit'
        }}
      >
        {buttonContent}
      </button>
    </>
  )
}

// Create the web component using r2wc
const ButtonWebComponent = r2wc(ButtonWrapper, {
  props: {
    // Basic button props
    className: "string",
    variant: "string",
    size: "string",
    disabled: "boolean",
    type: "string",
    // Content props
    textContent: "string",
    children: "string",
    // Event handlers
    onClick: "function",
  },
  // IMPORTANT: Use shadow DOM to ensure styles don't leak
  shadow: "open"
})

// Auto-register in browser environments
if (typeof window !== "undefined" && typeof customElements !== "undefined") {
  if (!customElements.get("ui-button")) {
    customElements.define("ui-button", ButtonWebComponent)
  }
}

export { ButtonWebComponent } 