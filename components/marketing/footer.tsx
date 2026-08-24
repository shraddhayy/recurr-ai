import Link from "next/link";

import { RecurrLogo } from "@/components/shell/logo";

const columns = [
  {
    title: "Product",
    links: [
      { label: "Overview", href: "#product" },
      { label: "How it works", href: "#how-it-works" },
      { label: "Savings", href: "#savings" },
      { label: "AI", href: "#ai" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#" },
      { label: "Principles", href: "#" },
    ],
  },
  {
    title: "Account",
    links: [
      { label: "Log in", href: "/overview" },
      { label: "Get started", href: "/overview" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-divider py-14">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-10 md:flex-row md:justify-between">
          <div className="flex flex-col gap-3">
            <RecurrLogo />
            <p className="max-w-xs text-[13px] leading-relaxed text-text-secondary">
              Turn recurring spending into something you can actually understand and control.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {columns.map((col) => (
              <div key={col.title} className="flex flex-col gap-3">
                <span className="text-[12px] font-semibold uppercase tracking-wide text-text-muted">
                  {col.title}
                </span>
                <ul className="flex flex-col gap-2">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-[13.5px] text-text-secondary transition-colors hover:text-text-primary"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-divider pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[12px] text-text-muted">
            © {new Date().getFullYear()} Recurr AI. Demo product — no real financial data is used.
          </p>
        </div>
      </div>
    </footer>
  );
}
