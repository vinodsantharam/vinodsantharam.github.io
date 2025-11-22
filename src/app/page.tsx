import Link from "next/link";

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-foreground mb-4">Welcome</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Team Lead, Frontend Engineer & UX Product Design specialist with
          passion for building scalable applications.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
        <Link
          href="/blog"
          className="block p-6 bg-card rounded-lg shadow-md hover:shadow-lg transition-shadow border border-border"
        >
          <h2 className="text-2xl font-bold text-card-foreground mb-2">Blog</h2>
          <p className="text-muted-foreground">
            Read my thoughts on software development, best practices, and
            technology trends.
          </p>
        </Link>

        <Link
          href="/about"
          className="block p-6 bg-card rounded-lg shadow-md hover:shadow-lg transition-shadow border border-border"
        >
          <h2 className="text-2xl font-bold text-card-foreground mb-2">About Me</h2>
          <p className="text-muted-foreground">
            Learn more about my background, skills, and professional experience.
          </p>
        </Link>

        <a
          href="/vinod_santharam_resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="block p-6 bg-card rounded-lg shadow-md hover:shadow-lg transition-shadow border border-border"
        >
          <h2 className="text-2xl font-bold text-card-foreground mb-2">Resume</h2>
          <p className="text-muted-foreground">
            Download my resume to see my complete professional history and
            qualifications.
          </p>
        </a>
      </div>
    </div>
  );
}
