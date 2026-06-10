import React from 'react';

interface QuotationTemplateProps {
    quotation: any;
}

export default function QuotationTemplate({ quotation }: QuotationTemplateProps) {
    return (
        <div className="max-w-[210mm] mx-auto bg-white shadow-[0_0_50px_-12px_rgba(15,37,87,0.2)] min-h-[297mm] print:shadow-none print:w-full print:max-w-none flex flex-col font-sans text-slate-800 border-[12px] border-[#f8f9fa] outline outline-[1px] outline-[#0F2557]/10 relative">
            {/* Premium Inner Border Frame */}
            <div className="absolute inset-0 pointer-events-none border border-[#0F2557]/5 m-1 print:m-0 print:border-none z-50"></div>
            {/* 1. Modern Luxury Header */}
            <div className="relative p-4 md:p-12 pb-4 md:pb-8 flex justify-between items-end border-b-[4px] border-[#A0A0A0] print:p-12 print:pb-8 bg-[#0F2557] text-white">
                <div className="space-y-4 relative z-10">
                    <div className="bg-white p-2 rounded inline-block">
                        <img src="/logo.png" alt="BSW Interiors" className="h-20 w-auto object-contain" />
                    </div>
                </div>
                <div className="text-right space-y-1">
                    <h1 className="text-3xl font-serif font-bold tracking-widest text-white/90">QUOTATION</h1>
                    <p className="text-sm font-medium text-white/70 tracking-wider">BSW INTERIORS</p>
                    <p className="text-xs text-white/60">info@bswinteriors.com</p>
                </div>
            </div>

            {/* 2. Client & Quote Info */}
            <div className="p-4 md:p-12 py-8 md:py-10 grid grid-cols-2 gap-4 md:gap-12 print:p-12">
                <div className="space-y-4">
                    <div className="space-y-1 border-l-4 border-[#0F2557] pl-4">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Prepared For</p>
                        <h2 className="text-2xl font-serif font-bold text-[#0F2557] uppercase">{quotation.clientName}</h2>
                    </div>
                    <div className="space-y-1 pl-5">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Project</p>
                        <p className="text-sm text-slate-700 font-medium uppercase">{quotation.projectName}</p>
                    </div>
                </div>
                <div className="text-right space-y-4">
                    <div className="space-y-1">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Quotation No</p>
                        <p className="text-lg font-mono font-bold text-slate-800">{quotation.quoteNumber}</p>
                    </div>
                    <div className="space-y-1">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Date</p>
                        <p className="text-sm text-slate-700 font-mono">{new Date(quotation.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase()}</p>
                    </div>
                </div>
            </div>

            {/* 3. Premium Table */}
            <div className="px-4 md:px-12 flex-grow print:px-12">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b border-[#A0A0A0]">
                            <th className="text-left py-3 font-bold text-[#0F2557] uppercase tracking-wider text-xs w-[40%] md:w-[45%]">Item Description</th>
                            <th className="text-center py-3 font-bold text-[#A0A0A0] uppercase tracking-wider text-[10px] whitespace-nowrap">Dim (Ft)</th>
                            <th className="text-center py-3 font-bold text-[#A0A0A0] uppercase tracking-wider text-[10px] whitespace-nowrap">Area (Sft)</th>
                            <th className="text-right py-3 font-bold text-[#A0A0A0] uppercase tracking-wider text-[10px] whitespace-nowrap">Rate</th>
                            <th className="text-right py-3 font-bold text-[#0F2557] uppercase tracking-wider text-xs">Amount</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {quotation.sections?.map((section: any, sIndex: number) => (
                            <React.Fragment key={`sec-${sIndex}`}>
                                {/* Section Heading */}
                                <tr className="break-inside-avoid">
                                    <td colSpan={5} className="pt-6 pb-2">
                                        <h3 className="text-sm font-serif font-bold text-[#0F2557] uppercase tracking-widest flex items-center gap-3">
                                            <span className="w-4 h-[2px] bg-[#A0A0A0]"></span>
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
                                                    <div className="w-16 h-16 bg-slate-50 overflow-hidden flex-shrink-0 border border-slate-200">
                                                        <img src={item.image} className="w-full h-full object-cover mix-blend-multiply" alt="" />
                                                    </div>
                                                )}
                                                <div>
                                                    <p className="font-medium text-slate-800 text-xs leading-relaxed">{item.description}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-4 text-center align-top text-slate-500 font-mono text-[10px] whitespace-nowrap">
                                            {item.height > 0 && item.width > 0 ? `${item.height} x ${item.width}` : '-'}
                                        </td>
                                        <td className="py-4 text-center align-top text-slate-500 font-mono text-[10px] whitespace-nowrap">
                                            {item.sft > 0 ? item.sft : '-'}
                                        </td>
                                        <td className="py-4 text-right align-top text-slate-500 font-mono text-[10px] whitespace-nowrap">
                                            {item.unitPrice > 0 ? `₹${item.unitPrice.toLocaleString('en-IN')}` : '-'}
                                        </td>
                                        <td className="py-4 text-right align-top font-bold text-slate-800 font-mono text-sm whitespace-nowrap">
                                            ₹ {item.amount.toLocaleString('en-IN')}
                                        </td>
                                    </tr>
                                ))}
                                {/* Section Subtotal */}
                                <tr className="bg-slate-50/30 border-b border-slate-100 text-xs">
                                    <td colSpan={4} className="py-2 text-right text-[#A0A0A0] pr-4 uppercase tracking-widest text-[10px] font-bold">Subtotal {section.name}</td>
                                    <td className="py-2 text-right text-slate-600 font-mono font-medium">₹ {section.items.reduce((acc: any, i: any) => acc + i.amount, 0).toLocaleString('en-IN')}</td>
                                </tr>
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* 4. Total & Notes Footer */}
            <div className="p-4 md:p-12 mt-12 print:p-12 bg-slate-50/50">
                <div className="flex flex-col md:flex-row gap-6 md:gap-12 items-start break-inside-avoid">
                    {/* Terms */}
                    <div className="flex-1 space-y-4">
                        <h4 className="font-serif font-bold text-[#0F2557] uppercase tracking-widest text-xs">Terms & Conditions</h4>
                        {quotation.notes ? (
                            <div className="text-[10px] leading-relaxed text-slate-500 whitespace-pre-line uppercase tracking-wide">
                                {quotation.notes}
                            </div>
                        ) : (
                            <ul className="text-[10px] leading-relaxed text-slate-500 list-none space-y-2 uppercase tracking-wide">
                                <li>• 50% Advance along with work order.</li>
                                <li>• 40% Material shifting.</li>
                                <li>• 10% after completion of work.</li>
                                <li>• GST extra as applicable.</li>
                                <li>• 2 years free service warranty.</li>
                            </ul>
                        )}
                    </div>

                    {/* Final Calculation */}
                    <div className="w-full md:w-1/3 space-y-3 bg-white p-6 border border-slate-100 shadow-sm">
                        <div className="flex justify-between text-xs text-slate-500 uppercase tracking-widest font-bold">
                            <span>Sub Total</span>
                            <span className="font-mono text-slate-800">₹ {quotation.totalAmount.toLocaleString('en-IN')}</span>
                        </div>
                        {quotation.discount > 0 && (
                            <div className="flex justify-between text-xs text-[#0F2557] uppercase tracking-widest font-bold">
                                <span>Discount</span>
                                <span className="font-mono">- ₹ {(quotation.discount || 0).toLocaleString('en-IN')}</span>
                            </div>
                        )}
                        {quotation.gstRate > 0 && (
                            <div className="flex justify-between text-xs text-[#A0A0A0] uppercase tracking-widest font-bold">
                                <span>GST ({quotation.gstRate}%)</span>
                                <span className="font-mono text-slate-800">+ ₹ {(((quotation.finalAmount || quotation.totalAmount) - (quotation.totalAmount - (quotation.discount || 0)))).toLocaleString('en-IN')}</span>
                            </div>
                        )}
                        <div className="flex justify-between items-center pt-4 border-t border-slate-200 mt-4">
                            <span className="font-serif font-bold text-lg text-[#0F2557] uppercase tracking-widest">Total</span>
                            <span className="font-mono font-bold text-xl text-[#0F2557]">₹ {(quotation.finalAmount || quotation.totalAmount).toLocaleString('en-IN')}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Simple Footer Brand */}
            <div className="bg-white border-t border-slate-200 text-[#0F2557] p-6 text-center text-[10px] tracking-[0.2em] font-bold uppercase opacity-80">
                BSW Interiors • Crafting Timeless Spaces
            </div>
        </div>
    );
}
