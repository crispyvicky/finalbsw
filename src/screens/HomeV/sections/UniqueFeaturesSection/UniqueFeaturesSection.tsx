"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Sparkles, Hammer, Palette, ShieldCheck } from "lucide-react";

const features = [
  {
    id: "01",
    title: "Bespoke Interiors",
    description: "Tailored spaces that reflect your personality. From expansive living areas to intimate reading nooks, every corner is designed with intention and purpose.",
    icon: <Sparkles className="w-8 h-8 md:w-12 md:h-12 text-[#A0A0A0] stroke-[1.5]" />
  },
  {
    id: "02",
    title: "Modular Mastery",
    description: "Functional elegance for modern living. Our custom modular kitchens and wardrobe systems blend seamless aesthetics with uncompromising utility.",
    icon: <Hammer className="w-8 h-8 md:w-12 md:h-12 text-[#A0A0A0] stroke-[1.5]" />
  },
  {
    id: "03",
    title: "Curated Finishes",
    description: "The finishing touches that elevate a house to a luxury estate. We source the finest materials, lighting, and textures to complete your vision.",
    icon: <Palette className="w-8 h-8 md:w-12 md:h-12 text-[#A0A0A0] stroke-[1.5]" />
  },
  {
    id: "04",
    title: "The BSW Promise",
    description: "Our commitment to quality, timely delivery, and white-glove installation ensures a stress-free transformation of your most valued spaces.",
    icon: <ShieldCheck className="w-8 h-8 md:w-12 md:h-12 text-[#A0A0A0] stroke-[1.5]" />
  }
];

export const UniqueFeaturesSection = (): JSX.Element => {
  const [activeFeature, setActiveFeature] = useState(features[0].id);

  return (
    <section className="w-full py-24 md:py-32 px-4 md:px-8 bg-[#0F2557]">
      <div className="container mx-auto max-w-[1400px]">
        
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          
          {/* Left Column: Sticky Title */}
          <div className="lg:w-1/3">
            <div className="sticky top-32 space-y-8">
              <span className="font-mono text-sm tracking-[0.3em] text-[#A0A0A0] uppercase block font-bold">
                Why Choose Us
              </span>
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-[1.1]">
                Comprehensive <br />
                <span className="italic text-[#A0A0A0]">Design Excellence</span>
              </h2>
              <div className="w-24 h-[1px] bg-[#A0A0A0]/30"></div>
              <p className="font-sans text-white/70 text-lg leading-relaxed max-w-sm font-light">
                We manage every detail of your project, from initial concept to the final, flawless execution.
              </p>
            </div>
          </div>

          {/* Right Column: Scrollable Feature List */}
          <div className="lg:w-2/3 flex flex-col gap-8 md:gap-12">
            {features.map((feature) => (
              <div 
                key={feature.id}
                onMouseEnter={() => setActiveFeature(feature.id)}
                className={cn(
                  "flex flex-col md:flex-row gap-8 p-8 md:p-12 border transition-all duration-500 cursor-default",
                  activeFeature === feature.id 
                    ? "bg-white/5 border-[#A0A0A0]/50 translate-x-0 md:-translate-x-4" 
                    : "bg-transparent border-white/10 hover:border-white/30"
                )}
              >
                {/* Icon & Number */}
                <div className="flex items-start justify-between md:flex-col md:justify-start gap-6 min-w-[80px]">
                  <span className="font-mono text-4xl md:text-5xl font-bold text-[#A0A0A0]/30">
                    {feature.id}
                  </span>
                  <div className={cn(
                    "transition-all duration-500",
                    activeFeature === feature.id ? "opacity-100 scale-110" : "opacity-40"
                  )}>
                    {feature.icon}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 space-y-4">
                  <h3 className={cn(
                    "font-serif text-2xl md:text-3xl transition-colors duration-500",
                    activeFeature === feature.id ? "text-white" : "text-white/70"
                  )}>
                    {feature.title}
                  </h3>
                  <p className="font-sans text-white/60 text-lg leading-relaxed font-light">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};
