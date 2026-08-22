export interface Subscription {
  id: string;
  name: string;
  category: string;
  amount: number;
  cycle: "Monthly" | "Yearly";
  nextRenewal: string;
  status: "active" | "expiring" | "renewing";
  logoInitial: string;
}

export const subscriptions: Subscription[] = [
  { id: "1", name: "Netflix", category: "Entertainment", amount: 15.49, cycle: "Monthly", nextRenewal: "Aug 24", status: "renewing", logoInitial: "N" },
  { id: "2", name: "Spotify Family", category: "Entertainment", amount: 16.99, cycle: "Monthly", nextRenewal: "Sep 02", status: "active", logoInitial: "S" },
  { id: "3", name: "Adobe Creative Cloud", category: "Productivity", amount: 54.99, cycle: "Monthly", nextRenewal: "Aug 29", status: "expiring", logoInitial: "A" },
  { id: "4", name: "Notion Plus", category: "Productivity", amount: 96.00, cycle: "Yearly", nextRenewal: "Jan 14", status: "active", logoInitial: "N" },
  { id: "5", name: "AWS", category: "Cloud & Dev", amount: 128.40, cycle: "Monthly", nextRenewal: "Sep 01", status: "active", logoInitial: "A" },
  { id: "6", name: "New York Times", category: "News", amount: 25.00, cycle: "Monthly", nextRenewal: "Aug 27", status: "renewing", logoInitial: "T" },
  { id: "7", name: "Peloton App", category: "Health & Fitness", amount: 12.99, cycle: "Monthly", nextRenewal: "Sep 05", status: "active", logoInitial: "P" },
  { id: "8", name: "iCloud+ 2TB", category: "Cloud & Dev", amount: 9.99, cycle: "Monthly", nextRenewal: "Aug 30", status: "active", logoInitial: "I" },
];

export const monthlySpendTrend = [
  { month: "Mar", spend: 312 },
  { month: "Apr", spend: 328 },
  { month: "May", spend: 341 },
  { month: "Jun", spend: 356 },
  { month: "Jul", spend: 349 },
  { month: "Aug", spend: 372 },
];

export const categoryBreakdown = [
  { category: "Cloud & Dev", amount: 138.39, color: "var(--parrot-600)" },
  { category: "Entertainment", amount: 32.48, color: "var(--blue-500)" },
  { category: "Productivity", amount: 62.24, color: "var(--parrot-400)" },
  { category: "Health & Fitness", amount: 12.99, color: "var(--blue-300)" },
  { category: "News", amount: 25.00, color: "var(--neutral-400)" },
];

export interface SavingsOpportunity {
  id: string;
  title: string;
  description: string;
  monthlySavings: number;
  effort: "Low effort" | "Medium effort";
  badge: "Recommended" | "Duplicate" | "Underused";
}

export const savingsOpportunities: SavingsOpportunity[] = [
  {
    id: "1",
    title: "Switch Adobe CC to the annual plan",
    description: "You're on the monthly plan. Annual billing for the same tier saves 16% over a year.",
    monthlySavings: 9.2,
    effort: "Low effort",
    badge: "Recommended",
  },
  {
    id: "2",
    title: "Netflix and Disney+ Bundle overlap",
    description: "Your Netflix and Disney+ plans both include ad-free HD — a bundle plan covers both for less.",
    monthlySavings: 6.5,
    effort: "Medium effort",
    badge: "Duplicate",
  },
  {
    id: "3",
    title: "Peloton App — used twice in 60 days",
    description: "Usage has dropped sharply since June. Pausing for a season could avoid 2 months of billing.",
    monthlySavings: 12.99,
    effort: "Low effort",
    badge: "Underused",
  },
];

export interface AiInsight {
  id: string;
  title: string;
  body: string;
  timestamp: string;
  kind: "savings" | "renewal" | "trend" | "alert";
}

export const aiInsights: AiInsight[] = [
  {
    id: "1",
    title: "Your subscription spend grew 6.6% this month",
    body: "Mostly driven by AWS usage-based charges. Consider setting a monthly budget alert for Cloud & Dev.",
    timestamp: "2 hours ago",
    kind: "trend",
  },
  {
    id: "2",
    title: "3 renewals land in the same week",
    body: "Netflix, NYT, and Adobe CC all renew between Aug 24–29, totalling $95.48. Flagging so it doesn't surprise you.",
    timestamp: "Yesterday",
    kind: "renewal",
  },
  {
    id: "3",
    title: "Found a lower-cost equivalent for Notion Plus",
    body: "Based on your usage pattern, the standard tier covers everything you use. Downgrading saves $46/year.",
    timestamp: "2 days ago",
    kind: "savings",
  },
  {
    id: "4",
    title: "Unusual charge detected on AWS",
    body: "This month's AWS charge is 34% above your 3-month average. Worth a quick review of active services.",
    timestamp: "3 days ago",
    kind: "alert",
  },
];
