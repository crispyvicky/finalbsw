"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { cn } from "@/lib/utils";
import { EstimatorState } from "../types";
import { Button } from "@/components/ui/button";
import { Lamp, Wallpaper, Box, MonitorPlay, Zap, Sofa } from "lucide-react";

interface Step4Props {
    onBack: () => void;
    onNext: () => void;
    data: EstimatorState;
    updateData: (data: Partial<EstimatorState>) => void;
}

const ADDONS = [
    { id: "Smart Home", label: "Smart Home Automation", icon: Zap, price: "₹1.5L - 3L" },
    { id: "Lighting", label: "Premium Lighting Design", icon: Lamp, price: "₹50k - 1.5L" },
    { id: "Wallpaper", label: "Designer Wallpapers", icon: Wallpaper, price: "₹20k - 50k" },
    { id: "Wall Panels", label: "3D Wall Panels", icon: Box, price: "₹30k - 80k" },
    { id: "Home Theater", label: "Home Theater Setup", icon: MonitorPlay, price: "₹2L - 5L" },
    { id: "Bespoke Furniture", label: "Bespoke Furniture", icon: Sofa, price: "₹3L - 8L" },
];

export default function Step4Addons({ onBack, onNext, data, updateData }: Step4Props) {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Animations removed
    }, []);

    const toggleAddon = (id: string) => {
        const current = data.addons || [];
        if (current.includes(id)) {
            updateData({ addons: current.filter(x => x !== id) });
        } else {
            updateData({ addons: [...current, id] });
        }
    };

    return (
        <div ref={containerRef} className="space-y-10">
            <div className="space-y-3 text-center mb-10">
                <h2 className="font-heading-03 text-3xl md:text-4xl font-semi-bold text-[#3d5a45] italic">
                    Elevate your interiors
                </h2>
                <p className="font-body-02 text-gray-500 font-light">Add premium features to enhance your lifestyle.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {ADDONS.map((addon) => {
                    const isSelected = data.addons?.includes(addon.id);
                    return (
                        <div
                            key={addon.id}
                            onClick={() => toggleAddon(addon.id)}
                            className={cn(
                                "group flex items-center justify-between p-6 border cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5",
                                isSelected
                                    ? "bg-[#fdfbf7] border-[#ce7e48] shadow-md relative"
                                    : "bg-white border-gray-100 hover:border-[#ce7e48]/30"
                            )}
                        >
                            <div className="flex items-center gap-5">
                                <div className={cn(
                                    "w-14 h-14 flex items-center justify-center transition-colors border shadow-sm rounded-none",
                                    isSelected ? "bg-[#3d5a45] text-white border-[#3d5a45]" : "bg-[#f5f2eb] border-[#f5f2eb] text-[#3d5a45] group-hover:bg-white"
                                )}>
                                    <addon.icon className="w-6 h-6 stroke-1" />
                                </div>
                                <div>
                                    <h3 className={cn("text-lg font-heading-05 transition-colors mb-1", isSelected ? "text-[#3d5a45]" : "text-[#3d5a45]/80")}>{addon.label}</h3>
                                    <p className={cn("text-sm font-body-02 font-light transition-colors", isSelected ? "text-[#ce7e48]" : "text-gray-400")}>+ {addon.price}</p>
                                </div>
                            </div>

                            <div className={cn(
                                "w-6 h-6 border flex items-center justify-center transition-all duration-300 rounded-none",
                                isSelected ? "bg-white border-[#ce7e48]" : "border-gray-200 group-hover:border-[#ce7e48]"
                            )}>
                                {isSelected && <div className="w-3 h-3 bg-[#ce7e48] rounded-none" />}
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="flex justify-end gap-4 pt-10 border-t border-gray-100 mt-8">
                <Button variant="ghost" className="text-gray-400 hover:text-[#3d5a45] hover:bg-transparent tracking-[0.2em] text-xs font-bold uppercase" onClick={onBack}>BACK</Button>
                <Button
                    onClick={onNext}
                    className="bg-[#3d5a45] hover:bg-[#2F4F2F] text-white px-12 py-7 rounded-none text-sm font-medium tracking-[0.2em] uppercase transition-all shadow-lg hover:shadow-xl"
                >
                    CALCULATE ESTIMATE
                </Button>
            </div>
        </div>
    );
}
