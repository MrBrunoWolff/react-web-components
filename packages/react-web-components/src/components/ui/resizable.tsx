import { GripVerticalIcon } from 'lucide-react';
import type * as React from 'react';
import * as ResizablePrimitive from 'react-resizable-panels';

import { cn } from '@/lib/utils';

/**
 * react-resizable-panels v4 renamed the primitives — PanelGroup -> Group and
 * PanelResizeHandle -> Separator — and changed how orientation is expressed.
 *
 * v3 put `data-panel-group-direction="vertical"` on the group and the handle,
 * which is what shadcn's `data-[panel-group-direction=vertical]:*` variants keyed
 * off. v4 emits no such attribute: the group carries orientation only as an
 * inline `flex-direction`, and the separator exposes it as `aria-orientation`.
 * Those selectors would therefore have matched nothing — the components would
 * still render, and every vertical-orientation style would silently be dropped.
 * So the variants below are keyed on `aria-orientation` instead.
 *
 * Note the inversion: a *horizontal* group separates panels with a *vertical*
 * divider, so `aria-orientation="horizontal"` on the separator is the vertical
 * group. That is the ARIA-correct reading, not a bug.
 */

function ResizablePanelGroup({
  className,
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.Group>) {
  return (
    <ResizablePrimitive.Group
      data-slot="resizable-panel-group"
      // No `flex` / `flex-col` here any more: v4 sets display, flex-direction,
      // flex-wrap and overflow itself and documents them as un-overridable, so
      // those classes were both redundant and unable to win against the inline
      // style. Orientation is passed as the `orientation` prop (was `direction`).
      className={cn('h-full w-full', className)}
      {...props}
    />
  );
}

function ResizablePanel({
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.Panel>) {
  return <ResizablePrimitive.Panel data-slot="resizable-panel" {...props} />;
}

function ResizableHandle({
  withHandle,
  className,
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.Separator> & {
  withHandle?: boolean;
}) {
  return (
    <ResizablePrimitive.Separator
      data-slot="resizable-handle"
      className={cn(
        'bg-border focus-visible:ring-ring relative flex w-px items-center justify-center after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 focus-visible:ring-1 focus-visible:ring-offset-1 focus-visible:outline-hidden aria-[orientation=horizontal]:h-px aria-[orientation=horizontal]:w-full aria-[orientation=horizontal]:after:left-0 aria-[orientation=horizontal]:after:h-1 aria-[orientation=horizontal]:after:w-full aria-[orientation=horizontal]:after:-translate-y-1/2 aria-[orientation=horizontal]:after:translate-x-0 [&[aria-orientation=horizontal]>div]:rotate-90',
        className,
      )}
      {...props}
    >
      {withHandle && (
        <div className="bg-border z-10 flex h-4 w-3 items-center justify-center rounded-xs border">
          <GripVerticalIcon className="size-2.5" />
        </div>
      )}
    </ResizablePrimitive.Separator>
  );
}

export { ResizableHandle, ResizablePanel, ResizablePanelGroup };
