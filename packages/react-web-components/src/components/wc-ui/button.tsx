import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { Button } from '../ui/button';

class ButtonWebComponent extends HTMLElement {
  private root: ReturnType<typeof createRoot> | null = null;
  private content = '';

  static get observedAttributes() {
    return ['variant', 'size', 'disabled', 'class', 'className'];
  }

  connectedCallback() {
    if (!this.root) {
      this.content = this.textContent || '';
      this.style.display = 'inline-flex';
      this.style.verticalAlign = 'middle';
      this.root = createRoot(this);
    }

    this.renderButton();
  }

  attributeChangedCallback(
    name: string,
    oldValue: string | null,
    newValue: string | null,
  ) {
    if (!this.root || oldValue === newValue) {
      return;
    }

    if (name === 'class' || name === 'className') {
      this.style.display = 'inline-flex';
      this.style.verticalAlign = 'middle';
    }

    this.renderButton();
  }

  disconnectedCallback() {
    if (this.root) {
      this.root.unmount();
      this.root = null;
    }
  }

  private renderButton() {
    if (!this.root) {
      return;
    }

    const variant =
      (this.getAttribute('variant') as
        | 'default'
        | 'destructive'
        | 'outline'
        | 'secondary'
        | 'ghost'
        | 'link') || 'default';
    const size =
      (this.getAttribute('size') as 'default' | 'sm' | 'lg' | 'icon') ||
      'default';
    const disabled = this.hasAttribute('disabled');
    const className =
      this.getAttribute('className') || this.getAttribute('class') || '';

    this.root.render(
      React.createElement(
        Button,
        {
          variant,
          size,
          disabled,
          className,
        },
        this.content,
      ),
    );
  }
}

// Auto-register in browser environments
if (typeof window !== 'undefined' && typeof customElements !== 'undefined') {
  if (!customElements.get('ui-button')) {
    customElements.define('ui-button', ButtonWebComponent);
  }
}

export { ButtonWebComponent };
