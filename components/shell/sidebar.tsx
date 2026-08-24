"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";
import { useShellStore } from "@/lib/store/shell-store";
import { primaryNav, secondaryNav } from "@/components/shell/nav-config";
import { RecurrLogo } from "@/components/shell/logo";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";

function NavLink({
  href,
  label,
  icon: Icon,
  collapsed,
  active,
}: {
  href: string;
  label: string;
  icon: React.ElementType;
  collapsed: boolean;
  active: boolean;
}) {
  const link = (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={cn(
        "group relative flex items-center gap-3 rounded-md px-2.5 py-2 text-[13.5px] font-medium transition-colors",
        active
          ? "bg-primary-50 text-primary-900"
          : "text-neutral-300 hover:bg-white/[0.06] hover:text-white",
        collapsed && "justify-center px-0"
      )}
    >
      {active && (
        <span className="absolute left-0 top-1/2 h-[18px] w-[3px] -translate-y-1/2 rounded-full bg-primary-500" />
      )}
      <Icon className="size-[18px] shrink-0" strokeWidth={1.75} aria-hidden="true" />
      {!collapsed && <span className="truncate">{label}</span>}
    </Link>
  );

  if (!collapsed) return link;

  return (
    <Tooltip delayDuration={200}>
      <TooltipTrigger asChild>{link}</TooltipTrigger>
      <TooltipContent side="right">{label}</TooltipContent>
    </Tooltip>
  );
}

export function Sidebar() {
  const pathname = usePathname();
  const { collapsed, toggleCollapsed } = useShellStore();

  return (
    <TooltipProvider>
      <motion.aside
        initial={false}
        animate={{ width: collapsed ? 76 : 248 }}
        transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
        className="sticky top-0 hidden h-screen shrink-0 flex-col bg-neutral-950 lg:flex"
      >
        <div className={cn("flex h-16 items-center px-4", collapsed && "justify-center px-0")}>
          <RecurrLogo collapsed={collapsed} theme="dark" />
        </div>

        <nav className="flex flex-1 flex-col gap-0.5 overflow-y-auto px-3 py-2">
          {primaryNav.map((item) => (
            <NavLink
              key={item.href}
              {...item}
              collapsed={collapsed}
              active={pathname.startsWith(item.href)}
            />
          ))}

          <div className="my-3 h-px bg-white/[0.08]" />

          {secondaryNav.map((item) => (
            <NavLink
              key={item.href}
              {...item}
              collapsed={collapsed}
              active={pathname.startsWith(item.href)}
            />
          ))}
        </nav>

        {!collapsed && (
          <div className="mx-3 mb-3 rounded-lg border border-white/[0.08] bg-white/[0.03] p-3.5">
            <Badge variant="insight" className="mb-2">
              AI Insight
            </Badge>
            <p className="text-[12.5px] leading-relaxed text-neutral-300">
              You could save an estimated <span className="font-numeric text-white">$34</span> this
              month by reviewing 3 overlapping plans.
            </p>
          </div>
        )}

        <div className="flex items-center justify-between border-t border-white/[0.08] px-3 py-3">
          {!collapsed && (
            <span className="px-1 text-[11.5px] text-neutral-500">Recurr AI · v1.0</span>
          )}
          <button
            onClick={toggleCollapsed}
            className={cn(
              "flex size-8 items-center justify-center rounded-md text-neutral-400 transition-colors hover:bg-white/[0.06] hover:text-white",
              collapsed && "mx-auto"
            )}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? (
              <PanelLeftOpen className="size-4" strokeWidth={1.75} />
            ) : (
              <PanelLeftClose className="size-4" strokeWidth={1.75} />
            )}
          </button>
        </div>
      </motion.aside>
    </TooltipProvider>
  );
}
