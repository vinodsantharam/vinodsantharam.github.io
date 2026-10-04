import Link from "next/link";
import type { Metadata } from "next";

// About was folded into the homepage and the resume. Static export can't
// send a server redirect, so this page refreshes to /resume and links there.
export const metadata: Metadata = {
  title: "About",
  robots: { index: false, follow: true },
  alternates: {
    canonical: "/resume/",
  },
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-8 py-16">
      <meta httpEquiv="refresh" content="0; url=/resume/" />
      <p className="text-muted-foreground">
        This page has moved to my{" "}
        <Link href="/resume" className="text-primary underline">
          resume
        </Link>
        .
      </p>
    </div>
  );
}
