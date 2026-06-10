"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { projects, Project } from "@/data/projects";
import { ArrowUpRight } from "lucide-react";

export default function PortfolioClient() {
    const searchParams = useSearchParams();
    const initialCategory = searchParams.get("category")?.toUpperCase() || "ALL";
    const [activeCategory, setActiveCategory] = useState(initialCategory);

    const categories = ["ALL", "RESIDENTIAL", "COMMERCIAL", "RENOVATION", "INTERIORS"];

    useEffect(() => {
        const cat = searchParams.get("category")?.toUpperCase();
        if (cat && categories.includes(cat)) {
            setActiveCategory(cat);
        }
    }, [searchParams]);

    const filteredProjects = activeCategory === "ALL"
        ? projects
        : projects.filter(p => p.category.toUpperCase() === activeCategory);

    return (
        <div className="w-full bg-[#f8f9fa] min-h-screen">
            
            {/* Header Area */}
            <div className="pt-32 pb-16 md:pt-48 md:pb-24 px-4 text-center bg-white border-b border-[#0F2557]/10">
                <div className="container mx-auto max-w-[1400px]">
                    <span className="font-mono text-sm tracking-[0.3em] text-[#A0A0A0] uppercase font-bold block mb-6">
                        The Masterpieces
                    </span>
                    <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-[#0F2557] mb-8 leading-[1.1]">
                        Selected <span className="italic text-[#A0A0A0]">Works</span>
                    </h1>
                    <p className="font-sans text-[#0F2557]/70 max-w-2xl mx-auto mb-16 text-lg font-light leading-relaxed">
                        A curation of spaces where uncompromising design meets life. Explore our portfolio of bespoke residential and commercial transformations.
                    </p>
                    
                    {/* Filter Navigation */}
                    <div className="flex flex-wrap justify-center gap-6 md:gap-12 mt-8">
                        {categories.map((filter, i) => (
                            <button
                                key={i}
                                onClick={() => setActiveCategory(filter)}
                                className={`text-xs tracking-[0.25em] transition-all duration-300 pb-2 uppercase font-bold relative
                                    ${activeCategory === filter 
                                        ? "text-[#0F2557]" 
                                        : "text-[#A0A0A0] hover:text-[#0F2557]"
                                    }`}
                            >
                                {filter}
                                {/* Active Indicator Line */}
                                <span className={`absolute bottom-0 left-0 h-[2px] bg-[#0F2557] transition-all duration-300 
                                    ${activeCategory === filter ? 'w-full' : 'w-0'}`} 
                                />
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Asymmetric Showcase Grid */}
            <div className="container mx-auto px-4 md:px-8 py-16 md:py-24 max-w-[1400px]">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
                    {filteredProjects.map((project, index) => {
                        // Create an asymmetric masonry effect by varying column spans based on index
                        const isLarge = index % 3 === 0; // Every 3rd item spans full width or large area
                        const colSpan = isLarge ? "md:col-span-12 lg:col-span-8" : "md:col-span-6 lg:col-span-4";
                        const aspectRatio = isLarge ? "aspect-[16/9]" : "aspect-[3/4]";

                        return (
                            <Link 
                                href={`/projects/${project.slug}`} 
                                key={project.id} 
                                className={`group block ${colSpan}`}
                            >
                                <div className="relative overflow-hidden bg-white mb-4">
                                    <div className={`relative ${aspectRatio} w-full overflow-hidden`}>
                                        <div 
                                            className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105"
                                            style={{ backgroundImage: `url(${project.heroImage})` }}
                                        />
                                        <div className="absolute inset-0 bg-[#0F2557]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                    </div>
                                    
                                    {/* Project Info Card overlapping the image slightly */}
                                    <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 bg-gradient-to-t from-[#0F2557]/90 to-transparent flex justify-between items-end transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 opacity-0 group-hover:opacity-100">
                                        <div>
                                            <span className="text-[#A0A0A0] font-mono text-xs tracking-[0.3em] uppercase mb-2 block font-bold">
                                                {project.category}
                                            </span>
                                            <h3 className="text-white font-serif text-3xl md:text-4xl">
                                                {project.title}
                                            </h3>
                                        </div>
                                        <div className="w-12 h-12 bg-white flex items-center justify-center rounded-none shadow-lg transform translate-y-8 group-hover:translate-y-0 transition-all duration-700 delay-100 opacity-0 group-hover:opacity-100">
                                            <ArrowUpRight className="w-6 h-6 text-[#0F2557]" />
                                        </div>
                                    </div>
                                </div>
                                {/* Clean text underneath for accessibility and clean look when not hovering */}
                                <div className="mt-4 flex justify-between items-start opacity-100 group-hover:opacity-0 transition-opacity duration-300">
                                    <div>
                                        <h3 className="font-serif text-2xl text-[#0F2557] mb-1">{project.title}</h3>
                                        <span className="font-mono text-xs text-[#A0A0A0] tracking-widest uppercase font-bold">{project.category}</span>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>

                {filteredProjects.length === 0 && (
                    <div className="text-center py-32">
                        <span className="font-mono text-sm tracking-[0.3em] text-[#A0A0A0] uppercase">
                            No projects found
                        </span>
                        <h2 className="font-serif text-4xl text-[#0F2557] mt-4">
                            We are currently curating this collection.
                        </h2>
                    </div>
                )}
            </div>
        </div>
    );
}
