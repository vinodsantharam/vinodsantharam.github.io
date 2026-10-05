"use client";

import * as React from "react";

interface LinkedInPostProps {
  urn: string;
  title: string;
}

// Click-to-load facade for a LinkedIn post. Nothing from LinkedIn (scripts,
// cookies) loads until the reader presses the button; the static card around
// it stays readable either way.
export function LinkedInPost({ urn, title }: LinkedInPostProps) {
  const [open, setOpen] = React.useState(false);

  if (!open) {
    return (
      <button
        type="button"
        className="resume-award-load"
        onClick={() => setOpen(true)}
      >
        Show the live LinkedIn post
      </button>
    );
  }

  return (
    <iframe
      className="resume-award-embed"
      src={`https://www.linkedin.com/embed/feed/update/${urn}`}
      title={title}
      loading="lazy"
      allowFullScreen
    />
  );
}
