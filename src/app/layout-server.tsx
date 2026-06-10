import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "BSW Interiors | Luxury Interior Designers in Hyderabad",
    description: "BSW Interiors: Rated the best interiors in Hyderabad. We craft timeless, luxury residential and commercial spaces since 2000. Transform your space with Hyderabad's premier design agency.",
    keywords: ["Best Interiors in Hyderabad", "Luxury Interior Designers Hyderabad", "Top Interior Designers Hyderabad", "BSW Interiors", "Premium Home Design Hyderabad", "Commercial Interior Design Hyderabad"],
    metadataBase: new URL('https://bswinteriors.com'),
    openGraph: {
        title: "BSW Interiors | Luxury Interior Designers in Hyderabad",
        description: "Discover why BSW Interiors is rated the best in Hyderabad. Luxury, timeless design for your dream home or office.",
        url: 'https://bswinteriors.com',
        siteName: 'BSW Interiors',
        images: [
            {
                url: '/opengraph-image.png',
                width: 1200,
                height: 630,
                alt: 'BSW Interiors - Best Interiors in Hyderabad',
            },
        ],
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: "BSW Interiors | Luxury Interior Designers in Hyderabad",
        description: "Crafting legacies through timeless interior design. Hyderabad's premier luxury design agency.",
        images: ['/twitter-image.png'],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
};
