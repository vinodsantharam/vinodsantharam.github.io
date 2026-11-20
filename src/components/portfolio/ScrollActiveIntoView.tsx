"use client";

import * as React from "react";

interface ScrollActiveIntoViewProps {
  containerId: string;
}

// On small screens the project list is a horizontal row; bring the current
// project into view so it isn't hidden off to the right. Only the row
// scrolls, never the page.
export function ScrollActiveIntoView({ containerId }: ScrollActiveIntoViewProps) {
  React.useEffect(() => {
    const container = document.getElementById(containerId);
    const active = container?.querySelector<HTMLElement>('[aria-current="page"]');
    if (!container || !active) return;
    if (container.scrollWidth <= container.clientWidth) return;

    const offset =
      active.getBoundingClientRect().left - container.getBoundingClientRect().left;
    container.scrollLeft += offset - 16;
  }, [containerId]);

  return null;
}
