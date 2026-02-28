"use client";
import Hero from "@/components/Hero";
import HeroHUD from "@/components/HeroHUD";
import Navbar from "@/components/Navbar";
import Services from "@/components/Services";
import Gallery from "@/components/Gallery";
import Testimonials from "@/components/Testimonials";
import WhyChooseUs from "@/components/WhyChooseUs";
import { useEffect, useState } from "react";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <div className="bg-zinc-950 selection:bg-amber-500 selection:text-slate-900">
      <HeroHUD />
      <Navbar isScrolled={isScrolled} />
      <Hero />
      <Services />
      <Gallery />
      <WhyChooseUs />
      <Testimonials />
      <CTASection />
      <Footer />
    </div>
  );
}
