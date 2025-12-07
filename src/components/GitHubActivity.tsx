export default function GitHubActivity() {
  const repos = [
    {
      name: "Crypto Portfolio Tracker",
      description: "Full-stack crypto tracking system with Spring Boot, PostgreSQL, JWT, and Next.js.",
      link: "https://github.com/kevinasramoska/crypto-portfolio-app",
    },
    {
      name: "RentRight Property Management",
      description: "ASP.NET Core MVC property management platform with EF Core and SQL Server.",
      link: "https://github.com/kevinasramoska/RentRight",
    },
    {
      name: "My Portfolio",
      description: "Personal portfolio built with Next.js, Tailwind CSS, and modern UI design.",
      link: "https://github.com/kevinasramoska/my-portfolio",
    },
  ];

  return (
    <section className="py-20 bg-[#121212] text-[#E0D7CF]">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">GitHub Activity</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {repos.map((repo, index) => (
            <div
              key={index}
              className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl p-6 shadow-lg 
              hover:shadow-xl transition transform hover:-translate-y-1"
            >
              <h3 className="text-xl font-semibold mb-2">{repo.name}</h3>

              <p className="text-sm text-[#D4C9C1] mb-4">
                {repo.description}
              </p>

              <a
                href={repo.link}
                target="_blank"
                className="text-[#5C3D2E] font-semibold hover:underline"
                rel="noreferrer"
              >
                View on GitHub →
              </a>
            </div>
          ))}
        </div>

        <div className="mt-12 w-24 h-1 bg-[#5C3D2E] mx-auto rounded-full"></div>
      </div>
    </section>
  );
}
