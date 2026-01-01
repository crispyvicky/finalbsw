'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import QuotationTemplate from '@/components/quotations/QuotationTemplate';
import { Loader2, Download, Phone } from 'lucide-react';

export default function PublicQuotationView() {
    const params = useParams();
    const id = params.id as string;
    const [quotation, setQuotation] = useState<any>(null);
    const [loading, setLoading] = useState(true);

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

    if (loading) return <div className="h-screen flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-slate-400" /></div>;
    if (!quotation) return <div className="h-screen flex items-center justify-center text-slate-500">Quotation not found or expired.</div>;

    return (
        <div className="bg-slate-100 min-h-screen pb-20">
            {/* Mobile Header for Clients */}
            <div className="bg-white p-4 shadow-sm sticky top-0 z-50 print:hidden flex justify-between items-center">
                <div className="font-serif font-bold text-slate-900">INFINITY INTERIORS</div>
                <button
                    onClick={() => window.print()}
                    className="bg-slate-900 text-white px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2"
                >
                    <Download className="w-4 h-4" /> Download PDF
                </button>
            </div>

            <div className="py-8 print:py-0">
                <QuotationTemplate quotation={quotation} />
            </div>

            {/* Mobile CTA */}
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/90 backdrop-blur border-t border-slate-200 flex gap-4 md:hidden print:hidden">
                <a href="tel:+919885851127" className="flex-1 bg-emerald-600 text-white py-3 rounded-lg font-bold flex justify-center items-center gap-2">
                    <Phone className="w-4 h-4" /> Call Us
                </a>
            </div>
        </div>
    );
}
