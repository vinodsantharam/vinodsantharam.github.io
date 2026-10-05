"use client";

import * as React from "react";

interface TikTokVideoProps {
  id: string;
  title: string;
}

// Click-to-load facade for TikTok's player, same idea as LinkedInPost:
// nothing from TikTok loads until the reader asks for it.
export function TikTokVideo({ id, title }: TikTokVideoProps) {
  const [open, setOpen] = React.useState(false);

  if (!open) {
    return (
      <button
        type="button"
        className="resume-award-load"
        onClick={() => setOpen(true)}
      >
        Play the video
      </button>
    );
  }

  return (
    <iframe
      className="resume-award-embed is-video"
      src={`https://www.tiktok.com/player/v1/${id}?autoplay=1&rel=0&description=0&music_info=0`}
      title={title}
      allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
      allowFullScreen
    />
  );
}
