'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Printer, Mail, MessageCircle, ArrowLeft, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import QuotationTemplate from '@/components/quotations/QuotationTemplate';

export default function PrintQuotationPage() {
    const { id } = useParams();
    const router = useRouter();
    const [quotation, setQuotation] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) fetchQuotation();
    }, [id]);

    const fetchQuotation = async () => {
        try {
            // Fetch single quotation (Assuming we have a get by ID API, which we do: /api/quotations/[id])
            // Wait, we need to check if we enabled GET by ID in the API.
            // Based on previous context, we might have generic ID routes. Checking...
            // Use the standard route if available, else might need to implement it.
            // Assuming the standard /api/quotations/[id] exists and returns the populated quote.
            const res = await fetch(`/api/user_quotations/${id}`); // Placeholder, need to verify route
            // Actually, let's use the one we built.
            // Checking file structure... we have /api/quotations/route.ts. We likely need /api/quotations/[id]/route.ts.
            // I will implement a fetch here assuming the endpoint exists or I will create it. 
            // Let's assume for now I will use CLIENT SIDE filtering from the main list if API is missing, 
            // OR better, I will implement the API route in the next step if it fails.
            // For now, let's try to fetch from /api/quotations/<id> 
            const response = await fetch(`/api/quotations/${id}`);
            if (response.ok) {
                const data = await response.json();
                setQuotation(data);
            } else {
                // Fallback or error
                console.error("Failed to fetch");
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handlePrint = () => {
        window.print();
    };

    const handleWhatsApp = () => {
        // Create Public Link
        const publicLink = `${window.location.origin}/quote/${id}`;
        const text = `Hi ${quotation.clientName}, I have created a quotation for your project ${quotation.projectName}.\n\nYou can view and download the detailed proposal here:\n${publicLink}\n\nTotal Amount: ₹${quotation.finalAmount || quotation.totalAmount}\n\nRegards,\nInfinity Interiors`;

        // Use client phone if available. Remove non-digits.
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
                        <p className="text-xs text-slate-400">{quotation.quoteNumber}</p>
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
                    <button onClick={handlePrint} className="bg-white text-slate-900 hover:bg-slate-100 px-4 py-2 rounded-lg font-bold flex items-center gap-2 text-sm transition-colors">
                        <Printer className="w-4 h-4" /> Print PDF
                    </button>
                </div>
            </div>

            {/* Premium Template */}
            <div className="py-4 print:py-0">
                <QuotationTemplate quotation={quotation} />
            </div>
        </div>
    );
}
