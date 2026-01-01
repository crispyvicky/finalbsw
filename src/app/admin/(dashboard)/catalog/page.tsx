'use client';

import { useState, useEffect } from 'react';
import { Plus, Search, Edit2, Trash2, Save, X, ImageIcon, Loader2 } from 'lucide-react';

interface CatalogItem {
    _id: string;
    name: string;
    category: string;
    defaultRate: number;
    image: string;
    description?: string;
}

export default function CatalogPage() {
    const [items, setItems] = useState<CatalogItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [isAppModalOpen, setAppModalOpen] = useState(false);

    // Form State
    const [editingId, setEditingId] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        name: '',
        category: 'general',
        defaultRate: 0,
        image: '',
        description: ''
    });

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        try {
            const res = await fetch('/api/catalog');
            if (res.ok) {
                const data = await res.json();
                setItems(data);
            }
        } catch (error) {
            console.error('Failed to fetch catalog', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const url = editingId ? `/api/catalog/${editingId}` : '/api/catalog';
            const method = editingId ? 'PUT' : 'POST';

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                await fetchItems();
                closeModal();
            }
        } catch (error) {
            console.error('Failed to save item', error);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this item?')) return;
        try {
            const res = await fetch(`/api/catalog/${id}`, { method: 'DELETE' });
            if (res.ok) fetchItems();
        } catch (error) {
            console.error('Failed to delete item', error);
        }
    };

    const openModal = (item?: CatalogItem) => {
        if (item) {
            setEditingId(item._id);
            setFormData({
                name: item.name,
                category: item.category,
                defaultRate: item.defaultRate,
                image: item.image,
                description: item.description || ''
            });
        } else {
            setEditingId(null);
            setFormData({ name: '', category: 'general', defaultRate: 0, image: '', description: '' });
        }
        setAppModalOpen(true);
    };

    const closeModal = () => {
        setAppModalOpen(false);
        setEditingId(null);
    };

    const filteredItems = items.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return <div className="flex h-96 items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-slate-400" /></div>;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Master Catalog</h1>
                    <p className="text-slate-500">Manage your seamless library of items and rates.</p>
                </div>
                <button
                    onClick={() => openModal()}
                    className="bg-slate-900 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/20"
                >
                    <Plus className="w-4 h-4" /> Add New Item
                </button>
            </div>

            {/* Search */}
            <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                    type="text"
                    placeholder="Search catalog items..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900/10"
                />
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredItems.map(item => (
                    <div key={item._id} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden group hover:shadow-md transition-shadow">
                        <div className="aspect-video bg-slate-100 relative">
                            {item.image ? (
                                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                            ) : (
                                <div className="flex items-center justify-center h-full text-slate-300">
                                    <ImageIcon className="w-8 h-8" />
                                </div>
                            )}
                            <span className="absolute top-2 right-2 bg-black/60 text-white text-[10px] px-2 py-0.5 rounded-full uppercase font-bold tracking-wider backdrop-blur-sm">
                                {item.category}
                            </span>
                        </div>
                        <div className="p-4">
                            <h3 className="font-bold text-slate-900 truncate" title={item.name}>{item.name}</h3>
                            <p className="text-slate-500 text-sm mt-1">₹ {item.defaultRate.toLocaleString()} / sft</p>

                            <div className="flex items-center justify-end gap-2 mt-4 pt-4 border-t border-slate-50">
                                <button
                                    onClick={() => openModal(item)}
                                    className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                >
                                    <Edit2 className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => handleDelete(item._id)}
                                    className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {filteredItems.length === 0 && (
                <div className="text-center py-20 text-slate-400 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                    <p>No items found. Add your first catalog item!</p>
                </div>
            )}

            {/* Modal */}
            {isAppModalOpen && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden">
                        <div className="flex justify-between items-center p-6 border-b border-slate-100">
                            <h2 className="text-xl font-bold text-slate-900">{editingId ? 'Edit Item' : 'Add New Item'}</h2>
                            <button onClick={closeModal} className="text-slate-400 hover:text-slate-600">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <form onSubmit={handleSave} className="p-6 space-y-4">
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-slate-500 uppercase">Item Name *</label>
                                <input
                                    required
                                    type="text"
                                    className="w-full p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-slate-900/10 outline-none"
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    placeholder="e.g. Master Wardrobe"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-slate-500 uppercase">Category</label>
                                    <select
                                        className="w-full p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-slate-900/10 outline-none bg-white"
                                        value={formData.category}
                                        onChange={e => setFormData({ ...formData, category: e.target.value })}
                                    >
                                        <option value="general">General</option>
                                        <option value="bedroom">Bedroom</option>
                                        <option value="kitchen">Kitchen</option>
                                        <option value="living">Living</option>
                                        <option value="dining">Dining</option>
                                        <option value="bathroom">Bathroom</option>
                                    </select>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-slate-500 uppercase">Default Rate (₹)</label>
                                    <input
                                        required
                                        type="number"
                                        className="w-full p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-slate-900/10 outline-none"
                                        value={formData.defaultRate}
                                        onChange={e => setFormData({ ...formData, defaultRate: parseFloat(e.target.value) || 0 })}
                                    />
                                </div>
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-slate-500 uppercase">Image URL</label>
                                <input
                                    type="url"
                                    className="w-full p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-slate-900/10 outline-none"
                                    value={formData.image}
                                    onChange={e => setFormData({ ...formData, image: e.target.value })}
                                    placeholder="https://..."
                                />
                                <p className="text-[10px] text-slate-400">Paste an Unsplash or hosted image URL.</p>
                            </div>

                            <div className="pt-4 flex gap-3">
                                <button type="button" onClick={closeModal} className="flex-1 py-2.5 text-slate-600 font-medium hover:bg-slate-50 rounded-lg">Cancel</button>
                                <button type="submit" className="flex-1 py-2.5 bg-slate-900 text-white font-medium rounded-lg hover:bg-slate-800 shadow-lg shadow-slate-900/20">Save Item</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
