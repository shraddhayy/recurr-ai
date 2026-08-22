import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, startIcon, endIcon, ...props }, ref) => {
    if (startIcon || endIcon) {
      return (
        <div className="relative flex items-center">
          {startIcon && (
            <span className="pointer-events-none absolute left-3 flex text-text-muted [&>svg]:size-4">
              {startIcon}
            </span>
          )}
          <input
            type={type}
            className={cn(
              "flex h-10 w-full rounded-md border bg-surface-card px-3 text-[13.5px] text-text-primary",
              "placeholder:text-text-muted transition-shadow duration-150",
              "border-border-default focus-visible:border-primary",
              "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-surface-muted",
              startIcon && "pl-9",
              endIcon && "pr-9",
              error && "border-error focus-visible:shadow-[0_0_0_3px_var(--error-50)]",
              className
            )}
            ref={ref}
            aria-invalid={error || undefined}
            {...props}
          />
          {endIcon && (
            <span className="pointer-events-none absolute right-3 flex text-text-muted [&>svg]:size-4">
              {endIcon}
            </span>
          )}
        </div>
      );
    }

    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border bg-surface-card px-3 text-[13.5px] text-text-primary",
          "placeholder:text-text-muted transition-shadow duration-150",
          "border-border-default focus-visible:border-primary",
          "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-surface-muted",
          error && "border-error focus-visible:shadow-[0_0_0_3px_var(--error-50)]",
          className
        )}
        ref={ref}
        aria-invalid={error || undefined}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };

export function FormField({
  label,
  htmlFor,
  helperText,
  errorText,
  required,
  children,
}: {
  label?: string;
  htmlFor?: string;
  helperText?: string;
  errorText?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={htmlFor} className="text-[13px] font-medium text-text-primary">
          {label}
          {required && <span className="ml-0.5 text-error">*</span>}
        </label>
      )}
      {children}
      {errorText ? (
        <p className="text-xs text-error" role="alert">
          {errorText}
        </p>
      ) : helperText ? (
        <p className="text-xs text-text-muted">{helperText}</p>
      ) : null}
    </div>
  );
}
