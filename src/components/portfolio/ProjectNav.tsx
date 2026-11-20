import Link from "next/link";
import { cn } from "@/lib/utils";
import { ScrollActiveIntoView } from "@/components/portfolio/ScrollActiveIntoView";
import {
  portfolioKindLabels,
  type PortfolioEntry,
  type PortfolioKind,
} from "@/lib/portfolio";

interface ProjectNavProps {
  entries: PortfolioEntry[];
  activeSlug: string;
}

const GROUPS: { label: string; kinds: PortfolioKind[] }[] = [
  { label: "Case studies", kinds: ["case-study"] },
  { label: "Open source & apps", kinds: ["open-source", "app"] },
];

// Sidebar on large screens, a horizontally scrolling row on small ones.
export function ProjectNav({ entries, activeSlug }: ProjectNavProps) {
  return (
    <nav aria-label="Portfolio projects" className="lg:sticky lg:top-6">
      <Link
        href="/portfolio/"
        className="inline-flex font-mono text-xs text-muted-foreground hover:text-foreground mb-4"
      >
        ← All work
      </Link>
      <ScrollActiveIntoView containerId="portfolio-projects" />
      <div
        id="portfolio-projects"
        className="flex gap-6 overflow-x-auto pb-2 lg:grid lg:gap-6 lg:overflow-visible lg:pb-0"
      >
        {GROUPS.map((group) => {
          const items = entries.filter((e) => group.kinds.includes(e.kind));
          if (items.length === 0) return null;
          return (
            <div key={group.label} className="shrink-0 lg:shrink">
              <p className="hidden lg:block font-mono text-[11px] uppercase tracking-wider text-muted-foreground mb-2">
                {group.label}
              </p>
              <ul className="flex gap-1.5 lg:grid lg:gap-0.5">
                {items.map((entry) => {
                  const active = entry.slug === activeSlug;
                  return (
                    <li key={entry.slug} className="shrink-0">
                      <Link
                        href={`/portfolio/${entry.slug}/`}
                        aria-current={active ? "page" : undefined}
                        title={portfolioKindLabels[entry.kind]}
                        className={cn(
                          "block whitespace-nowrap lg:whitespace-normal rounded-md px-3 py-2 text-sm transition-colors",
                          "border lg:border-0 lg:border-l-2 lg:rounded-none",
                          active
                            ? "border-foreground text-foreground font-medium bg-muted lg:bg-transparent"
                            : "border-border text-muted-foreground hover:text-foreground lg:border-transparent"
                        )}
                      >
                        {entry.title}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>
    </nav>
  );
}
