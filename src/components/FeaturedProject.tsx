export default function FeaturedProject() {
  return (
    <section id="featured" className="py-20 bg-[#121212] text-[#E0D7CF]">
      <div className="container mx-auto px-4">
        
        <h2 className="text-4xl font-bold text-center mb-12">
          Featured Project
        </h2>

        <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl p-8 shadow-xl max-w-4xl mx-auto">
          
          {/* Project Title */}
          <h3 className="text-3xl font-semibold mb-4 text-[#E0D7CF]">
            Crypto Portfolio Tracker
          </h3>

          {/* Tech Stack */}
          <p className="text-lg mb-6 text-[#D4C9C1]">
            <span className="font-semibold text-[#E0D7CF]">Tech:</span>{" "}
            Java 21, Spring Boot 3.5, PostgreSQL, JWT Authentication, Next.js Frontend
          </p>

          {/* Challenges Solved */}
          <div className="mb-8">
            <h4 className="text-2xl font-bold mb-3">Challenges Solved</h4>
            <ul className="list-disc pl-6 space-y-2 text-[#D4C9C1]">
              <li>Designing scalable entity relationships for user portfolios and transactions</li>
              <li>Implementing secure, production-level JWT token API authentication</li>
              <li>Integrating real-time crypto price data from third-party APIs</li>
              <li>Building full CRUD support: assets, portfolios, transactions, analytics</li>
            </ul>
          </div>

          {/* Screenshots Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="rounded-lg bg-[#2A2A2A] h-40 flex items-center justify-center text-[#D4C9C1]">
              Dashboard Screenshot
            </div>
            <div className="rounded-lg bg-[#2A2A2A] h-40 flex items-center justify-center text-[#D4C9C1]">
              Auth Page Screenshot
            </div>
            <div className="rounded-lg bg-[#2A2A2A] h-40 flex items-center justify-center text-[#D4C9C1]">
              Portfolio Screenshot
            </div>
          </div>

          {/* Buttons */}
          <div className="flex space-x-4">
            <a
              href="https://github.com/kevinasramoska/crypto-portfolio-app"
              target="_blank"
              className="px-5 py-3 rounded-lg bg-[#5C3D2E] hover:bg-[#4A2F23] transition font-semibold text-white"
            >
              GitHub →
            </a>

            {/* Optional: Live Demo */}
            {/* 
            <a
              href="https://your-live-demo-link.com"
              target="_blank"
              className="px-5 py-3 rounded-lg border border-[#5C3D2E] text-[#5C3D2E] hover:bg-[#5C3D2E] hover:text-white transition font-semibold"
            >
              Live Demo
            </a>
            */}
          </div>
        </div>
      </div>
    </section>
  );
}
