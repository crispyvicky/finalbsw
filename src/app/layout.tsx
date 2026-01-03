import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { MainHeaderSection } from "../screens/HomeV/sections/MainHeaderSection/MainHeaderSection";
import { ContactFooterSection } from "../screens/HomeV/sections/ContactFooterSection/ContactFooterSection";

import { CustomCursor } from "@/components/ui/CustomCursor";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  style: ['normal', 'italic']
});

export const metadata: Metadata = {
  title: "Infinity Interiors | Luxury Interior Designers in Hyderabad",
  description: "Infinity Interiors: Rated the best interiors in Hyderabad. We craft timeless, luxury residential and commercial spaces since 2000. Transform your space with Hyderabad's premier design agency.",
  keywords: ["Best Interiors in Hyderabad", "Luxury Interior Designers Hyderabad", "Top Interior Designers Hyderabad", "Infinity Interiors", "Premium Home Design Hyderabad", "Commercial Interior Design Hyderabad"],
  metadataBase: new URL('https://infinityinteriors.co'),
  openGraph: {
    title: "Infinity Interiors | Luxury Interior Designers in Hyderabad",
    description: "Discover why Infinity Interiors is rated the best in Hyderabad. Luxury, timeless design for your dream home or office.",
    url: 'https://infinityinteriors.co',
    siteName: 'Infinity Interiors',
    images: [
      {
        url: '/opengraph-image.png', // We should make sure this exists or use a default
        width: 1200,
        height: 630,
        alt: 'Infinity Interiors - Best Interiors in Hyderabad',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Infinity Interiors | Luxury Interior Designers in Hyderabad",
    description: "Crafting legacies through timeless interior design. Hyderabad's premier luxury design agency.",
    images: ['/twitter-image.png'], // We should make sure this exists or use a default
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased bg-white`}>
        <CustomCursor />
        <div className="flex flex-col min-h-screen">
          <MainHeaderSection />
          <main className="flex-grow">
            {children}
          </main>
          <ContactFooterSection />
        </div>
      </body>
    </html>
  );
}
