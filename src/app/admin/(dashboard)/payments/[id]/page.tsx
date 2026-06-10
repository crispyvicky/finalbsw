'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
    ArrowLeft, Plus, Download, Mail, MessageCircle,
    Loader2, X, Trash2
} from 'lucide-react';
import InvoiceTemplate from '@/components/invoices/InvoiceTemplate';

interface Payment {
    _id?: string;
    amount: number;
    date: string;
    method: string;
    reference?: string;
    notes?: string;
    recordedBy?: string;
}

interface Invoice {
    _id: string;
    invoiceNumber: string;
    clientName: string;
    clientPhone?: string;
    clientEmail?: string;
    clientAddress?: string;
    projectName: string;
    description?: string;
    totalAmount: number;
    discount: number;
    amountPaid: number;
    balance: number;
    date: string;
    dueDate: string;
    status: 'Paid' | 'Partially Paid' | 'Pending' | 'Overdue';
    payments: Payment[];
}

export default function InvoiceDetailPage() {
    const params = useParams();
    const router = useRouter();
    const [invoice, setInvoice] = useState<Invoice | null>(null);
    const [loading, setLoading] = useState(true);
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [downloading, setDownloading] = useState(false);
    const [sendingEmail, setSendingEmail] = useState(false);
    const invoiceRef = useRef<HTMLDivElement>(null);
    const [newPayment, setNewPayment] = useState<Partial<Payment>>({
        method: 'Cash',
        date: new Date().toISOString().split('T')[0]
    });

    useEffect(() => {
        if (params.id) {
            fetchInvoice();
        }
    }, [params.id]);

    const fetchInvoice = async () => {
        try {
            const res = await fetch(`/api/invoices/${params.id}`);
            if (res.ok) {
                const data = await res.json();
                setInvoice(data);
            }
        } catch (error) {
            console.error('Failed to fetch invoice', error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddPayment = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newPayment.amount || !invoice) return;

        setSubmitting(true);
        try {
            const res = await fetch(`/api/invoices/${params.id}/payments`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newPayment),
            });

            if (res.ok) {
                await fetchInvoice();
                setShowPaymentModal(false);
                setNewPayment({
                    method: 'Cash',
                    date: new Date().toISOString().split('T')[0]
                });
            } else {
                const error = await res.json();
                alert(error.error || 'Failed to add payment');
            }
        } catch (error) {
            console.error('Failed to add payment', error);
            alert('Failed to add payment');
        } finally {
            setSubmitting(false);
        }
    };

    const handleWhatsApp = () => {
        if (!invoice || !invoice.clientPhone) {
            alert('⚠️ No phone number found for this client.');
            return;
        }

        const message = `✨ *BSW INTERIORS*
_Excellence in Design_

Hi *${invoice.clientName.toUpperCase()}*,

Invoice *${invoice.invoiceNumber}* for *${invoice.projectName.toUpperCase()}* is available.

💰 *Total Amount:* ₹${invoice.totalAmount.toLocaleString('en-IN')}
💳 *Balance Due:* ₹${invoice.balance.toLocaleString('en-IN')}

👇 *Tap below to view & download invoice:*
${window.location.origin}/invoice/${params.id}

_Thank you for your business!_ 🏡`;

        let phone = invoice.clientPhone.replace(/[^0-9]/g, '');

        // Remove ALL leading zeros as per WhatsApp's international format requirements
        phone = phone.replace(/^0+/, '');

        // Handle Indian numbers: If 10 digits remain (no country code), add 91
        if (phone.length === 10 && !phone.startsWith('91')) {
            phone = '91' + phone;
        }

        window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');
    };

    const handleEmail = async () => {
        if (!invoice || !invoice.clientEmail) {
            alert('⚠️ No email address found.');
            return;
        }

        setSendingEmail(true);
        try {
            const response = await fetch('/api/send-invoice-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    to: invoice.clientEmail,
                    subject: `Invoice ${invoice.invoiceNumber} - ${invoice.projectName}`,
                    invoiceData: {
                        ...invoice,
                        invoiceLink: `${window.location.origin}/invoice/${params.id}`
                    }
                }),
            });

            if (response.ok) {
                alert(`✅ Email sent successfully to ${invoice.clientEmail}!`);
            } else {
                throw new Error('Failed to send');
            }
        } catch (error) {
            alert('❌ Failed to send email. Please check configuration.');
        } finally {
            setSendingEmail(false);
        }
    };

    const generatePDF = async () => {
        if (!invoiceRef.current) return;
        setDownloading(true);
        try {
            const html2pdf = (await import('html2pdf.js')).default;
            const element = invoiceRef.current;
            const opt = {
                margin: 0,
                filename: `Invoice_${invoice?.invoiceNumber}.pdf`,
                image: { type: 'jpeg' as const, quality: 0.98 },
                html2canvas: { scale: 2, useCORS: true, logging: false },
                jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' as const }
            };
            await html2pdf().set(opt).from(element).save();
        } catch (error) {
            console.error('PDF generation failed', error);
            window.print();
        } finally {
            setDownloading(false);
        }
    };

    if (loading) return <div className="flex h-screen items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-slate-400" /></div>;
    if (!invoice) return <div className="text-center p-8">Invoice not found</div>;

    return (
        <div className="bg-slate-100 min-h-screen pb-12">
            {/* Toolbar */}
            <div className="bg-slate-900 text-white p-4 sticky top-0 z-50 shadow-md print:hidden">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <button onClick={() => router.back()} className="hover:bg-slate-800 p-2 rounded-full transition-colors">
                            <ArrowLeft className="w-5 h-5" />
                        </button>
                        <div>
                            <h1 className="font-bold text-lg">{invoice.invoiceNumber}</h1>
                            <p className="text-xs text-slate-400">{invoice.projectName}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        {invoice.balance > 0 && (
                            <button
                                onClick={() => setShowPaymentModal(true)}
                                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-md flex items-center gap-2 transition-colors"
                            >
                                <Plus className="w-4 h-4" /> Add Payment
                            </button>
                        )}
                        <div className="h-8 w-px bg-slate-700 mx-1"></div>
                        <button onClick={handleWhatsApp} className="p-2 bg-[#25D366] hover:bg-[#128C7E] text-white rounded-md transition-colors" title="Share on WhatsApp">
                            <MessageCircle className="w-5 h-5" />
                        </button>
                        <button onClick={handleEmail} disabled={sendingEmail} className="hidden p-2 hover:bg-slate-700 text-white rounded-md transition-colors disabled:opacity-50" title="Send Email">
                            {sendingEmail ? <Loader2 className="w-5 h-5 animate-spin" /> : <Mail className="w-5 h-5" />}
                        </button>
                        <button onClick={generatePDF} disabled={downloading} className="bg-white text-slate-900 hover:bg-slate-100 px-4 py-2 rounded-lg font-bold flex items-center gap-2 text-sm transition-colors disabled:opacity-50">
                            {downloading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />} Download PDF
                        </button>
                    </div>
                </div>
            </div>

            {/* Invoice Template */}
            <div className="py-8 px-4 print:p-0">
                <div ref={invoiceRef}>
                    <InvoiceTemplate invoice={invoice} />
                </div>
            </div>

            {/* Add Payment Modal */}
            {showPaymentModal && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm print:hidden">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-lg">
                        <div className="flex justify-between items-center p-6 border-b border-slate-100">
                            <h2 className="text-xl font-bold text-slate-900">Record Payment</h2>
                            <button onClick={() => setShowPaymentModal(false)} className="text-slate-400 hover:text-slate-600">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <form onSubmit={handleAddPayment} className="p-6 space-y-4">
                            <div>
                                <label className="text-xs font-semibold text-slate-500 uppercase">Amount (₹) *</label>
                                <input
                                    required
                                    type="number"
                                    max={invoice.balance}
                                    className="w-full p-3 border border-slate-200 rounded-lg mt-1 text-lg font-bold"
                                    value={newPayment.amount || ''}
                                    onChange={e => setNewPayment({ ...newPayment, amount: Number(e.target.value) })}
                                />
                                <p className="text-xs text-slate-500 mt-1">Maximum Balance: ₹ {invoice.balance.toLocaleString('en-IN')}</p>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs font-semibold text-slate-500 uppercase">Date *</label>
                                    <input
                                        required
                                        type="date"
                                        className="w-full p-2 border border-slate-200 rounded-lg mt-1"
                                        value={newPayment.date || ''}
                                        onChange={e => setNewPayment({ ...newPayment, date: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-semibold text-slate-500 uppercase">Method *</label>
                                    <select
                                        required
                                        className="w-full p-2 border border-slate-200 rounded-lg mt-1"
                                        value={newPayment.method || 'Cash'}
                                        onChange={e => setNewPayment({ ...newPayment, method: e.target.value })}
                                    >
                                        <option value="Cash">Cash</option>
                                        <option value="UPI">UPI</option>
                                        <option value="Bank Transfer">Bank Transfer</option>
                                        <option value="Cheque">Cheque</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label className="text-xs font-semibold text-slate-500 uppercase">Notes / Reference</label>
                                <input
                                    type="text"
                                    className="w-full p-2 border border-slate-200 rounded-lg mt-1"
                                    value={newPayment.notes || ''}
                                    onChange={e => setNewPayment({ ...newPayment, notes: e.target.value })}
                                    placeholder="Enter transaction details..."
                                />
                            </div>
                            <div className="pt-2">
                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="w-full py-3 bg-slate-900 text-white font-bold rounded-lg hover:bg-slate-800 disabled:opacity-50"
                                >
                                    {submitting ? 'Recording...' : 'Save Payment'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
