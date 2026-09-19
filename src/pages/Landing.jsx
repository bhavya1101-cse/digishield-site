import Hero from "../sections/Hero.jsx";
import Features from "../sections/Features.jsx";
import Differentiators from "../sections/Differentiators.jsx";
import DataSources from "../sections/DataSources.jsx";
import Architecture from "../sections/Architecture.jsx";
import Footer from "../sections/Footer.jsx";

export default function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <Features />
      <Differentiators />
      <DataSources />
      <Architecture />
      <Footer />
    </div>
  );
}