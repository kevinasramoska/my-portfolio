export default function Skills() {
  const skills = ["JavaScript", "TypeScript", "React", "Next.js", "Tailwind CSS", "Node.js"];

  return (
    <section id="skills" className="py-20 bg-[#121212] text-[#E0D7CF]">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-10">Skills</h2>

        <div className="flex flex-wrap justify-center gap-4">
          {skills.map((skill, index) => (
            <span
              key={index}
              className="px-5 py-2 rounded-full text-white font-medium 
              bg-[#5C3D2E] hover:bg-[#4A2F23] transition shadow-md"
            >
              {skill}
            </span>
          ))}
        </div>

        {/* Optional subtle divider line for consistency */}
        <div className="mt-12 w-24 h-1 bg-[#5C3D2E] mx-auto rounded-full"></div>
      </div>
    </section>
  );
}
