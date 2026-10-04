import type { Metadata } from "next";
import { Martian_Mono, Work_Sans } from "next/font/google";
import { ResumeDepth } from "@/components/resume/ResumeDepth";
import {
  countries,
  formatRange,
  getResume,
  roleYears,
  yearsOfExperience,
  type Role,
} from "@/lib/resume";
import { siteConfig } from "@/lib/site";
import "./resume.css";

const mono = Martian_Mono({
  subsets: ["latin"],
  variable: "--resume-font-mono",
  display: "swap",
});

const sans = Work_Sans({
  subsets: ["latin"],
  variable: "--resume-font-sans",
  display: "swap",
});

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
    <article className="resume-role">
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

export default function ResumePage() {
  const resume = getResume();
  const places = countries(resume);
  const fluent = resume.languages
    .filter((l) => l.level === "Fluent")
    .map((l) => l.name);
  const websiteHost = new URL(resume.contact.website).host;

  const header = (
    <div>
      <h1 className="resume-name">{resume.name}</h1>
      <p className="resume-tagline">{resume.tagline}</p>
    </div>
  );

  return (
    <div className={`${mono.variable} ${sans.variable} resume-page`}>
      <ResumeDepth header={header}>
        <ul className="resume-contact" aria-label="Contact">
          <li>{resume.location}</li>
          <li>
            <a href={`mailto:${resume.contact.email}`}>{resume.contact.email}</a>
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

        <section className="resume-section resume-full" aria-labelledby="profile">
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
            <article key={item.degree} className="resume-role">
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
