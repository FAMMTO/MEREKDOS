import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Certifications from "@/components/Certifications";
import Location from "@/components/Location";

export default function Home() {
  return (
    <div className="relative z-10 flex min-h-screen flex-col">
      <Navbar />
      <Hero />
      <Services />
      <Certifications />
      <Location />
    </div>
  );
}
