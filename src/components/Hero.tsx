export default function Hero() {
    return (
      <section className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white">
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-4">Hi, I am Kevinas Ramoska</h1>
          <p className="text-xl mb-6">Software Engineer | Full-Stack Developer</p>
          <a
            href="#contact"
            className="bg-white text-blue-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-200"
          >
            Get in Touch
          </a>
        </div>
      </section>
    );
  }