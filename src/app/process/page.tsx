"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Process() {
    const steps = [
        {
            number: "01",
            title: "Discovery & Vision",
            description: "We begin by understanding your lifestyle, aspirations, and requirements. This includes site visits and detailed discussions to capture the essence of what you need.",
            image: "/hero.png" // Local generated asset
        },
        {
            number: "02",
            title: "Conceptualization",
            description: "Our designers create initial mood boards, layouts, and 3D visualizations. We explore themes, colors, and materials to define the aesthetic direction.",
            image: "/bedroom.png"
        },
        {
            number: "03",
            title: "Development",
            description: "We refine the designs into technical drawings and detailed specifications. Every electrical point, joinery detail, and material finish is documented.",
            image: "/office.png"
        },
        {
            number: "04",
            title: "Execution & Build",
            description: "Our skilled craftsmen bring the designs to life. We manage the entire build process, ensuring quality control and adherence to timelines.",
            image: "/kitchen.png"
        },
        {
            number: "05",
            title: "The Handover",
            description: "The final reveal. We style the space, ensure everything is perfect, and hand over the keys to your new dream environment.",
            image: "/hero.png" // Reusing hero for handover as it's our best image
        }
    ];

    const [activeStep, setActiveStep] = useState(0);

    return (
        <div className="w-full bg-[#0F2557] min-h-screen">
            
            {/* Header */}
            <div className="pt-32 pb-16 md:pt-48 md:pb-24 px-4 text-center">
                <span className="font-mono text-[#A0A0A0] tracking-[0.3em] uppercase text-sm block mb-6 font-bold">
                    How We Work
                </span>
                <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-white mb-8">
                    Our <span className="italic text-[#A0A0A0]">Process</span>
                </h1>
                <p className="font-sans text-white/70 max-w-2xl mx-auto text-lg leading-relaxed font-light">
                    A meticulous journey from the first sketch to the final styling, ensuring every detail exceeds your expectations.
                </p>
            </div>

            {/* Interactive Process Stepper (Desktop) & Cards (Mobile) */}
            <div className="container mx-auto px-4 md:px-8 pb-32 max-w-[1400px]">
                
                {/* Desktop View: Horizontal Stepper with large interactive image */}
                <div className="hidden lg:flex flex-col gap-12">
                    {/* Navigation Row */}
                    <div className="flex justify-between border-b border-white/20 pb-8 relative">
                        {/* Progress Line */}
                        <div 
                            className="absolute bottom-[-1px] left-0 h-[2px] bg-white transition-all duration-700 ease-in-out" 
                            style={{ width: `${(activeStep / (steps.length - 1)) * 100}%` }}
                        />
                        
                        {steps.map((step, index) => (
                            <button
                                key={index}
                                onClick={() => setActiveStep(index)}
                                className={`flex flex-col items-start gap-4 transition-all duration-500 w-1/5 relative group 
                                    ${activeStep === index ? 'opacity-100' : 'opacity-40 hover:opacity-80'}`}
                            >
                                <span className="font-mono text-xl text-[#A0A0A0] font-bold">
                                    {step.number}
                                </span>
                                <span className="font-serif text-xl text-white whitespace-nowrap">
                                    {step.title}
                                </span>
                            </button>
                        ))}
                    </div>

                    {/* Active Content Area */}
                    <div className="grid grid-cols-2 gap-16 items-center min-h-[500px]">
                        <div className="space-y-8 animate-in fade-in slide-in-from-left-8 duration-700" key={`content-${activeStep}`}>
                            <span className="font-mono text-[#A0A0A0] text-sm tracking-[0.3em] uppercase font-bold">Phase {steps[activeStep].number}</span>
                            <h2 className="font-serif text-5xl text-white leading-tight">
                                {steps[activeStep].title}
                            </h2>
                            <p className="font-sans text-white/70 text-xl leading-relaxed font-light max-w-lg">
                                {steps[activeStep].description}
                            </p>
                            <Link href="/portfolio" className="inline-block mt-8">
                                <Button variant="outline" className="border-white/30 text-white hover:bg-white hover:text-[#0F2557] rounded-none px-8 py-6 font-mono tracking-widest uppercase text-xs">
                                    See The Results
                                </Button>
                            </Link>
                        </div>
                        
                        <div className="relative h-[600px] w-full overflow-hidden" key={`image-${activeStep}`}>
                            <div className="absolute inset-0 bg-[#0F2557]/20 z-10"></div>
                            <img 
                                src={steps[activeStep].image} 
                                alt={steps[activeStep].title}
                                className="w-full h-full object-cover animate-in fade-in zoom-in-95 duration-1000"
                            />
                        </div>
                    </div>
                </div>

                {/* Mobile View: Vertical Stacking Cards */}
                <div className="lg:hidden flex flex-col gap-16">
                    {steps.map((step, index) => (
                        <div key={index} className="flex flex-col gap-6">
                            <div className="aspect-[4/3] w-full relative overflow-hidden">
                                <img 
                                    src={step.image} 
                                    alt={step.title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute top-4 left-4 bg-white text-[#0F2557] px-4 py-2 font-mono text-lg font-bold">
                                    {step.number}
                                </div>
                            </div>
                            <div>
                                <h2 className="font-serif text-3xl text-white mb-4">{step.title}</h2>
                                <p className="font-sans text-white/70 text-lg leading-relaxed font-light mb-6">
                                    {step.description}
                                </p>
                                {index === steps.length - 1 && (
                                    <Link href="/portfolio" className="inline-block w-full">
                                        <Button variant="outline" className="w-full border-white/30 text-white hover:bg-white hover:text-[#0F2557] rounded-none py-6 font-mono tracking-widest uppercase text-xs">
                                            View Our Work
                                        </Button>
                                    </Link>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}
