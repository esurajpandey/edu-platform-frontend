"use client";

import {
  ChangeEvent,
  FocusEventHandler,
  InputHTMLAttributes,
  KeyboardEventHandler,
  forwardRef,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import { format, isValid, parseISO } from "date-fns";
import {
  DayFlag,
  DayPicker,
  SelectionState,
  UI,
  type ChevronProps,
  type Matcher,
} from "react-day-picker";
import Icon from "@/components/Icon";
import { cn } from "@/lib/cn";
import { ControlRadius, ControlSize, InputTone, InputVariant } from "@/types";
import FieldShell from "./FieldShell";
import { controlRadiusClasses, controlSizeClasses } from "./styles";

const dateVariantClasses: Record<InputVariant, string> = {
  default: "border border-surfaceSoft bg-surface",
  filled: "border border-transparent bg-base",
};

const dateToneClasses: Record<InputTone, string> = {
  default: "text-text focus-within:border-primary/55 focus-within:ring-primary/10",
  danger: "border-danger/40 text-text focus-within:border-danger/55 focus-within:ring-danger/10",
  success:
    "border-[color:rgba(34,197,94,0.24)] text-text focus-within:border-[color:rgba(22,163,74,0.5)] focus-within:ring-[color:rgba(22,163,74,0.08)]",
};

const calendarToggleButtonClassName =
  "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition focus-visible:outline-none disabled:cursor-not-allowed";

const dayPickerClassNames = {
  [UI.Root]: "w-full",
  [UI.Months]: "w-full",
  [UI.Month]: "w-full space-y-4",
  [UI.MonthCaption]: "relative flex items-center justify-between gap-3",
  [UI.CaptionLabel]: "text-sm font-semibold tracking-tight text-text",
  [UI.Nav]: "flex items-center gap-2",
  [UI.PreviousMonthButton]:
    "inline-flex h-9 w-9 items-center justify-center rounded-xl border border-surfaceSoft bg-surface text-text transition hover:border-primary/20 hover:bg-primary/5 disabled:cursor-not-allowed disabled:opacity-40",
  [UI.NextMonthButton]:
    "inline-flex h-9 w-9 items-center justify-center rounded-xl border border-surfaceSoft bg-surface text-text transition hover:border-primary/20 hover:bg-primary/5 disabled:cursor-not-allowed disabled:opacity-40",
  [UI.Chevron]: "h-4 w-4",
  [UI.MonthGrid]: "w-full border-collapse",
  [UI.Weekdays]: "grid grid-cols-7 gap-1 mb-2",
  [UI.Weekday]:
    "flex h-9 items-center justify-center text-[11px] font-semibold uppercase tracking-[0.12em] text-textMuted",
  [UI.Weeks]: "space-y-1",
  [UI.Week]: "grid grid-cols-7 gap-1",
  [UI.Day]: "flex items-center justify-center",
  [UI.DayButton]:
    "flex h-10 w-10 items-center justify-center rounded-xl text-sm font-medium text-text transition outline-none hover:bg-primary/8 focus-visible:ring-2 focus-visible:ring-primary/10",
  [SelectionState.selected]: "bg-primary text-surface hover:bg-primaryDark",
  [DayFlag.today]: "border border-primary/20 text-primary",
  [DayFlag.outside]: "text-textMuted opacity-45",
  [DayFlag.disabled]: "pointer-events-none opacity-30",
} as const;

function CalendarChevron({ orientation = "right", className }: ChevronProps) {
  const rotationClassName =
    orientation === "left"
      ? "rotate-180"
      : orientation === "up"
        ? "-rotate-90"
        : orientation === "down"
          ? "rotate-90"
          : "";

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("h-4 w-4", rotationClassName, className)}
      aria-hidden="true"
    >
      <path
        d="M9 6L15 12L9 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function parseDateValue(value?: string) {
  if (!value) {
    return undefined;
  }

  const parsedDate = parseISO(value);
  return isValid(parsedDate) ? parsedDate : undefined;
}

