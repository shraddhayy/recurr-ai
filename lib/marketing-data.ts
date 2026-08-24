export interface MarketingService {
  name: string;
  initial: string;
  monthly: number;
  category: string;
}

/** The 9 services shown as logo chips in the hero + product showcase. */
export const heroServices: MarketingService[] = [
  { name: "Netflix", initial: "N", monthly: 549, category: "Entertainment" },
  { name: "Spotify", initial: "S", monthly: 119, category: "Entertainment" },
  { name: "Prime", initial: "P", monthly: 179, category: "Entertainment" },
  { name: "ChatGPT", initial: "C", monthly: 399, category: "AI" },
  { name: "Claude", initial: "C", monthly: 399, category: "AI" },
  { name: "Canva", initial: "C", monthly: 299, category: "Design" },
  { name: "Adobe", initial: "A", monthly: 799, category: "Design" },
  { name: "Google One", initial: "G", monthly: 130, category: "Storage" },
  { name: "iCloud+", initial: "I", monthly: 75, category: "Storage" },
];

export const otherSubscriptionsCount = 3;
export const otherSubscriptionsMonthly = 1672; // remainder to reach totalMonthly

export const totalSubscriptions = heroServices.length + otherSubscriptionsCount; // 12
export const totalMonthly =
  heroServices.reduce((sum, s) => sum + s.monthly, 0) + otherSubscriptionsMonthly; // 4620
export const totalAnnual = totalMonthly * 12; // 55,440
export const potentialSavingsAnnual = 16800;

export interface SavingsBreakdownItem {
  label: string;
  amount: number;
  description: string;
}

export const savingsBreakdown: SavingsBreakdownItem[] = [
  {
    label: "Unused subscription",
    amount: 4999,
    description: "Adobe Creative Cloud — no activity in 60 days",
  },
  {
    label: "Duplicate service",
    amount: 3600,
    description: "Two overlapping cloud storage plans",
  },
  {
    label: "Annual plan optimization",
    amount: 2400,
    description: "Switching 3 monthly plans to annual billing",
  },
  {
    label: "Alternative found",
    amount: 5801,
    description: "A lower-cost plan covering the same usage",
  },
];

export interface RenewalItem {
  when: string;
  service: string;
  amount: number;
}

export const upcomingRenewals: RenewalItem[] = [
  { when: "Today", service: "Spotify", amount: 119 },
  { when: "3 days", service: "Netflix", amount: 549 },
  { when: "8 days", service: "Canva", amount: 299 },
  { when: "14 days", service: "Adobe", amount: 799 },
];

export const duplicateGroup = {
  category: "AI Assistants",
  services: ["ChatGPT", "Claude", "Gemini"],
  message: "You may be paying for multiple tools serving a similar purpose.",
};

export const aiConversation = {
  question: "Where am I overspending?",
  answer:
    "You have 3 overlapping productivity subscriptions. Based on your usage pattern, you may be able to save approximately ₹8,400/year.",
  followUp: "Show me.",
  recommendation: [
    "Canva Pro and Adobe Express serve the same purpose — keep one.",
    "Google One and iCloud+ both back up the same photo library.",
    "Consolidating saves an estimated ₹8,400/year.",
  ],
};

export const howItWorksSteps = [
  {
    number: "01",
    title: "Connect",
    description: "Bring your subscriptions together in one place — no more digging through bank statements.",
  },
  {
    number: "02",
    title: "Understand",
    description: "Recurr AI organizes your recurring spending by category, cost, and billing cycle.",
  },
  {
    number: "03",
    title: "Detect",
    description: "Renewals, duplicates, and unusual charges surface automatically — before they hit your account.",
  },
  {
    number: "04",
    title: "Optimize",
    description: "See exactly where you could save, with a clear reason behind every recommendation.",
  },
];

export const trustPrinciples = [
  {
    title: "Privacy-first design",
    description: "Recurr AI is built to analyze your subscriptions without needing more access than that.",
  },
  {
    title: "Transparent insights",
    description: "Every recommendation shows its reasoning — no black-box numbers you have to just trust.",
  },
  {
    title: "You control your data",
    description: "Your subscription data belongs to you. Export it or remove it whenever you choose.",
  },
  {
    title: "Secure by architecture",
    description: "Built on infrastructure designed for financial-grade data handling from day one.",
  },
];
