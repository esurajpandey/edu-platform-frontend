'use client';

import { useId } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ComponentSize } from '@/types/ui.types';
import { IconSize } from '@/types/icon.types';
import { sizeClasses } from './utils';
import Icon from '@/components/Icon';

export type HighlightDate = {
  [className: string]: Date[];
};

export type Holiday = {
  date: string;
  holidayName: string;
};

interface DatePickerProps {
  value?: Date | null;
  onChange?: (date: Date | null) => void;

  label?: string; // ✅ NEW
  required?: boolean; // ✅ NEW
  error?: string; // ✅ NEW
  name?: string; // ✅ NEW

  format?: string;
  className?: string;
  placeholderText?: string;
  minDate?: Date;
  maxDate?: Date;
  showTimeSelect?: boolean;
  showTimeSelectOnly?: boolean;
  onCalendarClose?: () => void;
  onCalendarOpen?: () => void;
  isClearable?: boolean;
  showInFullScreen?: boolean;
  disabled?: boolean;
  excludeDates?: Date[];
  weekendsDisabled?: boolean;
  highlightDates?: HighlightDate[];
  holidays?: Holiday[];
  onBlur?: () => void;
  portalId?: string;
  readOnly?: boolean;
  responsive?: boolean;
  size?: ComponentSize;
  outline?: boolean;
}

const iconSizeMap: Record<ComponentSize, IconSize> = {
  small: 'small',
  medium: 'small',
  large: 'medium',
  xlarge: 'medium',
};

export default function DateInput({
  value = null,
  onChange,

  label,
  required,
  error,
  name,

  className,
  placeholderText = 'Select Date',
  minDate,
  format = 'MM/dd/yyyy',
  maxDate,
  showTimeSelect = false,
  showTimeSelectOnly,
  isClearable = false,
  showInFullScreen = false,
  disabled = false,
  excludeDates = [],
  weekendsDisabled = false,
  highlightDates = [],
  holidays = [],
  portalId,
  onBlur,
  onCalendarClose,
  onCalendarOpen,
  readOnly,
  responsive,
  size = 'medium',
  outline = true,
}: DatePickerProps) {
  const id = useId();

  const isWeekday = (date: Date) => {
    const day = date.getDay();
    return day !== 0 && day !== 6;
  };

  const getClassName = () => {
    const sizeClass = sizeClasses[size];

    return `
      w-full rounded-md shadow-sm
      ${sizeClass}
      ${error ? 'border-danger' : 'border-surfaceSoft'}
      ${outline ? '' : 'focus:outline-none'}
      ${className ?? ''}
    `;
  };

  return (
    <div
      className={`date-input flex flex-col gap-1.5 ${responsive ? 'w-full md:w-1/2' : 'w-full'}`}
    >
      {/* ✅ Label */}
      {label && (
        <label htmlFor={id} className="text-sm font-semibold text-text">
          {label}
          {required && <span className="ml-1 text-danger">*</span>}
        </label>
      )}

      {/* ✅ DatePicker */}
      <DatePicker
        id={id}
        selected={value ?? null}
        onChange={(date: Date | null) => onChange?.(date)}
        onBlur={() => onBlur?.()}
        className={getClassName()}
        dateFormat={format}
        placeholderText={placeholderText}
        minDate={minDate}
        maxDate={maxDate}
        showTimeSelect={showTimeSelect}
        showTimeSelectOnly={showTimeSelectOnly}
        isClearable={isClearable}
        disabled={disabled}
        excludeDates={excludeDates}
        filterDate={weekendsDisabled ? isWeekday : undefined}
        highlightDates={highlightDates}
        holidays={holidays}
        onCalendarClose={onCalendarClose}
        onCalendarOpen={onCalendarOpen}
        withPortal={showInFullScreen}
        portalId={portalId}
        readOnly={readOnly}
        popperPlacement="bottom-start"
        showPopperArrow={false}
        icon={<Icon name="calendar" size={iconSizeMap[size]} color="primary" />}
        showIcon
      />

      {/* ✅ Hidden input (for forms like SelectInput) */}
      {name && (
        <input
          type="hidden"
          name={name}
          value={value ? value.toISOString() : ''}
          required={required}
        />
      )}

      {/* ✅ Error */}
      {error && <p className="text-xs text-danger">{error}</p>}
    </div>
  );
}
