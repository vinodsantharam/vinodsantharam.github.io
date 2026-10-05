import fs from 'fs'
import path from 'path'

// Single source for the resume. Read at build time from content/resume.json;
// the /resume page (and later the print PDF) render from this.

export interface Position {
  title: string
  start: string // YYYY-MM
  end: string | null // null = present
  highlights: string[]
}

// A LinkedIn post about an award. The page shows a static card and only
// loads LinkedIn's embed when the reader asks for it.
export interface AwardPost {
  author: string
  relation: string
  url: string
  embedUrn: string // e.g. urn:li:ugcPost:…
}

export interface Award {
  id: string // anchor on /resume, e.g. #hackathon
  title: string
  event: string
  date: string // YYYY-MM
  image?: string
  imageAlt?: string
  post?: AwardPost
}

export interface Role {
  company: string
  location: string
  // Key into the world map's cities (src/lib/world-map.ts); omit for remote-only.
  city?: string
  workplace?: string
  summary: string
  awards?: Award[]
  positions: Position[]
}

export interface Education {
  degree: string
  school: string
  location: string
  city?: string
  start: string
  end: string
  focus: string
}

export interface Language {
  name: string
  level: string
  // Shown in the facts tile at the top of the resume.
  featured?: boolean
}

export interface Resume {
  name: string
  headline: string
  tagline: string
  location: string
  summary: string
  contact: {
    email: string
    linkedin: string
    github: string
    website: string
  }
  experience: Role[]
  sideProjects: Role[]
  education: Education[]
  skills: string[]
  languages: Language[]
  interests: string[]
}

export function getResume(): Resume {
  const filePath = path.join(process.cwd(), 'content', 'resume.json')
  return JSON.parse(fs.readFileSync(filePath, 'utf8')) as Resume
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

export function formatMonth(value: string): string {
  const [year, month] = value.split('-').map(Number)
  return `${MONTHS[month - 1]} ${year}`
}

export function formatRange(start: string, end: string | null): string {
  return `${formatMonth(start)} – ${end ? formatMonth(end) : 'Present'}`
}

// "2024 – Present" across all positions of a role.
export function roleYears(role: Role): string {
  const starts = role.positions.map((p) => p.start).sort()
  const ends = role.positions.map((p) => p.end)
  const first = starts[0].slice(0, 4)
  if (ends.includes(null)) return `${first} – Present`
  const sorted = (ends as string[]).sort()
  const last = sorted[sorted.length - 1].slice(0, 4)
  return first === last ? first : `${first} – ${last}`
}

export function yearsOfExperience(resume: Resume): number {
  const first = resume.experience
    .flatMap((r) => r.positions.map((p) => p.start))
    .sort()[0]
  return new Date().getFullYear() - Number(first.slice(0, 4))
}

export function countries(resume: Resume): string[] {
  const seen = new Set<string>()
  for (const role of resume.experience) {
    const parts = role.location.split(',')
    const country = parts[parts.length - 1].trim()
    if (country) seen.add(country)
  }
  return [...seen]
}
