'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams } from 'next/navigation';
import { Download, Mail, MessageCircle, ArrowLeft, Loader2, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import QuotationTemplate from '@/components/quotations/QuotationTemplate';

export default function PrintQuotationPage() {
    const { id } = useParams();
    const router = useRouter();
    const [quotation, setQuotation] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [downloading, setDownloading] = useState(false);
    const [sendingEmail, setSendingEmail] = useState(false);
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
        if (!quotation.clientPhone) {
            alert('⚠️ No phone number found for this client.\n\nPlease add a phone number in the quotation details and try again.');
            return;
        }

        const message = `✨ *INFINITY INTERIORS*
_Where Dreams Meet Design_

Hi *${quotation.clientName.toUpperCase()}*,

Your quotation for *${quotation.projectName.toUpperCase()}* is ready for review.

💰 *Total Amount:* ₹${(quotation.finalAmount || quotation.totalAmount).toLocaleString('en-IN')}

👇 *Tap below to view full details:*
${window.location.origin}/quote/${id}

_Thank you for choosing us!_ 🏡`;

        const phone = quotation.clientPhone.replace(/[^0-9]/g, '');
        window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');
    };

    const handleEmail = async () => {
        if (!quotation.clientEmail) {
            alert('⚠️ No email address found for this client.\n\nPlease add an email address in the quotation details and try again.');
            return;
        }

        setSendingEmail(true);
        try {
            const response = await fetch('/api/send-quotation-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    to: quotation.clientEmail,
                    subject: `Quotation ${quotation.quoteNumber} - ${quotation.projectName}`,
                    quotationData: {
                        quoteNumber: quotation.quoteNumber,
                        clientName: quotation.clientName,
                        projectName: quotation.projectName,
                        totalAmount: quotation.totalAmount,
                        discount: quotation.discount || 0,
                        gstRate: quotation.gstRate || 0,
                        finalAmount: quotation.finalAmount,
                        sections: quotation.sections,
                        notes: quotation.notes,
                        quotationLink: `${window.location.origin}/quote/${id}`
                    }
                })
            });

            if (response.ok) {
                alert(`✅ Email sent successfully!\n\nQuotation has been sent to:\n${quotation.clientEmail}`);
            } else {
                const error = await response.json();
                alert(`❌ Failed to send email\n\nError: ${error.details || 'Unknown error'}\n\nPlease check your email configuration.`);
            }
        } catch (error) {
            console.error('Email error:', error);
            alert('❌ Failed to send email\n\nPlease check your internet connection and try again.');
        } finally {
            setSendingEmail(false);
        }
    };

    const handleDelete = async () => {
        const confirmMessage = `⚠️ DELETE QUOTATION\n\nAre you sure you want to delete:\n\nQuotation: ${quotation.quoteNumber}\nClient: ${quotation.clientName}\nProject: ${quotation.projectName}\n\n⚠️ This action CANNOT be undone!`;

        if (!confirm(confirmMessage)) {
            return;
        }

        try {
            const response = await fetch(`/api/quotations/${id}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                alert('✅ Quotation deleted successfully');
                router.push('/admin/quotations');
            } else {
                alert('❌ Failed to delete quotation\n\nPlease try again or contact support.');
            }
        } catch (error) {
            console.error('Delete error:', error);
            alert('❌ Failed to delete quotation\n\nPlease check your internet connection and try again.');
        }
    };

    if (loading) return <div className="h-screen flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-slate-400" /></div>;
    if (!quotation) return <div className="p-8 text-center">Quotation not found</div>;

    return (
        <div className="bg-slate-100 min-h-screen text-slate-800 font-sans print:bg-white print:text-black">
            {/* Toolbar - Hidden in Print */}
            <div className="print:hidden bg-slate-900 text-white p-4 flex justify-between items-center sticky top-0 z-50 shadow-md">
                <div className="flex items-center gap-2 md:gap-4 overflow-hidden">
                    <Link href="/admin/quotations" className="hover:bg-slate-800 p-2 rounded-full transition-colors shrink-0">
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <div className="truncate">
                        <h1 className="font-bold text-sm md:text-lg truncate">{quotation.projectName}</h1>
                        <p className="text-[10px] md:text-xs text-slate-400">{quotation.quotationNo || quotation.quoteNumber}</p>
                    </div>
                </div>
                <div className="flex items-center gap-2 md:gap-3">
                    <div className="flex items-center bg-slate-800 rounded-lg p-1 shrink-0">
                        <button onClick={handleWhatsApp} className="px-2 md:px-4 py-2 bg-[#25D366] hover:bg-[#128C7E] text-white font-bold rounded-md flex items-center gap-2 transition-colors">
                            <MessageCircle className="w-4 h-4" />
                            <span className="hidden sm:inline">Share WhatsApp</span>
                            <span className="sm:hidden">WA</span>
                        </button>
                        <div className="w-px h-6 bg-slate-700 mx-1"></div>
                        <button
                            onClick={handleEmail}
                            disabled={sendingEmail}
                            className="px-2 md:px-4 py-2 hover:bg-slate-700 text-white font-medium rounded-md flex items-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {sendingEmail ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                                <>
                                    <Mail className="w-4 h-4" />
                                    <span className="hidden sm:inline">Email</span>
                                </>
                            )}
                        </button>
                    </div>
                    <button
                        onClick={handleDownloadPDF}
                        disabled={downloading}
                        className="bg-white text-slate-900 hover:bg-slate-100 px-3 md:px-4 py-2 rounded-lg font-bold flex items-center gap-2 text-xs md:text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
                    >
                        {downloading ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                            <>
                                <Download className="w-4 h-4" />
                                <span className="hidden sm:inline">Download PDF</span>
                                <span className="sm:hidden">PDF</span>
                            </>
                        )}
                    </button>
                    <button
                        onClick={() => router.push(`/admin/payments?clientId=${quotation.clientId || ''}&amount=${quotation.finalAmount || quotation.totalAmount}&project=${encodeURIComponent(quotation.projectName)}`)}
                        className="hidden lg:flex bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg font-bold items-center gap-2 text-sm transition-colors shrink-0"
                    >
                        Convert to Invoice
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
