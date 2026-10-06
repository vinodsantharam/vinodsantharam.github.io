import { WorldMapSvg } from "@/components/WorldMapSvg";
import { getResumeMap } from "@/lib/resume-map";
import { getResume } from "@/lib/resume";

// Static night map for the homepage, drawn like the resume map: the current
// city glows and pulses, past cities are dimly lit, and the dotted route
// joins them. Rendered at build time; no client JavaScript.
export function MapStrip() {
  const map = getResumeMap(getResume());
  const now = map.stops.find((c) => c.id === map.current);
  // Latest first, each city once (Montréal was home twice).
  const before = [...new Set(map.journey.slice(0, -1).reverse())];

  return (
    <figure className="m-0 rounded-xl bg-night p-3.5 grid gap-2.5 min-w-0">
      {/* Cropped to the inhabited latitudes, like the resume map on phones. */}
      <div className="overflow-hidden rounded-lg border border-night-line">
        <WorldMapSvg
          inland={map.inland}
          coast={map.coast}
          step={map.step}
          cities={map.stops}
          route={map.route}
          label={`Map: now in ${now?.name}, previously ${before.join(", ")}`}
          litId={map.current}
          viewBox="0 18 1000 350"
          idPrefix="home-map"
        />
      </div>
      <figcaption className="flex flex-wrap justify-between gap-x-3 gap-y-1 font-mono text-[11px] text-night-muted">
        <span>
          <b className="font-medium text-night-foreground">Now</b>{" "}
          {now?.name.split(",")[0]}
        </span>
        <span>Before: {before.join(" · ")}</span>
      </figcaption>
    </figure>
  );
}
