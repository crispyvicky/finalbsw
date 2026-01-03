"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { projects, Project } from "@/data/projects";

export default function PortfolioClient() {
    const searchParams = useSearchParams();
    const initialCategory = searchParams.get("category")?.toUpperCase() || "ALL";
    const [activeCategory, setActiveCategory] = useState(initialCategory);

    const categories = ["ALL", "RESIDENTIAL", "COMMERCIAL", "RENOVATION", "INTERIORS"];

    // Update state if URL param changes (e.g. back button)
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
        <div className="w-full bg-white min-h-screen">
            <div className="py-24 px-4 text-center bg-secondary-05">
                <h1 className="font-heading-02 text-5xl md:text-7xl text-primary-01 mb-6">Selected Works</h1>
                <p className="font-body-02 text-secondary-01 max-w-xl mx-auto mb-12">
                    A curation of spaces where design meets life. Explore our portfolio of residential and commercial masterpieces.
                </p>
                <div className="flex flex-wrap justify-center gap-8 mt-8">
                    {categories.map((filter, i) => (
                        <button
                            key={i}
                            onClick={() => setActiveCategory(filter)}
                            className={`text-sm tracking-[0.2em] transition-all duration-300 pb-2 ${activeCategory === filter
                                ? "text-primary-01 font-medium border-b-2 border-primary-01"
                                : "text-gray-400 hover:text-primary-01 border-b-2 border-transparent"
                                }`}
                        >
                            {filter}
                        </button>
                    ))}
                </div>
            </div>

            {/* AI Visualizer Link Removed */}


            <div className="container mx-auto px-4 pb-16">
                {/* Simple Masonry-like Grid */}
                <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
                    {filteredProjects.map((project, index) => (
                        <Link href={`/projects/${project.slug}`} key={project.id}>
                            <div className="break-inside-avoid relative group cursor-pointer overflow-hidden bg-gray-100 mb-8">
                                <div className="relative aspect-[3/4] overflow-hidden">
                                    <img
                                        src={project.heroImage}
                                        alt={project.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                                    />
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                </div>

                                <div className="absolute bottom-0 left-0 w-full p-6 text-left transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 opacity-0 group-hover:opacity-100">
                                    <span className="text-white/80 text-xs tracking-[0.3em] uppercase mb-2 block">
                                        {project.category}
                                    </span>
                                    <h3 className="text-white font-heading-04 text-2xl md:text-3xl italic">
                                        {project.title}
                                    </h3>
                                    <span className="text-white/60 text-xs mt-2 block font-light">
                                        View Project
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {filteredProjects.length === 0 && (
                    <div className="text-center py-20 text-gray-400 font-body-02">
                        No projects found in this category.
                    </div>
                )}
            </div>
        </div>
    );
}
