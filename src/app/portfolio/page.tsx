
import React, { Suspense } from "react";
import PortfolioClient from "@/components/portfolio/PortfolioClient";

// Export metadata here (allowed in Server Component)
export const metadata = {
    title: 'Our Portfolio | BSW Interiors',
    description: 'Explore our curated portfolio of luxury residential and commercial interior design projects in Hyderabad.',
};

export default function Portfolio() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-white" />}>
            <PortfolioClient />
        </Suspense>
    );
}
