"use client";

import * as React from "react";

type Depth = "brief" | "full";

interface ResumeDepthProps {
  header: React.ReactNode;
  aside?: React.ReactNode;
  children: React.ReactNode;
}

// Holds the brief/full toggle. Content is server-rendered and passed in;
// this only flips a data attribute that resume.css keys off, so printing
// follows whichever view the reader picked.
// Links marked data-depth-link="full", and a #hash pointing into full-only
// content on load, switch to the full story and then scroll to the target.
export function ResumeDepth({ header, aside, children }: ResumeDepthProps) {
  const [depth, setDepth] = React.useState<Depth>("brief");
  const [jumpTo, setJumpTo] = React.useState<string | null>(null);

  React.useEffect(() => {
    const target = window.location.hash
      ? document.getElementById(window.location.hash.slice(1))
      : null;
    if (target?.closest(".resume-full")) {
      setDepth("full");
      setJumpTo(target.id);
    }

    function onClick(event: MouseEvent) {
      const link = (event.target as Element | null)?.closest<HTMLAnchorElement>(
        'a[data-depth-link="full"]',
      );
      const id = link?.hash.slice(1);
      if (!id) return;
      event.preventDefault();
      history.replaceState(null, "", `#${id}`);
      setDepth("full");
      setJumpTo(id);
    }
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  React.useEffect(() => {
    if (!jumpTo || depth !== "full") return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    document.getElementById(jumpTo)?.scrollIntoView({
      behavior: reduce.matches ? "auto" : "smooth",
      block: "center",
    });
    setJumpTo(null);
  }, [jumpTo, depth]);

  return (
    <div className="resume-layout">
      <div className="resume" data-depth={depth}>
        <div className="resume-top">
          {header}
          <div
            className="resume-toggle"
            role="group"
            aria-label="Resume detail"
          >
            <button
              type="button"
              aria-pressed={depth === "brief"}
              onClick={() => setDepth("brief")}
            >
              30-second view
            </button>
            <button
              type="button"
              aria-pressed={depth === "full"}
              onClick={() => setDepth("full")}
            >
              Full story
            </button>
          </div>
        </div>
        {children}
      </div>
      {aside && <aside className="resume-aside">{aside}</aside>}
    </div>
  );
}
