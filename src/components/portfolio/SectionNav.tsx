"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import type { PortfolioSection } from "@/lib/portfolio";

interface SectionNavProps {
  sections: PortfolioSection[];
}

// "On this page" links that highlight the section being read.
export function SectionNav({ sections }: SectionNavProps) {
  const [activeId, setActiveId] = React.useState<string | null>(
    sections[0]?.id ?? null
  );

  React.useEffect(() => {
    const headings = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => el !== null);
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (records) => {
        const visible = records
          .filter((r) => r.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "0px 0px -70% 0px" }
    );
    headings.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [sections]);

  if (sections.length < 2) return null;

  return (
    <nav aria-label="On this page" className="lg:sticky lg:top-6">
      <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground mb-2">
        On this page
      </p>
      <ul className="grid gap-0.5">
        {sections.map((section) => {
          const active = section.id === activeId;
          return (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                aria-current={active ? "location" : undefined}
                onClick={() => setActiveId(section.id)}
                className={cn(
                  "block border-l-2 py-1.5 pl-3 text-sm transition-colors",
                  active
                    ? "border-primary text-foreground"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                )}
              >
                {section.title}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
