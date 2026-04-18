'use client';

import React, {
  useId,
  forwardRef,
  useCallback,
  useMemo,
  useState,
  useLayoutEffect,
  useRef,
} from 'react';
import { createPortal } from 'react-dom';
import { useCombobox } from 'downshift';
import { ComponentSize } from '@/types/ui.types';
import { sizeClasses } from './styles';

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

function mergeRefs<T>(...refs: Array<React.Ref<T> | undefined>) {
  return (node: T) => {
    refs.forEach((ref) => {
      if (!ref) return;
      if (typeof ref === 'function') ref(node);
      else (ref as React.RefObject<T | null>).current = node;
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
    const containerRef = useRef<HTMLDivElement>(null);
    const [inputValue, setInputValue] = useState('');
    const [coords, setCoords] = useState({
      top: 0,
      left: 0,
      width: 0,
      isBottom: true,
    });
    const [isTyping, setIsTyping] = useState(false);

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
    } = useCombobox<Option>({
      id,
      items: filteredItems,
      itemToString: (item) => (item ? item.label : ''),
      selectedItem,
      inputValue,
      defaultHighlightedIndex: 0,
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

    useLayoutEffect(() => {
      if (!isOpen) return;

      const updatePosition = () => {
        if (!containerRef.current) return;

        const rect = containerRef.current.getBoundingClientRect();
        const spaceBelow = window.innerHeight - rect.bottom;
        const menuHeight = 256;

        const shouldShowAbove = spaceBelow < menuHeight && rect.top > menuHeight;

        setCoords({
          top: shouldShowAbove ? rect.top + window.scrollY : rect.bottom + window.scrollY,
          left: rect.left + window.scrollX,
          width: rect.width,
          isBottom: !shouldShowAbove,
        });
      };

      updatePosition();
      window.addEventListener('scroll', updatePosition);
      window.addEventListener('resize', updatePosition);

      return () => {
        window.removeEventListener('scroll', updatePosition);
        window.removeEventListener('resize', updatePosition);
      };
    }, [isOpen]);

    const inputProps = getInputProps({
      placeholder,
      disabled,
      onBlur: () => onBlur?.(),
    }) as ReturnType<typeof getInputProps> & {
      ref?: React.Ref<HTMLInputElement>;
    };
    const menuProps = getMenuProps({}, { suppressRefError: true });

    return (
      <div
        ref={containerRef}
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
              aria-invalid={!!error}
              aria-required={required}
              aria-describedby={error ? `${id}-error` : undefined}
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
        </div>

        {isOpen &&
          typeof document !== 'undefined' &&
          createPortal(
            <ul
              {...menuProps}
              className="fixed z-50 bg-surface border rounded-md shadow-lg overflow-auto"
              style={{
                top: coords.isBottom ? coords.top : 'auto',
                bottom: !coords.isBottom ? window.innerHeight - coords.top + 5 : 'auto',
                left: coords.left,
                width: coords.width,
                maxHeight: 256,
              }}
            >
              {filteredItems.length === 0 && (
                <li className="px-3 py-2 text-sm text-textMuted">No results</li>
              )}

              {filteredItems.map((item, index) => (
                <li
                  key={item.value}
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
            </ul>,
            document.body,
          )}

        <input type="hidden" name={name} value={selectedItem?.value ?? ''} required={required} />

        {error && (
          <p id={`${id}-error`} className="text-xs text-danger">
            {error}
          </p>
        )}
      </div>
    );
  },
);

SelectInput.displayName = 'SelectInput';

export default React.memo(SelectInput);
