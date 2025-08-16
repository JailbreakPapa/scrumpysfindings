import About from '@/components/about/About';
import Articles from '@/components/articles/Articles';
import Contact from '@/components/contact/Contact';
import Hero from '@/components/hero/Hero';
import ProjectsSection from '@/components/projects/ProjectsSection';
import Techs from '@/components/techs/Techs';
import { Win96Desktop } from '@/components/ui/win96-desktop';

export default function Home() {
  return (
    <>
      <Win96Desktop />
      <div className="relative z-10">
        <Hero />
        <About />
        <Techs />
        <ProjectsSection />
        <Articles />
        <Contact />
      </div>
    </>
  );
}
