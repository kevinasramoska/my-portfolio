export default function About() {
  return (
    <section id="about" className="py-20 bg-[#121212] text-[#E0D7CF]">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-8">About Me</h2>

        <p className="text-lg leading-relaxed max-w-2xl mx-auto text-[#D4C9C1]">
          I am a passionate software engineer with experience in building web applications using modern
          technologies like React, Next.js, and Node.js. I love solving complex problems and creating
          user-friendly solutions.
        </p>

        {/* Optional subtle divider line for a premium feel */}
        <div className="mt-10 w-24 h-1 bg-[#5C3D2E] mx-auto rounded-full"></div>
      </div>
    </section>
  );
}
