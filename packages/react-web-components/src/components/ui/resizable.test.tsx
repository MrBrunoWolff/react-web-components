/** @vitest-environment jsdom */

import { render } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from './resizable';

/**
 * react-resizable-panels v4 renamed PanelGroup -> Group and PanelResizeHandle ->
 * Separator, and dropped the `data-panel-group-direction` attribute that shadcn's
 * vertical-orientation variants were keyed on. Both failures are quiet: the
 * components still render, they just lose every vertical style.
 *
 * So these assert the orientation contract directly — that the separator reports
 * an `aria-orientation`, that it is the inverse of the group's, and that the
 * styling is keyed on that rather than on the attribute v4 no longer emits.
 */

/**
 * v4 measures panels with a ResizeObserver in a layout effect, and jsdom has no
 * implementation — without this every render throws "n is not a constructor"
 * before any assertion runs. A no-op is enough: these tests are about the
 * rendered contract (roles, aria-orientation, class wiring), not about layout
 * maths, which needs a real box model to mean anything.
 */
class NoopResizeObserver implements ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}
globalThis.ResizeObserver ??= NoopResizeObserver;

afterEach(() => {
  document.body.innerHTML = '';
});

function Tree({ orientation }: { orientation?: 'horizontal' | 'vertical' }) {
  return (
    <ResizablePanelGroup orientation={orientation}>
      <ResizablePanel defaultSize={50}>left</ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={50}>right</ResizablePanel>
    </ResizablePanelGroup>
  );
}

describe('Resizable', () => {
  it('renders the group, panels and handle', () => {
    const { container, getByText } = render(<Tree />);
    expect(
      container.querySelector('[data-slot="resizable-panel-group"]'),
    ).not.toBeNull();
    expect(
      container.querySelector('[data-slot="resizable-handle"]'),
    ).not.toBeNull();
    expect(getByText('left')).toBeTruthy();
    expect(getByText('right')).toBeTruthy();
  });

  it('exposes the handle as a separator', () => {
    const { container } = render(<Tree />);
    const handle = container.querySelector('[data-slot="resizable-handle"]');
    expect(handle?.getAttribute('role')).toBe('separator');
  });

  it('reports the separator orientation as the inverse of the group', () => {
    // A horizontal group is divided by a vertical rule, and vice versa. This
    // inversion is what the styling below keys on, so it is asserted rather
    // than assumed.
    const horizontal = render(<Tree orientation="horizontal" />);
    expect(
      horizontal.container
        .querySelector('[data-slot="resizable-handle"]')
        ?.getAttribute('aria-orientation'),
    ).toBe('vertical');
    horizontal.unmount();

    const vertical = render(<Tree orientation="vertical" />);
    expect(
      vertical.container
        .querySelector('[data-slot="resizable-handle"]')
        ?.getAttribute('aria-orientation'),
    ).toBe('horizontal');
  });

  it('keys its vertical styling on aria-orientation, not the removed data attribute', () => {
    const { container } = render(<Tree orientation="vertical" />);
    const handle = container.querySelector('[data-slot="resizable-handle"]');
    const className = handle?.getAttribute('class') ?? '';

    // The variants have to target the attribute v4 actually emits...
    expect(className).toContain('aria-[orientation=horizontal]:h-px');
    expect(className).toContain('aria-[orientation=horizontal]:w-full');
    expect(className).toContain(
      '[&[aria-orientation=horizontal]>div]:rotate-90',
    );
    // ...and must not target the one it removed, or the styling is dead again.
    expect(className).not.toContain('panel-group-direction');
  });

  it('no longer emits the v3 direction attribute anywhere', () => {
    // Guards the assumption the styling change rests on: if a later version
    // brings this attribute back, the aria-based variants should be revisited.
    const { container } = render(<Tree orientation="vertical" />);
    expect(container.querySelector('[data-panel-group-direction]')).toBeNull();
  });

  it('renders the grip only when asked', () => {
    const withGrip = render(<Tree />);
    expect(
      withGrip.container.querySelector('[data-slot="resizable-handle"] svg'),
    ).not.toBeNull();
    withGrip.unmount();

    const { container } = render(
      <ResizablePanelGroup>
        <ResizablePanel defaultSize={100}>only</ResizablePanel>
        <ResizableHandle />
      </ResizablePanelGroup>,
    );
    expect(
      container.querySelector('[data-slot="resizable-handle"] svg'),
    ).toBeNull();
  });

  it('merges a caller className onto the group and the handle', () => {
    const { container } = render(
      <ResizablePanelGroup className="GROUP">
        <ResizablePanel defaultSize={50}>a</ResizablePanel>
        <ResizableHandle className="HANDLE" />
        <ResizablePanel defaultSize={50}>b</ResizablePanel>
      </ResizablePanelGroup>,
    );
    const group = container.querySelector(
      '[data-slot="resizable-panel-group"]',
    );
    expect(group?.className).toContain('GROUP');
    // h-full/w-full is kept; the flex classes were dropped because v4 sets
    // display and flex-direction inline and documents them as un-overridable.
    expect(group?.className).toContain('h-full');
    expect(
      container.querySelector('[data-slot="resizable-handle"]')?.className,
    ).toContain('HANDLE');
  });
});
