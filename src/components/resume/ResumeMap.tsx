"use client";

import * as React from "react";
import type { MapCity } from "@/lib/world-map";
import { MAP_HEIGHT, MAP_WIDTH } from "@/lib/world-map-size";

export interface CityStop extends MapCity {
  years: string;
}

interface ResumeMapProps {
  dots: string;
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
  dots,
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
        <svg
          viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`}
          role="img"
          aria-label={`World map of the cities Vinod has worked in: ${cities
            .map((c) => c.name)
            .join(", ")}`}
        >
          <defs>
            <radialGradient id="resume-map-glow">
              <stop offset="0" stopColor="var(--r-glow)" stopOpacity="0.75" />
              <stop
                offset="0.35"
                stopColor="var(--r-glow)"
                stopOpacity="0.22"
              />
              <stop offset="1" stopColor="var(--r-glow)" stopOpacity="0" />
            </radialGradient>
          </defs>
          <g className="resume-map-camera" style={{ transform }}>
            <path className="resume-map-dots" d={dots} />
            <path className="resume-map-route" d={route} />
            {cities.map((c) => {
              const lit = c.id === city?.id;
              return (
                <g
                  key={c.id}
                  className={lit ? "resume-map-city is-lit" : "resume-map-city"}
                >
                  <circle
                    className="halo"
                    cx={c.x}
                    cy={c.y}
                    r={lit && active?.remote ? 40 : 26}
                    fill="url(#resume-map-glow)"
                  />
                  <circle className="ring" cx={c.x} cy={c.y} r={6} />
                  <circle className="core" cx={c.x} cy={c.y} r={2.2} />
                </g>
              );
            })}
          </g>
        </svg>
      </div>
      <div className="resume-map-caption" aria-live="polite">
        <div className="place">{title}</div>
        <div className="detail">{detail}</div>
      </div>
    </div>
  );
}
