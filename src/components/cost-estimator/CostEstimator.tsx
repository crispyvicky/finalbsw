"use client";

import React, { useState, useRef, useEffect } from "react";
import { Calculator, Home, CheckCircle2, ArrowRight, DollarSign, X } from "lucide-react";
import gsap from "gsap";
import { cn } from "@/lib/utils";

type InteriorType = "Basic" | "Standard" | "Premium" | "Luxurious";

interface EstimationResult {
    min: number;
    max: number;
}

const interiorTypes: { type: InteriorType; priceRange: string; desc: string; color: string }[] = [
    {
        type: "Basic",
        priceRange: "₹800 - ₹1200 / sq ft",
        desc: "Essential functionality with clean aesthetics. Best for rental properties.",
        color: "bg-blue-50 border-blue-200 text-blue-900",
    },
    {
        type: "Standard",
        priceRange: "₹1200 - ₹1800 / sq ft",
        desc: "Modern designs with durable materials. Perfect for your first home.",
        color: "bg-green-50 border-green-200 text-green-900",
    },
    {
        type: "Premium",
        priceRange: "₹1800 - ₹2500 / sq ft",
        desc: "High-end finishes and customized designs. For a sophisticated lifestyle.",
        color: "bg-purple-50 border-purple-200 text-purple-900",
    },
    {
        type: "Luxurious",
        priceRange: "₹2500+ / sq ft",
        desc: "Top-tier luxury with imported materials and bespoke craftsmanship.",
        color: "bg-blue-50 border-blue-200 text-blue-900",
    },
];

export default function CostEstimator() {
    const [step, setStep] = useState(1);
    const [selectedType, setSelectedType] = useState<InteriorType | null>(null);
    const [area, setArea] = useState<number | "">("");
    const [showModal, setShowModal] = useState(false);
    const [estimation, setEstimation] = useState<EstimationResult | null>(null);

    const containerRef = useRef<HTMLDivElement>(null);
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".fade-in", {
                opacity: 0,
                y: 20,
                duration: 0.8,
                stagger: 0.1,
                ease: "power3.out",
            });
        }, containerRef);
        return () => ctx.revert();
    }, [step]);

    const handleCalculate = () => {
        if (!selectedType || !area) return;

        let minRate = 0;
        let maxRate = 0;

        switch (selectedType) {
            case "Basic":
                minRate = 800;
                maxRate = 1200;
                break;
            case "Standard":
                minRate = 1200;
                maxRate = 1800;
                break;
            case "Premium":
                minRate = 1800;
                maxRate = 2500;
                break;
            case "Luxurious":
                minRate = 2500;
                maxRate = 3500; // Cap for estimation
                break;
        }

        const minCost = minRate * Number(area);
        const maxCost = maxRate * Number(area);

        setEstimation({ min: minCost, max: maxCost });
        setShowModal(true);

        // Animate modal entry
        setTimeout(() => {
            if (modalRef.current) {
                gsap.fromTo(modalRef.current,
                    { scale: 0.8, opacity: 0 },
                    { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)" }
                );
            }
        }, 10);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0,
        }).format(amount);
    };

    return (
        <div ref={containerRef} className="w-full max-w-4xl mx-auto p-6 md:p-12">
            <div className="text-center mb-12 fade-in">
                <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 mb-4">
                    Estimate Your Dream Interior
                </h1>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    Get a quick ballpark estimate for your home interiors based on your style and requirements.
                </p>
            </div>

            <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 fade-in">
                {/* Progress Bar */}
                <div className="w-full bg-gray-100 h-2">
                    <div
                        className="h-full bg-black transition-all duration-500 ease-out"
                        style={{ width: `${(step / 2) * 100}%` }}
                    />
                </div>

                <div className="p-8 md:p-12">
                    {step === 1 && (
                        <div className="space-y-8">
                            <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
                                <span className="bg-black text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">1</span>
                                Select Your Interior Style
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {interiorTypes.map((item) => (
                                    <button
                                        key={item.type}
                                        onClick={() => setSelectedType(item.type)}
                                        className={cn(
                                            "relative text-left p-6 rounded-2xl border-2 transition-all duration-300 hover:shadow-lg group",
                                            selectedType === item.type
                                                ? "border-black bg-gray-50 ring-1 ring-black"
                                                : "border-gray-100 hover:border-gray-300"
                                        )}
                                    >
                                        <div className="flex justify-between items-start mb-4">
                                            <h3 className="text-xl font-bold text-gray-900">{item.type}</h3>
                                            {selectedType === item.type && (
                                                <CheckCircle2 className="text-black w-6 h-6" />
                                            )}
                                        </div>
                                        <p className="text-sm text-gray-500 mb-4">{item.desc}</p>
                                        <div className={cn("inline-block px-3 py-1 rounded-full text-xs font-semibold", item.color)}>
                                            {item.priceRange}
                                        </div>
                                    </button>
                                ))}
                            </div>

                            <div className="flex justify-end pt-4">
                                <button
                                    onClick={() => setStep(2)}
                                    disabled={!selectedType}
                                    className="bg-black text-white px-8 py-4 rounded-full font-medium flex items-center gap-2 hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    Next Step <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="space-y-8">
                            <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
                                <span className="bg-black text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">2</span>
                                Property Details
                            </h2>

                            <div className="space-y-6 max-w-lg mx-auto py-8">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Carpet Area (sq ft)
                                    </label>
                                    <div className="relative">
                                        <Home className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                                        <input
                                            type="number"
                                            value={area}
                                            onChange={(e) => setArea(Number(e.target.value))}
                                            placeholder="e.g. 1200"
                                            className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 focus:border-black focus:ring-1 focus:ring-black outline-none transition-all text-lg"
                                        />
                                    </div>
                                    <p className="text-xs text-gray-500 mt-2">
                                        Enter the total floor area you want to design.
                                    </p>
                                </div>
                            </div>

                            <div className="flex justify-between pt-4">
                                <button
                                    onClick={() => setStep(1)}
                                    className="text-gray-500 font-medium hover:text-black transition-colors"
                                >
                                    Back
                                </button>
                                <button
                                    onClick={handleCalculate}
                                    disabled={!area}
                                    className="bg-black text-white px-8 py-4 rounded-full font-medium flex items-center gap-2 hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    <Calculator className="w-4 h-4" /> Calculate Estimate
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Result Modal */}
            {showModal && estimation && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div
                        ref={modalRef}
                        className="bg-white rounded-3xl w-full max-w-lg p-8 relative shadow-2xl"
                    >
                        <button
                            onClick={closeModal}
                            className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
                        >
                            <X className="w-6 h-6 text-gray-500" />
                        </button>

                        <div className="text-center space-y-6">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto text-green-600">
                                <DollarSign className="w-8 h-8" />
                            </div>

                            <div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">Estimated Cost</h3>
                                <p className="text-gray-500">
                                    Based on {selectedType} selection for {area} sq ft.
                                </p>
                            </div>

                            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
                                <div className="text-sm text-gray-500 uppercase tracking-wider font-semibold mb-2">Price Range</div>
                                <div className="text-3xl md:text-4xl font-bold text-gray-900">
                                    {formatCurrency(estimation.min)} - {formatCurrency(estimation.max)}
                                </div>
                            </div>

                            <div className="text-sm text-gray-400">
                                *This is an approximate estimation. Actual cost may vary based on material selection, site conditions, and specific requirements.
                            </div>

                            <button
                                onClick={closeModal}
                                className="w-full bg-black text-white py-4 rounded-xl font-medium hover:bg-gray-800 transition-colors"
                            >
                                Get a Detailed Quote
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
