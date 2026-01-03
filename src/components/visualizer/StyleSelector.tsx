"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

export type DesignStyle = "MODERN" | "MINIMALIST" | "LUXURY" | "INDUSTRIAL" | "SCANDINAVIAN" | "BOHEMIAN";

interface StyleSelectorProps {
    selectedStyle: DesignStyle;
    onSelect: (style: DesignStyle) => void;
}

const STYLES: { id: DesignStyle; label: string; image: string }[] = [
    {
        id: "MODERN",
        label: "Modern",
        image: "https://images.unsplash.com/photo-1518005052304-a37d18028732?auto=format&fit=crop&q=80&w=300"
    },
    {
        id: "MINIMALIST",
        label: "Minimalist",
        image: "https://images.unsplash.com/photo-1493804714600-6edb1cd937f6?auto=format&fit=crop&q=80&w=300"
    },
    {
        id: "LUXURY",
        label: "Luxury",
        image: "https://images.unsplash.com/photo-1631679706909-1844bbd07221?auto=format&fit=crop&q=80&w=300"
    },
    {
        id: "INDUSTRIAL",
        label: "Industrial",
        image: "https://images.unsplash.com/photo-1549488344-c705c84a8374?auto=format&fit=crop&q=80&w=300"
    },
    {
        id: "SCANDINAVIAN",
        label: "Scandinavian",
        image: "https://images.unsplash.com/photo-1524758631624-9407519770f1?auto=format&fit=crop&q=80&w=300"
    },
    {
        id: "BOHEMIAN",
        label: "Bohemian",
        image: "https://images.unsplash.com/photo-1617103996702-96ff29b1c467?auto=format&fit=crop&q=80&w=300"
    },
];

export function StyleSelector({ selectedStyle, onSelect }: StyleSelectorProps) {
    return (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {STYLES.map((style) => (
                <button
                    key={style.id}
                    onClick={() => onSelect(style.id)}
                    className={cn(
                        "group relative aspect-square rounded-lg overflow-hidden border-2 transition-all",
                        selectedStyle === style.id
                            ? "border-primary-01 ring-2 ring-primary-01/20"
                            : "border-transparent hover:border-gray-200"
                    )}
                >
                    <img
                        src={style.image}
                        alt={style.label}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className={cn(
                        "absolute inset-0 bg-black/40 flex items-center justify-center transition-all",
                        selectedStyle === style.id ? "bg-black/60" : "group-hover:bg-black/50"
                    )}>
                        <div className="text-center">
                            {selectedStyle === style.id && (
                                <div className="mx-auto mb-2 w-8 h-8 rounded-full bg-primary-01 flex items-center justify-center text-white">
                                    <Check className="w-5 h-5" />
                                </div>
                            )}
                            <span className={cn(
                                "text-white font-medium tracking-wide uppercase text-sm",
                                selectedStyle === style.id ? "font-bold" : ""
                            )}>
                                {style.label}
                            </span>
                        </div>
                    </div>
                </button>
            ))}
        </div>
    );
}
