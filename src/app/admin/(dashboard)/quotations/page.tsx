'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FileText, Plus, Search, Download, Eye, MoreHorizontal, Printer, X, Loader2, ArrowRight, Trash2, Copy } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface Quotation {
    id: string;
    quoteNumber: string;
    clientName: string;
    projectName: string;
    totalAmount: number;
    status: 'Draft' | 'Sent' | 'Approved' | 'Revised';
    date: string;
    items: number; // Count of items
}

export default function QuotationsPage() {
    const [quotations, setQuotations] = useState<Quotation[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');


    useEffect(() => {
        fetchQuotations();
    }, []);

    const fetchQuotations = async () => {
        try {
            const res = await fetch('/api/quotations');
            if (res.ok) {
                const data = await res.json();
                const mappedData = data.map((item: any) => ({ ...item, id: item._id }));
                setQuotations(mappedData);
            }
        } catch (error) {
            console.error('Failed to fetch quotations', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (quotation: Quotation) => {
        const confirmMessage = `⚠️ DELETE QUOTATION\n\nAre you sure you want to delete:\n\nQuotation: ${quotation.quoteNumber}\nClient: ${quotation.clientName}\nProject: ${quotation.projectName}\n\n⚠️ This action CANNOT be undone!`;

        if (!confirm(confirmMessage)) {
            return;
        }

        try {
            const response = await fetch(`/api/quotations/${quotation.id}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                alert('✅ Quotation deleted successfully');
                fetchQuotations(); // Refresh the list
            } else {
                alert('❌ Failed to delete quotation\n\nPlease try again.');
            }
        } catch (error) {
            console.error('Delete error:', error);
            alert('❌ Failed to delete quotation\n\nPlease check your connection and try again.');
        }
    };

    const filteredQuotes = quotations.filter(q =>
        q.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        q.quoteNumber.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getStatusColor = (status: Quotation['status']) => {
        switch (status) {
            case 'Approved': return 'bg-[#D4AF37]/10 text-[#D4AF37] border-[#D4AF37]/20';
            case 'Sent': return 'bg-blue-50 text-blue-700 border-blue-100';
            case 'Revised': return 'bg-amber-50 text-amber-700 border-amber-100';
            default: return 'bg-gray-100 text-gray-600 border-gray-200';
        }
    };



    if (loading) {
        return <div className="flex h-96 items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-[#D4AF37]" /></div>;
    }

    return (
        <div className="space-y-8 max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-100 pb-6">
                <div>
                    <h1 className="text-3xl font-heading-03 font-bold text-[#1a1a1a]">Quotations</h1>
                    <p className="text-gray-500 font-body-02 mt-1">Manage your project proposals and costings.</p>
                </div>
                <Link
                    href="/admin/quotations/create"
                    className="bg-[#1a1a1a] hover:bg-[#D4AF37] text-white px-6 py-4 flex items-center gap-2 rounded-none transition-all duration-300 shadow-md hover:shadow-xl font-medium tracking-wide"
                >
                    <Plus className="w-4 h-4" />
                    CREATE QUOTE
                </Link>
            </div>

            {/* Filters & Search */}
            <div className="bg-white p-5 rounded-none border border-gray-100 shadow-sm flex flex-col sm:flex-row gap-4 justify-between items-center">
                <div className="relative flex-1 w-full max-w-md">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search by Client or Quote Number..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-11 pr-4 py-3 bg-[#FDFCFB] border-b-2 border-transparent focus:border-[#D4AF37] focus:bg-white text-sm outline-none transition-all placeholder:text-gray-300 font-medium"
                    />
                </div>
                <div className="w-full sm:w-auto">
                    <select className="w-full bg-white border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-[#D4AF37] rounded-none cursor-pointer hover:bg-gray-50 transition-colors">
                        <option>Status: All</option>
                        <option>Draft</option>
                        <option>Sent</option>
                        <option>Approved</option>
                    </select>
                </div>
            </div>

            {/* List View */}
            <div className="bg-white border border-gray-100 shadow-sm overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-[#FAF9F6] border-b border-gray-100">
                        <tr>
                            <th className="px-6 py-5 font-bold text-xs uppercase tracking-widest text-gray-400 font-body-02">Details</th>
                            <th className="px-6 py-5 font-bold text-xs uppercase tracking-widest text-gray-400 font-body-02">Project</th>
                            <th className="px-6 py-5 font-bold text-xs uppercase tracking-widest text-gray-400 font-body-02">Value</th>
                            <th className="px-6 py-5 font-bold text-xs uppercase tracking-widest text-gray-400 font-body-02">Status</th>
                            <th className="px-6 py-5 font-bold text-xs uppercase tracking-widest text-gray-400 font-body-02 text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {filteredQuotes.map((quote) => (
                            <tr key={quote.id} className="group hover:bg-[#FDFCFB] transition-colors duration-200">
                                <td className="px-6 py-5">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 bg-gray-50 text-[#1a1a1a] flex items-center justify-center border border-gray-100 group-hover:border-[#D4AF37] group-hover:text-[#D4AF37] transition-colors">
                                            <FileText className="w-5 h-5 stroke-1" />
                                        </div>
                                        <div>
                                            <p className="font-bold text-[#1a1a1a] text-sm">{quote.clientName}</p>
                                            <p className="text-xs text-gray-400 font-mono mt-0.5">{quote.quoteNumber}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-5">
                                    <p className="text-sm font-medium text-gray-600">{quote.projectName}</p>
                                    <p className="text-[10px] text-gray-400 uppercase tracking-wider mt-0.5">{quote.items} Items</p>
                                </td>
                                <td className="px-6 py-5">
                                    <p className="text-sm font-heading-03 font-bold text-[#1a1a1a] tracking-tight">₹ {(quote.totalAmount / 100000).toFixed(2)} Lakh</p>
                                </td>
                                <td className="px-6 py-5">
                                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border ${getStatusColor(quote.status)}`}>
                                        {quote.status}
                                    </span>
                                </td>
                                <td className="px-6 py-5 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <Link
                                            href={`/admin/quotations/${quote.id}/edit`}
                                            className="inline-flex items-center justify-center w-8 h-8 rounded-full hover:bg-blue-50 hover:text-blue-600 text-gray-400 transition-all"
                                            title="Edit Quotation"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                            </svg>
                                        </Link>
                                        <Link
                                            href={`/admin/quotations/${quote.id}/print`}
                                            className="inline-flex items-center justify-center w-8 h-8 rounded-full hover:bg-black hover:text-[#D4AF37] text-gray-400 transition-all"
                                            title="View & Download"
                                        >
                                            <ArrowRight className="w-4 h-4" />
                                        </Link>
                                        <Link
                                            href={`/admin/quotations/create?cloneId=${quote.id}`}
                                            className="inline-flex items-center justify-center w-8 h-8 rounded-full hover:bg-emerald-50 hover:text-emerald-600 text-gray-400 transition-all"
                                            title="Duplicate Quotation"
                                        >
                                            <Copy className="w-4 h-4" />
                                        </Link>
                                        <button
                                            onClick={(e) => {
                                                e.preventDefault();
                                                handleDelete(quote);
                                            }}
                                            className="inline-flex items-center justify-center w-8 h-8 rounded-full hover:bg-red-50 hover:text-red-600 text-gray-400 transition-all"
                                            title="Delete Quotation"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {filteredQuotes.length === 0 && (
                    <div className="p-12 text-center">
                        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-300">
                            <FileText className="w-8 h-8 stroke-1" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900">No quotations found</h3>
                        <p className="text-gray-500 text-sm mt-1 mb-6">Create your first quotation to get started.</p>
                        <Link
                            href="/admin/quotations/create"
                            className="bg-[#1a1a1a] hover:bg-[#D4AF37] text-white px-6 py-4 flex items-center gap-2 rounded-none transition-all duration-300 shadow-md hover:shadow-xl font-medium tracking-wide inline-flex"
                        >
                            CREATE QUOTE
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
