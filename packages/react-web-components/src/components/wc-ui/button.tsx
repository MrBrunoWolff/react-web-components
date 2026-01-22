import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { Button } from '../ui/button';

class ButtonWebComponent extends HTMLElement {
  private root: ReturnType<typeof createRoot> | null = null;

  connectedCallback() {
    const variant =
      (this.getAttribute('variant') as
        | 'default'
        | 'destructive'
        | 'outline'
        | 'secondary'
        | 'ghost'
        | 'link') || 'default';
    const size = (this.getAttribute('size') as 'default' | 'sm' | 'lg' | 'icon') || 'default';
    const disabled = this.hasAttribute('disabled');
    const className = this.getAttribute('className') || this.getAttribute('class') || '';

    // Store the content before clearing
    const content = this.textContent || '';

    // Create a container for React
    const container = document.createElement('div');
    this.innerHTML = '';
    this.appendChild(container);

    this.root = createRoot(container);
    this.root.render(
      React.createElement(
        Button,
        {
          variant,
          size,
          disabled,
          className,
          onClick: () => {
            this.dispatchEvent(new CustomEvent('click', { bubbles: true }));
          },
        },
        content
      )
    );
  }

  disconnectedCallback() {
    if (this.root) {
      this.root.unmount();
    }
  }
}

// Auto-register in browser environments
if (typeof window !== 'undefined' && typeof customElements !== 'undefined') {
  if (!customElements.get('ui-button')) {
    customElements.define('ui-button', ButtonWebComponent);
  }
}

export { ButtonWebComponent };
