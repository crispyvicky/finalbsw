"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "../../../../components/ui/button";
import { Checkbox } from "../../../../components/ui/checkbox";
import { Input } from "../../../../components/ui/input";
import { Loader2, CheckCircle, ArrowRight } from "lucide-react";

const footerColumns = [
  {
    title: "Explore",
    links: [
      { label: "Portfolio", path: "/portfolio" },
      { label: "Services", path: "/services" },
      { label: "Process", path: "/process" },
      { label: "About Us", path: "/about" },
    ],
  },
  {
    title: "Connect",
    links: [
      { label: "Contact", path: "/contact" },
      { label: "Instagram", path: "https://www.instagram.com/bswinteriors_18/" },
      { label: "Facebook", path: "#" },
      { label: "Pinterest", path: "#" },
    ],
  },
];

export const ContactFooterSection = (): JSX.Element => {
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !consent) {
      setError('Please enter your email and accept the privacy policy');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const response = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email,
          source: 'Newsletter',
          status: 'New',
          name: 'Newsletter Subscriber',
          phone: '-'
        }),
      });

      if (response.ok) {
        setSuccess(true);
        setEmail('');
        setConsent(false);
        setTimeout(() => setSuccess(false), 5000);
      } else {
        setError('Failed to subscribe.');
      }
    } catch (err) {
      setError('An error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="w-full bg-[#0F2557] relative z-50 text-white overflow-hidden">
      
      {/* Massive Typography Banner */}
      <div className="w-full pt-24 pb-12 overflow-hidden border-b border-white/10">
        <h2 className="font-serif text-[12vw] leading-none text-white/5 whitespace-nowrap select-none font-bold tracking-tighter -ml-4">
          BSW INTERIORS.
        </h2>
      </div>

      <div className="container mx-auto max-w-[1400px] px-4 md:px-8 py-16 md:py-24">
        
        <div className="flex flex-col lg:flex-row justify-between gap-16 lg:gap-24">
          
          {/* Left Column: CTA & Newsletter */}
          <div className="w-full lg:w-1/2 flex flex-col gap-12">
            <div>
              <span className="font-mono text-sm tracking-[0.3em] text-[#A0A0A0] uppercase font-bold block mb-6">
                Start Your Journey
              </span>
              <h3 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white mb-8 leading-[1.1]">
                Crafting Timeless <span className="italic text-[#A0A0A0]">Luxury.</span>
              </h3>
              <Link href="/contact" className="inline-block">
                <Button className="bg-transparent border border-white hover:bg-white hover:text-[#0F2557] rounded-none px-8 py-6 text-xs tracking-widest uppercase font-bold transition-all duration-300 flex items-center gap-3 group">
                  Discuss a Project
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>

            <div className="max-w-md mt-8">
              <span className="font-mono text-xs tracking-[0.3em] text-[#A0A0A0] uppercase font-bold block mb-6">
                Design Insights
              </span>
              <p className="font-sans text-white/70 mb-6 font-light">
                Subscribe to our newsletter to receive the latest updates, architectural trends, and exclusive lookbooks.
              </p>

              {success && (
                <div className="p-3 mb-4 bg-green-500/10 border border-green-500/30 text-green-300 text-sm font-mono tracking-wider uppercase">
                  Successfully subscribed.
                </div>
              )}
              {error && (
                <div className="p-3 mb-4 bg-red-500/10 border border-red-500/30 text-red-300 text-sm font-mono tracking-wider uppercase">
                  {error}
                </div>
              )}

              <form onSubmit={handleNewsletterSubmit} className="space-y-4">
                <div className="flex">
                  <Input
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-14 bg-white/5 border-white/20 text-white rounded-none focus-visible:ring-0 focus-visible:border-white font-sans placeholder:text-white/30"
                    required
                  />
                  <Button
                    type="submit"
                    disabled={loading}
                    className="h-14 bg-white text-[#0F2557] hover:bg-[#A0A0A0] rounded-none px-6 transition-colors"
                  >
                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <ArrowRight className="w-5 h-5" />}
                  </Button>
                </div>
                <div className="flex gap-3 items-start mt-4">
                  <Checkbox
                    checked={consent}
                    onCheckedChange={(checked) => setConsent(checked as boolean)}
                    className="w-4 h-4 rounded-sm border-white/30 data-[state=checked]:bg-white data-[state=checked]:text-[#0F2557]"
                  />
                  <p className="text-white/50 text-xs font-light leading-relaxed">
                    I agree to the Privacy Policy and consent to receiving marketing communications from BSW Interiors.
                  </p>
                </div>
              </form>
            </div>
          </div>

          {/* Right Column: Links & Address */}
          <div className="w-full lg:w-1/2 flex flex-col sm:flex-row justify-between gap-12 lg:pl-16">
            
            {/* Links */}
            <div className="flex gap-16 md:gap-24">
              {footerColumns.map((col, idx) => (
                <div key={idx} className="flex flex-col gap-6">
                  <span className="font-mono text-xs tracking-[0.3em] text-[#A0A0A0] uppercase font-bold">
                    {col.title}
                  </span>
                  <nav className="flex flex-col gap-4">
                    {col.links.map((link, lIdx) => (
                      <Link 
                        key={lIdx} 
                        href={link.path}
                        className="font-sans text-white/70 hover:text-white hover:translate-x-1 transition-all duration-300 text-lg font-light"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </nav>
                </div>
              ))}
            </div>

            {/* Address Info */}
            <div className="flex flex-col gap-6">
              <span className="font-mono text-xs tracking-[0.3em] text-[#A0A0A0] uppercase font-bold">
                Headquarters
              </span>
              <address className="font-sans text-white/70 font-light text-lg not-italic leading-relaxed">
                Mahankali Nagar, Kukatpally<br />
                Hyderabad - 500072<br />
                Telangana, India
              </address>
              <div className="mt-4 flex flex-col gap-2">
                <a href="mailto:bswinteriors11@gmail.com" className="font-sans text-white hover:text-[#A0A0A0] transition-colors font-light text-lg">
                  bswinteriors11@gmail.com
                </a>
                <a href="tel:+918106990471" className="font-sans text-white hover:text-[#A0A0A0] transition-colors font-light text-lg">
                  +91 81069 90471
                </a>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto max-w-[1400px] px-4 md:px-8 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-mono text-[10px] tracking-widest text-[#A0A0A0] uppercase">
            © {new Date().getFullYear()} BSW INTERIORS. ALL RIGHTS RESERVED.
          </p>
          
          <div className="flex gap-8">
            <Link href="/privacy" className="font-mono text-[10px] tracking-widest text-[#A0A0A0] hover:text-white uppercase transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="font-mono text-[10px] tracking-widest text-[#A0A0A0] hover:text-white uppercase transition-colors">
              Terms of Use
            </Link>
          </div>

          <a href="https://bravoo.in" target="_blank" rel="noopener noreferrer" className="font-mono text-[10px] tracking-widest text-[#A0A0A0] hover:text-white uppercase transition-colors">
            Crafted by Bravoo
          </a>
        </div>
      </div>
    </footer>
  );
};