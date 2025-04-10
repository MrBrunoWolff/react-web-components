import * as React from "react"

/**
 * A component that provides all the necessary styles for web components
 * This gets bundled with each web component to ensure they have the correct styling
 */
export function StylesProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Inject direct styling for the components */}
      <style>
        {`
          /* Direct styling for button components */
          ui-button {
            display: inline-flex;
            margin: 0.25rem;
          }

          ui-button button {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
            white-space: nowrap;
            border-radius: 0.375rem;
            font-size: 0.875rem;
            font-weight: 500;
            height: 2.25rem; /* h-9 */
            padding: 0.5rem 1rem; /* px-4 py-2 */
            transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;
            transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
            transition-duration: 150ms;
            outline: none;
          }
          
          /* Direct color values from the shadcn UI */
          /* Default variant - black */
          ui-button[variant="default"] button {
            background-color: #000000;
            color: #ffffff;
            box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
          }
          
          ui-button[variant="default"]:not([disabled="true"]) button:hover {
            background-color: #18181b;
          }
          
          /* Destructive variant - red */
          ui-button[variant="destructive"] button {
            background-color: #ef4444;
            color: #ffffff;
            box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
          }
          
          ui-button[variant="destructive"]:not([disabled="true"]) button:hover {
            background-color: #dc2626;
          }
          
          /* Outline variant */
          ui-button[variant="outline"] button {
            border: 1px solid #e2e8f0;
            background-color: #ffffff;
            color: #020617;
            box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
          }
          
          ui-button[variant="outline"]:not([disabled="true"]) button:hover {
            background-color: #f1f5f9;
          }
          
          /* Secondary variant - gray */
          ui-button[variant="secondary"] button {
            background-color: #f1f5f9;
            color: #020617;
            box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
          }
          
          ui-button[variant="secondary"]:not([disabled="true"]) button:hover {
            background-color: #e2e8f0;
          }
          
          /* Ghost variant */
          ui-button[variant="ghost"] button {
            background-color: transparent;
            color: #020617;
          }
          
          ui-button[variant="ghost"]:not([disabled="true"]) button:hover {
            background-color: #f1f5f9;
          }
          
          /* Link variant */
          ui-button[variant="link"] button {
            text-decoration-line: none;
            background-color: transparent;
            color: #000000;
            text-underline-offset: 4px;
            height: auto;
            padding: 0;
          }
          
          ui-button[variant="link"]:not([disabled="true"]) button:hover {
            text-decoration-line: underline;
          }
          
          /* Size variations - following shadcn class names */
          ui-button[size="default"] button {
            height: 2.25rem; /* h-9 */
            padding: 0.5rem 1rem; /* px-4 py-2 */
          }
          
          ui-button[size="sm"] button {
            height: 2rem; /* h-8 */
            padding: 0 0.75rem; /* px-3 */
            border-radius: 0.375rem; /* rounded-md */
            gap: 0.375rem; /* gap-1.5 */
          }
          
          ui-button[size="lg"] button {
            height: 2.5rem; /* h-10 */
            padding: 0 1.5rem; /* px-6 */
            border-radius: 0.375rem; /* rounded-md */
          }
          
          /* Disabled state */
          ui-button[disabled="true"] button {
            pointer-events: none;
            opacity: 0.5;
            cursor: not-allowed;
          }
        `}
      </style>
      {children}
    </>
  )
} 