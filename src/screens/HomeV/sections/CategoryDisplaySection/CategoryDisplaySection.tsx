"use client";

import Link from "next/link";
import { Button } from "../../../../components/ui/button";
import { ArrowRight } from "lucide-react";

const categories = [
  {
    name: "Luxury",
    count: "Residences",
    image: "/bedroom.png",
    description: "Personalized sanctuaries tailored to your lifestyle."
  },
  {
    name: "Corporate",
    count: "Spaces",
    image: "/office.png",
    description: "Environments that foster productivity and brand identity."
  },
  {
    name: "Bespoke",
    count: "Joinery",
    image: "/kitchen.png",
    description: "Custom millwork crafted with uncompromising precision."
  },
  {
    name: "Architectural",
    count: "Planning",
    image: "/hero.png",
    description: "Holistic design from conception to structural elegance."
  }
];

export const CategoryDisplaySection = (): JSX.Element => {
  return (
    <section className="relative w-full bg-white py-24 md:py-32 px-4 md:px-8">
      <div className="container mx-auto max-w-[1400px]">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 md:mb-24 gap-8">
          <div className="max-w-2xl">
            <span className="font-mono text-sm tracking-[0.3em] text-[#A0A0A0] uppercase block mb-6 font-bold">
              Our Expertise
            </span>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-7xl text-[#0F2557] leading-[1.1]">
              Defining the Art of <span className="italic text-[#A0A0A0]">Spatial Design</span>
            </h2>
          </div>
          
          <Link href="/services" className="hidden md:block">
            <Button variant="outline" className="border-[#0F2557] text-[#0F2557] rounded-none px-8 py-6 uppercase tracking-widest text-xs hover:bg-[#0F2557] hover:text-white transition-all">
              View All Services
            </Button>
          </Link>
        </div>

        {/* Staggered Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
          {categories.map((category, index) => (
            <div 
              key={index} 
              className={`group relative overflow-hidden bg-[#f8f9fa] ${index % 2 !== 0 ? 'md:mt-24' : ''}`}
            >
              {/* Image Container with precise aspect ratio */}
              <div className="relative w-full aspect-[4/5] overflow-hidden">
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-out group-hover:scale-110"
                  style={{ backgroundImage: `url(${category.image})` }}
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F2557]/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
              </div>

              {/* Content Overlay */}
              <div className="absolute inset-x-0 bottom-0 p-8 md:p-12 text-white">
                <h3 className="font-serif text-3xl md:text-4xl mb-2">{category.name} <span className="italic text-[#A0A0A0]">{category.count}</span></h3>
                
                <div className="h-0 overflow-hidden group-hover:h-[4rem] transition-all duration-500 ease-out">
                  <p className="font-sans text-white/80 mt-4 font-light leading-relaxed">
                    {category.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile CTA */}
        <div className="mt-16 flex justify-center md:hidden">
          <Link href="/services" className="w-full">
            <Button variant="outline" className="w-full border-[#0F2557] text-[#0F2557] rounded-none py-6 uppercase tracking-widest text-xs">
              View All Services
            </Button>
          </Link>
        </div>

      </div>
    </section>
  );
};
