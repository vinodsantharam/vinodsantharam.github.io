import { getWorldMap } from "@/lib/world-map";

interface MapStripProps {
  current: string;
  previous: string[];
}

// Static night map for the homepage: the current city glows, past cities
// are dimly lit. Rendered at build time; no client JavaScript.
export function MapStrip({ current, previous }: MapStripProps) {
  const { dots, cities } = getWorldMap();
  const now = cities.find((c) => c.id === current);
  const past = cities.filter((c) => previous.includes(c.id));

  return (
    <figure className="m-0 rounded-xl bg-night p-3.5 grid gap-2 min-w-0">
      <svg
        viewBox="240 80 620 240"
        className="block w-full h-auto"
        role="img"
        aria-label={`Map: now in ${now?.name}, previously ${past
          .map((c) => c.name)
          .join(", ")}`}
      >
        <defs>
          <radialGradient id="map-strip-glow">
            <stop offset="0" stopColor="var(--color-lamp)" stopOpacity="0.8" />
            <stop
              offset="0.4"
              stopColor="var(--color-lamp)"
              stopOpacity="0.2"
            />
            <stop offset="1" stopColor="var(--color-lamp)" stopOpacity="0" />
          </radialGradient>
        </defs>
        <path
          d={dots}
          fill="none"
          stroke="var(--color-dot)"
          strokeWidth={2.2}
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
        {past.map((c) => (
          <circle
            key={c.id}
            cx={c.x}
            cy={c.y}
            r={16}
            fill="url(#map-strip-glow)"
            opacity={0.35}
          />
        ))}
        {now && (
          <>
            <circle cx={now.x} cy={now.y} r={30} fill="url(#map-strip-glow)" />
            <circle cx={now.x} cy={now.y} r={2.4} fill="var(--color-lamp)" />
          </>
        )}
      </svg>
      <figcaption className="flex flex-wrap justify-between gap-2 font-mono text-[11px] text-night-muted">
        <span>
          <b className="font-medium text-night-foreground">Now</b>{" "}
          {now?.name.split(",")[0]}
        </span>
        <span>Before: {past.map((c) => c.name.split(",")[0]).join(" · ")}</span>
      </figcaption>
    </figure>
  );
}
