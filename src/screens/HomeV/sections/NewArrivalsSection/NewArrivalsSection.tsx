"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { projects } from "@/data/projects";

// Triple the projects to create a seamless infinite loop buffer
// [Set 1 (Buffer)] [Set 2 (Main)] [Set 3 (Buffer)]
const allProjects = [...projects, ...projects, ...projects];

export const NewArrivalsSection = (): JSX.Element => {
  const [currentIndex, setCurrentIndex] = useState(projects.length);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [cardStride, setCardStride] = useState(324);
  const carouselRef = useRef<HTMLDivElement>(null);
  const autoScrollRef = useRef<NodeJS.Timeout | null>(null);

  // Responsive stride calculation
  useEffect(() => {
    const updateStride = () => {
      // Mobile: 280px card + 24px gap = 304px
      // Desktop: 300px card + 24px gap = 324px
      if (window.innerWidth < 768) {
        setCardStride(304);
      } else {
        setCardStride(324);
      }
    };

    updateStride();
    window.addEventListener("resize", updateStride);
    return () => window.removeEventListener("resize", updateStride);
  }, []);

  const nextSlide = useCallback(() => {
    if (!isTransitioning) setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
  }, [isTransitioning]);

  const prevSlide = useCallback(() => {
    if (!isTransitioning) setIsTransitioning(true);
    setCurrentIndex((prev) => prev - 1);
  }, [isTransitioning]);

  // Auto-scroll
  useEffect(() => {
    startAutoScroll();
    return () => stopAutoScroll();
  }, [nextSlide]);

  const startAutoScroll = () => {
    if (autoScrollRef.current) clearInterval(autoScrollRef.current);
    autoScrollRef.current = setInterval(() => {
      nextSlide();
    }, 4000);
  };

  const stopAutoScroll = () => {
    if (autoScrollRef.current) {
      clearInterval(autoScrollRef.current);
      autoScrollRef.current = null;
    }
  };

  const handleTransitionEnd = () => {
    // Check if we've scrolled into the third set (end buffer)
    if (currentIndex >= 2 * projects.length) {
      setIsTransitioning(false);
      setCurrentIndex(currentIndex - projects.length);
    }
    // Check if we've scrolled into the first set (start buffer)
    else if (currentIndex < projects.length) {
      setIsTransitioning(false);
      setCurrentIndex(currentIndex + projects.length);
    }
  };

  return (
    <section className="w-full py-24 md:py-32 px-4 md:px-8 bg-white overflow-hidden border-t border-[#0F2557]/10">
      <div className="container mx-auto flex flex-col lg:flex-row gap-12 md:gap-24">
        {/* Text Column */}
        <div className="flex flex-col gap-6 md:gap-8 lg:w-[400px] flex-shrink-0">
          <div className="flex flex-col gap-4">
            <span className="font-mono text-sm tracking-[0.3em] text-[#A0A0A0] uppercase font-bold">
              Recent Works
            </span>
            <h2 className="font-serif text-4xl md:text-5xl text-[#0F2557] leading-[1.1]">
              Signature <br className="hidden lg:block"/>
              <span className="italic text-[#A0A0A0]">Projects</span>
            </h2>
          </div>

          <p className="font-sans text-[#0F2557]/70 text-lg leading-relaxed font-light">
            A glimpse into our journey of transforming empty shells into vibrant, living stories across the world.
          </p>

          <Link href="/portfolio">
            <Button
              variant="link"
              className="h-auto p-0 font-mono text-[#0F2557] text-xs tracking-[0.2em] uppercase underline-offset-8 hover:text-[#A0A0A0] font-bold"
            >
              VIEW FULL PORTFOLIO
            </Button>
          </Link>

          <div className="flex items-center gap-4 mt-8 lg:mt-auto pt-8 border-t border-[#0F2557]/10 w-fit">
            <Button
              variant="outline"
              size="icon"
              onClick={() => {
                stopAutoScroll();
                prevSlide();
              }}
              className="h-12 w-12 rounded-none border-[#0F2557]/20 hover:bg-[#0F2557] hover:text-white transition-colors"
              aria-label="Previous project"
            >
              <ChevronLeftIcon className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => {
                nextSlide();
              }}
              className="h-12 w-12 rounded-none border-[#0F2557]/20 hover:bg-[#0F2557] hover:text-white transition-colors"
              aria-label="Next project"
            >
              <ChevronRightIcon className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Carousel Column */}
        <div
          className="flex-1 w-full min-w-0"
          onMouseEnter={stopAutoScroll}
          onMouseLeave={startAutoScroll}
        >
          <div className="w-full overflow-hidden" ref={carouselRef}>
            <div
              className={`flex gap-6 ${isTransitioning ? "transition-transform duration-700 ease-in-out" : ""}`}
              style={{ transform: `translateX(-${currentIndex * cardStride}px)` }}
              onTransitionEnd={handleTransitionEnd}
            >
              {allProjects.map((project, index) => (
                <Link key={`${project.id}-idx-${index}`} href={`/projects/${project.slug}`} passHref className="block flex-shrink-0">
                  <div className="w-[280px] md:w-[300px] group cursor-pointer">
                    <div className="aspect-[4/5] w-full overflow-hidden bg-slate-50 relative">
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0F2557]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 flex items-end p-6">
                        <span className="text-white font-mono text-xs tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 translate-y-4 group-hover:translate-y-0">
                          Explore Project
                        </span>
                      </div>
                      <img
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
                        alt={project.title}
                        src={project.heroImage}
                      />
                    </div>
                    <div className="flex flex-col gap-2 mt-4">
                      <h3 className="font-serif text-xl text-[#0F2557] group-hover:text-[#A0A0A0] transition-colors duration-300">
                        {project.title}
                      </h3>
                      <span className="text-[#A0A0A0] font-mono text-xs tracking-[0.2em] uppercase font-bold">
                        {project.category}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};