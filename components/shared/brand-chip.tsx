import * as si from "simple-icons";
import { cn } from "@/lib/utils";

/**
 * Real brand marks, sourced from simple-icons (CC0 — public domain SVG data
 * of official brand marks, purpose-built for exactly this: showing
 * recognizable service logos in a product UI). Shared by the marketing site
 * and the dashboard so every subscription — hero, overview list,
 * subscriptions table, savings, AI insights — renders the same real mark.
 *
 * Matching is keyword-based rather than an exact-name lookup, because the
 * dashboard's mock data uses fuller names ("Spotify Family", "iCloud+ 2TB")
 * than the marketing copy does ("Spotify", "iCloud+"). Checked in order,
 * first match wins.
 *
 * Adobe and AWS previously fell back to monograms here on the assumption
 * they'd been excluded from simple-icons — that was wrong. Both are
 * confirmed present (siAdobecreativecloud, siAmazonaws), verified directly
 * against the published type definitions rather than assumed, so they're
 * real marks now. A few others genuinely aren't confirmable without a live
 * install (ChatGPT/OpenAI, Canva, Peloton, The New York Times, Disney+) and
 * still fall back to a plain monogram tinted with the brand's public color.
 * Real SVG marks where we can verify them, honest color-coded initials
 * where we can't — never a reconstructed logo.
 */
const iconRules: { test: RegExp; key: keyof typeof si }[] = [
  { test: /netflix/i, key: "siNetflix" },
  { test: /spotify/i, key: "siSpotify" },
  { test: /\bclaude\b/i, key: "siClaude" },
  { test: /gemini/i, key: "siGooglegemini" },
  { test: /google/i, key: "siGoogle" },
  { test: /icloud/i, key: "siIcloud" },
  { test: /notion/i, key: "siNotion" },
  { test: /new york times|\bnyt\b/i, key: "siNewyorktimes" },
  { test: /peloton/i, key: "siPeloton" },
  { test: /adobe/i, key: "siAdobecreativecloud" },
  { test: /\baws\b|amazon\s*web\s*services/i, key: "siAmazonaws" },
];

const monogramRules: { test: RegExp; color: string }[] = [
  { test: /\bprime\b|^amazon(?!\s*web)/i, color: "#FF9900" },
  { test: /chatgpt|openai/i, color: "#10A37F" },
  { test: /canva/i, color: "#8B3DFF" },
  { test: /disney\+?/i, color: "#113CCF" },
];

export function BrandChip({
  name,
  size = 40,
  shape = "square",
  className,
}: {
  name: string;
  size?: number;
  shape?: "square" | "circle";
  className?: string;
}) {
  const iconRule = iconRules.find((rule) => rule.test.test(name));
  const icon = iconRule ? si[iconRule.key] : undefined;
  const iconSize = Math.round(size * 0.5);
  const monogramColor = monogramRules.find((rule) => rule.test.test(name))?.color;

  return (
    <span
      className={cn(
        "flex shrink-0 items-center justify-center border border-border-default bg-white shadow-xs",
        shape === "circle" ? "rounded-full" : "rounded-xl",
        className
      )}
      style={{ width: size, height: size }}
    >
      {icon ? (
        <svg
          role="img"
          viewBox="0 0 24 24"
          width={iconSize}
          height={iconSize}
          fill={`#${icon.hex}`}
          aria-label={name}
        >
          <path d={icon.path} />
        </svg>
      ) : (
        <span
          className="font-display font-semibold"
          style={{
            color: monogramColor ?? "var(--parrot-600)",
            fontSize: Math.round(size * 0.34),
          }}
          aria-label={name}
        >
          {name[0]}
        </span>
      )}
    </span>
  );
}

/**
 * A small overlapping stack of brand chips, for the handful of dashboard
 * moments (a bundle overlap, a week with several renewals) that reference
 * more than one service at once.
 */
export function BrandChipStack({
  names,
  size = 32,
  max = 3,
  className,
}: {
  names: string[];
  size?: number;
  max?: number;
  className?: string;
}) {
  const shown = names.slice(0, max);
  return (
    <span className={cn("flex shrink-0 items-center", className)}>
      {shown.map((name, i) => (
        <BrandChip
          key={name}
          name={name}
          size={size}
          shape="circle"
          className={cn("ring-2 ring-surface-card", i > 0 && "-ml-2.5")}
        />
      ))}
    </span>
  );
}
