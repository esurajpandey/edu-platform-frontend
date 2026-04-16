'use client';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ControlSize } from '@/types/ui.types';
import { IconSize } from '@/types/icon.types';
import { controlSizeClasses } from '@/components/ui/styles';
import Icon from '@/components/Icon';

export type HighlightDate = {
  [className: string]: Date[];
};
export type Holiday = {
  date: string;
  holidayName: string;
};

interface DatePickerProps {
  value: Date;
  onChange: (date: Date | null) => void;
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
  isDisabled?: boolean;
  excludeDates?: Date[];
  weekendsDisabled?: boolean;
  highlightDates?: HighlightDate[];
  holidays?: Holiday[];
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  portalId?: string;
  readOnly?: boolean;
  responsive?: boolean;
  size?: ControlSize;
  outline?: boolean;
}

const iconSizeMap: Record<ControlSize, IconSize> = {
  sm: 'small',
  md: 'small',
  lg: 'medium',
};

export type TFilterDate = (date: Date) => boolean;

export default function DateInput({
  value = new Date(),
  onChange,
  className,
  placeholderText = 'Select Date',
  minDate,
  format = 'MM/dd/yyyy',
  maxDate,
  showTimeSelect = false,
  showTimeSelectOnly,
  isClearable = false,
  showInFullScreen = false,
  isDisabled = false,
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
  size = 'sm',
  outline = true,
}: DatePickerProps) {
  const isWeekday: TFilterDate = (date: Date) => {
    const day = date.getDay();
    return day !== 0 && day !== 6;
  };

  const getClassName = () => {
    const sizeClass = controlSizeClasses[size];
    const base =
      `${className ?? ''} rounded-md shadow-sm ${sizeClass} ${outline ? '' : 'focus:outline-none focus:ring-0 focus:border-transparent'}`.trim();
    return responsive ? `${base} w-full` : base;
  };

  return (
    <DatePicker
      showIcon
      closeOnScroll
      isClearable={isClearable}
      selected={value}
      onChange={onChange}
      className={getClassName()}
      dateFormat={format}
      placeholderText={placeholderText}
      minDate={minDate}
      maxDate={maxDate}
      showTimeSelect={showTimeSelect}
      showTimeSelectOnly={showTimeSelectOnly}
      onCalendarClose={onCalendarClose}
      onCalendarOpen={onCalendarOpen}
      withPortal={showInFullScreen}
      disabled={isDisabled}
      excludeDates={excludeDates}
      filterDate={weekendsDisabled ? isWeekday : undefined}
      fixedHeight
      highlightDates={highlightDates}
      holidays={holidays}
      onBlur={onBlur}
      portalId={portalId}
      readOnly={readOnly}
      popperPlacement="bottom-start"
      showPopperArrow={false}
      icon={<Icon name="calendar" size={iconSizeMap[size]} color="primary" />}
    />
  );
}
