"use client";

import * as React from "react";
import { WorldMapSvg } from "@/components/WorldMapSvg";
import type { CityStop } from "@/lib/resume-map";
import { MAP_HEIGHT, MAP_WIDTH } from "@/lib/world-map-size";

interface ResumeMapProps {
  inland: string;
  coast: string;
  // Grid spacing of the dots, in map units; the ocean grid matches it.
  step: number;
  cities: CityStop[];
  route: string;
  defaultTitle: string;
  defaultYears: string;
}

interface Selection {
  city?: string;
  label: string;
  place?: string;
  remote: boolean;
}

// Roles in the resume carry data-map-* attributes. This listens for hover,
// focus and tap on them (event delegation, so the roles stay server-rendered)
// and on narrow screens follows the role scrolled into view instead.
function readSelection(el: Element | null): Selection | null {
  const target = el?.closest<HTMLElement>("[data-map-label]");
  if (!target) return null;
  return {
    city: target.dataset.mapCity,
    label: target.dataset.mapLabel ?? "",
    place: target.dataset.mapPlace,
    remote: target.dataset.mapRemote === "true",
  };
}

export function ResumeMap({
  inland,
  coast,
  step,
  cities,
  route,
  defaultTitle,
  defaultYears,
}: ResumeMapProps) {
  const [hovered, setHovered] = React.useState<Selection | null>(null);
  const [pinned, setPinned] = React.useState<Selection | null>(null);
  const active = hovered ?? pinned;

  React.useEffect(() => {
    const narrow = window.matchMedia("(max-width: 900px)");
    const targets = Array.from(
      document.querySelectorAll<HTMLElement>("[data-map-label]"),
    );
    const mark = (sel: Selection | null) =>
      targets.forEach((t) =>
        t.classList.toggle(
          "is-mapped",
          !!sel && t.dataset.mapLabel === sel.label,
        ),
      );

    const onOver = (e: Event) => {
      if (narrow.matches) return;
      const sel = readSelection(e.target as Element);
      setHovered(sel);
      mark(sel);
    };
    const onLeave = () => {
      if (narrow.matches) return;
      setHovered(null);
      mark(null);
    };
    const onFocus = (e: Event) => {
      const sel = readSelection(e.target as Element);
      setHovered(sel);
      mark(sel);
    };
    const onClick = (e: Event) => {
      const sel = readSelection(e.target as Element);
      if (!sel) return;
      setPinned((prev) => (prev?.label === sel.label ? null : sel));
    };

    targets.forEach((t) => {
      t.addEventListener("mouseenter", onOver);
      t.addEventListener("mouseleave", onLeave);
      t.addEventListener("focusin", onFocus);
      t.addEventListener("focusout", onLeave);
      t.addEventListener("click", onClick);
    });

    let observer: IntersectionObserver | null = null;
    const watchScroll = () => {
      observer?.disconnect();
      observer = null;
      if (!narrow.matches) return;
      observer = new IntersectionObserver(
        (entries) => {
          const visible = entries.find((entry) => entry.isIntersecting);
          if (!visible) return;
          const sel = readSelection(visible.target);
          setHovered(sel);
          mark(sel);
        },
        { rootMargin: "-55% 0px -40% 0px" },
      );
      targets.forEach((t) => observer?.observe(t));
    };
    watchScroll();
    narrow.addEventListener("change", watchScroll);

    return () => {
      targets.forEach((t) => {
        t.removeEventListener("mouseenter", onOver);
        t.removeEventListener("mouseleave", onLeave);
        t.removeEventListener("focusin", onFocus);
        t.removeEventListener("focusout", onLeave);
        t.removeEventListener("click", onClick);
      });
      observer?.disconnect();
      narrow.removeEventListener("change", watchScroll);
    };
  }, []);

  const city = cities.find((c) => c.id === active?.city);

  let transform = "translate(0px, 0px) scale(1)";
  if (city) {
    const s = city.zoom;
    const tx = Math.min(
      0,
      Math.max(MAP_WIDTH - MAP_WIDTH * s, MAP_WIDTH / 2 - s * city.x),
    );
    const ty = Math.min(
      0,
      Math.max(MAP_HEIGHT - MAP_HEIGHT * s, MAP_HEIGHT / 2 - s * city.y),
    );
    transform = `translate(${tx}px, ${ty}px) scale(${s})`;
  }

  const title = city
    ? `${city.name}${active?.remote ? " · remote" : ""}`
    : (active?.place ?? defaultTitle);
  const detail = active?.label ?? "Hover a role to follow it on the map.";

  return (
    <div className="resume-map">
      <div className="resume-map-head">
        <span>
          {city ? city.coords : `${cities.length} cities · ${defaultYears}`}
        </span>
        <b>{city ? city.years : ""}</b>
      </div>
      <div className="resume-map-box">
        <WorldMapSvg
          inland={inland}
          coast={coast}
          step={step}
          cities={cities}
          route={route}
          label={`World map of the cities Vinod has worked in: ${cities
            .map((c) => c.name)
            .join(", ")}`}
          litId={city?.id}
          remote={active?.remote}
          transform={transform}
          idPrefix="resume-map"
        />
      </div>
      <div className="resume-map-caption" aria-live="polite">
        <div className="place">{title}</div>
        <div className="detail">{detail}</div>
      </div>
    </div>
  );
}
