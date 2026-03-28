import { forwardRef, InputHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

export type CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "type"> & {
  label?: ReactNode;
  description?: ReactNode;
  containerClassName?: string;
};

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  { id, label, description, className, containerClassName, disabled, ...props },
  ref,
) {
  return (
    <label
      htmlFor={id}
      className={cn(
        "flex w-full items-start gap-3 rounded-2xl border border-surfaceSoft bg-base px-4 py-3 transition duration-200",
        !disabled && "cursor-pointer hover:border-primary/20",
        disabled && "cursor-not-allowed opacity-65",
        containerClassName,
      )}
    >
      <span className="relative mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center">
        <input
          ref={ref}
          id={id}
          type="checkbox"
          disabled={disabled}
          className={cn(
            "peer h-5 w-5 appearance-none rounded-md border border-surfaceSoft bg-surface outline-none transition duration-200 checked:border-primary checked:bg-primary focus-visible:ring-2 focus-visible:ring-primary/10 focus-visible:ring-offset-1 focus-visible:ring-offset-transparent disabled:cursor-not-allowed",
            className,
          )}
          {...props}
        />
        <span className="pointer-events-none absolute text-xs font-semibold text-surface opacity-0 transition peer-checked:opacity-100">
          ✓
        </span>
      </span>

      {(label || description) && (
        <span className="min-w-0">
          {label ? <span className="block text-sm font-medium text-text">{label}</span> : null}
          {description ? (
            <span className="mt-0.5 block text-sm text-textLight">{description}</span>
          ) : null}
        </span>
      )}
    </label>
  );
});

export default Checkbox;
