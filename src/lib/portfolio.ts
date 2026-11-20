import GithubSlugger from "github-slugger";
import { getMarkdownContent, getMarkdownFiles } from "@/lib/markdown";

// Portfolio entries are markdown files in content/portfolio/. Add a file to
// add an entry; its "## " headings become the in-page section navigation.

const DIRECTORY = "portfolio";

export type PortfolioKind = "case-study" | "open-source" | "app";

export const portfolioKindLabels: Record<PortfolioKind, string> = {
  "case-study": "Case study",
  "open-source": "Open source",
  app: "App",
};

export interface PortfolioLink {
  label: string;
  href: string;
}

export interface PortfolioSection {
  id: string;
  title: string;
}

export interface PortfolioEntry {
  slug: string;
  title: string;
  summary: string;
  kind: PortfolioKind;
  org: string;
  period: string;
  role?: string;
  stack: string[];
  highlights: string[];
  links: PortfolioLink[];
  order: number;
  featured: boolean;
  content: string;
  sections: PortfolioSection[];
}

const KINDS: PortfolioKind[] = ["case-study", "open-source", "app"];

function toKind(value: unknown): PortfolioKind {
  return KINDS.includes(value as PortfolioKind)
    ? (value as PortfolioKind)
    : "case-study";
}

function plainText(markdown: string): string {
  return markdown
    .replace(/!?\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/[`*_~]/g, "")
    .trim();
}

// Mirrors rehype-slug: one slugger per document, every heading in order, so
// the ids here match the ids the renderer puts on the headings.
function extractSections(content: string): PortfolioSection[] {
  const slugger = new GithubSlugger();
  const sections: PortfolioSection[] = [];
  let inFence = false;

  for (const line of content.split("\n")) {
    if (/^\s*(```|~~~)/.test(line)) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;

    const match = /^(#{1,6})\s+(.+?)\s*#*\s*$/.exec(line);
    if (!match) continue;

    const title = plainText(match[2]);
    const id = slugger.slug(title);
    if (match[1].length === 2) sections.push({ id, title });
  }

  return sections;
}

function toEntry(filename: string): PortfolioEntry | null {
  const post = getMarkdownContent(`${DIRECTORY}/${filename}`);
  if (!post) return null;

  const data = post.frontmatter;
  // HTML comments are private notes ("add later…"); keep them out of the
  // page payload, which ships the markdown to the client renderer.
  const content = post.content.replace(/<!--[\s\S]*?-->/g, "").trim();
  return {
    slug: post.slug,
    title: String(data.title ?? post.slug),
    summary: String(data.summary ?? ""),
    kind: toKind(data.kind),
    org: String(data.org ?? ""),
    period: String(data.period ?? ""),
    role: data.role ? String(data.role) : undefined,
    stack: Array.isArray(data.stack) ? data.stack.map(String) : [],
    highlights: Array.isArray(data.highlights)
      ? data.highlights.map(String)
      : [],
    links: Array.isArray(data.links) ? (data.links as PortfolioLink[]) : [],
    order: typeof data.order === "number" ? data.order : 999,
    featured: data.featured === true,
    content,
    sections: extractSections(content),
  };
}

export function getPortfolioEntries(): PortfolioEntry[] {
  return getMarkdownFiles(DIRECTORY)
    .map(toEntry)
    .filter((entry): entry is PortfolioEntry => entry !== null)
    .sort((a, b) => a.order - b.order || a.title.localeCompare(b.title));
}

export function getPortfolioEntry(slug: string): PortfolioEntry | null {
  return getPortfolioEntries().find((entry) => entry.slug === slug) ?? null;
}
