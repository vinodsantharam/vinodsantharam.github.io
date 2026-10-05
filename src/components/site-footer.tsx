import Link from "next/link";

const repoUrl = "https://github.com/vinodsantharam/vinodsantharam.github.io";

// GitHub Actions sets GITHUB_SHA during the deploy build; local builds
// have none, so the commit is simply left out.
const commit = process.env.GITHUB_SHA;

const links = [
  { href: "https://www.linkedin.com/in/vinodsantharam", label: "LinkedIn" },
  { href: "https://github.com/vinodsantharam", label: "GitHub" },
  { href: "mailto:vinod.santharam@gmail.com", label: "Email" },
];

// Colophon: where Vinod is, his links, then how the site is built and
// which commit is live.
export function SiteFooter() {
  return (
    <footer className="border-t border-border print:hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-8 grid gap-4 text-sm text-muted-foreground">
        <div className="flex flex-wrap items-center justify-between gap-x-5 gap-y-3">
          <p className="font-mono text-xs">
            <span
              aria-hidden="true"
              className="inline-block size-[7px] rounded-full bg-lamp mr-2 align-[1px]"
            />
            Bangkok · 13.75° N 100.50° E
          </p>
          <nav aria-label="Elsewhere" className="flex flex-wrap gap-5">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="hover:text-foreground transition-colors"
              >
                {link.label}
              </a>
            ))}
            <Link
              href="/resume"
              className="hover:text-foreground transition-colors"
            >
              Resume
            </Link>
          </nav>
        </div>
        <p className="font-mono text-[11px] leading-relaxed border-t border-dashed border-border pt-4 flex flex-wrap gap-x-4 gap-y-1">
          <span>© {new Date().getFullYear()} Vinod Santharam</span>
          <span>Static Next.js on GitHub Pages</span>
          {commit && (
            <span>
              built from{" "}
              <a
                href={`${repoUrl}/commit/${commit}`}
                className="text-foreground hover:text-primary transition-colors"
              >
                {commit.slice(0, 7)}
              </a>
            </span>
          )}
          <a
            href={repoUrl}
            className="text-primary hover:underline underline-offset-4"
          >
            view source ↗
          </a>
        </p>
      </div>
    </footer>
  );
}
