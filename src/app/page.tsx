import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import FeaturedProject from "@/components/FeaturedProject";

export default function Home() {
  return (
    <div>
      <Header />
      <main>
        <Hero />
        <About />
        {/* <FeaturedProject /> */}
        <Projects />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}