"use client";

import React from "react";
import Link from "next/link";
import { Button } from "../../../../components/ui/button";
import { ArrowRight } from "lucide-react";

export const TaglineSection = (): JSX.Element => {
  return (
    <section className="relative w-full py-24 md:py-40 px-4 md:px-8 bg-white overflow-hidden">
      
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-[#f8f9fa] skew-x-12 transform origin-top-right -z-10"></div>
      
      <div className="container mx-auto max-w-[1400px] relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
          
          {/* Typographic Left Side */}
          <div className="lg:w-3/5 space-y-12 relative">
            {/* Absolute decorative accent */}
            <div className="absolute -top-12 -left-8 text-9xl font-serif text-[#0F2557]/5 select-none pointer-events-none">
              "
            </div>

            <span className="font-mono text-[#A0A0A0] tracking-[0.3em] uppercase text-sm md:text-base font-bold block">
              The BSW Philosophy
            </span>

            <h2 className="font-serif text-[#0F2557] text-4xl md:text-5xl lg:text-7xl leading-[1.1] relative z-10">
              Architecture is the learned game, <br className="hidden md:block" />
              <span className="italic text-[#A0A0A0]">correct and magnificent,</span> <br className="hidden md:block" />
              of forms assembled in the light.
            </h2>
          </div>

          {/* Right Side Content */}
          <div className="lg:w-2/5 flex flex-col items-start lg:pl-12 border-l border-[#A0A0A0]/30 space-y-8">
            
            <p className="font-sans text-slate-600 text-lg md:text-xl leading-relaxed font-light">
              At BSW Interiors, we honor the craft of creating spaces that inspire. Every element is meticulously chosen to deliver an uncompromising standard of luxury and comfort, tailored exclusively for you.
            </p>

            <Link href="/about" className="inline-block mt-4">
              <Button
                variant="ghost"
                className="group h-auto p-0 text-[#0F2557] hover:bg-transparent hover:text-[#A0A0A0] font-mono tracking-widest uppercase text-sm font-bold flex items-center gap-3 transition-colors duration-300"
              >
                Discover Our Story
                <span className="w-10 h-[1px] bg-[#0F2557] group-hover:bg-[#A0A0A0] transition-colors duration-300"></span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
              </Button>
            </Link>

          </div>
        </div>
      </div>
    </section>
  );
};
