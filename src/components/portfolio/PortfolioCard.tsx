import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { portfolioKindLabels, type PortfolioEntry } from "@/lib/portfolio";

interface PortfolioCardProps {
  entry: PortfolioEntry;
  featured?: boolean;
}

// Kind, org and period, without repeating the org when it equals the kind.
export function metaLine(entry: PortfolioEntry): string {
  const kind = portfolioKindLabels[entry.kind];
  return [kind, entry.org === kind ? null : entry.org, entry.period]
    .filter(Boolean)
    .join(" · ");
}

// The whole card is one link; only the title is a heading so screen-reader
// users get a clean list of entries.
export function PortfolioCard({ entry, featured = false }: PortfolioCardProps) {
  return (
    <Link
      href={`/portfolio/${entry.slug}/`}
      className={cn(
        "group grid gap-4 rounded-lg border border-border bg-card p-5 sm:p-6 transition-colors",
        "hover:border-foreground/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
        featured && "md:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] md:gap-8 md:p-8"
      )}
    >
      <div
        aria-hidden="true"
        className={cn(
          "rounded-md bg-muted grid place-items-center font-mono text-xs text-muted-foreground",
          featured ? "min-h-40 md:min-h-56" : "min-h-28"
        )}
      >
        {entry.stack.slice(0, 3).join(" · ")}
      </div>

      <div className="grid gap-3 content-center">
        <p className="font-mono text-xs text-muted-foreground">
          {metaLine(entry)}
        </p>
        <h3
          className={cn(
            "font-mono font-semibold tracking-tight text-foreground text-balance",
            featured ? "text-xl sm:text-2xl" : "text-lg"
          )}
        >
          {entry.title}
        </h3>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {entry.summary}
        </p>
        {entry.highlights.length > 0 && (
          <ul className="flex flex-wrap gap-1.5" aria-label="Highlights">
            {entry.highlights.map((item) => (
              <li
                key={item}
                className="px-2.5 py-1 rounded-md bg-muted text-muted-foreground text-xs"
              >
                {item}
              </li>
            ))}
          </ul>
        )}
        <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary">
          {entry.kind === "case-study" ? "Read the case study" : "See the project"}
          <ArrowRight
            className="size-4 transition-transform group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </span>
      </div>
    </Link>
  );
}
