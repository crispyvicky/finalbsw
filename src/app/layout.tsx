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
  title: "INFINITY Interiors - Since 2000",
  description: "Crafting legacies through timeless interior design. Hyderabad's premier luxury design agency.",
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
