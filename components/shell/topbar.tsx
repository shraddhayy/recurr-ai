"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Menu, Search, Bell, ChevronDown, LogOut, Settings as SettingsIcon, User } from "lucide-react";
import { useUser, useClerk } from "@clerk/nextjs";

import { useShellStore } from "@/lib/store/shell-store";
import { initials } from "@/lib/utils";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CommandSearch } from "@/components/shell/command-search";

export function Topbar() {
  const { setMobileNavOpen } = useShellStore();
  const [searchOpen, setSearchOpen] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);
  const { user, isLoaded } = useUser();
  const { signOut } = useClerk();

  async function handleSignOut() {
    try {
      await signOut({ redirectUrl: "/" });
    } catch (err) {
      // Visible in the browser console if sign-out fails for any reason,
      // instead of failing silently.
      console.error("Sign out failed:", err);
    }
  }
  const router = useRouter();

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const displayName =
    (user?.unsafeMetadata?.displayName as string | undefined) ||
    user?.fullName ||
    user?.username ||
    "Account";
  const email = user?.primaryEmailAddress?.emailAddress ?? "";

  return (
    <>
      <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-divider bg-surface-page/85 px-4 backdrop-blur-md sm:px-6">
        <button
          onClick={() => setMobileNavOpen(true)}
          className="flex size-9 items-center justify-center rounded-md text-text-secondary hover:bg-surface-muted lg:hidden"
          aria-label="Open navigation"
        >
          <Menu className="size-5" strokeWidth={1.75} />
        </button>

        {/* Search trigger */}
        <button
          onClick={() => setSearchOpen(true)}
          className="flex h-9 w-full max-w-xs items-center gap-2 rounded-md border border-border-default bg-surface-card px-3 text-[13px] text-text-muted transition-colors hover:border-border-strong sm:max-w-sm"
        >
          <Search className="size-4 shrink-0" strokeWidth={1.75} />
          <span className="flex-1 text-left">Search subscriptions, insights…</span>
          <kbd className="hidden shrink-0 items-center gap-0.5 rounded border border-border-default bg-surface-muted px-1.5 py-0.5 font-numeric text-[10.5px] text-text-muted sm:flex">
            ⌘K
          </kbd>
        </button>

        <div className="ml-auto flex items-center gap-1.5 sm:gap-2.5">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className="relative flex size-9 items-center justify-center rounded-md text-text-secondary transition-colors hover:bg-surface-muted"
                aria-label="Notifications"
                onClick={() => setHasUnread(false)}
              >
                <Bell className="size-[18px]" strokeWidth={1.75} />
                {hasUnread && (
                  <span className="absolute right-2 top-2 size-1.5 rounded-full bg-secondary ring-2 ring-surface-page" />
                )}
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="flex flex-col gap-0.5 px-1 py-1">
                <div className="rounded-md px-2 py-2.5 hover:bg-surface-muted">
                  <p className="text-[13px] font-medium text-text-primary">Netflix renews in 3 days</p>
                  <p className="mt-0.5 text-[12px] text-text-secondary">
                    $15.49 will be charged on Aug 24
                  </p>
                </div>
                <div className="rounded-md px-2 py-2.5 hover:bg-surface-muted">
                  <p className="text-[13px] font-medium text-text-primary">New savings opportunity</p>
                  <p className="mt-0.5 text-[12px] text-text-secondary">
                    Recurr AI found a cheaper plan for Adobe CC
                  </p>
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {!isLoaded ? (
            <Skeleton className="h-9 w-9 rounded-md sm:w-32" />
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 rounded-md py-1 pl-1 pr-1.5 transition-colors hover:bg-surface-muted sm:pr-2">
                  <Avatar className="size-8">
                    {user?.imageUrl && <AvatarImage src={user.imageUrl} alt={displayName} />}
                    <AvatarFallback>{initials(displayName)}</AvatarFallback>
                  </Avatar>
                  <span className="hidden text-[13px] font-medium text-text-primary sm:block">
                    {displayName}
                  </span>
                  <ChevronDown className="hidden size-3.5 text-text-muted sm:block" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel className="normal-case">
                  <span className="block text-[13px] font-medium text-text-primary">{displayName}</span>
                  {email && (
                    <span className="block text-[12px] font-normal text-text-muted">{email}</span>
                  )}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onSelect={() => router.push("/settings")}>
                  <User className="size-4" strokeWidth={1.75} />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => router.push("/settings")}>
                  <SettingsIcon className="size-4" strokeWidth={1.75} />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem destructive onSelect={handleSignOut}>
                  <LogOut className="size-4" strokeWidth={1.75} />
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </header>

      <CommandSearch open={searchOpen} onOpenChange={setSearchOpen} />
    </>
  );
}
