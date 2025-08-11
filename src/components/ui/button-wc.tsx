import * as React from "react"
import { createRoot } from "react-dom/client"
import { Button } from "./button"

class ButtonWebComponent extends HTMLElement {
  private root: any = null

  connectedCallback() {
    const variant = (this.getAttribute('variant') as any) || 'default'
    const size = (this.getAttribute('size') as any) || 'default'
    const disabled = this.hasAttribute('disabled')
    const className = this.getAttribute('className') || this.getAttribute('class') || ''
    const content = this.textContent || this.innerHTML || 'Button'
    
    // Clear the original content to avoid duplication
    this.innerHTML = ''
    
    // Create a container for React
    const container = document.createElement('div')
    this.appendChild(container)
    
    this.root = createRoot(container)
    this.root.render(
      React.createElement(Button, {
        variant,
        size,
        disabled,
        className,
        onClick: () => {
          this.dispatchEvent(new CustomEvent('click', { bubbles: true }))
        }
      }, content)
    )
  }

  disconnectedCallback() {
    if (this.root) {
      this.root.unmount()
    }
  }
}

// Auto-register in browser environments
if (typeof window !== "undefined" && typeof customElements !== "undefined") {
  if (!customElements.get("ui-button")) {
    customElements.define("ui-button", ButtonWebComponent)
  }
}

export { ButtonWebComponent } 