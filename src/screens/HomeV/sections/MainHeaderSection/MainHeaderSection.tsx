"use client";

import { SearchIcon, UserIcon, X, Menu, ArrowRight } from "lucide-react";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../../../../components/ui/button";

const navigationItems = [
  { label: "PORTFOLIO", path: "/portfolio" },
  { label: "SERVICES", path: "/services" },
  { label: "PROCESS", path: "/process" },
  { label: "LOOKBOOK", path: "/lookbook" },
  { label: "AI CREATOR", path: "/visualizer" },
  // { label: "BLOG", path: "/blog" },
  { label: "ABOUT", path: "/about" },
  { label: "COST ESTIMATOR", path: "/cost-estimator" },
  { label: "CONTACT", path: "/contact" },
];

export const MainHeaderSection = (): JSX.Element => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <>
      <header className="w-full flex flex-col sticky top-0 z-40 bg-white/95 backdrop-blur-sm shadow-sm transition-all duration-300">
        <div className="w-full h-10 relative bg-primary-01 flex-shrink-0">
          <div className="flex items-center justify-center h-full relative">
            <div className="font-label-small text-primary-03 text-xs tracking-widest text-center px-4 uppercase">
              Transforming Spaces Since 2000
            </div>
          </div>
        </div>

        {/* Desktop Header */}
        <div className="w-full py-4 px-4 md:px-8 lg:px-[60px] hidden md:flex items-center justify-between border-b border-gray-100">
          <Link href="/" className="flex items-center justify-center flex-shrink-0 group">
            <img src="/logo.png" alt="Infinity Interiors" className="h-16 w-24 object-contain group-hover:opacity-80 transition-opacity" />
          </Link>

          <nav className="flex-1 flex items-center justify-center gap-6 lg:gap-10 px-4">
            {navigationItems.map((item, index) => (
              <div key={index} className="relative group">
                <Link href={item.path}>
                  <Button
                    variant="ghost"
                    className={`h-auto p-0 font-label-medium text-primary-01 text-sm tracking-wider whitespace-nowrap hover:bg-transparent ${isActive(item.path) ? "font-bold" : ""}`}
                  >
                    {item.label}
                  </Button>
                </Link>
                <div className={`absolute -bottom-[21px] left-1/2 -translate-x-1/2 w-full h-[2px] bg-primary-01 transition-transform duration-300 scale-x-0 group-hover:scale-x-100 ${isActive(item.path) ? "scale-x-100" : ""}`} />
              </div>
            ))}
          </nav>

          <div className="flex items-center gap-4 lg:gap-6 flex-shrink-0">
            <Link href="/contact">
              <Button variant="outline" className="hidden lg:flex border-primary-01 text-primary-01 hover:bg-primary-01 hover:text-white rounded-none tracking-widest text-xs px-6">
                GET A QUOTE
              </Button>
            </Link>
          </div>
        </div>

        {/* Mobile Header Bar */}
        <div className="w-full h-[70px] flex items-center justify-between px-4 md:hidden border-b border-gray-100 bg-white z-50 relative">
          <Button
            variant="ghost"
            size="icon"
            className="h-auto p-0 hover:bg-transparent"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu className="w-6 h-6 text-primary-01" />
          </Button>

          <Link href="/" className="flex items-center justify-center">
            <img src="/logo.png" alt="Infinity Interiors" className="h-10 w-auto object-contain" />
          </Link>

          <div className="w-6"></div> {/* Spacer for alignment */}
        </div>
      </header>

      {/* Creative Full Screen Mobile Menu */}
      <div
        className={`fixed inset-0 z-[100] bg-primary-01 text-white transition-all duration-500 ease-in-out transform ${isMobileMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0 pointer-events-none'}`}
      >
        <div className="flex flex-col h-full relative">
          {/* Close Button */}
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="absolute top-6 right-6 p-2 text-white/80 hover:text-white transition-colors"
          >
            <X className="w-8 h-8" />
          </button>

          {/* Menu Content */}
          <div className="flex-1 flex flex-col justify-center px-8 space-y-8">
            <span className="text-white/30 tracking-[0.4em] text-xs font-light uppercase mb-4">Navigation</span>

            {navigationItems.map((item, index) => (
              <Link
                key={index}
                href={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className="group flex items-center justify-between border-b border-white/10 pb-4"
              >
                <span className={`font-heading-02 text-3xl md:text-5xl transition-all duration-300 ${isActive(item.path) ? 'text-white translate-x-4' : 'text-white/60 group-hover:text-white group-hover:translate-x-4'}`}>
                  {item.label}
                </span>
                <ArrowRight className="w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -translate-x-4 group-hover:0" />
              </Link>
            ))}
          </div>

          {/* Footer in Menu */}
          <div className="p-8 bg-white/5 border-t border-white/10">
            <p className="text-white/50 text-sm mb-2">Hyderabad, India</p>
            <p className="text-xl font-heading-04 italic">INFINITY INTERIORS</p>
          </div>
        </div>
      </div>
    </>
  );
};