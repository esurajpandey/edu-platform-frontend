'use client';

import { ButtonHTMLAttributes, forwardRef } from 'react';
import Icon from '@/components/Icon';
import { cn } from '@/lib/cn';
import { ButtonIconConfig, ButtonTone, ButtonVariant, ControlRadius } from '@/types';
import { ComponentSize } from '@/types/ui.types';
import { controlRadiusClasses } from './styles';
import { sizeClasses } from './utils';

/* ✅ Split base + interactive styles */
const buttonBaseClasses: Record<ButtonVariant, Record<ButtonTone, string>> = {
  solid: {
    primary: 'bg-primary text-surface',
    neutral: 'bg-text text-surface',
    danger: 'bg-danger text-surface',
  },
  outline: {
    primary: 'border border-primary/20 bg-surface text-primary',
    neutral: 'border border-surfaceSoft bg-surface text-text',
    danger: 'border border-danger/20 bg-surface text-danger',
  },
  ghost: {
    primary: 'bg-transparent text-primary',
    neutral: 'bg-transparent text-text',
    danger: 'bg-transparent text-danger',
  },
  soft: {
    primary: 'bg-primary/10 text-primary',
    neutral: 'bg-base text-text',
    danger: 'bg-danger/10 text-danger',
  },
};

const buttonInteractiveClasses: Record<ButtonVariant, Record<ButtonTone, string>> = {
  solid: {
    primary: 'hover:bg-primaryDark focus-visible:ring-primary/12',
    neutral: 'hover:bg-[#111827] focus-visible:ring-text/10',
    danger: 'hover:bg-[#dc2626] focus-visible:ring-danger/12',
  },
  outline: {
    primary: 'hover:border-primary/35 hover:bg-primary/5 focus-visible:ring-primary/10',
    neutral: 'hover:border-text/15 hover:bg-base focus-visible:ring-text/8',
    danger: 'hover:border-danger/35 hover:bg-danger/5 focus-visible:ring-danger/10',
  },
  ghost: {
    primary: 'hover:bg-primary/8 focus-visible:ring-primary/10',
    neutral: 'hover:bg-base focus-visible:ring-text/8',
    danger: 'hover:bg-danger/6 focus-visible:ring-danger/10',
  },
  soft: {
    primary: 'hover:bg-primary/15 focus-visible:ring-primary/10',
    neutral: 'hover:bg-surfaceSoft focus-visible:ring-text/8',
    danger: 'hover:bg-danger/15 focus-visible:ring-danger/10',
  },
};

export type ButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'color'> & {
  label?: string;
  size?: ComponentSize;
  variant?: ButtonVariant;
  tone?: ButtonTone;
  radius?: ControlRadius;
  reaponsive?: boolean;
  leadingIcon?: ButtonIconConfig;
  trailingIcon?: ButtonIconConfig;
  isLoading?: boolean;
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    type = 'button',
    label,
    children,
    className,
    size = 'medium',
    variant = 'solid',
    tone = 'primary',
    radius = 'md',
    reaponsive = false,
    leadingIcon,
    trailingIcon,
    isLoading = false,
    disabled,
    ...props
  },
  ref,
) {
  const isDisabled = disabled || isLoading;

  return (
    <button
      ref={ref}
      type={type}
      disabled={isDisabled}
      className={cn(
        'inline-flex shrink-0 items-center justify-center gap-2.5 font-semibold transition duration-200 outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-offset-transparent',
        sizeClasses[size],
        controlRadiusClasses[radius],

        /* ✅ Base styles ALWAYS applied */
        buttonBaseClasses[variant][tone],

        /* ✅ Interactive ONLY when enabled */
        !isDisabled && buttonInteractiveClasses[variant][tone],

        /* ✅ Disabled state */
        isDisabled && 'cursor-not-allowed opacity-55 pointer-events-none',

        reaponsive ? 'w-full md:w-auto' : 'w-full',
        className,
      )}
      {...props}
    >
      {/* ✅ Loader */}
      {isLoading && (
        <span
          aria-hidden="true"
          className="h-4 w-4 animate-spin rounded-full border-2 border-current border-r-transparent"
        />
      )}

      {/* ✅ Leading icon */}
      {!isLoading && leadingIcon && (
        <Icon name={leadingIcon.name} size={leadingIcon.size ?? 'small'} />
      )}

      {/* ✅ Label */}
      <span>{label ?? children}</span>

      {/* ✅ Trailing icon */}
      {!isLoading && trailingIcon && (
        <Icon name={trailingIcon.name} size={trailingIcon.size ?? 'small'} />
      )}
    </button>
  );
});

export default Button;
