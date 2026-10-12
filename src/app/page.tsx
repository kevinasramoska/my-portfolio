import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ExperienceTimeline from "@/components/ExperienceTimeline";
import JsonLd from "@/components/JsonLd";
import { homeStructuredData } from "@/lib/structured-data";

export default function Home() {
  return (
    <div className="portfolio-page">
      <JsonLd data={homeStructuredData} />
      <Header />
      <main id="main-content" tabIndex={-1} className="relative z-10">
        <Hero />
        <ExperienceTimeline />
        <Projects />
        <Skills />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
