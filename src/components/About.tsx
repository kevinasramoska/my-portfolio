export default function About() {
  return (
    <section id="about" className="px-6 py-24 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-4xl rounded-3xl border border-stone-800 bg-stone-900/40 p-8 sm:p-10 lg:p-12">
        <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-stone-400">
          About
        </p>

        <h2 className="text-3xl font-bold text-stone-100 sm:text-4xl">
          Building practical software with a backend-first mindset
        </h2>

        <div className="mt-6 space-y-6 text-lg leading-8 text-stone-300">
          <p>
            I enjoy building backend systems, APIs, and full-stack applications
            that are clean, secure, and easy to maintain. My main focus is
            Java, Spring Boot, .NET, PostgreSQL, and React. I like working on
            practical software problems involving architecture,
            authentication, database design, and production-ready implementation.
          </p>

          <p>
            My internship at General Motors gave me experience working with
            enterprise software, backend services, and professional engineering
            workflows. Since then, I have continued building personal projects
            that strengthen my backend and full-stack skills.
          </p>

          <p>
            Outside of software engineering, I competed internationally as a
            judo athlete representing Ireland. That background shaped my
            approach to engineering: disciplined, consistent, and focused on
            long-term improvement.
          </p>
        </div>
      </div>
    </section>
  );
}
