import { ButtonHTMLAttributes, forwardRef } from 'react';
import Icon from '@/components/Icon';
import { cn } from '@/lib/cn';
import { ButtonIconConfig, ButtonTone, ButtonVariant, ControlRadius, ControlSize } from '@/types';
import { controlRadiusClasses, controlSizeClasses } from './styles';

const buttonVariantClasses: Record<ButtonVariant, Record<ButtonTone, string>> = {
  solid: {
    primary: 'bg-primary text-surface hover:bg-primaryDark focus-visible:ring-primary/12',
    neutral: 'bg-text text-surface hover:bg-[#111827] focus-visible:ring-text/10',
    danger: 'bg-danger text-surface hover:bg-[#dc2626] focus-visible:ring-danger/12',
  },
  outline: {
    primary:
      'border border-primary/20 bg-surface text-primary hover:border-primary/35 hover:bg-primary/5 focus-visible:ring-primary/10',
    neutral:
      'border border-surfaceSoft bg-surface text-text hover:border-text/15 hover:bg-base focus-visible:ring-text/8',
    danger:
      'border border-danger/20 bg-surface text-danger hover:border-danger/35 hover:bg-danger/5 focus-visible:ring-danger/10',
  },
  ghost: {
    primary: 'bg-transparent text-primary hover:bg-primary/8 focus-visible:ring-primary/10',
    neutral: 'bg-transparent text-text hover:bg-base focus-visible:ring-text/8',
    danger: 'bg-transparent text-danger hover:bg-danger/6 focus-visible:ring-danger/10',
  },
  soft: {
    primary: 'bg-primary/10 text-primary hover:bg-primary/15 focus-visible:ring-primary/10',
    neutral: 'bg-base text-text hover:bg-surfaceSoft focus-visible:ring-text/8',
    danger: 'bg-danger/10 text-danger hover:bg-danger/15 focus-visible:ring-danger/10',
  },
};

export type ButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'color'> & {
  label?: string;
  size?: ControlSize;
  variant?: ButtonVariant;
  tone?: ButtonTone;
  radius?: ControlRadius;
  fullWidth?: boolean;
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
    size = 'md',
    variant = 'solid',
    tone = 'primary',
    radius = 'lg',
    fullWidth = false,
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
        'inline-flex shrink-0 items-center justify-center gap-2.5 font-semibold transition duration-200 outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-offset-transparent disabled:pointer-events-none disabled:opacity-55',
        controlSizeClasses[size],
        controlRadiusClasses[radius],
        buttonVariantClasses[variant][tone],
        fullWidth && 'w-full',
        className,
      )}
      {...props}
    >
      {isLoading ? (
        <span
          aria-hidden="true"
          className="h-4 w-4 animate-spin rounded-full border-2 border-current border-r-transparent"
        />
      ) : null}
      {!isLoading && leadingIcon ? (
        <Icon name={leadingIcon.name} size={leadingIcon.size ?? 'small'} />
      ) : null}
      <span>{label ?? children}</span>
      {!isLoading && trailingIcon ? (
        <Icon name={trailingIcon.name} size={trailingIcon.size ?? 'small'} />
      ) : null}
    </button>
  );
});

export default Button;
