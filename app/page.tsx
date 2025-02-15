import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Experience from './components/Experience';
import Portfolio from './components/Portfolio';
import Contact from './components/Contact';

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="scroll-container">
        <section id="about" className="snap-section">
          <Hero />
        </section>
        <section id="experience" className="snap-section">
          <Experience />
        </section>
        <section id="portfolio" className="snap-section">
          <Portfolio />
        </section>
        <section id="contact" className="snap-section">
          <Contact />
        </section>
      </main>
    </>
  );
}
