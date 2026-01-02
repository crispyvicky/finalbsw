"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowUpRight } from "lucide-react";

// Updated data with unique, high-quality images and category mappings
const roomData = [
  {
    name: "The Heart (Kitchen)",
    count: "Culinary",
    image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=1000",
    targetCategory: "INTERIORS",
    colSpan: "md:col-span-2",
  },
  {
    name: "The Sanctuary (Bedroom)",
    count: "Rest",
    image: "https://images.unsplash.com/photo-1617325247661-675ab4b64ae2?q=80&w=1000",
    targetCategory: "RESIDENTIAL",
    colSpan: "md:col-span-1",
  },
  {
    name: "Gathering (Living)",
    count: "Social",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1000",
    targetCategory: "INTERIORS",
    colSpan: "md:col-span-1",
  },
  {
    name: "Focus (Office)",
    count: "Work",
    image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=1000",
    targetCategory: "COMMERCIAL",
    colSpan: "md:col-span-2",
  },
  {
    name: "Dining (Feast)",
    count: "Family",
    image: "https://images.unsplash.com/photo-1615529182904-14819c35db37?q=80&w=1000",
    targetCategory: "RESIDENTIAL",
    colSpan: "md:col-span-1",
  },
  {
    name: "Outdoors (Nature)",
    count: "Fresh",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1000",
    targetCategory: "RESIDENTIAL",
    colSpan: "md:col-span-2",
  },
];

export const RoomSelectionSection = (): JSX.Element => {
  const router = useRouter();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleRoomClick = (category: string) => {
    router.push(`/portfolio?category=${category}`);
  };

  return (
    <section className="w-full bg-white py-12 md:py-[100px]">
      <div className="container mx-auto px-4">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 md:mb-16 gap-6">
          <div className="space-y-4">
            <span className="font-label-medium text-xs tracking-[0.2em] text-secondary-02 uppercase block">
              Curated Spaces
            </span>
            <h2 className="font-heading-02 text-4xl md:text-5xl lg:text-6xl text-primary-01">
              Design for every <span className="italic text-secondary-02">moment.</span>
            </h2>
          </div>
          <p className="font-body-02 text-secondary-01 max-w-sm text-sm md:text-base leading-relaxed text-right md:text-left">
            Select a space to explore our specialized portfolio of residential and commercial transformations.
          </p>
        </div>

        {/* Bento Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 auto-rows-[300px] md:auto-rows-[350px]">
          {roomData.map((room, index) => (
            <div
              key={index}
              onClick={() => handleRoomClick(room.targetCategory)}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={`
                relative group cursor-pointer overflow-hidden rounded-none 
                ${room.colSpan}
                transition-all duration-500 ease-out
                ${hoveredIndex !== null && hoveredIndex !== index ? 'opacity-90 scale-[0.98]' : 'scale-100 opacity-100'}
              `}
            >
              {/* Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-110"
                style={{ backgroundImage: `url(${room.image})` }}
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-300 opacity-60 group-hover:opacity-80" />

              {/* Content */}
              <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end text-white">
                <div className="transform translate-y-4 transition-transform duration-500 group-hover:translate-y-0">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs tracking-[0.2em] uppercase text-white/70 font-medium">
                      {room.count}
                    </span>
                    <ArrowUpRight className="w-5 h-5 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100" />
                  </div>

                  <h3 className="font-heading-04 text-2xl md:text-3xl text-white">
                    {room.name}
                  </h3>

                  <div className="h-0 overflow-hidden group-hover:h-8 transition-all duration-300 ease-out">
                    <p className="text-white/60 text-xs mt-2 font-light tracking-wide">
                      View Collection
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};