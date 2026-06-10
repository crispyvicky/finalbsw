"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { cn } from "@/lib/utils";
import { EstimatorState } from "../types";
import { Button } from "@/components/ui/button";

interface Step3Props {
    onBack: () => void;
    onNext: () => void;
    data: EstimatorState;
    updateData: (data: Partial<EstimatorState>) => void;
}

const STYLES = [
    { id: "Modern Minimalist", image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=600&auto=format&fit=crop", desc: "Clean lines, neutral colors, clutter-free." },
    { id: "Contemporary Luxury", image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=600&auto=format&fit=crop", desc: "High-end finishes, sophisticated lighting." },
    { id: "Traditional Heritage", image: "https://images.unsplash.com/photo-1615529182904-14819c35db37?q=80&w=600&auto=format&fit=crop", desc: "Warm woods, intricate carvings, ethnic decor." },
    { id: "Industrial Chic", image: "https://images.unsplash.com/photo-1534349762230-e0cadf78f5da?q=80&w=600&auto=format&fit=crop", desc: "Raw textures, exposed elements, urban vibe." },
];

export default function Step3Style({ onBack, onNext, data, updateData }: Step3Props) {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Animations removed
    }, []);

    return (
        <div ref={containerRef} className="space-y-12 max-w-5xl mx-auto">
            <div className="text-center space-y-3 mb-8">
                <h2 className="font-heading-03 text-3xl md:text-4xl font-semi-bold text-[#0F2557] italic">Choose your vibe</h2>
                <p className="font-body-02 text-[#A0A0A0] font-light">Select the aesthetic that resonates with you.</p>
            </div>

            {/* Grid Layout - No Scroll */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                {STYLES.map((style) => {
                    const isSelected = data.style === style.id;
                    return (
                        <button
                            key={style.id}
                            onClick={() => updateData({ style: style.id })}
                            className={cn(
                                "relative w-full aspect-[3/4] overflow-hidden transition-all duration-300 group text-left bg-gray-100 border-0 shadow-md",
                                isSelected
                                    ? "ring-4 ring-[#A0A0A0] ring-offset-0 scale-[1.02]"
                                    : "hover:scale-[1.02] hover:shadow-xl hover:ring-1 hover:ring-[#0F2557]"
                            )}
                        >
                            {/* Real Image */}
                            <img
                                src={style.image}
                                alt={style.id}
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />

                            {/* Gradient Overlay */}
                            <div className={cn(
                                "absolute inset-0 transition-opacity duration-300",
                                isSelected ? "bg-[#0F2557]/60" : "bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 group-hover:bg-[#0F2557]/40"
                            )} />

                            <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5 z-20">
                                <div className="flex justify-between items-end mb-2">
                                    <h3 className={cn(
                                        "text-lg md:text-xl font-heading-05 leading-none",
                                        isSelected ? "text-white" : "text-white/90"
                                    )}>{style.id}</h3>
                                    {isSelected && <div className="w-1.5 h-1.5 bg-[#A0A0A0] rounded-full mb-1" />}
                                </div>
                                <p className="text-[10px] md:text-xs font-body-02 text-white/80 font-light leading-relaxed tracking-wide line-clamp-2 md:line-clamp-none">{style.desc}</p>
                            </div>
                        </button>
                    );
                })}
            </div>

            <div className="bg-white border border-gray-100 p-8 shadow-sm">
                <h3 className="text-sm font-bold text-[#0F2557] mb-6 text-center uppercase tracking-[0.2em] font-body-02">Material Quality</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-gray-100 divide-y md:divide-y-0 md:divide-x divide-gray-100">
                    {['Standard', 'Premium', 'Luxury'].map((level) => (
                        <button
                            key={level}
                            onClick={() => updateData({ materials: { ...data.materials, quality: level } })}
                            className={cn(
                                "p-6 text-center transition-all font-heading-05 text-lg",
                                data.materials?.quality === level
                                    ? "bg-[#0F2557] text-white"
                                    : "bg-white text-gray-400 hover:text-[#0F2557] hover:bg-[#f5f2eb]"
                            )}
                        >
                            {level}
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex justify-center gap-4 pt-10 border-t border-gray-100 mt-8">
                <Button variant="ghost" className="text-gray-400 hover:text-[#0F2557] hover:bg-transparent tracking-[0.2em] text-xs font-bold uppercase" onClick={onBack}>BACK</Button>
                <Button
                    onClick={onNext}
                    disabled={!data.style}
                    className="rounded-none px-12 py-7 bg-[#0F2557] hover:bg-[#2F4F2F] text-white text-sm tracking-[0.2em] uppercase font-medium transition-all"
                >
                    CONTINUE
                </Button>
            </div>
        </div>
    );
}
