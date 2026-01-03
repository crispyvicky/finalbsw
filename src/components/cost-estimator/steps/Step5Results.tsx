"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
// import { Utils } from "@/lib/utils";
import { ESTIMATOR_ROOM_DATA } from "@/lib/constants";
import { EstimatorState } from "../types";
import { Button } from "@/components/ui/button";
import { Download, Calendar, Mail, Phone, User, ChevronDown, CheckCircle, Loader2 } from "lucide-react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

interface Step5Props {
    onBack: () => void;
    data: EstimatorState;
}

export default function Step5Results({ onBack, data }: Step5Props) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [showForm, setShowForm] = useState(false);
    const [consultationForm, setConsultationForm] = useState({
        name: '',
        phone: '',
        email: ''
    });
    const [submitting, setSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [submitError, setSubmitError] = useState('');

    // User Pricing Logic (normalized per sq ft based on BHK complexity)
    const getRateRange = (bhk: string): [number, number] => {
        if (!bhk) return [1000, 1500];
        if (bhk.includes("1 BHK")) return [500, 800];
        if (bhk.includes("2 BHK")) return [900, 1200];
        if (bhk.includes("3 BHK")) return [1200, 1500];
        if (bhk.includes("4")) return [2000, 2500];
        if (bhk.includes("Villa")) return [3000, 4000];
        return [1000, 1500];
    };

    const [minRate, maxRate] = getRateRange(data.bhk);

    const getStyleFactor = (style?: string) => {
        const s = style?.toLowerCase() || "";
        if (s.includes("lux")) return 1.0;
        if (s.includes("prem")) return 0.6;
        if (s.includes("mod")) return 0.3;
        return 0; // Standard/Minimal start at minRate
    };

    const styleFactor = getStyleFactor(data.style);
    const calculatedRate = minRate + ((maxRate - minRate) * styleFactor);

    const totalBase = calculatedRate * data.size;

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

    const handleConsultationSubmit = async () => {
        if (!consultationForm.name || !consultationForm.phone || !consultationForm.email) {
            setSubmitError('Please fill in all fields');
            return;
        }

        setSubmitting(true);
        setSubmitError('');
        setSubmitSuccess(false);

        try {
            const response = await fetch('/api/enquiries', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: consultationForm.name,
                    phone: consultationForm.phone,
                    email: consultationForm.email,
                    source: 'Cost Estimator',
                    status: 'New',
                    budget: `${formatCurrency(estimatedMin)} - ${formatCurrency(estimatedMax)}`,
                    estimateData: {
                        propertyType: data.type || data.propertyType,
                        bhk: data.bhk,
                        size: data.size,
                        city: data.city,
                        rooms: data.rooms,
                        style: data.style,
                        addons: data.addons,
                        estimatedMin,
                        estimatedMax
                    }
                }),
            });

            if (response.ok) {
                setSubmitSuccess(true);
                setConsultationForm({ name: '', phone: '', email: '' });
                setTimeout(() => {
                    setSubmitSuccess(false);
                    setShowForm(false);
                }, 3000);
            } else {
                setSubmitError('Failed to submit. Please try again.');
            }
        } catch (err) {
            setSubmitError('An error occurred. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    const generatePDF = async () => {
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

        // Helper to load image with dimensions
        const loadImage = (url: string): Promise<{ data: string; w: number; h: number }> => {
            return new Promise((resolve, reject) => {
                const img = new Image();
                img.crossOrigin = "Anonymous";
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    canvas.width = img.width;
                    canvas.height = img.height;
                    const ctx = canvas.getContext('2d');
                    ctx?.drawImage(img, 0, 0);
                    resolve({
                        data: canvas.toDataURL('image/png'),
                        w: img.width,
                        h: img.height
                    });
                };
                img.onerror = reject;
                img.src = url;
            });
        };

        // --- BORDER & FRAME ---
        // Clean, minimal border
        doc.setDrawColor(primaryColor[0], primaryColor[1], primaryColor[2]);
        doc.setLineWidth(0.5);
        doc.rect(8, 8, pageWidth - 16, pageHeight - 16);

        // --- HEADER SECTION ---
        let headerBottomY = 50;

        try {
            const logoObj = await loadImage("/logo.png");

            // Fix Logo Size (Smaller as requested)
            const targetWidth = 35; // Reduced from 45
            const ratio = logoObj.h / logoObj.w;
            const targetHeight = targetWidth * ratio;

            doc.addImage(logoObj.data, 'PNG', margin, 20, targetWidth, targetHeight);
            headerBottomY = 20 + targetHeight + 5;

        } catch (e) {
            doc.setFont("helvetica", "bold");
            doc.setFontSize(24);
            doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
            doc.text("INFINITY INTERIORS", margin, 35);
        }

        // Header Right - Date & Reference
        const now = new Date();
        const dateStr = now.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

        doc.setFontSize(9);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(120);
        doc.text("ESTIMATE REFERENCE", pageWidth - margin, 28, { align: "right" });
        doc.setFontSize(11);
        doc.setTextColor(40);
        doc.text(dateStr, pageWidth - margin, 34, { align: "right" });

        doc.setDrawColor(230, 230, 230);
        doc.line(margin, headerBottomY + 10, pageWidth - margin, headerBottomY + 10);

        let yPos = headerBottomY + 15; // Start yPos after the header line with some padding

        // --- BANNER IMAGE WITH QUOTE ---
        try {
            // Pick first selected room image or a default one
            const bannerRoom = ESTIMATOR_ROOM_DATA.find(r => data.rooms?.includes(r.id)) || ESTIMATOR_ROOM_DATA[0];
            const bannerImg = await loadImage(bannerRoom.image);

            const bannerHeight = 40;
            const bannerWidth = pageWidth - (margin * 2);

            // Draw Image
            doc.addImage(bannerImg.data, 'JPEG', margin, yPos, bannerWidth, bannerHeight);

            // Draw White Box for Quote (Classy center label)
            doc.setFillColor(255, 255, 255);
            const boxW = 100;
            const boxH = 15;
            const boxX = (pageWidth - boxW) / 2;
            const boxY = yPos + (bannerHeight - boxH) / 2;
            doc.roundedRect(boxX, boxY, boxW, boxH, 1, 1, 'F');

            // Quote Text
            doc.setFont("helvetica", "italic");
            doc.setFontSize(11);
            doc.setTextColor(accentColor[0], accentColor[1], accentColor[2]);
            doc.text('"Home is not a place... it\'s a feeling."', pageWidth / 2, boxY + 10, { align: "center" });

            yPos += bannerHeight + 15; // Update yPos after banner

        } catch (e) {
            // Fallback if image fails, just text
            doc.setFont("helvetica", "italic");
            doc.setFontSize(12);
            doc.setTextColor(accentColor[0], accentColor[1], accentColor[2]);
            doc.text('"Home is not a place... it\'s a feeling."', pageWidth / 2, yPos + 10, { align: 'center' });
            yPos += 20;
        }

        // --- SCOPE & DETAILS ---
        const sectionTopY = yPos;

        // Left: Details
        doc.setFontSize(10);
        doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
        doc.setFont("helvetica", "bold");
        doc.text("PROJECT OVERVIEW", margin, sectionTopY);

        let leftY = sectionTopY + 8;
        const details = [
            { l: "Client:", v: data.name || "Valued Customer" },
            { l: "Phone:", v: data.phone || "-" },
            { l: "Type:", v: `${data.type || data.propertyType} (${data.bhk})` },
            { l: "Size:", v: `${data.size} Sq. Ft.` },
            { l: "Location:", v: data.city },
            { l: "Style:", v: data.style || "Standard" }
        ];

        doc.setFontSize(9);
        details.forEach((item) => {
            doc.setFont("helvetica", "bold");
            doc.setTextColor(80);
            doc.text(item.l, margin, leftY);
            doc.setFont("helvetica", "normal");
            doc.setTextColor(40);
            doc.text(item.v, margin + 25, leftY);
            leftY += 6;
        });

        // Right: Scope
        let rightY = sectionTopY;
        if (data.rooms && data.rooms.length > 0) {
            doc.setFontSize(10);
            doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
            doc.setFont("helvetica", "bold");
            doc.text("SCOPE OF WORK", pageWidth / 2, rightY);

            rightY += 8;
            doc.setFont("helvetica", "normal");
            doc.setFontSize(9);
            doc.setTextColor(60);

            const roomsText = data.rooms.join(", ");
            const colWidth = (pageWidth / 2) - margin;
            const splitRef = doc.splitTextToSize(roomsText, colWidth);
            doc.text(splitRef, pageWidth / 2, rightY);
            rightY += (splitRef.length * 6);
        }

        yPos = Math.max(leftY, rightY) + 15;

        // --- ESTIMATE TABLE ---
        doc.setFontSize(14);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
        doc.text("COST BREAKDOWN", margin, yPos);
        yPos += 5;

        const breakdownData = [
            ["Design & Management", "15%", formatForPDF(estimatedMin * 0.15)],
            ["Materials & Fit-outs", "55%", formatForPDF(estimatedMin * 0.55)],
            ["Labor & Execution", "20%", formatForPDF(estimatedMin * 0.2)],
            ["Decor & Accessories", "10%", formatForPDF(estimatedMin * 0.1)],
        ] as any; // Removed the total row and spacer row

        autoTable(doc, {
            startY: yPos,
            head: [['Category', 'Allocation', 'Approximate Budget']],
            body: breakdownData,
            theme: 'grid',
            headStyles: {
                fillColor: [61, 90, 69], // Dark Green
                textColor: 255,
                fontStyle: 'bold',
                halign: 'left',
                cellPadding: 4
            },
            styles: {
                fontSize: 10,
                cellPadding: 5,
                lineColor: [240, 240, 240],
                textColor: [50, 50, 50],
                font: "helvetica"
            },
            columnStyles: {
                0: { cellWidth: 'auto' },
                1: { cellWidth: 30, halign: 'center', textColor: [100, 100, 100] },
                2: { cellWidth: 50, halign: 'right', fontStyle: 'bold' }
            },
            alternateRowStyles: {
                fillColor: [252, 252, 252]
            }
        });

        // @ts-ignore
        yPos = doc.lastAutoTable.finalY + 10;

        // --- TOTAL (Separate Section for Alignment) ---
        const totalBoxW = 90;
        const totalBoxX = pageWidth - margin - totalBoxW;

        doc.setFillColor(248, 250, 248);
        doc.roundedRect(totalBoxX, yPos, totalBoxW, 25, 2, 2, 'F');

        doc.setFontSize(10);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
        doc.text("ESTIMATED TOTAL", totalBoxX + (totalBoxW / 2), yPos + 8, { align: "center" });

        doc.setFontSize(14);
        doc.setTextColor(accentColor[0], accentColor[1], accentColor[2]);
        const totalText = `${formatForPDF(estimatedMin)} - ${formatForPDF(estimatedMax)}`;
        doc.text(totalText, totalBoxX + (totalBoxW / 2), yPos + 18, { align: "center" });

        yPos += 35;

        // --- DISCLAIMER & FOOTER ---
        doc.setFillColor(245, 245, 245);
        doc.roundedRect(margin, yPos, pageWidth - (margin * 2), 25, 2, 2, 'F');

        doc.setFontSize(8);
        doc.setTextColor(100);
        doc.text("IMPORTANT NOTE:", margin + 5, yPos + 8);

        const disclaimer = "This is a preliminary estimate for planning purposes only. Final pricing will vary based on exact measurements, site conditions, material selection, and customization. It does not constitute a formal quotation or binding contract.";
        const splitDisc = doc.splitTextToSize(disclaimer, pageWidth - (margin * 2) - 10);

        doc.setFont("helvetica", "normal");
        doc.setTextColor(80);
        doc.text(splitDisc, margin + 5, yPos + 14);

        // Footer Band
        doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
        doc.rect(0, pageHeight - 12, pageWidth, 12, 'F');

        doc.setFontSize(8);
        doc.setTextColor(255);
        doc.text("INFINITY INTERIORS  •  www.infinityinteriors.co", pageWidth / 2, pageHeight - 5, { align: "center" });

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

                    {submitSuccess && (
                        <div className="mb-6 p-4 bg-green-500/10 border border-green-500/30 rounded-lg flex items-center gap-3">
                            <CheckCircle className="w-5 h-5 text-green-600" />
                            <p className="text-green-800 text-sm">Thank you! We'll contact you soon with detailed recommendations.</p>
                        </div>
                    )}

                    {submitError && (
                        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                            <p className="text-red-800 text-sm">{submitError}</p>
                        </div>
                    )}

                    <div className="space-y-6">
                        <div className="relative group">
                            <User className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#ce7e48] transition-colors w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Your Name"
                                value={consultationForm.name}
                                onChange={(e) => setConsultationForm({ ...consultationForm, name: e.target.value })}
                                className="w-full bg-transparent border-b border-gray-200 py-4 pl-8 text-[#3d5a45] focus:outline-none focus:border-[#ce7e48] placeholder:text-gray-400 font-body-02 transition-all"
                                required
                            />
                        </div>
                        <div className="relative group">
                            <Phone className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#ce7e48] transition-colors w-5 h-5" />
                            <input
                                type="tel"
                                placeholder="Phone Number"
                                value={consultationForm.phone}
                                onChange={(e) => setConsultationForm({ ...consultationForm, phone: e.target.value })}
                                className="w-full bg-transparent border-b border-gray-200 py-4 pl-8 text-[#3d5a45] focus:outline-none focus:border-[#ce7e48] placeholder:text-gray-400 font-body-02 transition-all"
                                required
                            />
                        </div>
                        <div className="relative group">
                            <Mail className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#ce7e48] transition-colors w-5 h-5" />
                            <input
                                type="email"
                                placeholder="Email Address"
                                value={consultationForm.email}
                                onChange={(e) => setConsultationForm({ ...consultationForm, email: e.target.value })}
                                className="w-full bg-transparent border-b border-gray-200 py-4 pl-8 text-[#3d5a45] focus:outline-none focus:border-[#ce7e48] placeholder:text-gray-400 font-body-02 transition-all"
                                required
                            />
                        </div>
                        <Button
                            onClick={handleConsultationSubmit}
                            disabled={submitting}
                            className="w-full bg-[#3d5a45] text-white h-16 text-xs tracking-[0.2em] font-bold uppercase rounded-none hover:bg-[#2F4F2F] transition-colors mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {submitting ? (
                                <>
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                    SUBMITTING...
                                </>
                            ) : (
                                'SUBMIT REQUEST'
                            )}
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
