import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ExperienceTimeline from "@/components/ExperienceTimeline";

export default function Home() {
  return (
    <div>
      <Header />
      <main>
        <Hero />
        <About />
        <ExperienceTimeline /> 
        <Projects />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}