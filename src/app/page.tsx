import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
// import FeaturedProject from "@/components/FeaturedProject";
import ExperienceTimeline from "@/components/ExperienceTimeline";
import WhatImLookingFor from "@/components/WhatImLookingFor";
// import GitHubActivity from "@/components/GitHubActivity";

export default function Home() {
  return (
    <div>
      <Header />
      <main>
        <Hero />
        <About />
        <WhatImLookingFor />
        <ExperienceTimeline /> 
        {/* <FeaturedProject /> */}
        <Projects />
        {/* <GitHubActivity /> */}
        <Skills />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}