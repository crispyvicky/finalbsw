"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Home, LayoutGrid, PaintBucket, Gem, Receipt } from "lucide-react";
import Step1Property from "./steps/Step1Property";
import Step2Rooms from "./steps/Step2Rooms";
import Step3Style from "./steps/Step3Style";
import Step4Addons from "./steps/Step4Addons";
import Step5Results from "./steps/Step5Results";

// Define shared types
import { EstimatorState } from "./types";

const STEPS = [
    { id: 1, label: "Property", icon: Home },
    { id: 2, label: "Rooms", icon: LayoutGrid },
    { id: 3, label: "Style", icon: PaintBucket },
    { id: 4, label: "Premium", icon: Gem },
    { id: 5, label: "Estimate", icon: Receipt },
];

export default function EstimatorContainer() {
    const [step, setStep] = useState(1);
    const [direction, setDirection] = useState(1);
    const [formData, setFormData] = useState<EstimatorState>({
        propertyType: "Apartment",
        bhk: "",
        size: 1000,
        city: "Hyderabad",
        rooms: [],
        style: "",
        materials: {},
        addons: []
    });

    const nextStep = () => {
        if (step < 5) {
            setDirection(1);
            setStep(s => s + 1);
            window.scrollTo({ top: document.getElementById('estimator-container')?.offsetTop || 0, behavior: 'smooth' });
        }
    };

    const prevStep = () => {
        if (step > 1) {
            setDirection(-1);
            setStep(s => s - 1);
            window.scrollTo({ top: document.getElementById('estimator-container')?.offsetTop || 0, behavior: 'smooth' });
        }
    };

    const updateData = (data: Partial<EstimatorState>) => {
        setFormData(prev => ({ ...prev, ...data }));
    };

    return (
        <div id="estimator-container" className="relative w-full min-h-screen py-10 px-4 bg-secondary-05">
            <div className="max-w-[1000px] mx-auto relative z-20">
                {/* Main Card */}
                <div className="bg-white border border-primary-01/10 min-h-[600px] flex flex-col overflow-hidden shadow-lg">

                    {/* Progress Header - Clean & Sharp */}
                    <div className="bg-[#f5f2eb] border-b border-[#E0E0E0] px-6 py-8 overflow-x-auto scrollbar-hide">
                        <div className="flex items-center justify-between min-w-[600px] md:min-w-0 px-4">
                            {STEPS.map((s, idx) => {
                                const isActive = s.id === step;
                                const isCompleted = s.id < step;

                                return (
                                    <div key={s.id} className="flex flex-col items-center relative z-10 group cursor-default w-full">

                                        <div className="relative flex items-center justify-center mb-3">
                                            <div
                                                className={cn(
                                                    "w-12 h-12 flex items-center justify-center transition-all duration-300 relative z-20 border rounded-sm",
                                                    isActive ? "bg-[#0F2557] border-[#0F2557] text-white shadow-lg scale-105" : // Green Active
                                                        isCompleted ? "bg-[#Fdfbf7] border-[#A0A0A0] text-[#A0A0A0]" : // Beige/Orange Completed
                                                            "bg-white border-[#E0E0E0] text-[#BDBDBD]"
                                                )}
                                            >
                                                <s.icon className={cn("w-5 h-5", isActive ? "stroke-[1.5px]" : "stroke-1")} />
                                            </div>
                                        </div>

                                        <span className={cn(
                                            "text-[10px] font-bold uppercase tracking-[0.15em] transition-all duration-300 font-body-02",
                                            isActive ? "text-[#0F2557]" : isCompleted ? "text-[#A0A0A0]" : "text-[#BDBDBD]"
                                        )}>
                                            {s.label}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Steps Content Area */}
                    <div className="flex-1 p-6 md:p-12 relative bg-white">
                        {/* Render Step based on state */}
                        {step === 1 && <Step1Property onNext={nextStep} data={formData} updateData={updateData} />}
                        {step === 2 && <Step2Rooms onBack={prevStep} onNext={nextStep} data={formData} updateData={updateData} />}
                        {step === 3 && <Step3Style onBack={prevStep} onNext={nextStep} data={formData} updateData={updateData} />}
                        {step === 4 && <Step4Addons onBack={prevStep} onNext={nextStep} data={formData} updateData={updateData} />}
                        {step === 5 && <Step5Results onBack={prevStep} data={formData} />}
                    </div>

                </div>
            </div>
        </div>
    );
}
