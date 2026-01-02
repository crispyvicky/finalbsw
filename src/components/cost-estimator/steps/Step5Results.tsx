"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { cn } from "@/lib/utils";
import { EstimatorState } from "../types";
import { Button } from "@/components/ui/button";
import { Download, Calendar, Mail, Phone, User, ChevronDown, CheckCircle } from "lucide-react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

interface Step5Props {
    onBack: () => void;
    data: EstimatorState;
}

export default function Step5Results({ onBack, data }: Step5Props) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [showForm, setShowForm] = useState(false);

    // Calculate Base Cost
    const baseRate = data.style === "Luxurious" ? 2800 : data.style === "Premium" ? 2200 : 1600;
    const totalBase = baseRate * data.size;

    // Addons cost (Approx)
    const addonCost = (data.addons?.length || 0) * 50000;

    const estimatedMin = totalBase + addonCost;
    const estimatedMax = estimatedMin * 1.25;

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0,
        }).format(amount);
    };

    const generatePDF = () => {
        const doc = new jsPDF();
        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();
        const margin = 20;

        // Brand Colors
        const primaryColor: [number, number, number] = [61, 90, 69]; // #3d5a45 Green
        const accentColor: [number, number, number] = [206, 126, 72]; // #ce7e48 Orange

        // Safe Currency Formatter
        const formatForPDF = (amount: number) => {
            // Force standard ASCII comma formatting
            const str = Math.round(amount).toString();
            const lastThree = str.substring(str.length - 3);
            const otherNumbers = str.substring(0, str.length - 3);
            const formatted = otherNumbers !== '' ? otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + "," + lastThree : lastThree;
            return "Rs. " + formatted;
        };

        // --- BORDER & FRAME ---
        doc.setDrawColor(primaryColor[0], primaryColor[1], primaryColor[2]);
        doc.setLineWidth(1);
        doc.rect(10, 10, pageWidth - 20, pageHeight - 20); // Outer Border

        // --- HEADER SECTION ---
        // Company Name
        doc.setFont("helvetica", "bold");
        doc.setFontSize(26);
        doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
        doc.text("INFINITY", margin, 40);

        doc.setFont("helvetica", "normal");
        doc.setFontSize(26);
        doc.text("INTERIORS", margin + 55, 40); // align next to Infinity

        // Tagline
        doc.setFontSize(10);
        doc.setTextColor(accentColor[0], accentColor[1], accentColor[2]);
        doc.text("EST. 2000 | LUXURY DESIGN", margin, 48);

        // Header Right - Date
        const now = new Date();
        const dateStr = now.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

        doc.setFontSize(10);
        doc.setTextColor(100);
        doc.text("Estimate Date:", pageWidth - margin, 38, { align: "right" });
        doc.setFontSize(12);
        doc.setTextColor(0);
        doc.text(dateStr, pageWidth - margin, 44, { align: "right" });

        // Orange Line Separator
        doc.setDrawColor(accentColor[0], accentColor[1], accentColor[2]);
        doc.setLineWidth(0.5);
        doc.line(margin, 55, pageWidth - margin, 55);

        let yPos = 70;

        // --- CLIENT / PROPERTY DETAILS (Grid Layout) ---
        doc.setFontSize(14);
        doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
        doc.text("PROJECT DETAILS", margin, yPos);
        yPos += 10;

        const propertyData = [
            ["Configuration", data.bhk],
            ["Property Type", data.type || data.propertyType],
            ["Location", data.city],
            ["Total Area", `${data.size} Sq. Ft.`],
            ["Selected Style", data.style || "-"],
        ] as any;

        autoTable(doc, {
            startY: yPos,
            head: [],
            body: propertyData,
            theme: 'plain',
            styles: { fontSize: 10, cellPadding: 3, textColor: [50, 50, 50] },
            columnStyles: {
                0: { fontStyle: 'bold', cellWidth: 50, textColor: primaryColor }
            },
        });

        // @ts-ignore
        yPos = doc.lastAutoTable.finalY + 15;

        // --- ROOMS SELECTION ---
        if (data.rooms && data.rooms.length > 0) {
            doc.setFontSize(14);
            doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
            doc.text("SCOPE OF WORK", margin, yPos);
            yPos += 8;

            doc.setFontSize(10);
            doc.setTextColor(80);
            const roomsText = `Includes design and execution for: ${data.rooms.join(", ")}.`;
            const splitRef = doc.splitTextToSize(roomsText, pageWidth - (margin * 2));
            doc.text(splitRef, margin, yPos);
            yPos += (splitRef.length * 6) + 15;
        }

        // --- ESTIMATE TABLE ---
        doc.setFontSize(14);
        doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
        doc.text("PRELIMINARY ESTIMATE", margin, yPos);
        yPos += 10;

        const breakdownData = [
            ["Design Consultation & Management", "15%", formatForPDF(estimatedMin * 0.15)],
            ["Materials, Finishes & Fit-outs", "55%", formatForPDF(estimatedMin * 0.55)],
            ["Labor, Installation & Execution", "20%", formatForPDF(estimatedMin * 0.2)],
            ["Appliances, Lighting & Decor", "10%", formatForPDF(estimatedMin * 0.1)],
            [
                { content: "TOTAL ESTIMATED BUDGET", colSpan: 2, styles: { fontStyle: 'bold', fillColor: [240, 240, 240], textColor: primaryColor } },
                { content: `${formatForPDF(estimatedMin)} - ${formatForPDF(estimatedMax)}`, styles: { fontStyle: 'bold', fillColor: [240, 240, 240], textColor: accentColor } }
            ] as any,
        ];

        autoTable(doc, {
            startY: yPos,
            head: [['Description', 'Split', 'Approximate Cost']],
            body: breakdownData,
            theme: 'grid',
            headStyles: {
                fillColor: primaryColor,
                textColor: 255,
                fontStyle: 'bold',
                halign: 'left'
            },
            styles: {
                fontSize: 10,
                cellPadding: 6,
                lineColor: [230, 230, 230],
                textColor: [40, 40, 40]
            },
            columnStyles: {
                0: { cellWidth: 'auto' },
                1: { cellWidth: 30, halign: 'center' },
                2: { cellWidth: 50, halign: 'right', fontStyle: 'bold' }
            },
            footStyles: { fillColor: [240, 240, 240] }
        });

        // @ts-ignore
        yPos = doc.lastAutoTable.finalY + 30;

        // --- DISCLAIMER & FOOTER ---
        doc.setFontSize(9);
        doc.setTextColor(150);
        const disclaimer = "Note: This is a preliminary estimate based on typical market rates and your selections. Final pricing may vary based on site conditions, specific material choices, and customization. This document is not a final quotation.";
        const splitDisc = doc.splitTextToSize(disclaimer, pageWidth - (margin * 2));
        doc.text(splitDisc, margin, yPos);

        // Footer Band
        doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
        doc.rect(0, pageHeight - 15, pageWidth, 15, 'F');

        doc.setFontSize(9);
        doc.setTextColor(255);
        doc.text("www.infinityinteriors.com  |  contact@infinityinteriors.com", pageWidth / 2, pageHeight - 9, { align: "center" });

        // Save
        doc.save("Infinity_Interiors_Estimate.pdf");
    };

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Dramatic reveal
            const tl = gsap.timeline();

            tl.from(".result-card", {
                scale: 0.95,
                opacity: 0,
                duration: 0.8,
                ease: "power2.out"
            })
                .from(".breakdown-item", {
                    y: 20,
                    opacity: 0,
                    stagger: 0.1,
                    duration: 0.5
                }, "-=0.4");

        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className="space-y-12">
            <div className="text-center space-y-4">
                <h2 className="font-heading-03 text-3xl md:text-5xl font-bold text-[#3d5a45] italic">Your Dream Space Estimate</h2>
                <p className="font-body-02 text-[#3d5a45]/60 font-light">Based on your selections for a {data.bhk} in {data.city}</p>
            </div>

            {/* Main Price Card */}
            <div className="result-card relative bg-[#3d5a45] text-white rounded-none p-10 md:p-16 text-center overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#ce7e48]/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#ce7e48]/10 rounded-full blur-3xl" />

                <div className="relative z-10 space-y-4">
                    <span className="text-[#ce7e48] font-bold tracking-[0.2em] text-xs uppercase font-body-02 bg-white/5 py-1 px-3 rounded-none">Estimated Investment</span>
                    <div className="font-heading-02 text-5xl md:text-7xl text-white py-4 leading-none">
                        {formatCurrency(estimatedMin)}
                    </div>
                    <div className="text-white/60 text-sm md:text-base font-body-02 tracking-wide font-light">
                        to {formatCurrency(estimatedMax)} range
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Breakdown */}
                <div className="space-y-4">
                    <h3 className="text-[#3d5a45] font-heading-05 font-medium text-xl flex items-center gap-2">
                        <span className="w-1 h-6 bg-[#ce7e48]" />
                        Cost Breakdown
                    </h3>
                    <div className="bg-[#fdfbf7] p-6 space-y-4 border border-[#ce7e48]/20 shadow-sm">
                        {[
                            { label: "Design & Management", value: estimatedMin * 0.15 },
                            { label: "Materials & Finishes", value: estimatedMin * 0.55 },
                            { label: "Labor & Execution", value: estimatedMin * 0.2 },
                            { label: "Appliances & Accessories", value: estimatedMin * 0.1 },
                        ].map((item, idx) => (
                            <div key={idx} className="breakdown-item flex justify-between items-center text-[#3d5a45]/80 border-b border-[#ce7e48]/10 pb-3 last:border-0 last:pb-0">
                                <span className="font-body-02 text-sm">{item.label}</span>
                                <span className="font-mono text-[#3d5a45] font-bold">{formatCurrency(item.value)}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Style Summary */}
                <div className="space-y-4">
                    <h3 className="text-[#3d5a45] font-heading-05 font-medium text-xl flex items-center gap-2">
                        <span className="w-1 h-6 bg-[#3d5a45]" />
                        Selections
                    </h3>
                    <div className="bg-white p-6 border border-[#ce7e48]/20 shadow-sm h-full">
                        <div className="space-y-6">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 border border-[#ce7e48]/30 flex items-center justify-center text-[#3d5a45] bg-[#f5f2eb]"><User className="w-5 h-5 stroke-1" /></div>
                                <div>
                                    <div className="text-[10px] text-[#ce7e48] uppercase tracking-widest">Style</div>
                                    <div className="text-[#3d5a45] text-sm font-bold font-heading-07">{data.style || "Not Selected"}</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 border border-[#ce7e48]/30 flex items-center justify-center text-[#3d5a45] bg-[#f5f2eb]"><CheckCircle className="w-5 h-5 stroke-1" /></div>
                                <div>
                                    <div className="text-[10px] text-[#ce7e48] uppercase tracking-widest">Rooms</div>
                                    <div className="text-[#3d5a45] text-sm font-bold font-heading-07">{data.rooms?.length} Spaces Included</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 border border-[#ce7e48]/30 flex items-center justify-center text-[#3d5a45] bg-[#f5f2eb]"><CheckCircle className="w-5 h-5 stroke-1" /></div>
                                <div>
                                    <div className="text-[10px] text-[#ce7e48] uppercase tracking-widest">Add-ons</div>
                                    <div className="text-[#3d5a45] text-sm font-bold font-heading-07">{data.addons?.length} Premium Features</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA */}
            <div className="flex flex-col md:flex-row gap-6 justify-center pt-10 border-t border-[#ce7e48]/20">
                <Button variant="outline" className="border-[#3d5a45] text-[#3d5a45] hover:bg-[#3d5a45] hover:text-white h-16 px-10 rounded-none font-medium tracking-[0.2em] text-xs uppercase transition-all duration-300" onClick={generatePDF}>
                    <Download className="w-4 h-4 mr-3" /> DOWNLOAD BREAKDOWN
                </Button>
                <Button
                    className="bg-[#3d5a45] text-white hover:bg-[#2F4F2F] h-16 px-12 rounded-none font-medium tracking-[0.2em] text-xs uppercase shadow-xl hover:shadow-2xl transition-all duration-300"
                    onClick={() => setShowForm(!showForm)}
                >
                    <Calendar className="w-4 h-4 mr-3" /> BOOK FREE CONSULTATION
                </Button>
            </div>

            {showForm && (
                <div className="bg-white border border-[#ce7e48]/20 shadow-2xl p-10 max-w-xl mx-auto animate-in slide-in-from-bottom-10 fade-in duration-700 relative mt-10">
                    <h3 className="text-3xl font-heading-03 font-bold text-[#3d5a45] mb-8 text-center italic">Get Professional Advice</h3>
                    <div className="space-y-6">
                        <div className="relative group">
                            <User className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#ce7e48] transition-colors w-5 h-5" />
                            <input type="text" placeholder="Your Name" className="w-full bg-transparent border-b border-gray-200 py-4 pl-8 text-[#3d5a45] focus:outline-none focus:border-[#ce7e48] placeholder:text-gray-400 font-body-02 transition-all" />
                        </div>
                        <div className="relative group">
                            <Phone className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#ce7e48] transition-colors w-5 h-5" />
                            <input type="tel" placeholder="Phone Number" className="w-full bg-transparent border-b border-gray-200 py-4 pl-8 text-[#3d5a45] focus:outline-none focus:border-[#ce7e48] placeholder:text-gray-400 font-body-02 transition-all" />
                        </div>
                        <div className="relative group">
                            <Mail className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#ce7e48] transition-colors w-5 h-5" />
                            <input type="email" placeholder="Email Address" className="w-full bg-transparent border-b border-gray-200 py-4 pl-8 text-[#3d5a45] focus:outline-none focus:border-[#ce7e48] placeholder:text-gray-400 font-body-02 transition-all" />
                        </div>
                        <Button className="w-full bg-[#3d5a45] text-white h-16 text-xs tracking-[0.2em] font-bold uppercase rounded-none hover:bg-[#2F4F2F] transition-colors mt-6">
                            SUBMIT REQUEST
                        </Button>
                    </div>
                </div>
            )}

            <div className="text-center">
                <button onClick={onBack} className="text-gray-400 hover:text-[#3d5a45] transition-colors text-sm underline underline-offset-4">
                    Make adjustments to calculation
                </button>
            </div>
        </div>
    );
}
