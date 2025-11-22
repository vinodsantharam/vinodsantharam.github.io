import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";

export const metadata: Metadata = {
  title: "Vinod Santharam",
  description: "Personal website and portfolio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-screen flex flex-col">
            <header className="border-b border-border bg-background">
              <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <div className="flex items-center justify-between">
                  <Link
                    href="/"
                    className="text-xl font-bold text-foreground hover:text-primary"
                  >
                    Vinod Santharam
                  </Link>
                  <div className="flex items-center gap-6">
                    <Link
                      href="/"
                      className="text-muted-foreground hover:text-primary"
                    >
                      Home
                    </Link>
                    <Link
                      href="/blog"
                      className="text-muted-foreground hover:text-primary"
                    >
                      Blog
                    </Link>
                    <Link
                      href="/about"
                      className="text-muted-foreground hover:text-primary"
                    >
                      About
                    </Link>
                    <ThemeToggle />
                  </div>
                </div>
              </nav>
            </header>
            <main className="flex-1">{children}</main>
            <footer className="border-t border-border bg-muted/50">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <p className="text-center text-muted-foreground text-sm">
                  © {new Date().getFullYear()} Vinod Santharam. All rights
                  reserved.
                </p>
              </div>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
