export default function Hero() {
  return (
    <section className="min-h-screen bg-gradient-to-br from-[#121212] to-[#1A1A1A] 
    flex items-center justify-center text-[#E0D7CF]">
      <div className="text-center px-4 max-w-2xl">

        <h1 className="text-5xl font-bold mb-4">
          Hi, I am Kevinas Ramoska
        </h1>

        {/* Strong 1-line positioning statement */}
        <p className="text-xl mb-6 text-[#d4c9c1]">
          Full-Stack Software Engineer specialising in Java, Spring Boot & .NET systems
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#contact"
            className="px-6 py-3 rounded-full bg-[#5C3D2E] text-white 
            hover:bg-[#4A2F23] transition font-semibold"
          >
            Get in Touch
          </a>

          <a
            href="/Kevinas-Ramoska-Resume.pdf"
            download
            className="px-6 py-3 rounded-full border border-[#5C3D2E] 
            text-[#5C3D2E] hover:bg-[#5C3D2E] hover:text-white 
            transition font-semibold"
          >
            Download Resume
          </a>
        </div>

      </div>
    </section>
  );
}