function toIsoDate(date: Date) {
  return format(date, "yyyy-MM-dd");
}

function toDisplayDate(value?: string, placeholder?: string) {
  const parsedDate = parseDateValue(value);
  if (!parsedDate) {
    return placeholder ?? "";
  }

  return format(parsedDate, "dd MMM yyyy");
}

export type DatePickerProps = Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "type"> & {
  label?: string;
  description?: string;
  error?: string;
  size?: ControlSize;
  radius?: ControlRadius;
  variant?: InputVariant;
  tone?: InputTone;
  className?: string;
  inputClassName?: string;
  popoverClassName?: string;
  calendarClassName?: string;
  disabledDates?: Matcher | Matcher[];
  numberOfMonths?: 1 | 2;
  showOutsideDays?: boolean;
  startMonth?: Date;
  endMonth?: Date;
};

const DatePicker = forwardRef<HTMLInputElement, DatePickerProps>(function DatePicker(
  {
    id,
    name,
    label,
    description,
    error,
    required,
    value,
    defaultValue,
    min,
    max,
    disabled,
    placeholder = "Select a date",
    size = "md",
    radius = "lg",
    variant = "default",
    tone = error ? "danger" : "default",
    className,
    inputClassName,
    popoverClassName,
    calendarClassName,
    disabledDates,
    numberOfMonths = 1,
    showOutsideDays = true,
    startMonth,
    endMonth,
    onChange,
    onBlur,
    onFocus,
    onKeyDown,
    autoFocus,
    form,
    "aria-describedby": ariaDescribedBy,
    ...props
  },
  ref,
) {
  const containerRef = useRef<HTMLDivElement>(null);
  const hiddenInputRef = useRef<HTMLInputElement>(null);
  const descriptionId = description && id ? `${id}-description` : undefined;
  const errorId = error && id ? `${id}-error` : undefined;
  const describedBy =
    [ariaDescribedBy, errorId ?? descriptionId].filter(Boolean).join(" ") || undefined;
  const calendarId = useId();

  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState(
    typeof defaultValue === "string" ? defaultValue : "",
  );
  const [isOpen, setIsOpen] = useState(false);

  const currentValue = isControlled ? (typeof value === "string" ? value : "") : internalValue;
  const selectedDate = parseDateValue(currentValue);
  const minValue = typeof min === "string" ? min : undefined;
  const maxValue = typeof max === "string" ? max : undefined;
  const minDate = parseDateValue(minValue);
  const maxDate = parseDateValue(maxValue);

  const [visibleMonth, setVisibleMonth] = useState<Date>(
    selectedDate ?? minDate ?? startMonth ?? new Date(),
  );

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handlePointerDown = (event: MouseEvent) => {
      const target = event.target as Node;
      if (!containerRef.current?.contains(target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, [isOpen]);

  const dayPickerDisabled = useMemo(() => {
    const matchers: Matcher[] = [];

    if (minDate) {
      matchers.push({ before: minDate });
    }

    if (maxDate) {
      matchers.push({ after: maxDate });
    }

    if (disabledDates) {
      if (Array.isArray(disabledDates)) {
        matchers.push(...disabledDates);
      } else {
        matchers.push(disabledDates);
      }
    }

    return matchers;
  }, [disabledDates, maxDate, minDate]);

  const emitValueChange = (nextValue: string) => {
    if (!isControlled) {
      setInternalValue(nextValue);
    }

    if (hiddenInputRef.current) {
      hiddenInputRef.current.value = nextValue;
    }

    if (!onChange) {
      return;
    }

    const target = hiddenInputRef.current;
    if (!target) {
      return;
    }

    onChange({ target, currentTarget: target } as ChangeEvent<HTMLInputElement>);
  };

  const handleSelect = (nextDate?: Date) => {
    if (!nextDate) {
      if (!required) {
        emitValueChange("");
      }
      return;
    }

    emitValueChange(toIsoDate(nextDate));
    setVisibleMonth(nextDate);
    setIsOpen(false);
  };

  const handleFocus: FocusEventHandler<HTMLInputElement> = (event) => {
    setIsOpen(true);
    onFocus?.(event);
  };

  const handleBlur: FocusEventHandler<HTMLInputElement> = (event) => {
    onBlur?.(event);
  };

  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (disabled) {
      onKeyDown?.(event);
      return;
    }

    if (event.key === "Enter" || event.key === " " || event.key === "ArrowDown") {
      event.preventDefault();
      setIsOpen(true);
    }

    if ((event.key === "Backspace" || event.key === "Delete") && !required) {
      event.preventDefault();
      emitValueChange("");
    }

    if (event.key === "Escape") {
      setIsOpen(false);
    }

    onKeyDown?.(event);
  };

  return (
    <FieldShell
      label={label}
      labelFor={id}
      description={description}
      error={error}
      descriptionId={descriptionId}
      errorId={errorId}
      required={required}
      className={className}
    >
      <div ref={containerRef} className="relative">
        <div
          className={cn(
            "flex w-full items-center gap-3 overflow-hidden transition duration-200 focus-within:ring-2 focus-within:ring-offset-0",
            controlSizeClasses[size],
            controlRadiusClasses[radius],
            dateVariantClasses[variant],
            dateToneClasses[tone],
            disabled && "cursor-not-allowed bg-surfaceSoft/60 opacity-60",
          )}
        >
          <div className="flex shrink-0 items-center text-textLight">
            <Icon name="calendar" size="small" color="textLight" />
          </div>

          <input
            ref={ref}
            id={id}
            type="text"
            value={toDisplayDate(currentValue, placeholder)}
            readOnly
            required={required}
            disabled={disabled}
            autoFocus={autoFocus}
            aria-invalid={Boolean(error)}
            aria-describedby={describedBy}
            placeholder={placeholder}
            form={form}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onClick={() => !disabled && setIsOpen(true)}
            onKeyDown={handleKeyDown}
            {...props}
            className={cn(
              "w-full min-w-0 border-0 bg-transparent p-0 text-sm outline-none placeholder:text-textMuted disabled:cursor-not-allowed lg:text-[15px]",
              inputClassName,
            )}
          />

          <button
            type="button"
            aria-label="Open calendar"
            aria-expanded={isOpen}
            aria-controls={calendarId}
            aria-haspopup="dialog"
            disabled={disabled}
            onClick={() => setIsOpen((current) => !current)}
            className={calendarToggleButtonClassName}
          >
            <CalendarChevron orientation={isOpen ? "up" : "down"} />
          </button>
        </div>

        <input
          ref={hiddenInputRef}
          type="hidden"
          name={name}
          value={currentValue}
          form={form}
          readOnly
          disabled={disabled}
          {...(minValue ? { min: minValue } : {})}
          {...(maxValue ? { max: maxValue } : {})}
        />

        {isOpen ? (
          <div
            id={calendarId}
            role="dialog"
            aria-label={label ?? "Date picker"}
            className={cn(
              "absolute left-0 top-[calc(100%+0.65rem)] z-30 w-[min(100%,22rem)] rounded-[24px] border border-surfaceSoft bg-surface p-4 shadow-xl",
              numberOfMonths === 2 && "w-[min(100vw-2rem,44rem)]",
              popoverClassName,
            )}
          >
            <DayPicker
              mode="single"
              month={selectedDate ?? visibleMonth}
              onMonthChange={setVisibleMonth}
              selected={selectedDate}
              onSelect={handleSelect}
              disabled={dayPickerDisabled}
              startMonth={startMonth ?? minDate}
              endMonth={endMonth ?? maxDate}
              numberOfMonths={numberOfMonths}
              showOutsideDays={showOutsideDays}
              fixedWeeks
              navLayout="after"
              className={cn("text-text", calendarClassName)}
              classNames={dayPickerClassNames}
              components={{ Chevron: CalendarChevron }}
            />
          </div>
        ) : null}
      </div>
    </FieldShell>
  );
});

export default DatePicker;
