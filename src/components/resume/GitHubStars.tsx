"use client";

import * as React from "react";

interface GitHubStarsProps {
  repo: string; // owner/name
  initial: number | null; // count baked in at build time
}

// Star count for a repo link. Renders the build-time count, then refreshes
// it once from the public GitHub API so the number stays live between
// deploys. If both fail there is nothing to show, so it renders nothing.
export function GitHubStars({ repo, initial }: GitHubStarsProps) {
  const [count, setCount] = React.useState(initial);

  React.useEffect(() => {
    const controller = new AbortController();
    fetch(`https://api.github.com/repos/${repo}`, {
      signal: controller.signal,
      headers: { Accept: "application/vnd.github+json" },
    })
      .then((res) => (res.ok ? res.json() : null))
      .then((data: { stargazers_count?: number } | null) => {
        if (typeof data?.stargazers_count === "number") {
          setCount(data.stargazers_count);
        }
      })
      .catch(() => {});
    return () => controller.abort();
  }, [repo]);

  if (count === null) return null;

  const label = `${count} ${count === 1 ? "star" : "stars"} on GitHub`;
  return (
    <a
      className="resume-stars"
      href={`https://github.com/${repo}/stargazers`}
      aria-label={label}
      title={label}
    >
      <svg viewBox="0 0 16 16" aria-hidden="true">
        <path d="M8 .9l2.2 4.5 4.9.7-3.6 3.5.9 4.9L8 12.2l-4.4 2.3.9-4.9L.9 6.1l4.9-.7z" />
      </svg>
      <span>
        {new Intl.NumberFormat("en", { notation: "compact" }).format(count)}
      </span>
    </a>
  );
}
