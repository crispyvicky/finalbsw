"use client";

import React, { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

// Categorized features
const categories = [
  {
    id: "bespoke",
    title: "Bespoke Interiors",
    description: "Tailored spaces that reflect your personality.",
    items: [
      { icon: "/icons/homeInterior.gif", label: "Full Home Interiors" },
      { icon: "/icons/livingArea.gif", label: "Living Area" },
      { icon: "/icons/dining-room.gif", label: "Dining Room" },
      { icon: "/icons/kidsBedRoom.gif", label: "Kids Bedroom" },
      { icon: "/icons/bathroom.gif", label: "Bathroom Design" },
      { icon: "/icons/foyerDesign.gif", label: "Foyer Design" },
    ]
  },
  {
    id: "modular",
    title: "Modular & Storage",
    description: "Functional elegance for every corner.",
    items: [
      { icon: "/icons/modularKitchen.gif", label: "Modular Kitchen" },
      { icon: "/icons/wardrobe.gif", label: "Wardrobes" },
      { icon: "/icons/tvUnit.gif", label: "TV Units" },
      { icon: "/icons/crockeryUnit.gif", label: "Crockery Units" },
      { icon: "/icons/pujaUnit.gif", label: "Puja Units" },
      { icon: "/icons/studyTables.gif", label: "Study Tables" },
      { icon: "/icons/spaceSavingFurniture.gif", label: "Space Saving" },
    ]
  },
  {
    id: "decor",
    title: "Decor & Finishes",
    description: "The finishing touches that make a house a home.",
    items: [
      { icon: "/icons/falseCeling.gif", label: "False Ceiling" },
      { icon: "/icons/lights.gif", label: "Lighting Solutions" },
      { icon: "/icons/wallPaint.gif", label: "Wall Paint" },
      { icon: "/icons/wallpaper.gif", label: "Wallpaper" },
      { icon: "/icons/movaAbleFurnture.gif", label: "Movable Furniture" },
    ]
  },
  {
    id: "promise",
    title: "The Infinity Promise",
    description: "Our commitment to quality and service.",
    items: [
      { icon: "/icons/desginExperts.gif", label: "Design Experts" },
      { icon: "/icons/installationCare.gif", label: "Installation Care" },
      { icon: "/icons/warranty.gif", label: "Warranty" },
      { icon: "/icons/calendar.gif", label: "Timely Delivery" },
    ]
  }
];

export const UniqueFeaturesSection = (): JSX.Element => {
  const [activeCategory, setActiveCategory] = useState(categories[0]);

  return (
    <section className="w-full py-20 px-4 md:px-8 lg:px-[100px] bg-[#fdfbf7]">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <span className="text-[#ce7e48] text-xs font-bold tracking-[0.2em] uppercase">Whatever you need, we've got it</span>
          <h2 className="font-heading-03 text-3xl md:text-5xl text-[#3d5a45]">
            Comprehensive Design Services
          </h2>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-14">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "px-6 py-3 rounded-none text-sm font-medium tracking-wide transition-all duration-300 border",
                activeCategory.id === cat.id
                  ? "bg-[#3d5a45] text-white border-[#3d5a45] shadow-lg scale-105"
                  : "bg-white text-[#3d5a45]/70 border-[#3d5a45]/20 hover:border-[#3d5a45] hover:text-[#3d5a45]"
              )}
            >
              {cat.title}
            </button>
          ))}
        </div>

        {/* Dynamic Content */}
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 key={activeCategory.id}">
          <div className="text-center mb-10">
            <p className="text-[#3d5a45]/60 font-body-02 italic text-lg">{activeCategory.description}</p>
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            {activeCategory.items.map((feature, idx) => (
              <div
                key={idx}
                className="w-full sm:w-[260px] lg:w-[280px] group relative flex flex-col items-center justify-center p-8 bg-white rounded-none shadow-[0_2px_15px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_10px_40px_-4px_rgba(61,90,69,0.15)] transition-all duration-300 hover:-translate-y-2 border border-transparent hover:border-[#ce7e48]/20"
              >
                {/* Icon Container with subtle bg */}
                <div className="relative w-20 h-20 mb-6 p-4 rounded-none bg-[#3d5a45]/5 group-hover:bg-[#ce7e48]/10 transition-colors duration-300">
                  <div className="relative w-full h-full transition-transform duration-500 group-hover:scale-110">
                    <Image
                      src={feature.icon}
                      alt={feature.label}
                      fill
                      className="object-contain"
                      unoptimized
                    />
                  </div>
                </div>

                {/* Label */}
                <h3 className="text-center font-heading-05 text-base text-[#3d5a45] group-hover:text-[#ce7e48] transition-colors duration-300 font-semibold tracking-wide">
                  {feature.label}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
