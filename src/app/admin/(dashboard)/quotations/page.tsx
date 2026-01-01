'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FileText, Plus, Search, Download, Eye, MoreHorizontal, Printer, X, Loader2 } from 'lucide-react';

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
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newQuote, setNewQuote] = useState<Partial<Quotation>>({
        status: 'Draft',
        date: new Date().toISOString().split('T')[0]
    });

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

    const filteredQuotes = quotations.filter(q =>
        q.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        q.quoteNumber.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getStatusColor = (status: Quotation['status']) => {
        switch (status) {
            case 'Approved': return 'bg-emerald-100 text-emerald-700';
            case 'Sent': return 'bg-blue-100 text-blue-700';
            case 'Revised': return 'bg-amber-100 text-amber-700';
            default: return 'bg-slate-100 text-slate-700';
        }
    };

    const handleCreateQuote = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newQuote.clientName || !newQuote.totalAmount) return;

        try {
            const res = await fetch('/api/quotations', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...newQuote,
                    items: 5, // Mock items count for now
                    quoteNumber: `Q-${new Date().getFullYear()}-${Math.floor(Math.random() * 1000)}`
                }),
            });

            if (res.ok) {
                await fetchQuotations();
                setIsModalOpen(false);
                setNewQuote({ status: 'Draft', date: new Date().toISOString().split('T')[0] });
            }
        } catch (error) {
            console.error('Failed to create quotation', error);
        }
    }

    if (loading) {
        return <div className="flex h-96 items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-slate-400" /></div>;
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Quotations</h1>
                    <p className="text-slate-500">Create, track and manage project costings.</p>
                </div>
                <Link
                    href="/admin/quotations/create"
                    className="bg-slate-900 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-slate-800 transition-colors"
                >
                    <Plus className="w-4 h-4" />
                    New Quotation
                </Link>
            </div>

            {/* Filters & Search */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row gap-4 justify-between">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search by client or quote #..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900/10"
                    />
                </div>
                <select className="bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none">
                    <option>All Status</option>
                    <option>Draft</option>
                    <option>Sent</option>
                    <option>Approved</option>
                </select>
            </div>

            {/* List View */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden hidden md:block">
                <table className="w-full text-left">
                    <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                            <th className="px-6 py-4 font-semibold text-sm text-slate-700">Quote Details</th>
                            <th className="px-6 py-4 font-semibold text-sm text-slate-700">Project</th>
                            <th className="px-6 py-4 font-semibold text-sm text-slate-700">Amount</th>
                            <th className="px-6 py-4 font-semibold text-sm text-slate-700">Status</th>
                            <th className="px-6 py-4 font-semibold text-sm text-slate-700 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {filteredQuotes.map((quote) => (
                            <tr key={quote.id} className="hover:bg-slate-50 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                                            <FileText className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-slate-900">{quote.clientName}</p>
                                            <p className="text-xs text-slate-500 font-mono">{quote.quoteNumber} • {quote.date}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <p className="text-sm font-medium text-slate-700">{quote.projectName}</p>
                                    <p className="text-xs text-slate-500">{quote.items} Items</p>
                                </td>
                                <td className="px-6 py-4">
                                    <p className="text-sm font-bold text-slate-900">₹ {(quote.totalAmount / 100000).toFixed(2)}L</p>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(quote.status)}`}>
                                        {quote.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <Link href={`/admin/quotations/${quote.id}/print`} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg tooltip" title="View">
                                            <Eye className="w-4 h-4" />
                                        </Link>
                                        <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg tooltip" title="More">
                                            <MoreHorizontal className="w-4 h-4" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {filteredQuotes.length === 0 && (
                    <div className="p-8 text-center text-slate-500">
                        No quotations found.
                    </div>
                )}
            </div>

            {/* Mobile View */}
            <div className="md:hidden space-y-4">
                {filteredQuotes.map((quote) => (
                    <div key={quote.id} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-3">
                        <div className="flex justify-between items-start">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                                    <FileText className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="font-semibold text-slate-900">{quote.clientName}</p>
                                    <p className="text-xs text-slate-500 font-mono">{quote.quoteNumber}</p>
                                </div>
                            </div>
                            <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(quote.status)}`}>
                                {quote.status}
                            </span>
                        </div>
                        <div className="flex justify-between items-center text-sm pt-2 border-t border-slate-50">
                            <p className="text-slate-500">{quote.projectName}</p>
                            <p className="font-bold text-slate-900">₹ {(quote.totalAmount / 100000).toFixed(2)}L</p>
                        </div>
                    </div>
                ))}
                {filteredQuotes.length === 0 && (
                    <div className="p-8 text-center text-slate-500 bg-white rounded-xl">
                        No quotations found.
                    </div>
                )}
            </div>

            {/* Create Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                        <div className="flex justify-between items-center p-6 border-b border-slate-100">
                            <h2 className="text-xl font-bold text-slate-900">New Quotation</h2>
                            <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleCreateQuote} className="p-6 space-y-4">
                            <div className="space-y-1">
                                <label className="text-xs font-semibold text-slate-500 uppercase">Client Name *</label>
                                <input
                                    required
                                    type="text"
                                    className="w-full p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 outline-none transition-all"
                                    value={newQuote.clientName || ''}
                                    onChange={e => setNewQuote({ ...newQuote, clientName: e.target.value })}
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-semibold text-slate-500 uppercase">Project Name</label>
                                <input
                                    type="text"
                                    className="w-full p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 outline-none transition-all"
                                    value={newQuote.projectName || ''}
                                    onChange={e => setNewQuote({ ...newQuote, projectName: e.target.value })}
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-semibold text-slate-500 uppercase">Total Amount (₹) *</label>
                                <input
                                    required
                                    type="number"
                                    className="w-full p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 outline-none transition-all"
                                    value={newQuote.totalAmount || ''}
                                    onChange={e => setNewQuote({ ...newQuote, totalAmount: Number(e.target.value) })}
                                />
                            </div>

                            <div className="pt-2 flex gap-3">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="flex-1 py-2.5 text-slate-600 font-medium hover:bg-slate-50 rounded-lg transition-colors border border-transparent hover:border-slate-200"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 py-2.5 bg-slate-900 text-white font-medium rounded-lg hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/20"
                                >
                                    Create Quote
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
