import * as si from "simple-icons";

import { cn } from "@/lib/utils";

type SimpleIcon = {
  hex: string;
  path: string;
};

/**
 * Real brand marks sourced from simple-icons.
 *
 * Matching is keyword-based rather than an exact-name lookup because the
 * dashboard mock data can use fuller names such as "Spotify Family" or
 * "iCloud+ 2TB".
 *
 * Icon names are resolved safely at runtime so this component remains
 * compatible with different simple-icons package versions. If an icon is not
 * available in the installed version, BrandChip falls back to a
 * color-coded monogram instead of causing a TypeScript/build failure.
 */

const iconRules: { test: RegExp; key: string }[] = [
  { test: /netflix/i, key: "siNetflix" },
  { test: /spotify/i, key: "siSpotify" },
  { test: /\bclaude\b/i, key: "siClaude" },
  { test: /gemini/i, key: "siGooglegemini" },
  { test: /google/i, key: "siGoogle" },
  { test: /icloud/i, key: "siIcloud" },
  { test: /notion/i, key: "siNotion" },
  { test: /new york times|\bnyt\b/i, key: "siNewyorktimes" },
  { test: /peloton/i, key: "siPeloton" },

  // These names vary between simple-icons versions.
  // Runtime lookup prevents them from breaking the production build.
  { test: /adobe/i, key: "siAdobecreativecloud" },
  { test: /\baws\b|amazon\s+web\s+services/i, key: "siAmazonaws" },
];

const monogramRules: { test: RegExp; color: string }[] = [
  { test: /\bprime\b|^amazon(?!\s+web)/i, color: "#FF9900" },
  { test: /chatgpt|openai/i, color: "#10A37F" },
  { test: /canva/i, color: "#8B3DFF" },
  { test: /disney\+?/i, color: "#113CCF" },
  { test: /adobe/i, color: "#FF0000" },
  { test: /\baws\b|amazon\s+web\s+services/i, color: "#232F3E" },
];

function getSimpleIcon(key: string): SimpleIcon | undefined {
  const icons = si as unknown as Record<string, SimpleIcon | undefined>;

  return icons[key];
}

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

  const icon = iconRule ? getSimpleIcon(iconRule.key) : undefined;

  const iconSize = Math.round(size * 0.5);

  const monogramColor = monogramRules.find((rule) =>
    rule.test.test(name)
  )?.color;

  return (
    <span
      className={cn(
        "flex shrink-0 items-center justify-center border border-border-default bg-white shadow-xs",
        shape === "circle" ? "rounded-full" : "rounded-xl",
        className
      )}
      style={{
        width: size,
        height: size,
      }}
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
 * A small overlapping stack of brand chips, useful for dashboard moments
 * where multiple services are referenced together.
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
          className={cn(
            "ring-2 ring-surface-card",
            i > 0 && "-ml-2.5"
          )}
        />
      ))}
    </span>
  );
}