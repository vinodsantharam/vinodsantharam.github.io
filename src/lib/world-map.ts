import { geoContains, geoNaturalEarth1 } from 'd3-geo'
import { feature } from 'topojson-client'
import type { Topology, GeometryCollection } from 'topojson-specification'
import land110m from 'world-atlas/land-110m.json'
import { MAP_HEIGHT, MAP_WIDTH } from './world-map-size'

// Dot-matrix world map, computed at build time so no map library or tiles
// ship to the browser. The result is one SVG path of zero-length segments
// (drawn as round dots via stroke-linecap) plus projected city positions.

export interface MapCity {
  id: string
  name: string
  x: number
  y: number
  // Zoom used when the city is focused. Europe needs more to separate
  // Strasbourg from Basel.
  zoom: number
  coords: string
}

const CITIES: Record<string, { name: string; lon: number; lat: number; zoom: number }> = {
  bangkok: { name: 'Bangkok, Thailand', lon: 100.5, lat: 13.75, zoom: 2.6 },
  montreal: { name: 'Montréal, Canada', lon: -73.57, lat: 45.5, zoom: 2.6 },
  basel: { name: 'Basel, Switzerland', lon: 7.59, lat: 47.56, zoom: 3.4 },
  strasbourg: { name: 'Strasbourg, France', lon: 7.75, lat: 48.58, zoom: 3.4 },
}

function formatCoords(lon: number, lat: number): string {
  const ns = `${Math.abs(lat).toFixed(2)}° ${lat >= 0 ? 'N' : 'S'}`
  const ew = `${Math.abs(lon).toFixed(2)}° ${lon >= 0 ? 'E' : 'W'}`
  return `${ns} · ${ew}`
}

export interface WorldMap {
  dots: string
  cities: MapCity[]
}

let cached: WorldMap | null = null

export function getWorldMap(): WorldMap {
  if (cached) return cached

  const topology = land110m as unknown as Topology<{ land: GeometryCollection }>
  const land = feature(topology, topology.objects.land)
  const projection = geoNaturalEarth1()
    .scale(190)
    .translate([MAP_WIDTH / 2 + 10, MAP_HEIGHT / 2 + 50])

  const step = 8
  let dots = ''
  for (let y = step / 2; y < MAP_HEIGHT; y += step) {
    for (let x = step / 2; x < MAP_WIDTH; x += step) {
      const lonLat = projection.invert?.([x, y])
      if (!lonLat || lonLat[1] < -56) continue
      if (geoContains(land, lonLat)) dots += `M${x} ${y}h0`
    }
  }

  const cities = Object.entries(CITIES).map(([id, c]) => {
    const [x, y] = projection([c.lon, c.lat]) ?? [0, 0]
    return {
      id,
      name: c.name,
      x: Math.round(x * 10) / 10,
      y: Math.round(y * 10) / 10,
      zoom: c.zoom,
      coords: formatCoords(c.lon, c.lat),
    }
  })

  cached = { dots, cities }
  return cached
}
