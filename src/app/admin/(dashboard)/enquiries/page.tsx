'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Enquiry, EnquiryStatus } from '@/types/admin';
import { Plus, Search, Phone, MapPin, IndianRupee, MoreHorizontal, X, Loader2, UserPlus } from 'lucide-react';

export default function EnquiriesPage() {
    const router = useRouter();
    const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newEnquiry, setNewEnquiry] = useState<Partial<Enquiry>>({
        status: 'New',
        date: new Date().toISOString().split('T')[0]
    });

    useEffect(() => {
        fetchEnquiries();
    }, []);

    const fetchEnquiries = async () => {
        try {
            const res = await fetch('/api/enquiries');
            if (res.ok) {
                const data = await res.json();
                const mappedData = data.map((item: any) => ({ ...item, id: item._id }));
                setEnquiries(mappedData);
            }
        } catch (error) {
            console.error('Failed to fetch enquiries', error);
        } finally {
            setLoading(false);
        }
    };

    const filteredEnquiries = enquiries.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.phone.includes(searchTerm) ||
        (item.email && item.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (item.location && item.location.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (item.source && item.source.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const getStatusColor = (status: EnquiryStatus) => {
        switch (status) {
            case 'New': return 'bg-blue-100 text-blue-700';
            case 'Follow-up': return 'bg-amber-100 text-amber-700';
            case 'Converted': return 'bg-emerald-100 text-emerald-700';
            case 'Lost': return 'bg-red-100 text-red-700';
            default: return 'bg-slate-100 text-slate-700';
        }
    };

    const handleAddEnquiry = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newEnquiry.name || !newEnquiry.phone) return;

        try {
            const res = await fetch('/api/enquiries', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newEnquiry),
            });

            if (res.ok) {
                await fetchEnquiries();
                setIsModalOpen(false);
                setNewEnquiry({ status: 'New', date: new Date().toISOString().split('T')[0] });
            }
        } catch (error) {
            console.error('Failed to add enquiry', error);
        }
    };

    const updateStatus = async (id: string, newStatus: EnquiryStatus) => {
        const originalEnquiries = [...enquiries];
        setEnquiries(enquiries.map(item =>
            item.id === id ? { ...item, status: newStatus } : item
        ));

        try {
            const res = await fetch(`/api/enquiries/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus }),
            });

            if (!res.ok) {
                setEnquiries(originalEnquiries);
            }
        } catch (error) {
            setEnquiries(originalEnquiries);
        }
    };

    const handleConvertToClient = async (enquiry: Enquiry) => {
        if (!confirm(`Are you sure you want to convert "${enquiry.name}" to a client?`)) return;

        try {
            // 1. Create Client
            const clientRes = await fetch('/api/clients', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: enquiry.name,
                    phone: enquiry.phone,
                    email: enquiry.email,
                    address: enquiry.location,
                    budget: enquiry.budget,
                    projectId: enquiry.source ? `Lead: ${enquiry.source}` : undefined
                }),
            });

            if (clientRes.ok) {
                const newClient = await clientRes.json();

                // 2. Update Enquiry Status locally and in DB
                await updateStatus(enquiry.id, 'Converted');

                // 3. Redirect to new Client Page
                router.push(`/admin/clients/${newClient._id || newClient.id}`);
            } else {
                alert('Failed to create client from enquiry. Please try again.');
            }
        } catch (error) {
            console.error('Conversion error:', error);
            alert('Error converting enquiry');
        }
    };

    if (loading) {
        return <div className="flex h-96 items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-slate-400" /></div>;
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Enquiries & Leads</h1>
                    <p className="text-slate-500">Manage and track your sales pipeline.</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-slate-900 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-slate-800 transition-colors"
                >
                    <Plus className="w-4 h-4" />
                    Add New Enquiry
                </button>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search by name, phone or location..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900/10"
                    />
                </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden hidden md:block">
                <table className="w-full text-left">
                    <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                            <th className="px-6 py-4 font-semibold text-sm text-slate-700">Client Details</th>
                            <th className="px-6 py-4 font-semibold text-sm text-slate-700">Source</th>
                            <th className="px-6 py-4 font-semibold text-sm text-slate-700">Budget & Location</th>
                            <th className="px-6 py-4 font-semibold text-sm text-slate-700">Status</th>
                            <th className="px-6 py-4 font-semibold text-sm text-slate-700">Notes</th>
                            <th className="px-6 py-4 font-semibold text-sm text-slate-700 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {filteredEnquiries.map((enquiry) => (
                            <tr key={enquiry.id} className="hover:bg-slate-50 transition-colors">
                                <td className="px-6 py-4">
                                    <p className="font-medium text-slate-900">{enquiry.name}</p>
                                    <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1">
                                        <Phone className="w-3 h-3" />
                                        {enquiry.phone}
                                    </div>
                                    {enquiry.email && (
                                        <div className="text-xs text-slate-500 mt-1">
                                            {enquiry.email}
                                        </div>
                                    )}
                                </td>
                                <td className="px-6 py-4">
                                    <span className="px-2 py-1 bg-slate-100 text-slate-700 rounded text-xs font-medium">
                                        {enquiry.source || 'Manual'}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-1.5 text-sm text-slate-700">
                                        <IndianRupee className="w-3.5 h-3.5 text-slate-400" />
                                        {enquiry.budget || '-'}
                                    </div>
                                    <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1">
                                        <MapPin className="w-3 h-3" />
                                        {enquiry.location || '-'}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(enquiry.status)}`}>
                                        {enquiry.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 max-w-xs truncate text-sm text-slate-600">
                                    {enquiry.notes}
                                </td>
                                <td className="px-6 py-4 text-right flex justify-end items-center">
                                    <select
                                        value={enquiry.status}
                                        onChange={(e) => updateStatus(enquiry.id, e.target.value as EnquiryStatus)}
                                        className="text-xs border border-slate-200 rounded px-2 py-1 bg-white focus:outline-none focus:border-slate-400 cursor-pointer"
                                    >
                                        <option value="New">New</option>
                                        <option value="Follow-up">Follow-up</option>
                                        <option value="Converted">Converted</option>
                                        <option value="Lost">Lost</option>
                                    </select>
                                    <button
                                        onClick={() => handleConvertToClient(enquiry)}
                                        title="Convert to Client"
                                        className="inline-flex ml-2 items-center justify-center w-6 h-6 rounded hover:bg-emerald-50 hover:text-emerald-600 text-slate-400 transition-colors"
                                    >
                                        <UserPlus className="w-4 h-4" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {filteredEnquiries.length === 0 && (
                    <div className="p-8 text-center text-slate-500">
                        No enquiries found matching your search.
                    </div>
                )}
            </div>

            <div className="md:hidden space-y-4">
                {filteredEnquiries.map((enquiry) => (
                    <div key={enquiry.id} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-3">
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="font-bold text-slate-900">{enquiry.name}</h3>
                                <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1">
                                    <Phone className="w-3 h-3" />
                                    {enquiry.phone}
                                </div>
                            </div>
                            <select
                                value={enquiry.status}
                                onChange={(e) => updateStatus(enquiry.id, e.target.value as EnquiryStatus)}
                                className={`text-xs px-2 py-1 rounded font-medium border-0 ring-1 ring-inset ${getStatusColor(enquiry.status).replace('text-', 'ring-')}`}
                                style={{ width: 'auto' }}
                            >
                                <option value="New">New</option>
                                <option value="Follow-up">Follow-up</option>
                                <option value="Converted">Converted</option>
                                <option value="Lost">Lost</option>
                            </select>
                        </div>

                        <div className="grid grid-cols-2 gap-2 text-sm">
                            <div className="bg-slate-50 p-2 rounded-lg">
                                <p className="text-xs text-slate-500 mb-1">Budget</p>
                                <p className="font-medium text-slate-800">₹ {enquiry.budget || '-'}</p>
                            </div>
                            <div className="bg-slate-50 p-2 rounded-lg">
                                <p className="text-xs text-slate-500 mb-1">Location</p>
                                <p className="font-medium text-slate-800 truncate">{enquiry.location || '-'}</p>
                            </div>
                        </div>

                        {enquiry.notes && (
                            <div className="text-xs text-slate-500 bg-amber-50/50 p-3 rounded-lg border border-amber-100 italic">
                                "{enquiry.notes}"
                            </div>
                        )}
                    </div>
                ))}
                {filteredEnquiries.length === 0 && (
                    <div className="p-8 text-center text-slate-500 bg-white rounded-xl border border-slate-200">
                        No enquiries found.
                    </div>
                )}
            </div>

            {
                isModalOpen && (
                    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                        <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                            <div className="flex justify-between items-center p-6 border-b border-slate-100">
                                <h2 className="text-xl font-bold text-slate-900">Add New Enquiry</h2>
                                <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <form onSubmit={handleAddEnquiry} className="p-6 space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-xs font-semibold text-slate-500 uppercase">Client Name *</label>
                                        <input
                                            required
                                            type="text"
                                            className="w-full p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 outline-none transition-all"
                                            value={newEnquiry.name || ''}
                                            onChange={e => setNewEnquiry({ ...newEnquiry, name: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs font-semibold text-slate-500 uppercase">Phone *</label>
                                        <input
                                            required
                                            type="tel"
                                            className="w-full p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 outline-none transition-all"
                                            value={newEnquiry.phone || ''}
                                            onChange={e => setNewEnquiry({ ...newEnquiry, phone: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-xs font-semibold text-slate-500 uppercase">Budget Range</label>
                                        <input
                                            type="text"
                                            className="w-full p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 outline-none transition-all"
                                            placeholder="e.g. 15L - 20L"
                                            value={newEnquiry.budget || ''}
                                            onChange={e => setNewEnquiry({ ...newEnquiry, budget: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs font-semibold text-slate-500 uppercase">Site Location</label>
                                        <input
                                            type="text"
                                            className="w-full p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 outline-none transition-all"
                                            placeholder="e.g. HSR Layout"
                                            value={newEnquiry.location || ''}
                                            onChange={e => setNewEnquiry({ ...newEnquiry, location: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <label className="text-xs font-semibold text-slate-500 uppercase">Status</label>
                                    <select
                                        className="w-full p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 outline-none transition-all bg-white"
                                        value={newEnquiry.status || 'New'}
                                        onChange={e => setNewEnquiry({ ...newEnquiry, status: e.target.value as EnquiryStatus })}
                                    >
                                        <option value="New">New</option>
                                        <option value="Follow-up">Follow-up</option>
                                        <option value="Converted">Converted</option>
                                        <option value="Lost">Lost</option>
                                    </select>
                                </div>

                                <div className="space-y-1">
                                    <label className="text-xs font-semibold text-slate-500 uppercase">Notes</label>
                                    <textarea
                                        className="w-full p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 outline-none transition-all h-24 resize-none"
                                        placeholder="Any specific requirements..."
                                        value={newEnquiry.notes || ''}
                                        onChange={e => setNewEnquiry({ ...newEnquiry, notes: e.target.value })}
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
                                        Save Enquiry
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )
            }
        </div >
    );
}
