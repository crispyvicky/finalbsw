import React from "react";
import EstimatorHero from "@/components/cost-estimator/EstimatorHero";
import EstimatorContainer from "@/components/cost-estimator/EstimatorContainer";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Interior Cost Estimator | Bravoo Interiors",
    description: "Calculate the estimated cost for your premium home interiors with our AI-powered cost estimator tool.",
};

export default function CostEstimatorPage() {
    return (
        <main className="min-h-screen bg-white">
            <EstimatorHero />
            <EstimatorContainer />
        </main>
    );
}
