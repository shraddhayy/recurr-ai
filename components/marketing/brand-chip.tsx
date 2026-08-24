import * as si from "simple-icons";
import { cn } from "@/lib/utils";

/**
 * Real brand marks, sourced from simple-icons (CC0 — public domain SVG data
 * of official brand marks, purpose-built for exactly this: showing
 * recognizable service logos in a product UI).
 *
 * A few services we reference (Amazon/Prime, ChatGPT/OpenAI, Canva, Adobe)
 * aren't in the simple-icons dataset — those brands have historically asked
 * to be excluded over trademark/brand-guideline concerns. Rather than
 * hand-redraw a trademarked logo from memory, those fall back to a plain
 * monogram tinted with the brand's well-known public color. Real SVG marks
 * where we can license them cleanly, honest color-coded initials where we
 * can't — never a reconstructed logo.
 */
const iconKeyByService: Record<string, keyof typeof si | undefined> = {
  Netflix: "siNetflix",
  Spotify: "siSpotify",
  Claude: "siClaude",
  "Google One": "siGoogle",
  "iCloud+": "siIcloud",
  Gemini: "siGooglegemini",
};

const monogramColorByService: Record<string, string> = {
  Prime: "#FF9900",
  ChatGPT: "#10A37F",
  Canva: "#8B3DFF",
  Adobe: "#FF0000",
};

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
  const key = iconKeyByService[name];
  const icon = key ? si[key] : undefined;
  const iconSize = Math.round(size * 0.5);

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
            color: monogramColorByService[name] ?? "var(--parrot-600)",
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
