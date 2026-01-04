'use client';

import { useState, useEffect } from 'react';
import { Client } from '@/types/admin';
import { Plus, Search, Phone, MapPin, Mail, FolderOpen, MoreVertical, X, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function ClientsPage() {
    const [clients, setClients] = useState<Client[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newClient, setNewClient] = useState<Partial<Client>>({});

    useEffect(() => {
        fetchClients();
    }, []);

    const fetchClients = async () => {
        try {
            const res = await fetch('/api/clients');
            if (res.ok) {
                const data = await res.json();
                const mappedData = data.map((item: any) => ({ ...item, id: item._id }));
                setClients(mappedData);
            }
        } catch (error) {
            console.error('Failed to fetch clients', error);
        } finally {
            setLoading(false);
        }
    };

    const filteredClients = clients.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.phone.includes(searchTerm) ||
        (item.address && item.address.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const handleAddClient = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newClient.name || !newClient.phone) return;

        try {
            const res = await fetch('/api/clients', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newClient),
            });

            if (res.ok) {
                await fetchClients();
                setIsModalOpen(false);
                setNewClient({});
            }
        } catch (error) {
            console.error('Failed to add client', error);
        }
    };

    if (loading) {
        return <div className="flex h-96 items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-slate-400" /></div>;
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Clients</h1>
                    <p className="text-slate-500">Single source of truth for all your diverse clients.</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-slate-900 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-slate-800 transition-colors"
                >
                    <Plus className="w-4 h-4" />
                    Add Client
                </button>
            </div>

            {/* Filters & Search */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search clients..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900/10"
                    />
                </div>
            </div>

            {/* Grid View for Clients (Better than table for profiles) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredClients.map((client) => (
                    <div key={client.id} className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all group p-6 space-y-4 relative">
                        <Link href={`/admin/clients/${client.id}`} className="absolute inset-0 z-0" aria-label={`View ${client.name}`} />
                        <div className="flex justify-between items-start relative z-10">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-bold text-lg group-hover:bg-slate-200 transition-colors">
                                    {client.name.charAt(0)}
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-900 line-clamp-1 group-hover:text-blue-600 transition-colors">{client.name}</h3>
                                    <div className="flex items-center gap-1.5 text-xs text-slate-500">
                                        <MapPin className="w-3 h-3" />
                                        <span className="truncate max-w-[120px]">{client.address || 'No Address'}</span>
                                    </div>
                                </div>
                            </div>
                            <button className="text-slate-400 hover:text-slate-600 p-1 hover:bg-slate-100 rounded-full transition-colors">
                                <MoreVertical className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="grid grid-cols-2 gap-3 text-sm pt-2 relative z-10">
                            <a href={`tel:${client.phone}`} className="flex items-center gap-2 text-slate-600 hover:text-amber-600 p-2 bg-slate-50 rounded-lg transition-colors hover:bg-amber-50">
                                <Phone className="w-4 h-4 text-slate-400" />
                                {client.phone}
                            </a>
                            <a href={`mailto:${client.email}`} className="flex items-center gap-2 text-slate-600 hover:text-amber-600 p-2 bg-slate-50 rounded-lg transition-colors hover:bg-amber-50">
                                <Mail className="w-4 h-4 text-slate-400" />
                                <span className="truncate">{client.email || 'No Email'}</span>
                            </a>
                        </div>

                        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                            <div className="text-sm">
                                <p className="text-xs text-slate-400">Budget</p>
                                <p className="font-semibold text-slate-900">₹ {client.budget || '-'}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-xs text-slate-400">Linked Project</p>
                                {client.projectId ? (
                                    <span className="inline-flex items-center gap-1 text-sm font-medium text-blue-600">
                                        <FolderOpen className="w-3.5 h-3.5" />
                                        {client.projectId}
                                    </span>
                                ) : (
                                    <span className="text-xs text-slate-400 italic">None linked</span>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {filteredClients.length === 0 && (
                <div className="p-12 text-center bg-white rounded-xl border border-slate-200">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-slate-100 mb-4">
                        <Search className="w-6 h-6 text-slate-400" />
                    </div>
                    <h3 className="text-lg font-medium text-slate-900">No clients found</h3>
                    <p className="text-slate-500 mt-1">Try searching for a different name or location.</p>
                </div>
            )}

            {/* Add Client Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                        <div className="flex justify-between items-center p-6 border-b border-slate-100">
                            <h2 className="text-xl font-bold text-slate-900">Add New Client</h2>
                            <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleAddClient} className="p-6 space-y-4">
                            <div className="space-y-1">
                                <label className="text-xs font-semibold text-slate-500 uppercase">Client Name *</label>
                                <input
                                    required
                                    type="text"
                                    className="w-full p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 outline-none transition-all"
                                    value={newClient.name || ''}
                                    onChange={e => setNewClient({ ...newClient, name: e.target.value })}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-xs font-semibold text-slate-500 uppercase">Phone *</label>
                                    <input
                                        required
                                        type="tel"
                                        className="w-full p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 outline-none transition-all"
                                        value={newClient.phone || ''}
                                        onChange={e => setNewClient({ ...newClient, phone: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-semibold text-slate-500 uppercase">Email</label>
                                    <input
                                        type="email"
                                        className="w-full p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 outline-none transition-all"
                                        value={newClient.email || ''}
                                        onChange={e => setNewClient({ ...newClient, email: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-semibold text-slate-500 uppercase">Site Address</label>
                                <input
                                    type="text"
                                    className="w-full p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 outline-none transition-all"
                                    value={newClient.address || ''}
                                    onChange={e => setNewClient({ ...newClient, address: e.target.value })}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-xs font-semibold text-slate-500 uppercase">Budget</label>
                                    <input
                                        type="text"
                                        className="w-full p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 outline-none transition-all"
                                        placeholder="e.g. 45L"
                                        value={newClient.budget || ''}
                                        onChange={e => setNewClient({ ...newClient, budget: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-semibold text-slate-500 uppercase">Project Name (Linked)</label>
                                    <input
                                        type="text"
                                        className="w-full p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 outline-none transition-all"
                                        placeholder="Optional"
                                        value={newClient.projectId || ''}
                                        onChange={e => setNewClient({ ...newClient, projectId: e.target.value })}
                                    />
                                </div>
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
                                    Save Client
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

        </div>
    );
}
