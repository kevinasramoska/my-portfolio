export default function About() {
  return (
    <section id="about" className="py-20 bg-[#121212] text-[#E0D7CF]">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-8">About Me</h2>

        <p className="text-lg leading-relaxed max-w-3xl mx-auto text-[#D4C9C1]">
          I am a results-driven software engineer with hands-on experience building full-stack web
          applications using <span className="text-[#E0D7CF] font-medium">Java, Spring Boot, C#, ASP.NET Core,
          PostgreSQL, and modern frontend frameworks like React and Next.js</span>.
          I specialise in designing clean APIs, secure authentication flows, and scalable data-driven systems.
          <br /><br />
          I am currently seeking a
          <span className="text-[#E0D7CF] font-medium"> junior to mid-level software engineering role</span>
          where I can contribute to a collaborative engineering team, continue developing my backend expertise,
          and build scalable, high-impact software products.
        </p>

        <div className="mt-12 w-24 h-1 bg-[#5C3D2E] mx-auto rounded-full"></div>
      </div>
    </section>
  );
}
