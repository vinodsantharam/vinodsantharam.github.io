import type { Metadata } from "next";
import { PortfolioCard } from "@/components/portfolio/PortfolioCard";
import { getPortfolioEntries } from "@/lib/portfolio";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Selected work by Vinod Santharam: case studies on payment UX, design systems and product engineering, plus open-source projects and shipped apps.",
  alternates: {
    canonical: "/portfolio/",
  },
};

export default function PortfolioPage() {
  const entries = getPortfolioEntries();
  const featured = entries.find((e) => e.featured);
  const caseStudies = entries.filter(
    (e) => e.kind === "case-study" && e !== featured
  );
  const projects = entries.filter(
    (e) => e.kind !== "case-study" && e !== featured
  );

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-8 pt-8 pb-20">
      <header className="mb-10 grid gap-4 max-w-3xl">
        <h1 className="font-mono font-semibold tracking-tight text-2xl text-foreground">
          Portfolio
        </h1>
        <p className="text-muted-foreground leading-relaxed">
          From Figma flows to production. Most of my work lives behind company
          logins, so these case studies tell the story — the problem, the
          decisions and the outcome — without the confidential parts.
        </p>
      </header>

      <div className="grid gap-12">
        {featured && (
          <section aria-labelledby="featured-heading">
            <h2 id="featured-heading" className="sr-only">
              Featured
            </h2>
            <PortfolioCard entry={featured} featured />
          </section>
        )}

        {caseStudies.length > 0 && (
          <section aria-labelledby="case-studies-heading" className="grid gap-4">
            <h2
              id="case-studies-heading"
              className="font-mono font-semibold tracking-tight text-lg"
            >
              Case studies
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              {caseStudies.map((entry) => (
                <PortfolioCard key={entry.slug} entry={entry} />
              ))}
            </div>
          </section>
        )}

        {projects.length > 0 && (
          <section aria-labelledby="projects-heading" className="grid gap-4">
            <h2
              id="projects-heading"
              className="font-mono font-semibold tracking-tight text-lg"
            >
              Open source &amp; apps
            </h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((entry) => (
                <PortfolioCard key={entry.slug} entry={entry} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
