export default function Projects() {
    const projects = [
      {
        title: "Project One",
        description: "A web app built with Next.js and Tailwind CSS.",
        link: "https://github.com/yourusername/project-one",
      },
      {
        title: "Project Two",
        description: "A mobile-friendly e-commerce platform.",
        link: "https://github.com/yourusername/project-two",
      },
      {
        title: "Project Three",
        description: "A mobile-friendly e-commerce platform.",
        link: "https://github.com/yourusername/project-two",
      },
    ];
  
    return (
      <section id="projects" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">My Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project, index) => (
              <div key={index} className="p-6 bg-gray-100 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                <p className="text-gray-700 mb-4">{project.description}</p>
                <a
                  href={project.link}
                  target="_blank"
                  className="text-blue-600 hover:underline"
                >
                  View Project
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }