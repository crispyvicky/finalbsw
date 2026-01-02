"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { cn } from "@/lib/utils";
import { EstimatorState } from "../types";
import { Button } from "@/components/ui/button";
import { Check, Utensils, BedDouble, Sofa, Bath, Sun, Armchair, Library, Sparkles } from "lucide-react";

interface Step2Props {
    onBack: () => void;
    onNext: () => void;
    data: EstimatorState;
    updateData: (data: Partial<EstimatorState>) => void;
}

const ROOMS = [
    { id: "Kitchen", icon: Utensils, label: "Modular Kitchen", image: "https://images.unsplash.com/photo-1556911220-bff31c812dba?q=80&w=600&auto=format&fit=crop" },
    { id: "Master Bedroom", icon: BedDouble, label: "Master Bedroom", badge: "Popular", image: "https://images.unsplash.com/photo-1617325247661-675ab4b64ae2?q=80&w=600&auto=format&fit=crop" },
    { id: "Living Room", icon: Sofa, label: "Living Room", image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=600&auto=format&fit=crop" },
    { id: "Bathroom", icon: Bath, label: "Bathroom", image: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?q=80&w=600&auto=format&fit=crop" },
    { id: "Balcony", icon: Sun, label: "Balcony", image: "https://images.unsplash.com/photo-1534349762230-e0cadf78f5da?q=80&w=600&auto=format&fit=crop" },
    { id: "Dining", icon: Armchair, label: "Dining Area", image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?q=80&w=600&auto=format&fit=crop" },
    { id: "Guest Room", icon: BedDouble, label: "Guest Room", image: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?q=80&w=600&auto=format&fit=crop" },
    { id: "Study", icon: Library, label: "Study Unit", image: "https://images.unsplash.com/photo-1554295405-abb8fd54f153?q=80&w=600&auto=format&fit=crop" },
    { id: "Kids Room", icon: Sparkles, label: "Kids Room", image: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=600&auto=format&fit=crop" },
    { id: "Pooja Room", icon: Sparkles, label: "Pooja Room", image: "https://images.unsplash.com/photo-1606293926075-69a00febf280?q=80&w=600&auto=format&fit=crop" },
];

export default function Step2Rooms({ onBack, onNext, data, updateData }: Step2Props) {
    const containerRef = useRef<HTMLDivElement>(null);

    // GSAP removed to ensure full visibility
    useEffect(() => {
        // No animation for visibility safety
    }, []);

    const toggleRoom = (roomId: string) => {
        const currentRooms = data.rooms || [];
        if (currentRooms.includes(roomId)) {
            updateData({ rooms: currentRooms.filter(r => r !== roomId) });
        } else {
            updateData({ rooms: [...currentRooms, roomId] });
        }
    };

    return (
        <div ref={containerRef} className="space-y-8 max-w-5xl mx-auto">
            <div className="text-center space-y-3 mb-10">
                <h2 className="font-heading-03 text-3xl md:text-4xl font-semi-bold text-[#3d5a45] italic">Select rooms to design</h2>
                <p className="font-body-02 text-[#ce7e48] font-light">Choose the spaces you want to get an estimate for.</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {ROOMS.map((room) => {
                    const isSelected = data.rooms?.includes(room.id);
                    return (
                        <button
                            key={room.id}
                            onClick={() => toggleRoom(room.id)}
                            className={cn(
                                "relative group rounded-none overflow-hidden aspect-[340/420] flex flex-col items-center justify-end text-center transition-all duration-300",
                                isSelected
                                    ? "ring-4 ring-[#ce7e48] ring-offset-0"
                                    : "hover:ring-1 hover:ring-[#3d5a45]"
                            )}
                        >
                            {/* Background Image */}
                            <img
                                src={room.image}
                                alt={room.label}
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90"
                            />

                            {/* Overlay */}
                            <div className={cn(
                                "absolute inset-0 transition-all duration-300",
                                isSelected
                                    ? "bg-[#3d5a45]/60" // Green overlay
                                    : "bg-gradient-to-t from-black/70 via-black/10 to-transparent group-hover:bg-[#3d5a45]/40"
                            )} />

                            {/* Content */}
                            <div className="relative z-10 flex flex-col items-center p-4 w-full">
                                {room.badge && (
                                    <div className="absolute top-2 right-2 bg-[#ce7e48] text-white text-[9px] font-bold tracking-widest px-2 py-1 uppercase rounded-none">
                                        {room.badge}
                                    </div>
                                )}

                                <div className={cn(
                                    "mb-3 transition-all duration-300",
                                    isSelected ? "text-white scale-110" : "text-white/80 group-hover:text-white"
                                )}>
                                    <room.icon className="w-5 h-5 stroke-1" />
                                </div>

                                <h3 className={cn(
                                    "font-heading-05 text-sm font-medium tracking-wide leading-tight transition-all duration-300 uppercase",
                                    isSelected ? "text-white" : "text-white/90"
                                )}>
                                    {room.label}
                                </h3>
                            </div>

                            {/* Checkbox Indicator */}
                            <div className={cn(
                                "absolute top-2 left-2 w-6 h-6 flex items-center justify-center transition-all duration-300 z-20 border border-white/50",
                                isSelected
                                    ? "bg-[#ce7e48] text-white scale-100 border-[#ce7e48]"
                                    : "bg-transparent text-transparent opacity-0"
                            )}>
                                <Check className="w-3 h-3" />
                            </div>
                        </button>
                    );
                })}
            </div>

            <div className="flex items-center justify-between pt-8 border-t border-[#E0E0E0] mt-8">
                <div className="text-[#ce7e48] font-medium font-body-02 text-xs uppercase tracking-widest">
                    {data.rooms?.length || 0} rooms selected
                </div>
                <div className="flex gap-4">
                    <Button variant="ghost" className="text-[#A1887F] hover:text-[#3d5a45] hover:bg-transparent tracking-[0.2em] text-xs font-bold uppercase" onClick={onBack}>BACK</Button>
                    <Button
                        onClick={onNext}
                        disabled={data.rooms?.length === 0}
                        className="rounded-none px-10 py-6 bg-[#3d5a45] hover:bg-[#2F4F2F] text-white text-sm tracking-[0.2em] uppercase font-medium transition-all"
                    >
                        CONTINUE
                    </Button>
                </div>
            </div>
        </div>
    );
}
