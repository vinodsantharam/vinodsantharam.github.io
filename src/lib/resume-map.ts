import type { Resume } from './resume'
import { getWorldMap, type MapCity } from './world-map'

// Map data derived from the resume: the cities lived in, their years, and
// the dotted route between them. Shared by /resume and the homepage, run at
// build time.

export interface CityStop extends MapCity {
  years: string
}

export interface ResumeMapData {
  inland: string
  coast: string
  step: number
  stops: CityStop[]
  route: string
  // Short city names in the order they were lived in, latest last.
  journey: string[]
  current: string
  firstYear: string
}

// Years spent in each map city, and the order they were lived in.
function mapStops(resume: Resume) {
  const spans: { city: string; start: string; end: string | null }[] = []
  for (const role of [...resume.experience, ...resume.sideProjects]) {
    if (!role.city) continue
    for (const p of role.positions) {
      spans.push({ city: role.city, start: p.start, end: p.end })
    }
  }
  for (const e of resume.education) {
    if (e.city) spans.push({ city: e.city, start: e.start, end: e.end })
  }
  spans.sort((a, b) => a.start.localeCompare(b.start))

  const years: Record<string, { from: string; to: string | null }> = {}
  const order: string[] = []
  for (const s of spans) {
    const y = years[s.city]
    if (!y) {
      years[s.city] = { from: s.start, to: s.end }
    } else if (y.to !== null && (s.end === null || s.end > y.to)) {
      y.to = s.end
    }
    if (order[order.length - 1] !== s.city) order.push(s.city)
  }
  return { years, order }
}

function routePath(points: { x: number; y: number }[]): string {
  if (points.length < 2) return ''
  let d = `M${points[0].x} ${points[0].y}`
  for (let i = 1; i < points.length; i++) {
    const a = points[i - 1]
    const b = points[i]
    const lift = Math.hypot(b.x - a.x, b.y - a.y) * 0.3 + 20
    const cx = (a.x + b.x) / 2
    const cy = Math.min(a.y, b.y) - lift
    d += ` Q${cx.toFixed(1)} ${cy.toFixed(1)} ${b.x} ${b.y}`
  }
  return d
}

export function getResumeMap(resume: Resume): ResumeMapData {
  const world = getWorldMap()
  const { years, order } = mapStops(resume)
  const stops: CityStop[] = world.cities
    .filter((c) => years[c.id])
    .map((c) => ({
      ...c,
      years: `${years[c.id].from.slice(0, 4)} → ${years[c.id].to ? years[c.id].to!.slice(0, 4) : 'now'}`,
    }))
  const byId = Object.fromEntries(stops.map((c) => [c.id, c]))
  const path = order.map((id) => byId[id]).filter(Boolean)
  const firstYear = Object.values(years)
    .map((y) => y.from)
    .sort()[0]
    .slice(0, 4)

  return {
    inland: world.inland,
    coast: world.coast,
    step: world.step,
    stops,
    route: routePath(path),
    journey: path.map((c) => c.name.split(',')[0]),
    current: path[path.length - 1]?.id ?? '',
    firstYear,
  }
}
