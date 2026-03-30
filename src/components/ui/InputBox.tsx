import { forwardRef, InputHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { ControlRadius, ControlSize, InputTone, InputVariant } from "@/types";
import FieldShell from "./FieldShell";
import { controlRadiusClasses, controlSizeClasses } from "./styles";

const inputVariantClasses: Record<InputVariant, string> = {
  default: "border border-surfaceSoft bg-surface",
  filled: "border border-transparent bg-base",
};

const inputToneClasses: Record<InputTone, string> = {
  default:
    "text-text placeholder:text-textMuted focus-within:border-primary/55 focus-within:ring-primary/10",
  danger:
    "border-danger/40 text-text placeholder:text-textMuted focus-within:border-danger/55 focus-within:ring-danger/10",
  success:
    "border-[color:rgba(34,197,94,0.24)] text-text placeholder:text-textMuted focus-within:border-[color:rgba(22,163,74,0.5)] focus-within:ring-[color:rgba(22,163,74,0.08)]",
};

export type InputBoxProps = Omit<InputHTMLAttributes<HTMLInputElement>, "size"> & {
  label?: ReactNode;
  description?: ReactNode;
  error?: ReactNode;
  size?: ControlSize;
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
    size = "md",
    radius = "lg",
    variant = "default",
    tone = error ? "danger" : "default",
    leftSlot,
    rightSlot,
    rootClassName,
    disabled,
    "aria-describedby": ariaDescribedBy,
    ...props
  },
  ref,
) {
  const descriptionId = description && id ? `${id}-description` : undefined;
  const errorId = error && id ? `${id}-error` : undefined;
  const describedBy =
    [ariaDescribedBy, errorId ?? descriptionId].filter(Boolean).join(" ") || undefined;

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
      <div
        className={cn(
          "flex w-full items-center gap-3 overflow-hidden transition duration-200 focus-within:ring-2 focus-within:ring-offset-0 disabled:opacity-60",
          controlSizeClasses[size],
          controlRadiusClasses[radius],
          inputVariantClasses[variant],
          inputToneClasses[tone],
          disabled && "cursor-not-allowed bg-surfaceSoft/60",
          rootClassName,
        )}
      >
        {leftSlot ? (
          <div className="flex shrink-0 items-center text-textLight">{leftSlot}</div>
        ) : null}
        <input
          ref={ref}
          id={id}
          required={required}
          disabled={disabled}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy}
          className={cn(
            "w-full min-w-0 border-0 bg-transparent p-0 outline-none disabled:cursor-not-allowed",
            inputClassName,
          )}
          {...props}
        />
        {rightSlot ? (
          <div className="flex shrink-0 items-center text-textLight">{rightSlot}</div>
        ) : null}
      </div>
    </FieldShell>
  );
});

export default InputBox;
