import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Judo from "@/components/Judo";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ExperienceTimeline from "@/components/ExperienceTimeline";
import CurrentFocus from "@/components/CurrentFocus";
import Writing from "@/components/Writing";
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
        <CurrentFocus />
        <Projects />
        <Skills />
        <Writing />
        <About />
        <Judo />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
