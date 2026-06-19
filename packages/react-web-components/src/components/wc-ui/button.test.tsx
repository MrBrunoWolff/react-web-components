/** @vitest-environment jsdom */

import { act } from 'react';
import { afterEach, describe, expect, it } from 'vitest';

import './button';

globalThis.IS_REACT_ACT_ENVIRONMENT = true;

describe('ButtonWebComponent', () => {
  afterEach(async () => {
    await act(async () => {
      document.body.innerHTML = '';
    });
  });

  it('renders the button without an extra wrapper element', async () => {
    const element = document.createElement('ui-button');
    element.textContent = 'Default';

    await act(async () => {
      document.body.appendChild(element);
    });

    const button = element.querySelector('button');

    expect(button).not.toBeNull();
    expect(element.firstElementChild?.tagName).toBe('BUTTON');
    expect(element.style.display).toBe('inline-flex');
    expect(button?.textContent).toBe('Default');
    expect(button?.className).toContain('btn-base');
  });

  it('rerenders when attributes change after mount', async () => {
    const element = document.createElement('ui-button');
    element.textContent = 'Delete';

    await act(async () => {
      document.body.appendChild(element);
    });

    await act(async () => {
      element.setAttribute('variant', 'destructive');
      element.setAttribute('size', 'lg');
      element.setAttribute('disabled', '');
    });

    const button = element.querySelector('button');

    expect(button).not.toBeNull();
    expect(button?.className).toContain('btn-destructive');
    expect(button?.className).toContain('btn-lg');
    expect(button?.hasAttribute('disabled')).toBe(true);
  });
});
