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
export function ResumeDepth({ header, aside, children }: ResumeDepthProps) {
  const [depth, setDepth] = React.useState<Depth>("brief");

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
