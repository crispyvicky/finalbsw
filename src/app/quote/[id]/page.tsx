'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams } from 'next/navigation';
import QuotationTemplate from '@/components/quotations/QuotationTemplate';
import { Loader2, Download, Phone } from 'lucide-react';

export default function PublicQuotationView() {
    const params = useParams();
    const id = params.id as string;
    const [quotation, setQuotation] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [downloading, setDownloading] = useState(false);
    const quotationRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (id) fetchQuotation();
    }, [id]);

    const fetchQuotation = async () => {
        try {
            const res = await fetch(`/api/quotations/${id}`);
            if (res.ok) {
                const data = await res.json();
                setQuotation(data);
            }
        } catch (error) {
            console.error('Failed to fetch', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDownloadPDF = async () => {
        if (!quotationRef.current) return;

        setDownloading(true);
        try {
            // Dynamically import html2pdf
            const html2pdf = (await import('html2pdf.js')).default;

            const element = quotationRef.current;
            const opt = {
                margin: 0,
                filename: `Quotation_${quotation.quotationNo}.pdf`,
                image: { type: 'jpeg' as const, quality: 0.98 },
                html2canvas: { scale: 2, useCORS: true, logging: false },
                jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' as const }
            };

            await html2pdf().set(opt).from(element).save();
        } catch (error) {
            console.error('PDF generation failed:', error);
            // Fallback to print
            window.print();
        } finally {
            setDownloading(false);
        }
    };

    if (loading) return <div className="h-screen flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-slate-400" /></div>;
    if (!quotation) return <div className="h-screen flex items-center justify-center text-slate-500">Quotation not found or expired.</div>;

    return (
        <div className="bg-slate-100 min-h-screen">
            {/* Desktop/Mobile Header */}
            <div className="bg-white p-4 md:p-6 shadow-sm sticky top-0 z-50 print:hidden">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <div>
                        <div className="font-serif font-bold text-slate-900 text-lg md:text-xl">BSW INTERIORS</div>
                        <div className="text-xs md:text-sm text-slate-500 mt-1">Quotation #{quotation.quotationNo}</div>
                    </div>
                    <div className="flex gap-2 md:gap-3">
                        <a
                            href="tel:"
                            className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 md:px-6 py-2 md:py-3 rounded-lg text-sm md:text-base font-bold flex items-center gap-2 transition-colors"
                        >
                            <Phone className="w-4 h-4" />
                            <span className="hidden sm:inline">Call Us</span>
                        </a>
                        <button
                            onClick={handleDownloadPDF}
                            disabled={downloading}
                            className="bg-slate-900 hover:bg-slate-800 text-white px-3 md:px-6 py-2 md:py-3 rounded-lg text-sm md:text-base font-bold flex items-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {downloading ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    <span className="hidden sm:inline">Downloading...</span>
                                </>
                            ) : (
                                <>
                                    <Download className="w-4 h-4" />
                                    <span className="hidden sm:inline">Download PDF</span>
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Quotation Content */}
            <div className="py-4 md:py-8 px-2 md:px-4 print:py-0 print:px-0 pb-20 md:pb-8">
                <div ref={quotationRef} className="max-w-5xl mx-auto">
                    <QuotationTemplate quotation={quotation} />
                </div>
            </div>

            {/* Mobile Bottom CTA - Only on small screens */}
            <div className="fixed bottom-0 left-0 right-0 p-3 bg-white/95 backdrop-blur border-t border-slate-200 md:hidden print:hidden shadow-lg">
                <div className="flex gap-3">
                    <a
                        href="tel:"
                        className="flex-1 bg-emerald-600 text-white py-3 rounded-lg font-bold flex justify-center items-center gap-2"
                    >
                        <Phone className="w-4 h-4" /> Call Us
                    </a>
                    <button
                        onClick={handleDownloadPDF}
                        disabled={downloading}
                        className="flex-1 bg-slate-900 text-white py-3 rounded-lg font-bold flex justify-center items-center gap-2 disabled:opacity-50"
                    >
                        {downloading ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" /> Downloading...
                            </>
                        ) : (
                            <>
                                <Download className="w-4 h-4" /> Download
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}
