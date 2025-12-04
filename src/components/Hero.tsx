export default function Hero() {
  return (
    <section className="min-h-screen bg-gradient-to-br from-[#121212] to-[#1A1A1A] 
    flex items-center justify-center text-[#E0D7CF]">
      <div className="text-center px-4">
        <h1 className="text-5xl font-bold mb-4">Hi, I am Kevinas Ramoska</h1>

        <p className="text-xl mb-6 text-[#d4c9c1]">
          Software Engineer | Full-Stack Developer
        </p>

        <a
          href="#contact"
          className="px-6 py-3 rounded-full bg-[#5C3D2E] text-white hover:bg-[#4A2F23] transition"
        >
          Get in Touch
        </a>
      </div>
    </section>
  );
}
