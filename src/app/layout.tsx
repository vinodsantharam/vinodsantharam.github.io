import type { Metadata } from "next";
import { Martian_Mono, Source_Serif_4, Work_Sans } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";
import { siteConfig } from "@/lib/site";

const martianMono = Martian_Mono({
  subsets: ["latin"],
  variable: "--font-martian-mono",
  display: "swap",
});

const workSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-work-sans",
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-source-serif",
  display: "swap",
});

const navLinks = [
  { href: "/blog", label: "Writing" },
  { href: "/books", label: "Books" },
];

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.author, url: siteConfig.url }],
  creator: siteConfig.author,
  publisher: siteConfig.author,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${martianMono.variable} ${workSans.variable} ${sourceSerif.variable}`}
    >
      <body className="font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-screen flex flex-col">
            <header className="bg-background print:hidden">
              <nav className="max-w-6xl mx-auto px-4 sm:px-8 py-5 flex items-center justify-between gap-4">
                <Link
                  href="/"
                  className="flex items-center gap-2.5 font-mono text-[13px] font-semibold tracking-tight text-foreground"
                >
                  <span
                    aria-hidden="true"
                    className="grid place-items-center size-7 rounded-md bg-foreground text-background text-[11px]"
                  >
                    VS
                  </span>
                  <span className="hidden sm:inline">Vinod Santharam</span>
                </Link>
                <div className="flex items-center gap-4 sm:gap-6 text-sm">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}
                  <Link
                    href="/resume"
                    className="text-foreground border border-border rounded-full px-3 py-1.5 hover:border-foreground/40 transition-colors"
                  >
                    Resume
                  </Link>
                  <ThemeToggle />
                </div>
              </nav>
            </header>
            <main className="flex-1">{children}</main>
            <footer className="border-t border-border print:hidden">
              <div className="max-w-6xl mx-auto px-4 sm:px-8 py-8 flex flex-wrap items-center justify-between gap-4 text-sm text-muted-foreground">
                <p className="font-mono text-xs">
                  © {new Date().getFullYear()} Vinod Santharam · Bangkok
                </p>
                <div className="flex gap-5">
                  <a
                    href="https://www.linkedin.com/in/vinodsantharam"
                    className="hover:text-foreground"
                  >
                    LinkedIn
                  </a>
                  <a
                    href="https://github.com/vinodsantharam"
                    className="hover:text-foreground"
                  >
                    GitHub
                  </a>
                  <Link href="/resume" className="hover:text-foreground">
                    Resume
                  </Link>
                </div>
              </div>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
