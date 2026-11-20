import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import { metaLine } from "@/components/portfolio/PortfolioCard";
import { ProjectNav } from "@/components/portfolio/ProjectNav";
import { SectionNav } from "@/components/portfolio/SectionNav";
import {
  getPortfolioEntries,
  getPortfolioEntry,
} from "@/lib/portfolio";
import { siteConfig } from "@/lib/site";

interface PortfolioEntryPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export function generateStaticParams() {
  return getPortfolioEntries().map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({
  params,
}: PortfolioEntryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const entry = getPortfolioEntry(slug);
  if (!entry) return {};

  const canonical = `/portfolio/${slug}/`;
  return {
    title: entry.title,
    description: entry.summary,
    keywords: entry.stack,
    alternates: { canonical },
    openGraph: {
      type: "article",
      url: canonical,
      title: entry.title,
      description: entry.summary,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
    },
    twitter: {
      card: "summary_large_image",
      title: entry.title,
      description: entry.summary,
    },
  };
}

export default async function PortfolioEntryPage({
  params,
}: PortfolioEntryPageProps) {
  const { slug } = await params;
  const entries = getPortfolioEntries();
  const index = entries.findIndex((e) => e.slug === slug);
  const entry = index >= 0 ? entries[index] : null;
  if (!entry) notFound();

  const previous = index > 0 ? entries[index - 1] : null;
  const next = index < entries.length - 1 ? entries[index + 1] : null;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-8 pt-8 pb-20 grid gap-8 lg:grid-cols-[200px_minmax(0,1fr)_180px] lg:gap-10">
      <aside className="min-w-0">
        <ProjectNav entries={entries} activeSlug={entry.slug} />
      </aside>

      <article className="min-w-0 max-w-3xl">
        <header className="mb-10 grid gap-4">
          <p className="font-mono text-xs text-muted-foreground">
            {metaLine(entry)}
          </p>
          <h1 className="font-mono font-semibold tracking-tight text-[clamp(1.5rem,3vw,2rem)] leading-tight text-balance">
            {entry.title}
          </h1>
          <p className="text-muted-foreground leading-relaxed">
            {entry.summary}
          </p>

          <dl className="grid gap-x-8 gap-y-3 border-y border-border py-4 sm:grid-cols-2 text-sm">
            {entry.role && (
              <div className="grid gap-1">
                <dt className="text-muted-foreground">Role</dt>
                <dd className="font-medium">{entry.role}</dd>
              </div>
            )}
            {entry.stack.length > 0 && (
              <div className="grid gap-1">
                <dt className="text-muted-foreground">Stack</dt>
                <dd className="font-medium">{entry.stack.join(", ")}</dd>
              </div>
            )}
          </dl>

          {entry.links.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {entry.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="inline-flex items-center gap-1 rounded-full border border-border px-3 py-1.5 text-sm hover:border-foreground/40 transition-colors"
                >
                  {link.label}
                  <ArrowUpRight className="size-3.5" aria-hidden="true" />
                </a>
              ))}
            </div>
          )}
        </header>

        <MarkdownRenderer content={entry.content} />

        <nav
          aria-label="More work"
          className="mt-16 grid gap-4 border-t border-border pt-6 sm:grid-cols-2"
        >
          {previous ? (
            <Link
              href={`/portfolio/${previous.slug}/`}
              className="grid gap-1 rounded-lg p-3 -m-3 hover:bg-accent transition-colors"
            >
              <span className="font-mono text-xs text-muted-foreground">
                ← Previous
              </span>
              <span className="text-sm font-medium">{previous.title}</span>
            </Link>
          ) : (
            <span />
          )}
          {next && (
            <Link
              href={`/portfolio/${next.slug}/`}
              className="grid gap-1 rounded-lg p-3 -m-3 hover:bg-accent transition-colors sm:text-right"
            >
              <span className="font-mono text-xs text-muted-foreground">
                Next →
              </span>
              <span className="text-sm font-medium">{next.title}</span>
            </Link>
          )}
        </nav>
      </article>

      <aside className="hidden lg:block min-w-0">
        <SectionNav sections={entry.sections} />
      </aside>
    </div>
  );
}
