/** @vitest-environment jsdom */

import { render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import { Calendar } from './calendar';

/**
 * These assert on the *rendered* class attributes, not on the object passed to
 * DayPicker.
 *
 * That is the whole point: before this, `classNames` was keyed by the v8 element
 * names, which v9 had already removed. The object was well-formed and the
 * component rendered, so nothing failed — the classes simply never reached an
 * element. Asserting that the styling lands on real nodes is the only thing that
 * would have caught it, and the only thing that will catch it next time.
 */

// A fixed month so weekday/day assertions do not depend on today's date.
const MONTH = new Date(2024, 0, 1); // January 2024

afterEach(() => {
  document.body.innerHTML = '';
});

describe('Calendar', () => {
  it('renders a month grid for the given month', () => {
    render(<Calendar defaultMonth={MONTH} />);
    expect(screen.getByRole('grid')).toBeTruthy();
    // January 2024 starts on a Monday and has 31 days.
    expect(screen.getByText('15')).toBeTruthy();
  });

  it('applies the caption classes to the month caption', () => {
    const { container } = render(<Calendar defaultMonth={MONTH} />);
    // month_caption — was `caption`, which stopped existing in v9.
    const caption = container.querySelector('.justify-center.pt-1');
    expect(caption).not.toBeNull();
    expect(caption?.className).toContain('relative');
  });

  it('applies the weekday header classes', () => {
    const { container } = render(<Calendar defaultMonth={MONTH} />);
    // weekdays (was head_row) and weekday (was head_cell).
    expect(container.querySelector('.flex')).not.toBeNull();
    const weekday = container.querySelector('.text-muted-foreground.w-8');
    expect(weekday).not.toBeNull();
    expect(weekday?.className).toContain('text-[0.8rem]');
  });

  it('applies the grid and week classes', () => {
    const { container } = render(<Calendar defaultMonth={MONTH} />);
    // month_grid (was table) and week (was row).
    expect(container.querySelector('.border-collapse')).not.toBeNull();
    expect(container.querySelector('.mt-2')).not.toBeNull();
  });

  it('styles the day cell and the day button separately', () => {
    // `mode` matters: without a selection mode v10 renders days as plain cells
    // with no button at all, so day_button only has something to style here.
    const { container } = render(
      <Calendar mode="single" defaultMonth={MONTH} />,
    );

    // `day` is the cell, `day_button` the button inside it — in v8 these were
    // named `cell` and `day`, so a stale mapping silently puts the button's
    // styling on the cell and leaves the button bare.
    const cell = container.querySelector('td.text-center.p-0');
    expect(cell).not.toBeNull();

    const dayButton = container.querySelector('button.size-8');
    expect(dayButton).not.toBeNull();
    expect(dayButton?.className).toContain('font-normal');
    // The two must not collapse onto the same node.
    expect(cell?.className).not.toContain('size-8');
  });

  it('renders both navigation buttons with the outline variant', () => {
    const { container } = render(<Calendar defaultMonth={MONTH} />);
    // button_previous / button_next — were nav_button_previous/next, plus a
    // shared nav_button that v9 removed entirely.
    const prev = container.querySelector('.left-1');
    const next = container.querySelector('.right-1');
    expect(prev).not.toBeNull();
    expect(next).not.toBeNull();
    // The shared nav_button styling has to survive on both.
    for (const el of [prev, next]) {
      expect(el?.className).toContain('size-7');
      expect(el?.className).toContain('opacity-50');
    }
  });

  it('renders a chevron in each navigation button', () => {
    const { container } = render(<Calendar defaultMonth={MONTH} />);
    // v10 replaced IconLeft/IconRight with one Chevron; both were previously
    // silenced with @ts-expect-error, so neither was actually wired up.
    const svgs = container.querySelectorAll('svg');
    expect(svgs.length).toBeGreaterThanOrEqual(2);
    expect(
      [...svgs].some((s) => s.getAttribute('class')?.includes('size-4')),
    ).toBe(true);
  });

  it('marks outside days when showOutsideDays is on', () => {
    const { container } = render(
      <Calendar defaultMonth={MONTH} showOutsideDays />,
    );
    // `outside` — was day_outside.
    expect(container.querySelector('.day-outside')).not.toBeNull();
  });

  it('honours caller-supplied classNames over the defaults', () => {
    const { container } = render(
      <Calendar
        defaultMonth={MONTH}
        classNames={{ month_grid: 'CALLER-GRID' }}
      />,
    );
    // The spread of `...classNames` has to keep winning after the rename.
    expect(container.querySelector('.CALLER-GRID')).not.toBeNull();
  });

  it('accepts a className on the root', () => {
    const { container } = render(
      <Calendar defaultMonth={MONTH} className="ROOT" />,
    );
    expect(container.querySelector('.ROOT')).not.toBeNull();
    expect(container.querySelector('.p-3')).not.toBeNull();
  });
});
