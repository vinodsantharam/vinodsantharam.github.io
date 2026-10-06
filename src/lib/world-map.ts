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
  // Land dots split in two, so the map can light the coastline and keep
  // the interior dim: the continents then read by their outline.
  inland: string
  coast: string
  step: number
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
  const cols = Math.ceil(MAP_WIDTH / step)
  const rows = Math.ceil(MAP_HEIGHT / step)
  const isLand: boolean[][] = []
  for (let r = 0; r < rows; r++) {
    const row: boolean[] = []
    for (let c = 0; c < cols; c++) {
      const lonLat = projection.invert?.([step / 2 + c * step, step / 2 + r * step])
      row.push(!!lonLat && lonLat[1] >= -56 && geoContains(land, lonLat))
    }
    isLand.push(row)
  }
  const at = (r: number, c: number) => isLand[r]?.[c] ?? false

  let inland = ''
  let coast = ''
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (!isLand[r][c]) continue
      const dot = `M${step / 2 + c * step} ${step / 2 + r * step}h0`
      const edge = !at(r - 1, c) || !at(r + 1, c) || !at(r, c - 1) || !at(r, c + 1)
      if (edge) coast += dot
      else inland += dot
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

  cached = { inland, coast, step, cities }
  return cached
}
