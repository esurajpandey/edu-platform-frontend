'use client';

import React, { forwardRef, InputHTMLAttributes, ReactNode, useId } from 'react';
import { cn } from '@/lib/cn';
import { ControlRadius, InputTone, InputVariant } from '@/types';
import FieldShell from './FieldShell';
import { controlRadiusClasses } from './styles';
import { sizeClasses } from './utils';
import { ComponentSize } from '@/types/ui.types';

const inputVariantClasses: Record<InputVariant, string> = {
  default: 'border border-surfaceSoft bg-surface',
  filled: 'border border-transparent bg-base',
};

const inputToneClasses: Record<InputTone, string> = {
  default:
    'text-text placeholder:text-textMuted focus-within:border-primary/55 focus-within:ring-primary/10',
  danger:
    'border-danger/40 text-text placeholder:text-textMuted focus-within:border-danger/55 focus-within:ring-danger/10',
  success:
    'border-[color:rgba(34,197,94,0.24)] text-text placeholder:text-textMuted focus-within:border-[color:rgba(22,163,74,0.5)] focus-within:ring-[color:rgba(22,163,74,0.08)]',
};

export type InputBoxProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> & {
  label?: ReactNode;
  description?: ReactNode;
  error?: ReactNode;
  size?: ComponentSize;
  radius?: ControlRadius;
  variant?: InputVariant;
  tone?: InputTone;
  inputClassName?: string;
  leftSlot?: ReactNode;
  rightSlot?: ReactNode;
  rootClassName?: string;
};

const InputBox = forwardRef<HTMLInputElement, InputBoxProps>(function InputBox(
  {
    id,
    label,
    description,
    error,
    required,
    className,
    inputClassName,
    size = 'medium',
    radius = 'md',
    variant = 'default',
    tone,
    leftSlot,
    rightSlot,
    rootClassName,
    disabled,
    'aria-describedby': ariaDescribedBy,
    ...props
  },
  ref,
) {
  const generatedId = useId();
  const inputId = id ?? generatedId;

  const descriptionId = description ? `${inputId}-description` : undefined;
  const errorId = error ? `${inputId}-error` : undefined;

  const describedBy =
    [ariaDescribedBy, error ? errorId : descriptionId].filter(Boolean).join(' ') || undefined;

  // ✅ Error takes priority over tone
  const resolvedTone: InputTone = error ? 'danger' : (tone ?? 'default');

  return (
    <FieldShell
      label={label}
      labelFor={inputId}
      description={description}
      error={error}
      descriptionId={descriptionId}
      errorId={errorId}
      required={required}
      className={className}
    >
      <div
        className={cn(
          'flex w-full items-center gap-3 overflow-hidden transition duration-200 focus-within:ring-2 focus-within:ring-offset-0',
          sizeClasses[size],
          controlRadiusClasses[radius],
          inputVariantClasses[variant],
          inputToneClasses[resolvedTone],
          disabled && 'cursor-not-allowed bg-surfaceSoft/60',
          rootClassName,
        )}
      >
        {leftSlot && <div className="flex shrink-0 items-center text-textLight">{leftSlot}</div>}

        <input
          ref={ref}
          id={inputId}
          required={required}
          disabled={disabled}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy}
          className={cn(
            'w-full min-w-0 border-0 bg-transparent p-0 outline-none disabled:cursor-not-allowed',
            inputClassName,
          )}
          {...props}
        />

        {rightSlot && <div className="flex shrink-0 items-center text-textLight">{rightSlot}</div>}
      </div>
    </FieldShell>
  );
});

export default React.memo(InputBox);
