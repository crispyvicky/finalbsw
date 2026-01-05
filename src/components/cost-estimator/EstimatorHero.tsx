
"use client";

import React, { useRef } from "react";
import { ArrowRight, Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function EstimatorHero() {
    const sectionRef = useRef<HTMLDivElement>(null);

    const onStart = () => {
        const element = document.getElementById("estimator-container");
        if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    return (
        <section ref={sectionRef} className="relative w-full py-20 lg:py-32 overflow-hidden bg-[#f5f2eb]">
            {/* Crisp Background Image - No Blur */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop"
                    alt="Luxury Interior"
                    className="w-full h-full object-cover opacity-15"
                />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                    {/* Content */}
                    <div className="hero-content flex-1 text-center lg:text-left space-y-8">
                        <div className="space-y-4">
                            <span className="inline-block px-3 py-1 bg-[#3d5a45]/10 text-[#3d5a45] text-xs font-bold tracking-[0.2em] uppercase mb-4">
                                Online Cost Calculator
                            </span>
                            <h1 className="font-heading-01 text-5xl md:text-6xl lg:text-7xl text-[#1a1a1a] leading-[1.1]">
                                Interior Design <br />
                                <span className="text-[#3d5a45] italic font-heading-03 font-normal">Cost Estimator</span>
                            </h1>
                            <p className="font-body-02 text-lg text-gray-600 max-w-xl mx-auto lg:mx-0 font-light leading-relaxed">
                                Plan your dream home budget with our advanced tool. Get instant pricing for <strong>luxury interiors in Hyderabad</strong>, customized for 1BHK, 2BHK, 3BHK, and Villas. Accurate, transparent, and free.
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start">
                            <Button
                                className="group h-14 px-8 rounded-none border border-[#3d5a45] bg-[#3d5a45] text-white hover:bg-[#2F4F2F] transition-all duration-300 flex items-center gap-3 w-fit mx-auto lg:mx-0 shadow-lg"
                                onClick={onStart}
                            >
                                <span className="font-bold tracking-[0.2em] text-xs uppercase">START ESTIMATE</span>
                                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                            </Button>
                        </div>

                        {/* Stats - Horizontal */}
                        <div className="pt-8 border-t border-[#ce7e48]/20 grid grid-cols-3 gap-8">
                            {[
                                { label: "Projects", value: "500+" },
                                { label: "Experience", value: "15Y" },
                                { label: "Accuracy", value: "98%" },
                            ].map((stat, i) => (
                                <div key={i} className="text-center lg:text-left">
                                    <div className="font-heading-05 text-2xl lg:text-3xl font-bold text-[#3d5a45] mb-1">{stat.value}</div>
                                    <div className="font-body-02 text-xs text-[#ce7e48] uppercase tracking-widest">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Side Visual - Distinct & Clear */}
                    <div className="hero-image flex-1 w-full max-w-lg lg:max-w-xl relative">
                        <div className="aspect-[4/5] bg-white relative overflow-hidden shadow-2xl border-4 border-white/50">
                            <img
                                src="https://images.unsplash.com/photo-1600210492493-0946911123ea?q=80&w=1000&auto=format&fit=crop"
                                alt="Interior Design"
                                className="w-full h-full object-cover"
                            />
                            {/* No heavy overlay here, keeping it crisp */}
                        </div>

                        {/* Floater Element */}
                        <div className="absolute -bottom-8 -left-8 bg-[#f5f2eb] p-6 shadow-xl border border-[#ce7e48]/20 max-w-[200px] hidden md:block">
                            <div className="flex items-center gap-3 mb-3">
                                <Calculator className="w-5 h-5 text-[#ce7e48]" />
                                <span className="font-bold text-xs uppercase tracking-widest text-[#3d5a45]">Instant</span>
                            </div>
                            <p className="font-heading-03 italic text-lg text-gray-600 leading-tight">
                                Real-time pricing for your home
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

