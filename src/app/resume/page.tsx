import type { Metadata } from "next";
import { ResumeDepth } from "@/components/resume/ResumeDepth";
import { ResumeMap, type CityStop } from "@/components/resume/ResumeMap";
import {
  countries,
  formatRange,
  getResume,
  roleYears,
  yearsOfExperience,
  type Resume,
  type Role,
} from "@/lib/resume";
import { siteConfig } from "@/lib/site";
import { getWorldMap } from "@/lib/world-map";
import "./resume.css";

export const metadata: Metadata = {
  title: "Resume",
  description:
    "Resume of Vinod Santharam: team lead and frontend engineer with a UX focus. Experience across Thailand, Canada, Switzerland and France.",
  alternates: {
    canonical: "/resume/",
  },
};

function RoleEntry({ role }: { role: Role }) {
  const [first, ...rest] = role.positions;
  const place = role.workplace
    ? `${role.location} · ${role.workplace}`
    : role.location;

  return (
    <article
      className="resume-role"
      tabIndex={0}
      data-map-city={role.city}
      data-map-label={`${role.company} · ${roleYears(role)}`}
      data-map-place={
        role.city ? undefined : `${role.location} · ${role.company}`
      }
      data-map-remote={role.workplace === "Remote" ? "true" : undefined}
    >
      <header className="resume-row">
        <h3>{role.company}</h3>
        <span className="resume-meta">
          {roleYears(role)} · {place}
        </span>
      </header>
      <div className="resume-row resume-position">
        <span>{first.title}</span>
        <span className="resume-meta">
          {formatRange(first.start, first.end)}
        </span>
      </div>
      <p className="resume-summary">{role.summary}</p>
      <ul className="resume-full">
        {first.highlights.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      {rest.map((position) => (
        <div key={position.title + position.start} className="resume-full">
          <div className="resume-row resume-position">
            <span>{position.title}</span>
            <span className="resume-meta">
              {formatRange(position.start, position.end)}
            </span>
          </div>
          <ul>
            {position.highlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      ))}
    </article>
  );
}

// Years spent in each map city, and the dotted route between them in the
// order they were lived in.
function mapStops(resume: Resume) {
  const spans: { city: string; start: string; end: string | null }[] = [];
  for (const role of [...resume.experience, ...resume.sideProjects]) {
    if (!role.city) continue;
    for (const p of role.positions) {
      spans.push({ city: role.city, start: p.start, end: p.end });
    }
  }
  for (const e of resume.education) {
    if (e.city) spans.push({ city: e.city, start: e.start, end: e.end });
  }
  spans.sort((a, b) => a.start.localeCompare(b.start));

  const years: Record<string, { from: string; to: string | null }> = {};
  const order: string[] = [];
  for (const s of spans) {
    const y = years[s.city];
    if (!y) {
      years[s.city] = { from: s.start, to: s.end };
    } else if (y.to !== null && (s.end === null || s.end > y.to)) {
      y.to = s.end;
    }
    if (order[order.length - 1] !== s.city) order.push(s.city);
  }
  return { years, order };
}

function routePath(points: { x: number; y: number }[]): string {
  if (points.length < 2) return "";
  let d = `M${points[0].x} ${points[0].y}`;
  for (let i = 1; i < points.length; i++) {
    const a = points[i - 1];
    const b = points[i];
    const lift = Math.hypot(b.x - a.x, b.y - a.y) * 0.3 + 20;
    const cx = (a.x + b.x) / 2;
    const cy = Math.min(a.y, b.y) - lift;
    d += ` Q${cx.toFixed(1)} ${cy.toFixed(1)} ${b.x} ${b.y}`;
  }
  return d;
}

export default function ResumePage() {
  const resume = getResume();
  const places = countries(resume);
  const fluent = resume.languages
    .filter((l) => l.level === "Fluent")
    .map((l) => l.name);
  const websiteHost = new URL(resume.contact.website).host;

  const world = getWorldMap();
  const { years, order } = mapStops(resume);
  const stops: CityStop[] = world.cities
    .filter((c) => years[c.id])
    .map((c) => ({
      ...c,
      years: `${years[c.id].from.slice(0, 4)} → ${years[c.id].to ? years[c.id].to!.slice(0, 4) : "now"}`,
    }));
  const byId = Object.fromEntries(stops.map((c) => [c.id, c]));
  const route = routePath(order.map((id) => byId[id]).filter(Boolean));
  const journey = order.map((id) => byId[id]?.name.split(",")[0]).join(" → ");
  const firstYear = Object.values(years)
    .map((y) => y.from)
    .sort()[0]
    .slice(0, 4);

  const header = (
    <div>
      <h1 className="resume-name">{resume.name}</h1>
      <p className="resume-tagline">{resume.tagline}</p>
    </div>
  );

  return (
    <div className="resume-page">
      <ResumeDepth
        header={header}
        aside={
          <ResumeMap
            dots={world.dots}
            cities={stops}
            route={route}
            defaultTitle={journey}
            defaultYears={`${firstYear} → now`}
          />
        }
      >
        <ul className="resume-contact" aria-label="Contact">
          <li>{resume.location}</li>
          <li>
            <a href={`mailto:${resume.contact.email}`}>
              {resume.contact.email}
            </a>
          </li>
          <li>
            <a href={resume.contact.linkedin}>
              {resume.contact.linkedin.replace(/^https:\/\/(www\.)?/, "")}
            </a>
          </li>
          <li>
            <a href={resume.contact.github}>
              {resume.contact.github.replace(/^https:\/\//, "")}
            </a>
          </li>
        </ul>

        <dl className="resume-facts">
          <div>
            <dt>{yearsOfExperience(resume)} years</dt>
            <dd>building products, since 2010</dd>
          </div>
          <div>
            <dt>{places.length} countries</dt>
            <dd>{places.join(", ")}</dd>
          </div>
          <div>
            <dt>{resume.languages.length} languages</dt>
            <dd>fluent in {fluent.join(", ")}</dd>
          </div>
        </dl>

        <section
          className="resume-section resume-full"
          aria-labelledby="profile"
        >
          <h2 id="profile">Profile</h2>
          <p>{resume.summary}</p>
        </section>

        <section className="resume-section" aria-labelledby="experience">
          <h2 id="experience">Experience</h2>
          {resume.experience.map((role) => (
            <RoleEntry key={role.company} role={role} />
          ))}
        </section>

        <section className="resume-section" aria-labelledby="side-projects">
          <h2 id="side-projects">Side project</h2>
          {resume.sideProjects.map((role) => (
            <RoleEntry key={role.company} role={role} />
          ))}
        </section>

        <section className="resume-section" aria-labelledby="education">
          <h2 id="education">Education</h2>
          {resume.education.map((item) => (
            <article
              key={item.degree}
              className="resume-role"
              tabIndex={0}
              data-map-city={item.city}
              data-map-label={`${item.degree} · ${item.school} · ${item.start.slice(0, 4)} – ${item.end.slice(0, 4)}`}
            >
              <header className="resume-row">
                <h3>
                  {item.degree} · {item.school}
                </h3>
                <span className="resume-meta">
                  {item.start.slice(0, 4)} – {item.end.slice(0, 4)} ·{" "}
                  {item.location}
                </span>
              </header>
              <p className="resume-summary">{item.focus}</p>
            </article>
          ))}
        </section>

        <section className="resume-section resume-extras" aria-label="More">
          <div>
            <h2>Skills</h2>
            <p>{resume.skills.join(" · ")}</p>
          </div>
          <div>
            <h2>Languages</h2>
            <p>
              {resume.languages
                .map((l) => `${l.name} (${l.level.toLowerCase()})`)
                .join(" · ")}
            </p>
          </div>
          <div>
            <h2>Outside work</h2>
            <p>{resume.interests.join(", ")}</p>
          </div>
          <div>
            <h2>References</h2>
            <p>Available on request.</p>
          </div>
        </section>

        <p className="resume-print-footer">
          Full version: {websiteHost}/resume · {resume.contact.email}
        </p>
      </ResumeDepth>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: resume.name,
            url: `${siteConfig.url}/resume/`,
            jobTitle: resume.headline,
            address: resume.location,
            sameAs: [resume.contact.linkedin, resume.contact.github],
          }),
        }}
      />
    </div>
  );
}
