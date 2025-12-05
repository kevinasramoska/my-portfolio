export default function Projects() {
  const projects = [
    {
      title: "Crypto Portfolio Tracker",
      description:
        "Full-stack crypto portfolio system featuring JWT-secured Spring Boot APIs, PostgreSQL schema design, real-time price integration, and a responsive Next.js frontend.",
      link: "https://github.com/kevinasramoska/crypto-portfolio-app.git",
    },
    {
      title: "RentRight Property Management System",
      description:
        "A full-stack property management platform built with ASP.NET Core MVC 9, EF Core, SQL Server, and Azure App Service deployment. Features landlord/tenant management, property listings, authentication, and fully containerized local development with Docker.",
      link: "https://github.com/kevinasramoska/RentRight.git",
},

  ];

  return (
    <section id="projects" className="py-20 bg-[#121212] text-[#E0D7CF]">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">My Projects</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="p-6 rounded-xl bg-[#1A1A1A] border border-[#2A2A2A] shadow-lg
              hover:shadow-xl transition transform hover:-translate-y-1"
            >
              <h3 className="text-2xl font-semibold mb-3 text-[#E0D7CF]">
                {project.title}
              </h3>

              <p className="text-[#D4C9C1] mb-6 leading-relaxed">
                {project.description}
              </p>

              <a
                href={project.link}
                target="_blank"
                className="inline-block px-5 py-2 rounded-lg bg-[#5C3D2E] text-white 
                font-semibold hover:bg-[#4A2F23] transition"
              >
                Github →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
