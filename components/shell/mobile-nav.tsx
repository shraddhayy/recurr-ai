"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";
import { useShellStore } from "@/lib/store/shell-store";
import { primaryNav, secondaryNav } from "@/components/shell/nav-config";
import { RecurrLogo } from "@/components/shell/logo";

export function MobileNav() {
  const { mobileNavOpen, setMobileNavOpen } = useShellStore();
  const pathname = usePathname();

  return (
    <DialogPrimitive.Root open={mobileNavOpen} onOpenChange={setMobileNavOpen}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-neutral-950/50 backdrop-blur-[2px] data-[state=open]:animate-fade-in lg:hidden" />
        <DialogPrimitive.Content
          className={cn(
            "fixed inset-y-0 left-0 z-50 flex w-[80vw] max-w-72 flex-col bg-neutral-950 outline-none lg:hidden",
            "data-[state=open]:animate-[slide-in_0.22s_cubic-bezier(0.16,1,0.3,1)]"
          )}
        >
          <DialogPrimitive.Title className="sr-only">Navigation</DialogPrimitive.Title>
          <div className="flex h-16 items-center justify-between px-4">
            <RecurrLogo theme="dark" />
            <DialogPrimitive.Close
              className="flex size-8 items-center justify-center rounded-md text-neutral-400 hover:bg-white/[0.06] hover:text-white"
              aria-label="Close navigation"
            >
              <X className="size-4" />
            </DialogPrimitive.Close>
          </div>

          <nav className="flex flex-1 flex-col gap-0.5 overflow-y-auto px-3 py-2">
            {primaryNav.map((item) => {
              const active = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileNavOpen(false)}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-2.5 py-2.5 text-[14px] font-medium transition-colors",
                    active ? "bg-primary-50 text-primary-900" : "text-neutral-300 hover:bg-white/[0.06] hover:text-white"
                  )}
                >
                  <item.icon className="size-[18px]" strokeWidth={1.75} />
                  {item.label}
                </Link>
              );
            })}
            <div className="my-3 h-px bg-white/[0.08]" />
            {secondaryNav.map((item) => {
              const active = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileNavOpen(false)}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-2.5 py-2.5 text-[14px] font-medium transition-colors",
                    active ? "bg-primary-50 text-primary-900" : "text-neutral-300 hover:bg-white/[0.06] hover:text-white"
                  )}
                >
                  <item.icon className="size-[18px]" strokeWidth={1.75} />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
