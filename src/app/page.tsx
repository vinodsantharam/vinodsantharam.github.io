import Link from "next/link";

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">Welcome</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Team Lead, Frontend Engineer & UX Product Design specialist with
          passion for building scalable applications.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
        <Link
          href="/blog"
          className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Blog</h2>
          <p className="text-gray-600">
            Read my thoughts on software development, best practices, and
            technology trends.
          </p>
        </Link>

        <Link
          href="/about"
          className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-2">About Me</h2>
          <p className="text-gray-600">
            Learn more about my background, skills, and professional experience.
          </p>
        </Link>

        <a
          href="/vinod_santharam_resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Resume</h2>
          <p className="text-gray-600">
            Download my resume to see my complete professional history and
            qualifications.
          </p>
        </a>
      </div>
    </div>
  );
}
