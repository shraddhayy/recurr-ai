"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Search, CornerDownLeft } from "lucide-react";

import { cn } from "@/lib/utils";
import { primaryNav, secondaryNav } from "@/components/shell/nav-config";

const allItems = [...primaryNav, ...secondaryNav];

export function CommandSearch({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const results = query
    ? allItems.filter((item) => item.label.toLowerCase().includes(query.toLowerCase()))
    : allItems;

  function go(href: string) {
    router.push(href);
    onOpenChange(false);
    setQuery("");
  }

  return (
    <DialogPrimitive.Root
      open={open}
      onOpenChange={(o) => {
        onOpenChange(o);
        if (!o) setQuery("");
      }}
    >
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-neutral-950/40 backdrop-blur-[2px] data-[state=open]:animate-fade-in" />
        <DialogPrimitive.Content
          className={cn(
            "fixed left-1/2 top-[18%] z-50 w-[calc(100%-2rem)] max-w-lg -translate-x-1/2",
            "overflow-hidden rounded-xl border border-border-default bg-surface-card shadow-lg",
            "data-[state=open]:animate-scale-in"
          )}
        >
          <DialogPrimitive.Title className="sr-only">Search Recurr AI</DialogPrimitive.Title>
          <div className="flex items-center gap-2.5 border-b border-divider px-4">
            <Search className="size-4 shrink-0 text-text-muted" />
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search subscriptions, insights, pages…"
              className="h-12 w-full bg-transparent text-[14px] text-text-primary placeholder:text-text-muted focus:outline-none"
            />
            <kbd className="rounded border border-border-default px-1.5 py-0.5 text-[10.5px] text-text-muted">
              Esc
            </kbd>
          </div>

          <div className="max-h-72 overflow-y-auto p-2">
            {results.length === 0 && (
              <p className="px-3 py-6 text-center text-[13px] text-text-muted">
                No results for “{query}”
              </p>
            )}
            <p className="px-3 pb-1 pt-2 text-[11px] font-semibold uppercase tracking-wide text-text-muted">
              Pages
            </p>
            {results.map((item) => (
              <button
                key={item.href}
                onClick={() => go(item.href)}
                className="flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-left text-[13.5px] text-text-primary transition-colors hover:bg-surface-muted"
              >
                <item.icon className="size-[17px] text-text-secondary" strokeWidth={1.75} />
                <span className="flex-1">
                  <span className="block font-medium">{item.label}</span>
                  <span className="block text-[12px] text-text-muted">{item.description}</span>
                </span>
                <CornerDownLeft className="size-3.5 text-text-muted opacity-0 group-hover:opacity-100" />
              </button>
            ))}
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
