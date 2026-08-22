import {
  Gauge,
  Repeat2,
  BarChart3,
  PiggyBank,
  Sparkles,
  Settings,
  type LucideIcon,
} from "lucide-react";

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  description: string;
}

export const primaryNav: NavItem[] = [
  {
    label: "Overview",
    href: "/overview",
    icon: Gauge,
    description: "Your subscription snapshot",
  },
  {
    label: "Subscriptions",
    href: "/subscriptions",
    icon: Repeat2,
    description: "Every recurring charge, in one place",
  },
  {
    label: "Analytics",
    href: "/analytics",
    icon: BarChart3,
    description: "Spending trends over time",
  },
  {
    label: "Savings",
    href: "/savings",
    icon: PiggyBank,
    description: "Opportunities to cut costs",
  },
  {
    label: "AI Insights",
    href: "/ai-insights",
    icon: Sparkles,
    description: "Recommendations from Recurr AI",
  },
];

export const secondaryNav: NavItem[] = [
  {
    label: "Settings",
    href: "/settings",
    icon: Settings,
    description: "Account and preferences",
  },
];

export const allNav = [...primaryNav, ...secondaryNav];
