import React from "react";
import Link from "next/link";
import { Button } from "../../../../components/ui/button";

export const TaglineSection = (): JSX.Element => {
  return (
    <section className="relative w-full py-20 md:py-32 px-4 bg-secondary-05 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0 flex items-center justify-center opacity-30 pointer-events-none">
        <img
          src="/p.png"
          alt="Quote Background"
          className="w-auto h-[200px] md:h-[400px] object-contain opacity-100 mix-blend-multiply brightness-[0.4] contrast-125 saturate-150"
        />
      </div>

      <div className="relative z-10 container mx-auto flex flex-col items-center justify-center text-center max-w-4xl">
        <span className="font-label-medium text-secondary-02 tracking-[0.2em] mb-6 uppercase text-sm md:text-base">
          Our Philosophy
        </span>

        <h2 className="font-heading-02 text-primary-01 text-3xl md:text-5xl lg:text-6xl leading-tight mb-8">
          "We believe that every space has a story to tell. Our mission is to write yours."
        </h2>

        <div className="w-24 h-1 bg-primary-01 mb-8 opacity-20"></div>

        <p className="font-body-02 text-secondary-01 text-base md:text-lg leading-relaxed max-w-2xl mb-10">
          Since 2000, INFINITY  Interiors has been at the forefront of luxury design, creating environments that inspire, comfort, and endure. We don't just fill rooms; we curate lifestyles.
        </p>

        <Link href="/about">
          <Button
            variant="outline"
            className="border-primary-01 text-primary-01 hover:bg-primary-01 hover:text-white transition-all duration-300 rounded-none px-8 py-6 tracking-widest text-sm"
          >
            DISCOVER OUR STORY
          </Button>
        </Link>
      </div>
    </section>
  );
};
