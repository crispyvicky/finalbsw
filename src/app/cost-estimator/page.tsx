import React from "react";
import EstimatorHero from "@/components/cost-estimator/EstimatorHero";
import EstimatorContainer from "@/components/cost-estimator/EstimatorContainer";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Interior Design Cost Estimator | Calculate Home Interior Price - Infinity Interiors",
    description: "Get an instant estimated cost for your premium home interiors in Hyderabad. Use our AI-powered calculator for 1BHK, 2BHK, 3BHK, and Villa pricing. Accurate, transparent, and tailored to your needs.",
    keywords: ["Interior design cost estimator", "interior cost calculator hyderabad", "home interior pricing", "luxury interior design cost", "1BHK interior cost", "2BHK interior cost", "3BHK interior cost", "villa interior design price", "Infinity Interiors cost estimator"],
    openGraph: {
        title: "Interior Design Cost Estimator | Calculate Home Interior Price - Infinity Interiors",
        description: "Get an instant estimated cost for your premium home interiors in Hyderabad. Use our AI-powered calculator for 1BHK, 2BHK, 3BHK, and Villa pricing.",
        type: "website",
        url: "https://infinityinteriors.co/cost-estimator", // Assuming valid URL, can be adjusted
        siteName: "Infinity Interiors",
        images: [
            {
                url: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop", // Using Hero image for consistency
                width: 1200,
                height: 630,
                alt: "Luxury Interior Design Cost Estimator",
            },
        ],
    },
};

export default function CostEstimatorPage() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Infinity Interiors Cost Estimator",
        "applicationCategory": "DesignApplication",
        "operatingSystem": "Web",
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "INR"
        },
        "description": "Calculate the estimated cost for your premium home interiors with our AI-powered cost estimator tool.",
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.8",
            "ratingCount": "150"
        }
    };

    return (
        <main className="min-h-screen bg-white">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <EstimatorHero />
            <EstimatorContainer />
        </main>
    );
}
