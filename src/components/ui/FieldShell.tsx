import { ReactNode } from 'react';
import { cn } from '@/lib/cn';

type FieldShellProps = {
  label?: ReactNode;
  labelFor?: string;
  description?: ReactNode;
  error?: ReactNode;
  descriptionId?: string;
  errorId?: string;
  required?: boolean;
  children: ReactNode;
  className?: string;
};

export default function FieldShell({
  label,
  labelFor,
  description,
  error,
  descriptionId,
  errorId,
  required,
  children,
  className,
}: FieldShellProps) {
  return (
    <div className={cn('space-y-1.5', className)}>
      {label ? (
        <label
          htmlFor={labelFor}
          className="inline-flex items-center gap-1 text-sm font-medium text-text lg:text-[15px]"
        >
          <span>{label}</span>
          {required ? <span className="text-danger">*</span> : null}
        </label>
      ) : null}

      {children}

      {error ? (
        <p id={errorId} className="text-sm text-danger" role="alert">
          {error}
        </p>
      ) : description ? (
        <p id={descriptionId} className="text-sm text-textLight">
          {description}
        </p>
      ) : null}
    </div>
  );
}
