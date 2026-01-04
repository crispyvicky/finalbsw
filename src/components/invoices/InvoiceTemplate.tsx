import React from 'react';

interface InvoiceTemplateProps {
    invoice: any;
}

export default function InvoiceTemplate({ invoice }: InvoiceTemplateProps) {
    return (
        <div className="max-w-[210mm] mx-auto bg-white shadow-2xl min-h-screen print:shadow-none print:w-full print:max-w-none flex flex-col font-sans text-slate-800">

            {/* 1. Header with Brand */}
            <div className="p-12 pb-8 flex justify-between items-end border-b-4 border-[#1e293b]">
                <div className="space-y-4">
                    <img src="/logo.png" alt="Infinity Interiors" className="h-16 w-auto object-contain" />
                    <div>
                        <p className="text-sm font-bold text-slate-900 uppercase tracking-widest">Infinity Interiors</p>
                        <p className="text-xs text-slate-500">Excellence in Design & Execution</p>
                    </div>
                </div>
                <div className="text-right space-y-1">
                    <h1 className="text-4xl font-serif font-bold text-[#1e293b] mb-2">INVOICE</h1>
                    <p className="text-sm font-bold text-slate-900">CONTACT</p>
                    <p className="text-sm text-slate-600">Satish: +91 98858 51127</p>
                    <p className="text-sm text-slate-600">info@infinityinteriors.co</p>
                </div>
            </div>

            {/* 2. Client & Invoice Info */}
            <div className="p-12 py-8 grid grid-cols-2 gap-12">
                <div className="space-y-6">
                    <div>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Billed To</p>
                        <h2 className="text-xl font-serif font-bold text-slate-800 uppercase mb-1">{invoice.clientName}</h2>
                        <div className="text-sm text-slate-600 space-y-1">
                            {invoice.clientPhone && <p>📞 {invoice.clientPhone}</p>}
                            {invoice.clientEmail && <p>✉️ {invoice.clientEmail}</p>}
                            {invoice.clientAddress && <p>📍 {invoice.clientAddress}</p>}
                        </div>
                    </div>
                    <div>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Project</p>
                        <p className="text-base font-medium text-slate-800 uppercase">{invoice.projectName}</p>
                    </div>
                </div>
                <div className="flex flex-col items-end space-y-4">
                    <div className="text-right">
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Invoice No</p>
                        <p className="text-xl font-mono font-bold text-slate-800">{invoice.invoiceNumber}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Date Issued</p>
                        <p className="text-base text-slate-700">{new Date(invoice.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Payment Due</p>
                        <p className="text-base text-slate-700">{new Date(invoice.dueDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                    </div>
                    <div className={`px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wide border ${invoice.status === 'Paid' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                            invoice.status === 'Pending' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                                invoice.status === 'Overdue' ? 'bg-red-50 text-red-700 border-red-200' :
                                    'bg-blue-50 text-blue-700 border-blue-200'
                        }`}>
                        {invoice.status}
                    </div>
                </div>
            </div>

            {/* 3. Description Table */}
            <div className="px-12 mb-8">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="bg-slate-900 text-white">
                            <th className="text-left py-3 px-4 font-bold uppercase tracking-wider rounded-l-lg">Description</th>
                            <th className="text-right py-3 px-4 font-bold uppercase tracking-wider rounded-r-lg">Amount</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        <tr>
                            <td className="py-6 px-4 align-top">
                                <p className="font-medium text-slate-800 text-lg mb-2">Interior Design Services</p>
                                <p className="text-slate-500 whitespace-pre-line leading-relaxed">{invoice.description || `Design and execution services for project: ${invoice.projectName}`}</p>
                            </td>
                            <td className="py-6 px-4 text-right font-mono text-lg font-bold text-slate-800">
                                ₹ {invoice.totalAmount.toLocaleString('en-IN')}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* 4. Payment Timeline (Premium Feature) */}
            <div className="px-12 mb-8 flex-grow">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 border-b border-slate-100 pb-2">Payment History</h3>
                {invoice.payments && invoice.payments.length > 0 ? (
                    <div className="space-y-3">
                        {invoice.payments.map((payment: any, idx: number) => (
                            <div key={idx} className="flex items-center justify-between text-sm p-3 bg-slate-50 rounded-lg border border-slate-100">
                                <div className="flex items-center gap-4">
                                    <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold text-xs">
                                        {idx + 1}
                                    </div>
                                    <div>
                                        <p className="font-bold text-slate-700">Payment Received</p>
                                        <p className="text-xs text-slate-500">{new Date(payment.date).toLocaleDateString('en-IN')} • {payment.method}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="font-mono font-bold text-emerald-600">₹ {payment.amount.toLocaleString('en-IN')}</p>
                                    {payment.reference && <p className="text-xs text-slate-400">Ref: {payment.reference}</p>}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-sm text-slate-400 italic">No payments recorded yet.</p>
                )}
            </div>

            {/* 5. Totals */}
            <div className="p-12 mt-auto bg-slate-50 border-t border-slate-200">
                <div className="flex flex-col md:flex-row justify-end items-end gap-12">
                    <div className="w-full md:w-1/2 space-y-3">
                        <div className="flex justify-between text-sm text-slate-600">
                            <span>Total Amount</span>
                            <span className="font-mono">₹ {invoice.totalAmount.toLocaleString('en-IN')}</span>
                        </div>
                        {invoice.discount > 0 && (
                            <div className="flex justify-between text-sm text-emerald-600 font-medium">
                                <span>Discount</span>
                                <span className="font-mono">- ₹ {invoice.discount.toLocaleString('en-IN')}</span>
                            </div>
                        )}
                        <div className="flex justify-between text-sm text-slate-600 pt-2 border-t border-slate-200">
                            <span>Total Paid</span>
                            <span className="font-mono font-bold text-emerald-600">₹ {invoice.amountPaid.toLocaleString('en-IN')}</span>
                        </div>
                        <div className="flex justify-between items-center pt-4 border-t-2 border-slate-900 mt-2">
                            <span className="font-serif font-bold text-xl text-slate-900">Balance Due</span>
                            <span className="font-mono font-bold text-3xl text-slate-900">₹ {invoice.balance.toLocaleString('en-IN')}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="bg-[#1e293b] text-white p-6 text-center text-xs space-y-2 print:bg-slate-900">
                <p className="font-bold tracking-widest uppercase opacity-90">Infinity Interiors</p>
                <p className="opacity-60">Thank you for your business!</p>
            </div>
        </div>
    );
}
