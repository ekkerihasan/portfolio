import Navbar from '@/components/Navbar';
import About from '@/components/HeroNew';
import Skills from '@/components/Skills';
import Contact from '@/components/Contact';
import Project from '@/components/ProjectCard';
import GitHubActivity from '@/components/GitHubActivity';
import Footer from '@/components/Footer';
import PageBackdrop from '@/components/PageBackdrop';

export default function Home() {
  return (
    <>
      <PageBackdrop />
      <Navbar />
      <About />
      <GitHubActivity />
      <Skills />
      <Project />
      <Contact />
      <Footer />
    </>
  );
}
