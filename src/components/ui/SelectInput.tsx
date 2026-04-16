'use client';

import React, { useId, forwardRef, useCallback, useMemo, useState } from 'react';
import { useCombobox } from 'downshift';
import { ComponentSize } from '@/types/ui.types';
import { sizeClasses } from './utils';

interface Option {
  value: string | number;
  label: string;
}

interface SelectInputProps {
  options: Option[];
  label?: string;
  placeholder?: string;
  value?: string | number;
  onChange?: (value: string | number | undefined) => void;
  onBlur?: () => void;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  size?: ComponentSize;
  name?: string;
  clearable?: boolean;
  responsive?: boolean;
}

function mergeRefs<T = unknown>(...refs: Array<React.Ref<T> | undefined>) {
  return (node: T) => {
    refs.forEach((ref) => {
      if (!ref) return;
      if (typeof ref === 'function') ref(node);
      else (ref as React.MutableRefObject<T>).current = node;
    });
  };
}

const SelectInput = forwardRef<HTMLInputElement, SelectInputProps>(
  (
    {
      options,
      label,
      placeholder = 'Select an option',
      onChange,
      onBlur,
      error,
      disabled,
      required,
      className = '',
      size = 'medium',
      value,
      name,
      clearable = true,
      responsive = false,
    },
    ref,
  ) => {
    const id = useId();

    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);

    // ✅ Controlled selected item
    const selectedItem = useMemo(
      () => options.find((opt) => opt.value === value) || null,
      [options, value],
    );

    // ✅ Filter ONLY when typing
    const filteredItems = useMemo(() => {
      if (!isTyping || !inputValue) return options;

      return options.filter((item) => item.label.toLowerCase().includes(inputValue.toLowerCase()));
    }, [options, inputValue, isTyping]);

    const handleChange = useCallback(
      (item?: Option | null) => {
        onChange?.(item?.value);
      },
      [onChange],
    );

    const {
      isOpen,
      highlightedIndex,
      getInputProps,
      getMenuProps,
      getItemProps,
      getLabelProps,
      reset,
    } = useCombobox({
      id,
      items: filteredItems,
      itemToString: (item) => (item ? item.label : ''),
      selectedItem,
      inputValue,

      onInputValueChange: ({ inputValue, type }) => {
        if (type === useCombobox.stateChangeTypes.InputChange) {
          setIsTyping(true);
          setInputValue(inputValue ?? '');
        }
      },

      onSelectedItemChange: ({ selectedItem }) => {
        handleChange(selectedItem);

        // ✅ stop filtering after selection
        setIsTyping(false);
        setInputValue(selectedItem?.label ?? '');
      },
    });

    const inputProps = getInputProps({
      placeholder,
      disabled,
      onBlur: () => onBlur?.(),
    }) as ReturnType<typeof getInputProps> & {
      ref?: React.Ref<HTMLInputElement>;
    };

    return (
      <div
        className={`flex flex-col ${responsive ? 'w-full md:w-1/2' : 'w-full'} gap-1.5 ${className}`}
      >
        {label && (
          <label {...getLabelProps()} className="text-sm font-semibold text-text">
            {label}
            {required && <span className="ml-1 text-danger">*</span>}
          </label>
        )}

        <div className="relative">
          <div
            className={`
              w-full flex items-center border rounded-md shadow-sm
              bg-surface text-text
              ${error ? 'border-danger' : 'border-surfaceSoft'}
              ${!disabled && 'hover:border-primary/50'}
              ${disabled && 'bg-surfaceSoft cursor-not-allowed'}
              ${sizeClasses[size]}
            `}
          >
            <input
              {...inputProps}
              ref={mergeRefs(inputProps.ref, ref)}
              className="w-full bg-transparent outline-transparent text-left"
            />

            {clearable && selectedItem && !disabled && (
              <button
                type="button"
                onClick={() => {
                  handleChange(undefined);
                  setInputValue('');
                  setIsTyping(false);
                  reset();
                }}
                className="px-2 text-textMuted hover:text-text"
              >
                ✕
              </button>
            )}

            <svg
              className={`w-4 h-4 mr-2 transition-transform ${isOpen ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>

          <ul
            {...getMenuProps()}
            className={`
              absolute z-[100] w-full mt-1 max-h-64 overflow-auto
              border rounded-md shadow-xl bg-surface
              ${!isOpen ? 'hidden' : ''}
            `}
          >
            {isOpen && (
              <>
                {filteredItems.length === 0 && (
                  <li className="px-3 py-3 text-sm text-textMuted">No results</li>
                )}

                {filteredItems.map((item, index) => (
                  <li
                    key={`${item.value}-${index}`}
                    {...getItemProps({ item, index })}
                    className={`
                      px-3 py-2 text-sm cursor-pointer
                      ${highlightedIndex === index ? 'bg-primary text-white' : ''}
                      ${
                        selectedItem?.value === item.value
                          ? 'font-semibold bg-surfaceSoft !text-primary'
                          : ''
                      }
                    `}
                  >
                    {item.label}
                  </li>
                ))}
              </>
            )}
          </ul>
        </div>

        <input type="hidden" name={name} value={selectedItem?.value || ''} required={required} />

        {error && <p className="text-xs text-danger">{error}</p>}
      </div>
    );
  },
);

SelectInput.displayName = 'SelectInput';

export default React.memo(SelectInput);
