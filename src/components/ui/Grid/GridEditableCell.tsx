'use client';

import Select from 'react-select';
import Icon from '@/components/Icon';
import { cn } from '@/lib/cn';
import DatePicker from '../DatePicker';
import InputBox from '../InputBox';
import type { GridColumn } from './grid.type';
import { getAlignmentClassName } from './utils';

type GridEditableCellProps<T extends Record<string, unknown>> = {
  column: GridColumn<T>;
  row: T;
  rowIndex: number;
  value: unknown;
  onChange?: <K extends Extract<keyof T, string>>(rowIndex: number, field: K, value: T[K]) => void;
};

const sharedControlClassName =
  'min-h-14 rounded-none border-0 border-r border-surfaceSoft bg-transparent shadow-none transition focus-within:bg-primary/5 last:border-r-0';

export default function GridEditableCell<T extends Record<string, unknown>>({
  column,
  rowIndex,
  value,
  onChange,
}: GridEditableCellProps<T>) {
  const emitValueChange = (nextValue: unknown) => {
    if (!onChange) {
      return;
    }

    onChange(rowIndex, column.field, nextValue as T[Extract<keyof T, string>]);
  };

  if (column.type === 'select') {
    const selectedOption =
      column.options?.find((option) => option.value === (typeof value === 'string' ? value : '')) ??
      null;

    return (
      <div className={cn('w-full px-0', sharedControlClassName)}>
        <Select
          unstyled
          instanceId={`${String(column.field)}-${rowIndex}`}
          options={column.options}
          value={selectedOption}
          onChange={(option) => emitValueChange(option?.value ?? '')}
          placeholder="Select option"
          isSearchable={false}
          menuPortalTarget={typeof document !== 'undefined' ? document.body : null}
          menuPosition="fixed"
          className="w-full"
          classNames={{
            control: () =>
              cn(
                'flex min-h-14 w-full items-center border-0 bg-transparent px-4 text-sm font-medium text-text outline-none',
                getAlignmentClassName(column.align),
              ),
            valueContainer: () => 'p-0 gap-0',
            singleValue: () => 'm-0 text-sm font-medium text-text',
            placeholder: () => 'm-0 text-sm text-textMuted',
            indicatorsContainer: () => 'gap-0',
            indicatorSeparator: () => 'hidden',
            dropdownIndicator: () => 'px-0 text-textMuted',
            menu: () =>
              'overflow-hidden rounded-2xl border border-surfaceSoft bg-surface py-1 shadow-[0_18px_40px_rgba(15,23,42,0.12)]',
            menuList: () => 'p-1',
            option: ({ isFocused, isSelected }) =>
              cn(
                'cursor-pointer rounded-xl px-3 py-2 text-sm font-medium',
                isSelected && 'bg-primary text-surface',
                !isSelected && isFocused && 'bg-primary/8 text-text',
                !isSelected && !isFocused && 'text-text',
              ),
          }}
          components={{
            DropdownIndicator: () => <Icon name="chevronDown" size="small" color="textLight" />,
          }}
        />
      </div>
    );
  }

  if (column.type === 'date') {
    return (
      <DatePicker
        value={typeof value === 'string' ? value : ''}
        onChange={(event) => emitValueChange(event.target.value)}
        placeholder="Pick a date"
        className="w-full"
        portal
        popoverPlacement="bottom-start"
        inputClassName={cn('text-sm font-medium text-text', getAlignmentClassName(column.align))}
        rootClassName={cn('px-4', sharedControlClassName)}
        popoverClassName="rounded-2xl border border-surfaceSoft bg-surface p-4 shadow-[0_18px_40px_rgba(15,23,42,0.12)]"
      />
    );
  }

  return (
    <InputBox
      type={column.type === 'number' ? 'number' : 'text'}
      value={value === null || value === undefined ? '' : String(value)}
      onChange={(event) =>
        emitValueChange(
          column.type === 'number'
            ? event.target.value === ''
              ? ''
              : Number(event.target.value)
            : event.target.value,
        )
      }
      placeholder={`Enter ${column.name.toLowerCase()}`}
      className="w-full"
      size="md"
      radius="md"
      rootClassName={cn('px-4', sharedControlClassName)}
      inputClassName={cn('text-sm font-medium text-text', getAlignmentClassName(column.align))}
    />
  );
}
