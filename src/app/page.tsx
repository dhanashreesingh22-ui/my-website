import About from "@/components/About";
import Archive from "@/components/Archive";
import Contact from "@/components/Contact";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Results from "@/components/Results";
import Work from "@/components/Work";

export default function Home() {
  return (
    <main>
      <Hero />
      <Marquee />
      <Work />
      <Results />
      <About />
      <Archive />
      <Contact />
    </main>
  );
}
