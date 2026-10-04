"use client";

import * as React from "react";

// Thin lamp-coloured bar at the top of a post that fills as you read.
export function ReadingProgress() {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-50 h-0.5 print:hidden"
    >
      <div
        className="h-full bg-lamp origin-left"
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  );
}
