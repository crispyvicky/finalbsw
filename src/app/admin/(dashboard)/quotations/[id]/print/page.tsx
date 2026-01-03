'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams } from 'next/navigation';
import { Download, Mail, MessageCircle, ArrowLeft, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import QuotationTemplate from '@/components/quotations/QuotationTemplate';

export default function PrintQuotationPage() {
    const { id } = useParams();
    const router = useRouter();
    const [quotation, setQuotation] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [downloading, setDownloading] = useState(false);
    const quotationRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (id) fetchQuotation();
    }, [id]);

    const fetchQuotation = async () => {
        try {
            const response = await fetch(`/api/quotations/${id}`);
            if (response.ok) {
                const data = await response.json();
                setQuotation(data);
            } else {
                console.error("Failed to fetch");
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleDownloadPDF = async () => {
        if (!quotationRef.current) return;

        setDownloading(true);
        try {
            const html2pdf = (await import('html2pdf.js')).default;

            const element = quotationRef.current;
            const opt = {
                margin: 0,
                filename: `Quotation_${quotation.quotationNo || quotation.quoteNumber}.pdf`,
                image: { type: 'jpeg' as const, quality: 0.98 },
                html2canvas: { scale: 2, useCORS: true, logging: false },
                jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' as const }
            };

            await html2pdf().set(opt).from(element).save();
        } catch (error) {
            console.error('PDF generation failed:', error);
            window.print();
        } finally {
            setDownloading(false);
        }
    };

    const handleWhatsApp = () => {
        const publicLink = `${window.location.origin}/quote/${id}`;
        const text = `Hi ${quotation.clientName}, I have created a quotation for your project ${quotation.projectName}.\n\nYou can view and download the detailed proposal here:\n${publicLink}\n\nTotal Amount: ₹${quotation.finalAmount || quotation.totalAmount}\n\nRegards,\nInfinity Interiors`;

        const phone = quotation.clientPhone ? quotation.clientPhone.replace(/\D/g, '') : '';
        const url = phone ? `https://wa.me/${phone}?text=${encodeURIComponent(text)}` : `https://wa.me/?text=${encodeURIComponent(text)}`;

        window.open(url, '_blank');
    };

    const handleEmail = () => {
        const publicLink = `${window.location.origin}/quote/${id}`;
        const subject = `Quotation for ${quotation?.projectName} - Infinity Interiors`;
        const body = `Hi ${quotation?.clientName},\n\nPlease review your quotation at the link below:\n\n${publicLink}\n\nTotal Amount: ₹${quotation?.totalAmount}\n\nRegards,\nInfinity Interiors`;

        const email = quotation.clientEmail || '';
        window.open(`mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
    };

    if (loading) return <div className="h-screen flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-slate-400" /></div>;
    if (!quotation) return <div className="p-8 text-center">Quotation not found</div>;

    return (
        <div className="bg-slate-100 min-h-screen text-slate-800 font-sans print:bg-white print:text-black">
            {/* Toolbar - Hidden in Print */}
            <div className="print:hidden bg-slate-900 text-white p-4 flex justify-between items-center sticky top-0 z-50 shadow-md">
                <div className="flex items-center gap-4">
                    <Link href="/admin/quotations" className="hover:bg-slate-800 p-2 rounded-full transition-colors">
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <div>
                        <h1 className="font-bold text-lg">{quotation.projectName}</h1>
                        <p className="text-xs text-slate-400">{quotation.quotationNo || quotation.quoteNumber}</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <div className="flex items-center bg-slate-800 rounded-lg p-1">
                        <button onClick={handleWhatsApp} className="px-4 py-2 bg-[#25D366] hover:bg-[#128C7E] text-white font-bold rounded-md flex items-center gap-2 transition-colors">
                            <MessageCircle className="w-4 h-4" /> Share WhatsApp
                        </button>
                        <div className="w-px h-6 bg-slate-700 mx-1"></div>
                        <button onClick={handleEmail} className="px-4 py-2 hover:bg-slate-700 text-white font-medium rounded-md flex items-center gap-2 transition-colors">
                            <Mail className="w-4 h-4" /> Email
                        </button>
                    </div>
                    <button
                        onClick={handleDownloadPDF}
                        disabled={downloading}
                        className="bg-white text-slate-900 hover:bg-slate-100 px-4 py-2 rounded-lg font-bold flex items-center gap-2 text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {downloading ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" /> Downloading...
                            </>
                        ) : (
                            <>
                                <Download className="w-4 h-4" /> Download PDF
                            </>
                        )}
                    </button>
                </div>
            </div>

            {/* Premium Template */}
            <div className="py-4 print:py-0" ref={quotationRef}>
                <QuotationTemplate quotation={quotation} />
            </div>
        </div>
    );
}
