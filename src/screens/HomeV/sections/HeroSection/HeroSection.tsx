"use client";

import Link from "next/link";
import { Button } from "../../../../components/ui/button";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

export const HeroSection = (): JSX.Element => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative w-full h-[100svh] min-h-[600px] flex items-center justify-center overflow-hidden bg-[#0F2557]">
      {/* Background Image with Parallax */}
      <div 
        className="absolute inset-0 w-full h-full"
        style={{ transform: `translateY(${scrollY * 0.5}px)` }}
      >
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat w-full h-full"
          style={{ backgroundImage: 'url("/hero.png")' }}
        />
        {/* Gradient Overlay for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F2557] via-[#0F2557]/40 to-transparent" />
        <div className="absolute inset-0 bg-[#0F2557]/20" /> {/* Slight overall darkening */}
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 h-full flex flex-col justify-end pb-24 md:pb-32">
        <div className="max-w-4xl">
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-150 fill-mode-both">
            <span className="inline-block text-[#A0A0A0] font-mono tracking-[0.3em] uppercase text-sm md:text-base mb-6">
              Welcome to the New Standard
            </span>
          </div>
          
          <h1 className="animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300 fill-mode-both font-serif text-5xl md:text-7xl lg:text-8xl text-white leading-[1.1] tracking-tight mb-8">
            Crafting Timeless <br className="hidden md:block" /> 
            <span className="italic text-[#A0A0A0]">Luxury Spaces</span>
          </h1>
          
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500 fill-mode-both">
            <p className="font-sans text-lg md:text-xl text-white/80 max-w-2xl mb-12 leading-relaxed font-light">
              Experience the premier interior design destination where architectural precision meets uncompromising elegance.
            </p>

            <div className="flex flex-col sm:flex-row gap-6">
              <Link href="/portfolio">
                <Button
                  className="bg-[#A0A0A0] text-[#0F2557] hover:bg-white hover:text-[#0F2557] rounded-none px-10 py-7 text-sm tracking-[0.2em] font-bold uppercase transition-all duration-300 w-full sm:w-auto"
                >
                  View Portfolio
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  variant="outline"
                  className="border-[#A0A0A0] text-white bg-transparent hover:bg-[#A0A0A0] hover:text-[#0F2557] rounded-none px-10 py-7 text-sm tracking-[0.2em] font-bold uppercase transition-all duration-300 w-full sm:w-auto flex items-center justify-center gap-3 group"
                >
                  Start Project
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};