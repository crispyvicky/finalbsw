"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, X, Check } from "lucide-react";
import Link from "next/link";

interface ServiceDetail {
    id: string;
    title: string;
    description: string;
    image: string;
    details: {
        materials: string[];
        styles: string[];
        process: string;
        idealFor: string;
    };
}

const services: ServiceDetail[] = [
    {
        id: "01",
        title: "Complete Interior Works",
        description: "End-to-End Turnkey Solutions. We manage your entire project from the first sketch to the final styling, ensuring every detail exceeds your expectations.",
        image: "/bedroom.png",
        details: {
            materials: ["Italian Marble", "Premium Veneers", "Brass Accents", "Natural Stone"],
            styles: ["Modern Minimalist", "Contemporary Luxury", "Traditional Fusion", "Indo-Western"],
            process: "We start with a deep-dive lifestyle analysis to understand your daily routines. Design concepts are then crafted to balance aesthetics with extreme functionality.",
            idealFor: "Villas, Luxury Apartments, Penthouses"
        }
    },
    {
        id: "02",
        title: "Custom Carpentry",
        description: "Bespoke Doors, Windows, Wardrobes, and Modular Furniture manufactured to absolute perfection, ensuring every piece fits your space and specific needs exactly.",
        image: "/office.png",
        details: {
            materials: ["Solid Teak Wood", "Premium HDHMR", "Lacquered Glass", "High-Gloss Laminates"],
            styles: ["Seamless Built-ins", "Walk-in Closets", "Minimalist Profiles", "Classic Carvings"],
            process: "Each piece is hand-sketched and prototyped. We work with master craftsmen to ensure joinery, finish, and comfort are world-class.",
            idealFor: "Statement Wardrobes, Custom Doors, Signature Seating"
        }
    },
    {
        id: "03",
        title: "Kitchen Interiors & Woodwork",
        description: "Ergonomic and beautifully crafted kitchen spaces. From modular cabinetry to premium stone countertops, we design kitchens that are the heart of the home.",
        image: "/kitchen.png",
        details: {
            materials: ["Quartz Countertops", "Acrylic Finishes", "Hettich/Blum Hardware", "Solid Wood"],
            styles: ["Island Kitchens", "Modern Handle-less", "Transitional", "Industrial Chic"],
            process: "We focus on the 'Golden Triangle' for maximum efficiency, paired with smart storage solutions and exquisite exterior finishes.",
            idealFor: "Gourmet Kitchens, Open-Plan Living, Luxury Homes"
        }
    },
    {
        id: "04",
        title: "False Ceiling",
        description: "PVC, POP, and Gypsum ceiling solutions that define your space and house your intelligent lighting systems seamlessly.",
        image: "/bedroom.png",
        details: {
            materials: ["Gypsum Board", "POP", "PVC Panels", "Wooden Rafters"],
            styles: ["Cove Lighting", "Tray Ceilings", "Grid Patterns", "Minimalist Flat"],
            process: "We design lighting plans integrated into the ceiling structure to create ambiance, highlight architectural features, and provide task lighting.",
            idealFor: "Living Rooms, Master Suites, Corporate Offices"
        }
    },
    {
        id: "05",
        title: "Electrical, AC, Painting & Plumbing",
        description: "Comprehensive core services. We ensure the hidden veins of your home—wiring, piping, and climate control—are perfectly executed alongside flawless wall finishes.",
        image: "/office.png",
        details: {
            materials: ["Polycab Wiring", "Daikin/OGeneral ACs", "Asian Paints Royale", "CPVC Pipes"],
            styles: ["Concealed Wiring", "Centralized AC", "Textured Walls", "Smart Home Ready"],
            process: "Executed by certified professionals with rigorous quality checks before any wall is sealed or painted.",
            idealFor: "New Constructions, Major Renovations, Turnkey Projects"
        }
    },
    {
        id: "06",
        title: "After-Construction Finishing",
        description: "The final touches that transform a construction site into a home. Deep cleaning, snagging, and perfect finishing.",
        image: "/hero.png",
        details: {
            materials: ["Premium Sealants", "Marble Polishing", "Wood Polish", "Glass Cleaners"],
            styles: ["Immaculate Detailing", "Zero-Defect Delivery", "Mirror-Finish Polishing", "Deep Cleaning"],
            process: "Our dedicated snagging team inspects every inch of the project to ensure nothing is overlooked before handover.",
            idealFor: "Post-Renovation, Ready-to-Move Properties"
        }
    },
    {
        id: "07",
        title: "Ready-To-Move Interior Solutions",
        description: "Fast-tracked, fully furnished solutions designed for clients who want immediate move-in readiness without compromising on quality.",
        image: "/kitchen.png",
        details: {
            materials: ["Pre-fabricated Modules", "Curated Furniture", "Soft Furnishings", "Ready Lighting"],
            styles: ["Contemporary Quick-Move", "Furnished Corporate", "Turnkey Rental", "Model Home"],
            process: "We utilize our extensive supply chain to quickly source, deliver, and install a complete home setup in record time.",
            idealFor: "Rental Investments, NRI Clients, Quick Relocations"
        }
    }
];

