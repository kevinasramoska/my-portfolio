export default function Skills() {
    const skills = ["JavaScript", "TypeScript", "React", "Next.js", "Tailwind CSS", "Node.js"];
  
    return (
      <section id="skills" className="py-20 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Skills</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {skills.map((skill, index) => (
              <span
                key={index}
                className="bg-blue-600 text-white px-4 py-2 rounded-full"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </section>
    );
  }