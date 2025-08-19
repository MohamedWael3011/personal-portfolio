import Footer from "../Footer";
import About from "../sections/About";
import Contact from "../sections/Contact";
import Education from "../sections/Education";
import Experience from "../sections/Experience";
import Home from "../sections/Home";
import Projects from "../sections/Projects";
import Skills from "../sections/Skills";
import SideBar from "../SideBar";

export default function HomePage() {
  return (
    <>
      <SideBar />
      <div className="md:pl-[110px]">
        <Home />
        <About />
        <Experience />
        <Education />
        <Skills />
        <Projects />
        <Contact />
        <Footer />
      </div>
    </>
  );
}
