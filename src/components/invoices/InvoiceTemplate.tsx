import React from 'react';

interface InvoiceTemplateProps {
    invoice: any;
}

export default function InvoiceTemplate({ invoice }: InvoiceTemplateProps) {
    return (
        <div className="max-w-[210mm] mx-auto bg-white shadow-2xl min-h-screen print:shadow-none print:w-full print:max-w-none flex flex-col font-sans text-slate-800">

            {/* 1. Modern Luxury Header */}
            <div className="p-4 md:p-12 pb-4 md:pb-8 flex justify-between items-end border-b-2 border-slate-200 print:p-12 print:pb-8 bg-[#0F2557] text-white">
                <div className="space-y-4">
                    <div className="bg-white p-2 rounded inline-block">
                        <img src="/logo.png" alt="BSW Interiors" className="h-20 w-auto object-contain" />
                    </div>
                </div>
                <div className="text-right space-y-1">
                    <h1 className="text-3xl font-serif font-bold tracking-widest text-white/90">INVOICE</h1>
                    <p className="text-sm font-medium text-white/70 tracking-wider">BSW INTERIORS</p>
                    <p className="text-xs text-white/60">info@bswinteriors.com</p>
                </div>
            </div>

            {/* 2. Client & Invoice Info */}
            <div className="p-4 md:p-12 py-8 md:py-10 grid grid-cols-2 gap-4 md:gap-12 print:p-12">
                <div className="space-y-6">
                    <div className="border-l-4 border-[#0F2557] pl-4 space-y-2">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Billed To</p>
                        <h2 className="text-2xl font-serif font-bold text-[#0F2557] uppercase">{invoice.clientName}</h2>
                        <div className="text-xs text-slate-600 space-y-1 uppercase tracking-wide">
                            {invoice.clientPhone && <p>T: {invoice.clientPhone}</p>}
                            {invoice.clientEmail && <p>E: {invoice.clientEmail}</p>}
                            {invoice.clientAddress && <p className="mt-2 text-slate-500 max-w-xs">{invoice.clientAddress}</p>}
                        </div>
                    </div>
                    <div className="pl-5 space-y-1 mt-6">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Project</p>
                        <p className="text-sm text-slate-800 font-bold uppercase">{invoice.projectName}</p>
                    </div>
                </div>
                <div className="flex flex-col items-end space-y-5">
                    <div className="text-right space-y-1">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Invoice No</p>
                        <p className="text-lg font-mono font-bold text-slate-800">{invoice.invoiceNumber}</p>
                    </div>
                    <div className="text-right space-y-1">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Date Issued</p>
                        <p className="text-sm text-slate-700 font-mono">{new Date(invoice.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase()}</p>
                    </div>
                    <div className="text-right space-y-1">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Payment Due</p>
                        <p className="text-sm text-slate-700 font-mono">{new Date(invoice.dueDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase()}</p>
                    </div>
                    <div className={`mt-2 px-6 py-2 text-[10px] font-bold uppercase tracking-widest border-2 ${invoice.status === 'Paid' ? 'border-[#0F2557] text-[#0F2557]' :
                        invoice.status === 'Pending' ? 'border-[#A0A0A0] text-slate-600' :
                            invoice.status === 'Overdue' ? 'border-red-800 text-red-800' :
                                'border-[#A0A0A0] text-slate-600'
                        }`}>
                        {invoice.status}
                    </div>
                </div>
            </div>

            {/* 3. Description Table */}
            <div className="px-4 md:px-12 mb-12 print:px-12">
                <table className="w-full text-sm border-t border-slate-200">
                    <thead>
                        <tr className="border-b border-slate-200">
                            <th className="text-left py-4 font-bold text-[#0F2557] uppercase tracking-widest text-xs">Description</th>
                            <th className="text-right py-4 font-bold text-[#0F2557] uppercase tracking-widest text-xs">Amount</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        <tr>
                            <td className="py-8 align-top pr-12">
                                <p className="font-serif font-bold text-[#0F2557] text-lg mb-3 uppercase tracking-wide">Interior Design Services</p>
                                <p className="text-slate-500 whitespace-pre-line leading-relaxed text-xs uppercase tracking-wide">{invoice.description || `Design and execution services for project: ${invoice.projectName}`}</p>
                            </td>
                            <td className="py-8 text-right font-mono text-lg font-bold text-slate-800 align-top">
                                ₹ {invoice.totalAmount.toLocaleString('en-IN')}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* 4. Payment Timeline (Premium Feature) */}
            <div className="px-4 md:px-12 mb-12 flex-grow print:px-12">
                <h3 className="text-[10px] font-bold text-[#0F2557] uppercase tracking-widest mb-6 border-b border-slate-200 pb-3">Payment History</h3>
                {invoice.payments && invoice.payments.length > 0 ? (
                    <div className="space-y-4">
                        {invoice.payments.map((payment: any, idx: number) => (
                            <div key={idx} className="flex items-center justify-between text-xs pb-4 border-b border-slate-100 last:border-0">
                                <div className="flex items-center gap-6">
                                    <div className="w-6 h-6 border border-[#A0A0A0] flex items-center justify-center text-[#A0A0A0] font-mono text-[10px]">
                                        {idx + 1}
                                    </div>
                                    <div>
                                        <p className="font-bold text-[#0F2557] uppercase tracking-wider mb-1">Payment Received</p>
                                        <p className="text-[10px] text-slate-500 uppercase tracking-widest">{new Date(payment.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })} • {payment.method}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="font-mono font-bold text-[#0F2557] text-sm">₹ {payment.amount.toLocaleString('en-IN')}</p>
                                    {payment.reference && <p className="text-[10px] text-slate-400 mt-1 uppercase tracking-widest">Ref: {payment.reference}</p>}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-xs text-slate-400 italic font-serif">No payments recorded yet.</p>
                )}
            </div>

            {/* 5. Totals */}
            <div className="p-4 md:p-12 mt-auto bg-slate-50 border-t border-slate-200 print:p-12">
                <div className="flex flex-col md:flex-row justify-end items-end gap-12">
                    <div className="w-full md:w-1/2 space-y-4 bg-white p-8 border border-slate-100 shadow-sm">
                        <div className="flex justify-between text-xs text-slate-500 uppercase tracking-widest font-bold">
                            <span>Total Amount</span>
                            <span className="font-mono text-slate-800">₹ {invoice.totalAmount.toLocaleString('en-IN')}</span>
                        </div>
                        {invoice.discount > 0 && (
                            <div className="flex justify-between text-xs text-[#0F2557] uppercase tracking-widest font-bold">
                                <span>Discount</span>
                                <span className="font-mono">- ₹ {invoice.discount.toLocaleString('en-IN')}</span>
                            </div>
                        )}
                        <div className="flex justify-between text-xs text-[#A0A0A0] pt-4 border-t border-slate-100 uppercase tracking-widest font-bold">
                            <span>Total Paid</span>
                            <span className="font-mono font-bold text-slate-800">₹ {invoice.amountPaid.toLocaleString('en-IN')}</span>
                        </div>
                        <div className="flex justify-between items-center pt-6 border-t-2 border-[#0F2557] mt-4">
                            <span className="font-serif font-bold text-xl text-[#0F2557] uppercase tracking-widest">Balance Due</span>
                            <span className="font-mono font-bold text-2xl text-[#0F2557]">₹ {invoice.balance.toLocaleString('en-IN')}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="bg-white border-t border-slate-200 text-[#0F2557] p-6 text-center text-[10px] tracking-[0.2em] font-bold uppercase opacity-80 space-y-2">
                <p>BSW Interiors • Crafting Timeless Spaces</p>
                <p className="text-slate-400 text-[8px] font-normal tracking-widest">Thank you for your business</p>
            </div>
        </div>
    );
}
