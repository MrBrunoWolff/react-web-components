import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

// Inline styles to ensure the button works without Tailwind setup
const buttonStyles = `
  .btn-base {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    white-space: nowrap;
    border-radius: 0.375rem;
    font-size: 0.875rem;
    font-weight: 500;
    line-height: 1.25rem;
    transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
    outline: none;
    border: none;
    cursor: pointer;
    position: relative;
    font-family: inherit;
  }
  
  .btn-base:disabled {
    pointer-events: none;
    opacity: 0.5;
  }
  
  .btn-base:focus-visible {
    outline: 2px solid #3b82f6;
    outline-offset: 2px;
  }
  
  /* Default variant */
  .btn-default {
    background-color: #0f172a;
    color: #f8fafc;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    height: 2.25rem;
    padding: 0 1rem;
  }
  
  .btn-default:hover:not(:disabled) {
    background-color: rgba(15, 23, 42, 0.9);
  }
  
  /* Secondary variant */
  .btn-secondary {
    background-color: #f1f5f9;
    color: #0f172a;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    height: 2.25rem;
    padding: 0 1rem;
  }
  
  .btn-secondary:hover:not(:disabled) {
    background-color: rgba(241, 245, 249, 0.8);
  }
  
  /* Destructive variant */
  .btn-destructive {
    background-color: #dc2626;
    color: #ffffff;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    height: 2.25rem;
    padding: 0 1rem;
  }
  
  .btn-destructive:hover:not(:disabled) {
    background-color: rgba(220, 38, 38, 0.9);
  }
  
  /* Outline variant */
  .btn-outline {
    border: 1px solid #e2e8f0;
    background-color: #ffffff;
    color: #0f172a;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    height: 2.25rem;
    padding: 0 1rem;
  }
  
  .btn-outline:hover:not(:disabled) {
    background-color: #f1f5f9;
  }
  
  /* Ghost variant */
  .btn-ghost {
    background-color: transparent;
    color: #0f172a;
    height: 2.25rem;
    padding: 0 1rem;
  }
  
  .btn-ghost:hover:not(:disabled) {
    background-color: #f1f5f9;
  }
  
  /* Link variant */
  .btn-link {
    background-color: transparent;
    color: #0f172a;
    text-decoration: underline;
    text-underline-offset: 4px;
    padding: 0;
    height: auto;
  }
  
  .btn-link:hover:not(:disabled) {
    text-decoration: underline;
  }
  
  /* Size variants */
  .btn-sm {
    height: 2rem;
    padding: 0 0.75rem;
    font-size: 0.875rem;
    gap: 0.375rem;
  }
  
  .btn-lg {
    height: 2.5rem;
    padding: 0 1.5rem;
    font-size: 0.875rem;
  }
  
  .btn-icon {
    width: 2.25rem;
    height: 2.25rem;
    padding: 0;
  }
`

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
        destructive:
          "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  // Create CSS class names based on variant and size
  const cssClasses = [
    'btn-base',
    `btn-${variant}`,
    size !== 'default' ? `btn-${size}` : '',
    className
  ].filter(Boolean).join(' ')

  React.useEffect(() => {
    // Inject styles if not already present
    if (!document.getElementById('button-styles')) {
      const styleElement = document.createElement('style')
      styleElement.id = 'button-styles'
      styleElement.textContent = buttonStyles
      document.head.appendChild(styleElement)
    }
  }, [])

  return (
    <Comp
      data-slot="button"
      className={cssClasses}
      {...props}
    />
  )
}

export { Button, buttonVariants }
