"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowUpRight } from "lucide-react";

const roomData = [
  {
    name: "The Culinary",
    count: "Kitchens",
    image: "/kitchen.png",
    targetCategory: "INTERIORS",
  },
  {
    name: "The Sanctuary",
    count: "Bedrooms",
    image: "/bedroom.png",
    targetCategory: "RESIDENTIAL",
  },
  {
    name: "The Gathering",
    count: "Living Spaces",
    image: "/hero.png",
    targetCategory: "INTERIORS",
  },
  {
    name: "The Executive",
    count: "Offices",
    image: "/office.png",
    targetCategory: "COMMERCIAL",
  }
];

export const RoomSelectionSection = (): JSX.Element => {
  const router = useRouter();
  const [hoveredIndex, setHoveredIndex] = useState<number>(0); // Default first item expanded

  const handleRoomClick = (category: string) => {
    router.push(`/portfolio?category=${category}`);
  };

  return (
    <section className="w-full bg-[#f8f9fa] py-24 md:py-32">
      <div className="container mx-auto px-4 max-w-[1400px]">
        
        {/* Header */}
        <div className="text-center mb-16 md:mb-24 space-y-6">
          <span className="font-mono text-sm tracking-[0.3em] text-[#A0A0A0] uppercase block font-bold">
            Curated Spaces
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#0F2557]">
            Design for every <span className="italic text-[#A0A0A0]">moment.</span>
          </h2>
        </div>

        {/* Horizontal Expandable Accordion Layout */}
        <div className="flex flex-col md:flex-row w-full h-[600px] gap-2 md:gap-4 transition-all duration-700">
          {roomData.map((room, index) => {
            const isHovered = hoveredIndex === index;
            
            return (
              <div
                key={index}
                onClick={() => handleRoomClick(room.targetCategory)}
                onMouseEnter={() => setHoveredIndex(index)}
                className={`
                  relative cursor-pointer overflow-hidden rounded-none transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]
                  ${isHovered ? 'flex-[4] h-full' : 'flex-[1] h-24 md:h-full opacity-60 hover:opacity-90'}
                `}
              >
                {/* Background Image */}
                <div
                  className={`absolute inset-0 bg-cover bg-center transition-transform duration-1000 ${isHovered ? 'scale-105' : 'scale-100'}`}
                  style={{ backgroundImage: `url(${room.image})` }}
                />

                {/* Dark Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-t from-[#0F2557]/90 via-[#0F2557]/20 to-transparent transition-opacity duration-500 ${isHovered ? 'opacity-80' : 'opacity-100 bg-[#0F2557]/40'}`} />

                {/* Content */}
                <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end text-white">
                  
                  {/* Vertical Text for non-hovered state (Desktop) */}
                  <div className={`hidden md:flex absolute inset-0 items-center justify-center transition-opacity duration-500 ${isHovered ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                    <h3 className="font-serif text-2xl tracking-widest whitespace-nowrap -rotate-90">
                      {room.name}
                    </h3>
                  </div>

                  {/* Horizontal text for hovered state or mobile */}
                  <div className={`transform transition-all duration-700 ${isHovered ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0 md:opacity-0 opacity-100'}`}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-mono text-xs tracking-[0.3em] uppercase text-[#A0A0A0] font-bold">
                        {room.count}
                      </span>
                      <ArrowUpRight className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-serif text-3xl md:text-5xl text-white whitespace-nowrap">
                      {room.name}
                    </h3>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};