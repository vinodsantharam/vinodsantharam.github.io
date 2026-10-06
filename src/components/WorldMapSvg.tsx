import type { MapCity } from "@/lib/world-map";
import { MAP_HEIGHT, MAP_WIDTH } from "@/lib/world-map-size";
import "./world-map.css";

interface WorldMapSvgProps {
  inland: string;
  coast: string;
  // Grid spacing of the dots, in map units; the ocean grid matches it.
  step: number;
  cities: MapCity[];
  route: string;
  label: string;
  // The city that glows and pulses; the others stay dimly lit.
  litId?: string;
  // Remote work spreads the glow wider around the lit city.
  remote?: boolean;
  // Camera transform for the resume map's drift-to-city.
  transform?: string;
  viewBox?: string;
  // Prefix for the gradient and pattern ids, unique per map on a page.
  idPrefix: string;
}

// The night dot-matrix map shared by the resume and the homepage. No hooks,
// so it renders on the server for the homepage and inside the client
// ResumeMap alike. Styles live in world-map.css.
export function WorldMapSvg({
  inland,
  coast,
  step,
  cities,
  route,
  label,
  litId,
  remote = false,
  transform,
  viewBox = `0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`,
  idPrefix,
}: WorldMapSvgProps) {
  const glow = `${idPrefix}-glow`;
  const sea = `${idPrefix}-sea`;

  return (
    <svg className="world-map" viewBox={viewBox} role="img" aria-label={label}>
      <defs>
        <radialGradient id={glow}>
          <stop offset="0" stopColor="var(--map-glow)" stopOpacity="0.75" />
          <stop offset="0.35" stopColor="var(--map-glow)" stopOpacity="0.22" />
          <stop offset="1" stopColor="var(--map-glow)" stopOpacity="0" />
        </radialGradient>
        <pattern
          id={sea}
          width={step}
          height={step}
          patternUnits="userSpaceOnUse"
        >
          <circle
            className="world-map-sea-dot"
            cx={step / 2}
            cy={step / 2}
            r={step * 0.31}
          />
        </pattern>
      </defs>
      <g className="world-map-camera" style={transform ? { transform } : undefined}>
        <rect
          x={0}
          y={2 * step}
          width={MAP_WIDTH}
          height={MAP_HEIGHT - 8 * step}
          fill={`url(#${sea})`}
        />
        <path className="world-map-dots" d={inland} />
        <path className="world-map-dots is-coast" d={coast} />
        <path className="world-map-route" d={route} />
        {cities.map((c) => {
          const lit = c.id === litId;
          return (
            <g
              key={c.id}
              className={lit ? "world-map-city is-lit" : "world-map-city"}
            >
              <circle
                className="halo"
                cx={c.x}
                cy={c.y}
                r={lit && remote ? 40 : 26}
                fill={`url(#${glow})`}
              />
              <circle className="ring" cx={c.x} cy={c.y} r={6} />
              <circle className="core" cx={c.x} cy={c.y} r={2.2} />
            </g>
          );
        })}
      </g>
    </svg>
  );
}