export default function Services() {
    const [selectedService, setSelectedService] = useState<ServiceDetail | null>(null);

    return (
        <div className="w-full bg-white relative">
            
            {/* Minimalist Header */}
            <div className="pt-32 pb-16 md:pt-48 md:pb-32 px-4 text-center bg-white border-b border-[#0F2557]/10 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/3 h-full bg-[#f8f9fa] skew-x-12 transform origin-top-right -z-10"></div>
                <div className="container mx-auto max-w-[1400px]">
                    <span className="font-mono text-sm tracking-[0.3em] text-[#A0A0A0] uppercase font-bold block mb-6">
                        What We Do
                    </span>
                    <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-[#0F2557] mb-8 leading-[1.1]">
                        Our <span className="italic text-[#A0A0A0]">Expertise</span>
                    </h1>
                    <p className="font-sans text-[#0F2557]/70 max-w-2xl mx-auto text-lg font-light leading-relaxed">
                        Comprehensive design solutions tailored to your absolute highest standards.
                    </p>
                </div>
            </div>

            {/* Pinned Scroll Services Layout */}
            <div className="w-full bg-[#f8f9fa] relative">
                {services.map((service, index) => (
                    <div 
                        key={service.id} 
                        className="flex flex-col lg:flex-row min-h-[80vh] border-b border-[#0F2557]/10 last:border-b-0"
                    >
                        {/* Sticky Image Container (Left Side) */}
                        <div className="w-full lg:w-1/2 h-[50vh] lg:h-auto relative lg:sticky lg:top-0">
                            <div className="absolute inset-0 p-4 md:p-8">
                                <div className="w-full h-full relative overflow-hidden">
                                    <div 
                                        className="absolute inset-0 bg-cover bg-center transition-transform duration-[2000ms] hover:scale-105"
                                        style={{ backgroundImage: `url(${service.image})` }}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F2557]/60 to-transparent" />
                                    
                                    {/* Number Overlay */}
                                    <div className="absolute bottom-8 left-8">
                                        <span className="font-serif text-6xl md:text-8xl text-white/90 drop-shadow-lg">
                                            {service.id}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Content Container (Right Side) */}
                        <div className="w-full lg:w-1/2 py-16 px-4 md:px-12 lg:py-32 lg:px-24 flex flex-col justify-center bg-white">
                            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#0F2557] mb-8 leading-tight">
                                {service.title}
                            </h2>
                            <p className="font-sans text-[#0F2557]/70 text-lg md:text-xl leading-relaxed font-light mb-12">
                                {service.description}
                            </p>
                            
                            <div className="space-y-6 mb-12">
                                <div className="grid grid-cols-2 gap-4 border-t border-[#0F2557]/10 pt-6">
                                    <div className="text-sm font-mono tracking-widest text-[#A0A0A0] uppercase">Signature Styles</div>
                                    <div className="text-[#0F2557] font-medium">{service.details.styles[0]}, {service.details.styles[1]}</div>
                                </div>
                                <div className="grid grid-cols-2 gap-4 border-t border-[#0F2557]/10 pt-6">
                                    <div className="text-sm font-mono tracking-widest text-[#A0A0A0] uppercase">Key Materials</div>
                                    <div className="text-[#0F2557] font-medium">{service.details.materials[0]}, {service.details.materials[1]}</div>
                                </div>
                            </div>

                            <Button
                                onClick={() => setSelectedService(service)}
                                className="w-fit bg-transparent text-[#0F2557] border border-[#0F2557] hover:bg-[#0F2557] hover:text-white rounded-none px-10 py-7 text-xs tracking-[0.2em] font-bold uppercase transition-all duration-300 flex items-center gap-3 group"
                            >
                                View Details
                                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                            </Button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Quick Contact CTA */}
            <div className="py-24 bg-[#0F2557] text-center px-4">
                <span className="font-mono text-sm tracking-[0.3em] text-[#A0A0A0] uppercase font-bold block mb-6">
                    Ready to Begin?
                </span>
                <h2 className="font-serif text-4xl md:text-5xl text-white mb-8">
                    Let's discuss your next project.
                </h2>
                <Link href="/contact">
                    <Button className="bg-white text-[#0F2557] hover:bg-[#A0A0A0] hover:text-white rounded-none px-10 py-7 text-xs tracking-[0.2em] font-bold uppercase transition-all duration-300">
                        Contact Us Today
                    </Button>
                </Link>
            </div>

            {/* Modal Overlay Details */}
            {selectedService && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-0 md:p-8 animate-in fade-in duration-300">
                    <div
                        className="absolute inset-0 bg-[#0F2557]/90 backdrop-blur-sm"
                        onClick={() => setSelectedService(null)}
                    />

                    <div className="relative w-full max-w-6xl h-full md:h-auto md:max-h-[90vh] bg-white text-[#0F2557] overflow-y-auto shadow-2xl flex flex-col lg:flex-row">
                        <button
                            onClick={() => setSelectedService(null)}
                            className="absolute top-4 right-4 z-50 p-2 bg-white/20 hover:bg-[#0F2557] hover:text-white rounded-none border border-[#0F2557]/20 transition-all backdrop-blur-md"
                        >
                            <X className="w-6 h-6" />
                        </button>

                        {/* Modal Image Column */}
                        <div className="w-full lg:w-2/5 h-[300px] lg:h-auto relative">
                            <img
                                src={selectedService.image}
                                alt={selectedService.title}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0F2557]/80 to-transparent" />
                            <div className="absolute bottom-8 left-8 text-white">
                                <span className="font-mono text-xs tracking-[0.3em] uppercase text-[#A0A0A0] mb-4 block font-bold">Service Detail</span>
                                <h2 className="font-serif text-4xl leading-tight">{selectedService.title}</h2>
                            </div>
                        </div>

                        {/* Modal Details Column */}
                        <div className="w-full lg:w-3/5 p-8 md:p-12 lg:p-16 bg-white overflow-y-auto">
                            <div className="space-y-12">
                                <div>
                                    <h3 className="font-mono text-xs tracking-[0.3em] text-[#A0A0A0] mb-4 uppercase font-bold border-b border-[#0F2557]/10 pb-4">Our Process</h3>
                                    <p className="font-sans text-lg text-[#0F2557]/80 leading-relaxed font-light">
                                        {selectedService.details.process}
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                    <div>
                                        <h3 className="font-mono text-xs tracking-[0.3em] text-[#A0A0A0] mb-6 uppercase font-bold border-b border-[#0F2557]/10 pb-4">Design Styles</h3>
                                        <ul className="space-y-4">
                                            {selectedService.details.styles.map((style, i) => (
                                                <li key={i} className="flex items-center gap-3 text-[#0F2557] font-light">
                                                    <span className="w-[1px] h-4 bg-[#A0A0A0]" />
                                                    {style}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div>
                                        <h3 className="font-mono text-xs tracking-[0.3em] text-[#A0A0A0] mb-6 uppercase font-bold border-b border-[#0F2557]/10 pb-4">Key Materials</h3>
                                        <ul className="space-y-4">
                                            {selectedService.details.materials.map((mat, i) => (
                                                <li key={i} className="flex items-center gap-3 text-[#0F2557]/80 font-light">
                                                    <Check className="w-4 h-4 text-[#0F2557]" />
                                                    {mat}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                                <div className="p-8 bg-[#f8f9fa] border-l-2 border-[#0F2557]">
                                    <span className="block font-mono text-xs text-[#A0A0A0] tracking-[0.3em] uppercase mb-4 font-bold">Perfect For</span>
                                    <p className="text-[#0F2557] font-serif italic text-2xl">
                                        "{selectedService.details.idealFor}"
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
