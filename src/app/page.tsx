import Navbar from '@/components/Navbar';
import About from '@/components/HeroNew';
import Skills from '@/components/Skills';
import Contact from '@/components/Contact';
import Project from '@/components/ProjectCard';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <About />
      <Skills />
      <Project />
      <Contact />
      <Footer />
    </>
  );
}
