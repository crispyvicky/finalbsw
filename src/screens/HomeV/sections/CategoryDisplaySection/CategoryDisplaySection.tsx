"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "../../../../components/ui/button";

const categories = [
  {
    name: "Residential",
    count: "Interiors",
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4f9d?q=100&w=2000",
    sideImageLeft: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?q=100&w=2000",
    sideImageRight: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?q=100&w=2000"
  },
  {
    name: "Commercial",
    count: "Spaces",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=100&w=2000",
    sideImageLeft: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=100&w=2000",
    sideImageRight: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=100&w=2000"
  },
  {
    name: "Renovation",
    count: "& Restoration",
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=100&w=2000",
    sideImageLeft: "https://images.unsplash.com/photo-1588854337221-4cf9fa96059c?q=100&w=2000",
    sideImageRight: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=100&w=2000"
  },
  {
    name: "Bespoke",
    count: "Furniture",
    image: "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?q=100&w=2000",
    sideImageLeft: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?q=100&w=2000",
    sideImageRight: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?q=100&w=2000"
  },
  {
    name: "Turnkey",
    count: "Execution",
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=100&w=2000",
    sideImageLeft: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?q=100&w=2000",
    sideImageRight: "https://images.unsplash.com/photo-1503174971373-b1f69850bded?q=100&w=2000"
  },
];

export const CategoryDisplaySection = (): JSX.Element => {
  const [activeIndex, setActiveIndex] = useState(1);

  return (
    <section className="relative w-full bg-secondary-05 py-16 md:py-[100px] px-4 overflow-hidden">
      <div className="flex flex-col items-center gap-12 md:gap-[83px] max-w-[1400px] mx-auto w-full relative">

        {/* Section Title */}
        <div className="font-label-medium font-[number:var(--label-medium-font-weight)] 
          text-primary-01 text-sm md:text-[length:var(--label-medium-font-size)]
          text-center tracking-[var(--label-medium-letter-spacing)]
          leading-[var(--label-medium-line-height)] 
          [font-style:var(--label-medium-font-style)]">
          OUR EXPERTISE
        </div>

        {/* Dynamic Image Container */}
        <div className="relative flex justify-center w-full min-h-[500px]">

          {/* Side Image Left (Arched) */}
          <div className="hidden lg:block absolute left-0 top-1/2 -translate-y-1/2 w-[280px] h-[400px] rounded-tr-[140px] rounded-tl-[10px] rounded-bl-[10px] rounded-br-[10px] overflow-hidden transition-all duration-500 ease-in-out">
            <img
              src={categories[activeIndex].sideImageLeft}
              alt="Left Detail"
              className="w-full h-full object-cover opacity-90 hover:scale-110 transition-transform duration-700"
            />
          </div>

          {/* Side Image Right (Arched) */}
          <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-[280px] h-[400px] rounded-tl-[140px] rounded-tr-[10px] rounded-br-[10px] rounded-bl-[10px] overflow-hidden transition-all duration-500 ease-in-out">
            <img
              src={categories[activeIndex].sideImageRight}
              alt="Right Detail"
              className="w-full h-full object-cover opacity-90 hover:scale-110 transition-transform duration-700"
            />
          </div>

          {/* Center List */}
          <div className="flex flex-col justify-center items-center gap-6 md:gap-8 z-10 w-full md:w-auto">
            {categories.map((category, index) => (
              <div
                key={index}
                className="group cursor-pointer flex flex-col items-center transition-all duration-500"
                onMouseEnter={() => setActiveIndex(index)}
                onClick={() => setActiveIndex(index)}
              >
                <div className="flex items-center justify-center gap-2 md:gap-4">
                  <h3
                    className={`font-heading-04 transition-all duration-500 ease-out
                        ${index === activeIndex
                        ? "text-4xl md:text-5xl lg:text-7xl text-primary-01 scale-110 font-medium"
                        : "text-2xl md:text-4xl text-secondary-02/40 scale-100 font-light hover:text-secondary-02/70"}`}
                  >
                    {category.name}
                  </h3>

                  <span
                    className={`font-label-medium text-sm md:text-base tracking-widest uppercase transition-all duration-500 whitespace-nowrap
                        ${index === activeIndex ? "text-primary-01 opacity-100 translate-x-2" : "text-secondary-02/40 opacity-50"}`}
                  >
                    {category.count}
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* CTA Button */}
        {/* CTA Button Area */}
        <div className="w-full relative flex items-center justify-center mt-12 mb-8">
          <Link href="/portfolio" className="relative z-20">
            <Button
              variant="link"
              className="h-auto p-0 font-button-01 font-[number:var(--button-01-font-weight)]
                text-primary-01 text-[length:var(--button-01-font-size)]
                tracking-[var(--button-01-letter-spacing)]
                leading-[var(--button-01-line-height)]
                underline [font-style:var(--button-01-font-style)]"
            >
              SEE MORE
            </Button>
          </Link>

          {/* Decorative Image */}
          <div className="absolute h-auto pointer-events-none z-0 transition-all duration-500
            top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
            w-[220px] md:w-[350px] opacity-15">
            <img
              src="/seemore.png"
              alt=""
              className="w-full h-full object-contain"
            />
          </div>
        </div>

      </div>
    </section>
  );
};
