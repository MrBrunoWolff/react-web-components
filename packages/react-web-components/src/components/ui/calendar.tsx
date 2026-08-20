import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
} from 'lucide-react';
import type * as React from 'react';
import { DayPicker } from 'react-day-picker';
import type { ChevronProps } from 'react-day-picker';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

/**
 * react-day-picker renamed every element it exposes to `classNames` when it went
 * from v8 to v9, and v10 tightened `ClassNames` to a closed key set so the old
 * names finally stopped compiling.
 *
 * The old names had already stopped *working* one major earlier: v9 dropped
 * `caption`, `nav_button`, `table`, `head_row`, `head_cell`, `row`, `cell` and
 * the whole `day_*` family, so every class below was being handed to a key no
 * element mapped to. The calendar rendered, and none of this styling applied.
 * Nothing caught it because the type was permissive enough to accept the extra
 * keys and nothing in the repo renders a Calendar.
 *
 * The class strings are unchanged from the original — only the keys they are
 * attached to move, so the intended design is restored rather than redesigned:
 *
 *   caption             -> month_caption      table       -> month_grid
 *   nav_button_previous -> button_previous     head_row    -> weekdays
 *   nav_button_next     -> button_next         head_cell   -> weekday
 *   nav_button          -> folded into both    row         -> week
 *   cell                -> day                 day        -> day_button
 *   day_selected        -> selected            day_today   -> today
 *   day_outside         -> outside             day_disabled-> disabled
 *   day_range_start/end -> range_start/end     day_range_middle -> range_middle
 *   day_hidden          -> hidden
 *
 * The `IconLeft`/`IconRight` components are gone too, replaced by a single
 * `Chevron` that receives an `orientation`. Both were previously suppressed with
 * `@ts-expect-error`, which is what let them survive the v9 bump unnoticed.
 */
function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  const navButton = cn(
    buttonVariants({ variant: 'outline' }),
    'size-7 bg-transparent p-0 opacity-50 hover:opacity-100',
  );

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn('p-3', className)}
      classNames={{
        months: 'flex flex-col sm:flex-row gap-2',
        month: 'flex flex-col gap-4',
        month_caption: 'flex justify-center pt-1 relative items-center w-full',
        caption_label: 'text-sm font-medium',
        nav: 'flex items-center gap-1',
        button_previous: cn(navButton, 'absolute left-1'),
        button_next: cn(navButton, 'absolute right-1'),
        month_grid: 'w-full border-collapse space-x-1',
        weekdays: 'flex',
        weekday:
          'text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]',
        week: 'flex w-full mt-2',
        day: cn(
          'relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-range-end)]:rounded-r-md',
          props.mode === 'range'
            ? '[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md'
            : '[&:has([aria-selected])]:rounded-md',
        ),
        day_button: cn(
          buttonVariants({ variant: 'ghost' }),
          'size-8 p-0 font-normal aria-selected:opacity-100',
        ),
        range_start:
          'day-range-start aria-selected:bg-primary aria-selected:text-primary-foreground',
        range_end:
          'day-range-end aria-selected:bg-primary aria-selected:text-primary-foreground',
        selected:
          'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground',
        today: 'bg-accent text-accent-foreground',
        outside:
          'day-outside text-muted-foreground aria-selected:text-muted-foreground',
        disabled: 'text-muted-foreground opacity-50',
        range_middle:
          'aria-selected:bg-accent aria-selected:text-accent-foreground',
        hidden: 'invisible',
        ...classNames,
      }}
      components={{ Chevron: CalendarChevron }}
      {...props}
    />
  );
}

/**
 * The single navigation glyph v10 asks for, in place of v8's IconLeft/IconRight.
 * Up/down are reached by the dropdown navigation (`captionLayout="dropdown"`),
 * so all four orientations are handled rather than just the two the old pair
 * covered.
 */
function CalendarChevron({ className, orientation, ...props }: ChevronProps) {
  const Icon =
    orientation === 'up'
      ? ChevronUp
      : orientation === 'down'
        ? ChevronDown
        : orientation === 'right'
          ? ChevronRight
          : ChevronLeft;

  return <Icon className={cn('size-4', className)} {...props} />;
}

export { Calendar };
