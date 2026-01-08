import React from 'react';

interface QuotationTemplateProps {
    quotation: any;
}

export default function QuotationTemplate({ quotation }: QuotationTemplateProps) {
    return (
        <div className="max-w-[210mm] mx-auto bg-white shadow-2xl min-h-screen print:shadow-none print:w-full print:max-w-none flex flex-col font-sans text-slate-800">

            {/* 1. Modern Header */}
            <div className="p-4 md:p-12 pb-4 md:pb-8 flex justify-between items-end border-b-4 border-[#1e293b] print:p-12">
                <div className="space-y-2">
                    <div className="space-y-2">
                        <img src="/logo.png" alt="Infinity Interiors" className="h-32 w-auto object-contain" />
                    </div>
                </div>
                <div className="text-right space-y-1">
                    <p className="text-sm font-bold text-slate-900">CONTACT</p>
                    <p className="text-sm text-slate-600">Satish: +91 98858 51127</p>
                    <p className="text-sm text-slate-600">contact@infinityinteriors.com</p>
                </div>
            </div>

            {/* 2. Client & Quote Info */}
            <div className="p-4 md:p-12 py-6 md:py-8 grid grid-cols-2 gap-4 md:gap-12 print:p-12">
                <div className="space-y-4">
                    <div className="space-y-1">
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Prepared For</p>
                        <h2 className="text-2xl font-serif font-bold text-slate-800 uppercase">{quotation.clientName}</h2>
                    </div>
                    <div className="space-y-1">
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Project</p>
                        <p className="text-base text-slate-700 font-medium uppercase">{quotation.projectName}</p>
                    </div>
                </div>
                <div className="text-right space-y-4">
                    <div className="space-y-1">
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Quotation No</p>
                        <p className="text-xl font-mono font-bold text-slate-800">{quotation.quoteNumber}</p>
                    </div>
                    <div className="space-y-1">
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Date</p>
                        <p className="text-base text-slate-700">{new Date(quotation.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                    </div>
                </div>
            </div>

            {/* 3. Premium Table */}
            <div className="px-4 md:px-12 flex-grow print:px-12">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b-2 border-slate-900">
                            <th className="text-left py-4 font-bold text-slate-900 uppercase tracking-wider w-[40%] md:w-[45%]">Item Description</th>
                            <th className="text-center py-4 font-bold text-slate-500 uppercase tracking-wider text-[10px] md:text-xs whitespace-nowrap">Dim (Ft)</th>
                            <th className="text-center py-4 font-bold text-slate-500 uppercase tracking-wider text-[10px] md:text-xs whitespace-nowrap">Area (Sft)</th>
                            <th className="text-right py-4 font-bold text-slate-500 uppercase tracking-wider text-[10px] md:text-xs whitespace-nowrap">Rate</th>
                            <th className="text-right py-4 font-bold text-slate-900 uppercase tracking-wider">Amount</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {quotation.sections?.map((section: any, sIndex: number) => (
                            <React.Fragment key={`sec-${sIndex}`}>
                                {/* Section Heading */}
                                <tr className="break-inside-avoid">
                                    <td colSpan={5} className="pt-8 pb-2">
                                        <h3 className="text-lg font-serif font-bold text-[#1e293b] flex items-center gap-3">
                                            <span className="w-8 h-[1px] bg-slate-400"></span>
                                            {section.name}
                                        </h3>
                                    </td>
                                </tr>
                                {/* Items */}
                                {section.items?.map((item: any, iIndex: number) => (
                                    <tr key={`item-${sIndex}-${iIndex}`} className="group break-inside-avoid">
                                        <td className="py-4 pr-4 align-top">
                                            <div className="flex gap-4">
                                                {item.image && (
                                                    <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 border border-slate-200">
                                                        <img src={item.image} className="w-full h-full object-cover" alt="" />
                                                    </div>
                                                )}
                                                <div>
                                                    <p className="font-medium text-slate-800">{item.description}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-4 text-center align-top text-slate-500 font-mono text-[10px] md:text-xs whitespace-nowrap">
                                            {item.height > 0 && item.width > 0 ? `${item.height} x ${item.width}` : '-'}
                                        </td>
                                        <td className="py-4 text-center align-top text-slate-500 font-mono text-[10px] md:text-xs whitespace-nowrap">
                                            {item.sft > 0 ? item.sft : '-'}
                                        </td>
                                        <td className="py-4 text-right align-top text-slate-600 font-mono text-[10px] md:text-xs whitespace-nowrap">
                                            {item.unitPrice > 0 ? `₹${item.unitPrice}` : '-'}
                                        </td>
                                        <td className="py-4 text-right align-top font-bold text-slate-800 font-mono whitespace-nowrap">
                                            ₹ {item.amount.toLocaleString()}
                                        </td>
                                    </tr>
                                ))}
                                {/* Section Subtotal */}
                                <tr className="bg-slate-50/50 border-b border-slate-100 italic text-xs">
                                    <td colSpan={4} className="py-2 text-right text-slate-400 pr-4">Subtotal for {section.name}</td>
                                    <td className="py-2 text-right text-slate-500 font-mono">₹ {section.items.reduce((acc: any, i: any) => acc + i.amount, 0).toLocaleString()}</td>
                                </tr>
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* 4. Total & Notes Footer */}
            <div className="p-4 md:p-12 mt-auto print:p-12">
                <div className="flex flex-col md:flex-row gap-6 md:gap-12 items-start border-t-2 border-slate-900 pt-8 break-inside-avoid">
                    {/* Terms */}
                    <div className="flex-1 space-y-4">
                        <h4 className="font-serif font-bold text-slate-900">Terms & Conditions</h4>
                        {quotation.notes ? (
                            <div className="text-xs leading-relaxed text-slate-500 whitespace-pre-line">
                                {quotation.notes}
                            </div>
                        ) : (
                            <ul className="text-xs leading-relaxed text-slate-500 list-disc pl-4 space-y-1">
                                <li>50% Advance along with work order.</li>
                                <li>40% Material shifting.</li>
                                <li>10% after completion of work.</li>
                                <li>GST extra as applicable.</li>
                                <li>2 years free service warranty.</li>
                            </ul>
                        )}
                    </div>

                    {/* Final Calculation */}
                    <div className="w-full md:w-1/3 space-y-3">
                        <div className="flex justify-between text-sm text-slate-600">
                            <span>Sub Total</span>
                            <span className="font-mono">₹ {quotation.totalAmount.toLocaleString()}</span>
                        </div>
                        {quotation.discount > 0 && (
                            <div className="flex justify-between text-sm text-emerald-600 font-medium">
                                <span>Discount</span>
                                <span className="font-mono">- ₹ {(quotation.discount || 0).toLocaleString()}</span>
                            </div>
                        )}
                        {quotation.gstRate > 0 && (
                            <div className="flex justify-between text-sm text-slate-500">
                                <span>GST ({quotation.gstRate}%)</span>
                                <span className="font-mono">+ ₹ {(((quotation.finalAmount || quotation.totalAmount) - (quotation.totalAmount - (quotation.discount || 0)))).toLocaleString()}</span>
                            </div>
                        )}
                        <div className="flex justify-between items-center pt-4 border-t border-slate-200">
                            <span className="font-serif font-bold text-xl text-slate-900">Total</span>
                            <span className="font-mono font-bold text-2xl text-[#1e293b]">₹ {(quotation.finalAmount || quotation.totalAmount).toLocaleString()}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Simple Footer Brand */}
            <div className="bg-[#1e293b] text-white p-4 text-center text-[10px] tracking-widest uppercase opacity-80 print:bg-slate-900">
                Infinity Interiors • Excellence in Design
            </div>
        </div>
    );
}
