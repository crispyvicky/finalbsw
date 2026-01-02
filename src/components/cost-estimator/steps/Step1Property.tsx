"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { cn } from "@/lib/utils";
import { Building2, Home, MapPin } from "lucide-react";
import { EstimatorState } from "../types";
import { Button } from "@/components/ui/button";

interface Step1Props {
    onNext: () => void;
    data: EstimatorState;
    updateData: (data: Partial<EstimatorState>) => void;
}

const BHKS = [
    { label: "1 BHK", area: "400-600 sq ft" },
    { label: "2 BHK", area: "700-1000 sq ft" },
    { label: "3 BHK", area: "1100-1500 sq ft" },
    { label: "4+ BHK", area: "1800+ sq ft" },
    { label: "Villa", area: "2500+ sq ft" },
];

const CITIES = ["Hyderabad", "Bangalore", "Mumbai", "Delhi", "Chennai", "Pune"];

export default function Step1Property({ onNext, data, updateData }: Step1Props) {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Animations removed for visibility
    }, []);

    return (
        <div ref={containerRef} className="space-y-10 max-w-4xl mx-auto">
            <div className="step-item text-center space-y-3 mb-10">
                <h2 className="font-heading-03 text-3xl md:text-4xl font-semi-bold text-primary-01 italic">Tell us about your space</h2>
                <p className="font-body-02 text-gray-500 font-light">We'll customize options based on your property.</p>
            </div>

            {/* BHK Selection */}
            <div className="step-item space-y-5">
                <label className="text-xs font-bold text-[#ce7e48] uppercase tracking-[0.2em] font-body-02 block text-center md:text-left">Property Type & Size</label>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    {BHKS.map((item) => {
                        const isSelected = data.bhk === item.label;
                        return (
                            <button
                                key={item.label}
                                onClick={() => updateData({ bhk: item.label })}
                                className={cn(
                                    "relative group flex flex-col items-center justify-center p-4 py-8 border transition-all duration-300 min-h-[140px]",
                                    isSelected
                                        ? "bg-[#3d5a45] border-[#3d5a45] text-white shadow-lg" // Green Selected
                                        : "bg-white border-[#E0E0E0] hover:border-[#3d5a45]/50 hover:bg-[#f5f2eb]" // Beige Hover
                                )}
                            >
                                <Home className={cn("w-6 h-6 mb-4 transition-colors stroke-1", isSelected ? "text-white" : "text-[#BDBDBD] group-hover:text-[#3d5a45]")} />
                                <span className={cn("text-lg font-heading-05 mb-2", isSelected ? "text-white" : "text-[#3d5a45]")}>
                                    {item.label}
                                </span>
                                <span className={cn("text-[10px] font-medium tracking-wide uppercase font-body-02", isSelected ? "text-white/80" : "text-[#9E9E9E]")}>{item.area}</span>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Carpet Area Slider - RESTORED & COLORED */}
            <div className="step-item space-y-6">
                <div className="flex justify-between items-end border-b border-[#E0E0E0] pb-2">
                    <label className="text-xs font-bold text-[#ce7e48] uppercase tracking-[0.2em] font-body-02">Carpet Area</label>
                    <div className="flex items-center gap-2">
                        <input
                            type="number"
                            value={data.size}
                            onChange={(e) => updateData({ size: Number(e.target.value) })}
                            className="bg-transparent border-none text-right font-heading-01 text-4xl text-[#3d5a45] focus:outline-none w-40 p-0 leading-none"
                        />
                        <span className="text-[#A1887F] text-sm font-medium font-body-02 mb-1">sq ft</span>
                    </div>
                </div>

                <div className="relative h-10 flex items-center px-1">
                    <input
                        type="range"
                        min="300"
                        max="5000"
                        step="50"
                        value={data.size}
                        onChange={(e) => updateData({ size: Number(e.target.value) })}
                        className="w-full appearance-none bg-[#E0E0E0] h-[2px] rounded-none outline-none 
                        [&::-webkit-slider-thumb]:appearance-none 
                        [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 
                        [&::-webkit-slider-thumb]:bg-[#ce7e48] 
                        [&::-webkit-slider-thumb]:cursor-pointer 
                        [&::-webkit-slider-thumb]:border-4 [&::-webkit-slider-thumb]:border-white 
                        [&::-webkit-slider-thumb]:shadow-[0_2px_10px_rgba(206,126,72,0.4)]
                        hover:[&::-webkit-slider-thumb]:scale-110 transition-all"
                    />
                </div>
            </div>

            {/* City & Property Type */}
            <div className="step-item grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                    <label className="text-xs font-bold text-[#ce7e48] uppercase tracking-[0.2em] font-body-02 ml-1">City</label>
                    <div className="relative group">
                        <MapPin className="absolute left-0 top-1/2 -translate-y-1/2 text-[#3d5a45]/40 w-5 h-5" />
                        <select
                            value={data.city}
                            onChange={(e) => updateData({ city: e.target.value })}
                            className="w-full bg-transparent border-b border-[#E0E0E0] py-3 pl-8 pr-4 text-[#3d5a45] font-heading-05 text-xl appearance-none focus:outline-none focus:border-[#ce7e48] transition-all cursor-pointer rounded-none"
                        >
                            {CITIES.map(c => <option key={c} value={c} className="bg-white text-[#3d5a45]">{c}</option>)}
                        </select>
                    </div>
                </div>

                <div className="space-y-3">
                    <label className="text-xs font-bold text-[#ce7e48] uppercase tracking-[0.2em] font-body-02 ml-1">Property Status</label>
                    <div className="relative group">
                        <Building2 className="absolute left-0 top-1/2 -translate-y-1/2 text-[#3d5a45]/40 w-5 h-5" />
                        <select
                            value={data.propertyType}
                            onChange={(e) => updateData({ propertyType: e.target.value })}
                            className="w-full bg-transparent border-b border-[#E0E0E0] py-3 pl-8 pr-4 text-[#3d5a45] font-heading-05 text-xl appearance-none focus:outline-none focus:border-[#ce7e48] transition-all cursor-pointer rounded-none"
                        >
                            <option value="New" className="bg-white text-[#3d5a45]">New Property</option>
                            <option value="Renovation" className="bg-white text-[#3d5a45]">Renovation</option>
                            <option value="Rental" className="bg-white text-[#3d5a45]">Rental</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="step-item pt-10 flex justify-end border-t border-[#F5F5F0] mt-10">
                <Button
                    onClick={onNext}
                    disabled={!data.bhk}
                    className="rounded-none px-12 py-7 bg-[#3d5a45] hover:bg-[#2F4F2F] text-white text-sm tracking-[0.2em] uppercase font-medium transition-all shadow-lg hover:shadow-xl"
                >
                    CONTINUE
                </Button>
            </div>
        </div>
    );
}
