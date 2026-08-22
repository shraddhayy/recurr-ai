import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ShellState {
  /** Desktop rail: expanded vs icon-only. */
  collapsed: boolean;
  toggleCollapsed: () => void;
  /** Mobile off-canvas nav. */
  mobileNavOpen: boolean;
  setMobileNavOpen: (open: boolean) => void;
}

export const useShellStore = create<ShellState>()(
  persist(
    (set, get) => ({
      collapsed: false,
      toggleCollapsed: () => set({ collapsed: !get().collapsed }),
      mobileNavOpen: false,
      setMobileNavOpen: (open) => set({ mobileNavOpen: open }),
    }),
    {
      name: "recurr-shell",
      partialize: (state) => ({ collapsed: state.collapsed }),
    }
  )
);
