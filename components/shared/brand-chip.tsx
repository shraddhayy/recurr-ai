import * as si from "simple-icons";
import { faAws, faAmazon } from "@fortawesome/free-brands-svg-icons";
import { cn } from "@/lib/utils";

/**
 * Real brand marks. Two sources, both open-licensed and built for exactly
 * this use case:
 *
 * 1. simple-icons (CC0 — public domain) — the primary source.
 * 2. @fortawesome/free-brands-svg-icons (CC BY 4.0) — covers a couple of
 *    brands simple-icons excludes. Attribution: icons via Font Awesome
 *    Free (fontawesome.com), CC BY 4.0.
 *
 * Adobe is NOT available in either dataset — both have excluded it (along
 * with Amazon, which Font Awesome does still carry) over trademark/brand
 * guideline concerns. Rather than hand-reproduce a trademarked logo from
 * memory, Adobe stays on the monogram fallback: a plain "A" tinted with
 * Adobe's well-known public brand red. Real SVG marks where we can license
 * them cleanly, an honest color-coded initial where we can't — never a
 * reconstructed logo.
 *
 * Matching is keyword-based rather than an exact-name lookup, because the
 * dashboard's mock data uses fuller names ("Spotify Family", "iCloud+ 2TB")
 * than the marketing copy does ("Spotify", "iCloud+"). Checked in order,
 * first match wins.
 */
const simpleIconRules: { test: RegExp; key: keyof typeof si }[] = [
  { test: /netflix/i, key: "siNetflix" },
  { test: /spotify/i, key: "siSpotify" },
  { test: /\bclaude\b/i, key: "siClaude" },
  { test: /gemini/i, key: "siGooglegemini" },
  { test: /google/i, key: "siGoogle" },
  { test: /icloud/i, key: "siIcloud" },
  { test: /notion/i, key: "siNotion" },
  { test: /new york times|\bnyt\b/i, key: "siNewyorktimes" },
  { test: /peloton/i, key: "siPeloton" },
];

const fontAwesomeRules: { test: RegExp; icon: typeof faAws; color: string }[] = [
  { test: /\baws\b|amazon\s*web\s*services/i, icon: faAws, color: "#FF9900" },
  { test: /\bprime\b|\bamazon\b/i, icon: faAmazon, color: "#FF9900" },
];

const monogramRules: { test: RegExp; color: string }[] = [
  { test: /adobe/i, color: "#FF0000" },
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
  const iconSize = Math.round(size * 0.5);
  const simpleIconRule = simpleIconRules.find((rule) => rule.test.test(name));
  const simpleIcon = simpleIconRule ? si[simpleIconRule.key] : undefined;
  const faRule = !simpleIcon ? fontAwesomeRules.find((rule) => rule.test.test(name)) : undefined;
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
      {simpleIcon ? (
        <svg role="img" viewBox="0 0 24 24" width={iconSize} height={iconSize} fill={`#${simpleIcon.hex}`} aria-label={name}>
          <path d={simpleIcon.path} />
        </svg>
      ) : faRule ? (
        <svg
          role="img"
          viewBox={`0 0 ${faRule.icon.icon[0]} ${faRule.icon.icon[1]}`}
          width={iconSize}
          height={iconSize}
          fill={faRule.color}
          aria-label={name}
        >
          <path d={faRule.icon.icon[4] as string} />
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
