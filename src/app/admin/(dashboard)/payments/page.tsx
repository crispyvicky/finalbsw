'use client';

import { useState, useEffect } from 'react';
import { IndianRupee, Plus, Search, FileText, ArrowDownToLine, Receipt, ClockIcon, AlertCircleIcon, Loader2, X } from 'lucide-react';

interface Invoice {
    id: string;
    invoiceNumber: string;
    clientName: string;
    projectName: string;
    amount: number;
    date: string;
    dueDate: string;
    status: 'Paid' | 'Pending' | 'Overdue';
}

export default function PaymentsPage() {
    const [invoices, setInvoices] = useState<Invoice[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newInvoice, setNewInvoice] = useState<Partial<Invoice>>({
        status: 'Pending',
        date: new Date().toISOString().split('T')[0],
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    });

    useEffect(() => {
        fetchInvoices();
    }, []);

    const fetchInvoices = async () => {
        try {
            const res = await fetch('/api/invoices');
            if (res.ok) {
                const data = await res.json();
                const mappedData = data.map((item: any) => ({ ...item, id: item._id }));
                setInvoices(mappedData);
            }
        } catch (error) {
            console.error('Failed to fetch invoices', error);
        } finally {
            setLoading(false);
        }
    };

    const filteredInvoices = invoices.filter(item =>
        item.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getStatusColor = (status: Invoice['status']) => {
        switch (status) {
            case 'Paid': return 'bg-emerald-100 text-emerald-700';
            case 'Pending': return 'bg-amber-100 text-amber-700';
            case 'Overdue': return 'bg-red-100 text-red-700';
            default: return 'bg-slate-100 text-slate-700';
        }
    };

    const handleCreateInvoice = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newInvoice.clientName || !newInvoice.amount) return;

        try {
            const res = await fetch('/api/invoices', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...newInvoice,
                    invoiceNumber: `INV-${new Date().getFullYear()}-${Math.floor(Math.random() * 1000)}`
                }),
            });

            if (res.ok) {
                await fetchInvoices();
                setIsModalOpen(false);
                setNewInvoice({
                    status: 'Pending',
                    date: new Date().toISOString().split('T')[0],
                    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
                });
            }
        } catch (error) {
            console.error('Failed to create invoice', error);
        }
    };

    // Calculate stats
    const totalCollected = invoices.filter(i => i.status === 'Paid').reduce((sum, i) => sum + i.amount, 0);
    const pendingAmount = invoices.filter(i => i.status === 'Pending').reduce((sum, i) => sum + i.amount, 0);
    const overdueAmount = invoices.filter(i => i.status === 'Overdue').reduce((sum, i) => sum + i.amount, 0);

    if (loading) {
        return <div className="flex h-96 items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-slate-400" /></div>;
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Payments & Invoices</h1>
                    <p className="text-slate-500">Track cash flow and manage invoices.</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-slate-900 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-slate-800 transition-colors"
                >
                    <Plus className="w-4 h-4" />
                    Create Invoice
                </button>
            </div>

            {/* Stats Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-slate-500">Total Collected</p>
                        <p className="text-2xl font-bold text-slate-900 mt-1">₹ {(totalCollected / 100000).toFixed(2)}L</p>
                    </div>
                    <div className="p-3 bg-emerald-50 text-emerald-600 rounded-lg">
                        <IndianRupee className="w-6 h-6" />
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-slate-500">Pending Amount</p>
                        <p className="text-2xl font-bold text-slate-900 mt-1">₹ {(pendingAmount / 100000).toFixed(2)}L</p>
                    </div>
                    <div className="p-3 bg-amber-50 text-amber-600 rounded-lg">
                        <ClockIcon className="w-6 h-6" />
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-slate-500">Overdue</p>
                        <p className="text-2xl font-bold text-red-600 mt-1">₹ {(overdueAmount / 100000).toFixed(2)}L</p>
                    </div>
                    <div className="p-3 bg-red-50 text-red-600 rounded-lg">
                        <AlertCircleIcon className="w-6 h-6" />
                    </div>
                </div>
            </div>

            {/* Filters & Search */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search invoice or client..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900/10"
                    />
                </div>
            </div>

            {/* Invoice List */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                            <th className="px-6 py-4 font-semibold text-sm text-slate-700">Invoice Details</th>
                            <th className="px-6 py-4 font-semibold text-sm text-slate-700">Client & Project</th>
                            <th className="px-6 py-4 font-semibold text-sm text-slate-700">Amount</th>
                            <th className="px-6 py-4 font-semibold text-sm text-slate-700">Status</th>
                            <th className="px-6 py-4 font-semibold text-sm text-slate-700 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {filteredInvoices.map((inv) => (
                            <tr key={inv.id} className="hover:bg-slate-50 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-slate-50 text-slate-500 rounded-lg border border-slate-200">
                                            <Receipt className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-slate-900">{inv.invoiceNumber}</p>
                                            <p className="text-xs text-slate-500">Due: {inv.dueDate}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <p className="text-sm font-medium text-slate-900">{inv.clientName}</p>
                                    <p className="text-xs text-slate-500">{inv.projectName}</p>
                                </td>
                                <td className="px-6 py-4">
                                    <p className="text-sm font-bold text-slate-900">₹ {(inv.amount / 100000).toFixed(2)}L</p>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(inv.status)}`}>
                                        {inv.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button className="text-slate-400 hover:text-slate-600 p-2 hover:bg-slate-100 rounded-lg" title="Download">
                                        <ArrowDownToLine className="w-4 h-4" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {filteredInvoices.length === 0 && (
                    <div className="p-8 text-center text-slate-500">
                        No invoices found.
                    </div>
                )}
            </div>

            {/* Create Invoice Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                        <div className="flex justify-between items-center p-6 border-b border-slate-100">
                            <h2 className="text-xl font-bold text-slate-900">Create Invoice</h2>
                            <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <form onSubmit={handleCreateInvoice} className="p-6 space-y-4">
                            <div className="space-y-1">
                                <label className="text-xs font-semibold text-slate-500 uppercase">Client Name *</label>
                                <input
                                    required
                                    type="text"
                                    className="w-full p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 outline-none transition-all"
                                    value={newInvoice.clientName || ''}
                                    onChange={e => setNewInvoice({ ...newInvoice, clientName: e.target.value })}
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-semibold text-slate-500 uppercase">Project Name</label>
                                <input
                                    type="text"
                                    className="w-full p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 outline-none transition-all"
                                    value={newInvoice.projectName || ''}
                                    onChange={e => setNewInvoice({ ...newInvoice, projectName: e.target.value })}
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-semibold text-slate-500 uppercase">Amount (₹) *</label>
                                <input
                                    required
                                    type="number"
                                    className="w-full p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 outline-none transition-all"
                                    value={newInvoice.amount || ''}
                                    onChange={e => setNewInvoice({ ...newInvoice, amount: Number(e.target.value) })}
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-semibold text-slate-500 uppercase">Due Date</label>
                                <input
                                    type="date"
                                    className="w-full p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 outline-none transition-all"
                                    value={newInvoice.dueDate || ''}
                                    onChange={e => setNewInvoice({ ...newInvoice, dueDate: e.target.value })}
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
                                    Create Invoice
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
