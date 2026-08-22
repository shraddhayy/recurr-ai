"use client";
import * as ToastPrimitive from "@radix-ui/react-toast";
import { cva, type VariantProps } from "class-variance-authority";
import { CheckCircle2, AlertTriangle, XCircle, Info, X } from "lucide-react";
import { cn } from "@/lib/utils";

const ToastProvider = ToastPrimitive.Provider;

function ToastViewport({ className, ...props }: React.ComponentProps<typeof ToastPrimitive.Viewport>) {
  return (
    <ToastPrimitive.Viewport
      className={cn(
        "fixed bottom-0 right-0 z-[100] flex w-full max-w-sm flex-col gap-2.5 p-4 sm:p-6 outline-none",
        className
      )}
      {...props}
    />
  );
}

const toastVariants = cva(
  "group relative flex w-full items-start gap-3 overflow-hidden rounded-lg border p-4 shadow-lg data-[state=open]:animate-scale-in data-[swipe=end]:animate-none",
  {
    variants: {
      variant: {
        success: "bg-surface-card border-success-50",
        error: "bg-surface-card border-error-50",
        warning: "bg-surface-card border-warning-50",
        info: "bg-surface-card border-info-50",
      },
    },
    defaultVariants: { variant: "info" },
  }
);

const iconMap = {
  success: CheckCircle2,
  error: XCircle,
  warning: AlertTriangle,
  info: Info,
};

const iconColorMap = {
  success: "text-success",
  error: "text-error",
  warning: "text-warning",
  info: "text-secondary",
};

function Toast({
  className,
  variant = "info",
  title,
  description,
  ...props
}: React.ComponentProps<typeof ToastPrimitive.Root> &
  VariantProps<typeof toastVariants> & { title: string; description?: string }) {
  const Icon = iconMap[variant ?? "info"];
  return (
    <ToastPrimitive.Root className={cn(toastVariants({ variant }), className)} {...props}>
      <Icon className={cn("size-5 shrink-0 mt-0.5", iconColorMap[variant ?? "info"])} aria-hidden="true" />
      <div className="flex-1 min-w-0">
        <ToastPrimitive.Title className="text-[13.5px] font-semibold text-text-primary">
          {title}
        </ToastPrimitive.Title>
        {description && (
          <ToastPrimitive.Description className="mt-0.5 text-[13px] text-text-secondary">
            {description}
          </ToastPrimitive.Description>
        )}
      </div>
      <ToastPrimitive.Close className="text-text-muted hover:text-text-primary transition-colors" aria-label="Dismiss">
        <X className="size-4" />
      </ToastPrimitive.Close>
    </ToastPrimitive.Root>
  );
}

export { ToastProvider, ToastViewport, Toast };
