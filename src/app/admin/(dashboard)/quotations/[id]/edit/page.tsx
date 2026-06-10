'use client';

import { useState, useEffect } from 'react';
import { Plus, Trash2, Save, ArrowLeft, Loader2, ImageIcon, X } from 'lucide-react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
// import { COMMON_ITEMS } from '@/lib/constants';
import SearchableSelect from '@/components/ui/SearchableSelect';

interface QuotationItem {
    description: string;
    height: number;
    width: number;
    sft: number;
    unitPrice: number;
    amount: number;
    image?: string;
    imageFile?: File | null;
    categories?: string[];
    isCustom?: boolean;
}

interface QuotationSection {
    name: string;
    items: QuotationItem[];
    subTotal: number;
}

export default function EditQuotationPage() {
    const router = useRouter();
    const params = useParams();
    const id = params.id as string;

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    // Form State
    const [clientName, setClientName] = useState('');
    const [clientPhone, setClientPhone] = useState('');
    const [clientEmail, setClientEmail] = useState('');
    const [projectName, setProjectName] = useState('');
    const [discount, setDiscount] = useState(0);
    const [gst, setGst] = useState(0);
    const [quoteNumber, setQuoteNumber] = useState('');
    const [notes, setNotes] = useState('');
    const [sections, setSections] = useState<QuotationSection[]>([]);

    // Catalog State
    const [catalogItems, setCatalogItems] = useState<any[]>([]);

    useEffect(() => {
        fetchQuotation();
        fetchCatalog();
    }, []);

    const fetchCatalog = async () => {
        try {
            const res = await fetch('/api/catalog');
            if (res.ok) {
                const data = await res.json();
                const mapped = data.map((item: any) => ({
                    ...item,
                    label: item.name
                }));
                setCatalogItems(mapped);
            }
        } catch (error) {
            console.error('Failed to fetch catalog', error);
        }
    };

    const fetchQuotation = async () => {
        try {
            const res = await fetch(`/api/quotations/${id}`);
            if (res.ok) {
                const data = await res.json();
                setClientName(data.clientName);
                setClientPhone(data.clientPhone || '');
                setClientEmail(data.clientEmail || '');
                setProjectName(data.projectName);
                setDiscount(data.discount || 0);
                setGst(data.gstRate || 0);
                setQuoteNumber(data.quoteNumber);

                // Ensure default notes if missing
                setNotes(data.notes || '1. 50% Advance along with work order.\n2. 40% Material shifting.\n3. 10% after completion of work.\n4. GST extra as applicable.');

                setSections(data.sections || []);
            } else {
                alert('Quotation not found');
                router.push('/admin/quotations');
            }
        } catch (error) {
            console.error('Failed to fetch', error);
        } finally {
            setLoading(false);
        }
    };

    // Calculations
    const getSubTotal = () => {
        return sections.reduce((sum, section) => sum + (section.items.reduce((s, i) => s + (i.amount || 0), 0)), 0);
    };

    const getRefinedTotal = (type: 'sub' | 'total' | 'tax') => {
        const sub = getSubTotal();
        if (type === 'sub') return sub;

        const discAmount = discount; // Fixed Amount
        const afterDiscount = sub - discAmount;

        const taxAmount = (afterDiscount * gst) / 100;

        if (type === 'tax') return taxAmount;

        return afterDiscount + taxAmount;
    };

    // Handlers
    const addSection = () => {
        setSections([...sections, { name: '', items: [{ description: '', height: 0, width: 0, sft: 0, unitPrice: 0, amount: 0 }], subTotal: 0 }]);
    };

    const removeSection = (index: number) => {
        const newSections = [...sections];
        newSections.splice(index, 1);
        setSections(newSections);
    };

    const addItem = (sectionIndex: number) => {
        const newSections = [...sections];
        newSections[sectionIndex].items.push({ description: '', height: 0, width: 0, sft: 0, unitPrice: 0, amount: 0 });
        setSections(newSections);
    };

    const removeItem = (sectionIndex: number, itemIndex: number) => {
        const newSections = [...sections];
        newSections[sectionIndex].items.splice(itemIndex, 1);
        setSections(newSections);
    };

    const updateSectionName = (index: number, name: string) => {
        const newSections = [...sections];
        newSections[index].name = name;
        setSections(newSections);
    };

    const handleImageChange = async (sectionIndex: number, itemIndex: number, e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const newSections = [...sections];
            newSections[sectionIndex].items[itemIndex].imageFile = file;

            const formData = new FormData();
            formData.append('file', file);

            // Optimistic UI for loading state per item is hard, using global saving for now
            // Or better: just alert if fails.
            try {
                const res = await fetch('/api/upload', { method: 'POST', body: formData });
                if (res.ok) {
                    const data = await res.json();
                    newSections[sectionIndex].items[itemIndex].image = data.url;
                    newSections[sectionIndex].items[itemIndex].imageFile = null;
                }
            } catch (err) {
                console.error(err);
                alert('Image upload failed');
            }

            setSections(newSections);
        }
    };

    const getFilteredItems = (sectionName: string) => {
        const lowerName = sectionName.toLowerCase();

        let validIds: string[] = [];
        let primaryCategory = '';

        if (lowerName.includes('kitchen')) {
            validIds = ['kitchen', 'all'];
            primaryCategory = 'kitchen';
        } else if (lowerName.includes('bed')) {
            validIds = ['bedroom', 'all'];
            primaryCategory = 'bedroom';
        } else if (lowerName.includes('living') || lowerName.includes('hall')) {
            validIds = ['living', 'all'];
            primaryCategory = 'living';
        } else if (lowerName.includes('dining')) {
            validIds = ['dining', 'all'];
            primaryCategory = 'dining';
        } else if (lowerName.includes('study')) {
            validIds = ['study', 'all'];
            primaryCategory = 'study';
        } else if (lowerName.includes('foyer')) {
            validIds = ['foyer', 'all'];
            primaryCategory = 'foyer';
        } else if (lowerName.includes('bath')) {
            validIds = ['bathroom', 'all'];
            primaryCategory = 'bathroom';
        } else {
            return catalogItems; // No specific category detected, return all
        }

        const filtered = catalogItems.filter(item => {
            // New Catalog has 'category' string
            if (typeof item.category === 'string') {
                return validIds.includes(item.category.toLowerCase()) || item.category === 'general';
            }
            // Fallback for older data structure if mixed
            if (Array.isArray(item.categories)) {
                return item.categories.some((c: string) => validIds.includes(c) || c === 'general');
            }
            return true;
        });

        // Sort: Room-specific items first, then general items
        const sorted = filtered.sort((a, b) => {
            const aIsSpecific = (typeof a.category === 'string' && a.category.toLowerCase() === primaryCategory) ||
                (Array.isArray(a.categories) && a.categories.includes(primaryCategory));
            const bIsSpecific = (typeof b.category === 'string' && b.category.toLowerCase() === primaryCategory) ||
                (Array.isArray(b.categories) && b.categories.includes(primaryCategory));

            // Specific items come first
            if (aIsSpecific && !bIsSpecific) return -1;
            if (!aIsSpecific && bIsSpecific) return 1;

            // Otherwise maintain original order
            return 0;
        });

        // Fallback: If filter is too strict (no items found for category), return ALL items
        return sorted.length > 0 ? sorted : catalogItems;
    };
    const updateItem = (sectionIndex: number, itemIndex: number, field: keyof QuotationItem, value: any) => {
        const newSections = [...sections];
        const item = newSections[sectionIndex].items[itemIndex];

        if (field === 'description') {
            const commonItem = catalogItems.find(ci => ci.label === value);
            if (commonItem) {
                if (!item.unitPrice) item.unitPrice = commonItem.defaultRate;
                if (!item.image && commonItem.image) item.image = commonItem.image;
            }
        }

        (item as any)[field] = value;

        if (field === 'height' || field === 'width') {
            item.sft = parseFloat(((item.height || 0) * (item.width || 0)).toFixed(2));
        }

        // CORRECTION: Always recalculate amount based on current sft and unitPrice
        const sft = item.sft || 0;
        const rate = item.unitPrice || 0;

        // If sft is 0 (h or w is 0), use unitPrice directly as amount for service items (like cleaning)
        if (sft === 0 && (item.height === 0 || !item.height) && (item.width === 0 || !item.width)) {
            item.amount = rate;
        } else {
            item.amount = parseFloat((sft * rate).toFixed(2));
        }

        newSections[sectionIndex].subTotal = newSections[sectionIndex].items.reduce((sum, t) => sum + t.amount, 0);
        setSections(newSections);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        try {
            const subTotal = getSubTotal();
            const finalAmount = getRefinedTotal('total');

            const payload = {
                clientName,
                clientPhone,
                clientEmail,
                projectName,
                sections: sections,
                totalAmount: subTotal,
                discount: discount,
                gstRate: gst,
                finalAmount: finalAmount,
                notes: notes,
                // quoteNumber is preserved from fetch
            };

            const res = await fetch(`/api/quotations/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (res.ok) {
                router.push('/admin/quotations');
            } else {
                alert('Failed to update quotation');
            }
        } catch (error) {
            console.error(error);
            alert('Error updating quotation');
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="h-screen flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-slate-400" /></div>;

    return (
        <div className="max-w-5xl mx-auto space-y-8 pb-20">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <Link href="/admin/quotations" className="text-sm text-slate-500 hover:text-slate-800 flex items-center gap-1 mb-2">
                        <ArrowLeft className="w-4 h-4" /> Back to List
                    </Link>
                    <h1 className="text-3xl font-bold text-slate-900">Edit Quotation</h1>
                    <p className="text-slate-500">{quoteNumber}</p>
                </div>
                <div className="text-right">
                    <p className="text-sm text-slate-500 uppercase font-semibold">Total Amount</p>
                    <p className="text-4xl font-bold text-slate-900">₹ {getRefinedTotal('total').toLocaleString()}</p>
                    {discount > 0 && <p className="text-sm text-emerald-600 font-medium">Includes ₹ {discount.toLocaleString()} Discount</p>}
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                {/* Client Info */}
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500 uppercase">Client Name</label>
                        <input
                            required
                            type="text"
                            className="w-full text-lg font-semibold border-b border-slate-200 focus:border-slate-900 outline-none py-2 transition-colors placeholder:font-normal"
                            placeholder="e.g. Mr. Rajesh Kumar"
                            value={clientName}
                            onChange={(e) => setClientName(e.target.value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500 uppercase">Phone Number</label>
                        <input
                            type="tel"
                            className="w-full text-lg font-semibold border-b border-slate-200 focus:border-slate-900 outline-none py-2 transition-colors placeholder:font-normal"
                            placeholder="e.g. 9999999999"
                            value={clientPhone}
                            onChange={(e) => setClientPhone(e.target.value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500 uppercase">Email Address</label>
                        <input
                            type="email"
                            className="w-full text-lg font-semibold border-b border-slate-200 focus:border-slate-900 outline-none py-2 transition-colors placeholder:font-normal"
                            placeholder="e.g. client@example.com"
                            value={clientEmail}
                            onChange={(e) => setClientEmail(e.target.value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500 uppercase">Project Name / Location</label>
                        <input
                            required
                            type="text"
                            className="w-full text-lg font-semibold border-b border-slate-200 focus:border-slate-900 outline-none py-2 transition-colors placeholder:font-normal"
                            placeholder="e.g. Sobha City, Apt 402"
                            value={projectName}
                            onChange={(e) => setProjectName(e.target.value)}
                        />
                    </div>
                </div>

                {/* Sections */}
                <div className="space-y-6">
                    {sections.map((section, sIndex) => (
                        <div key={sIndex} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
                            {/* Section Header */}
                            <div className="bg-slate-50 p-4 border-b border-slate-200 flex justify-between items-center">
                                <SearchableSelect
                                    className="w-full max-w-md"
                                    options={[
                                        { label: "Master Bedroom" }, { label: "Guest Bedroom" }, { label: "Kids Bedroom" },
                                        { label: "Kitchen" }, { label: "Living Area" }, { label: "Dining Area" }, { label: "Foyer" },
                                        { label: "Balcony" }, { label: "Utility" }
                                    ]}
                                    value={section.name}
                                    onChange={(val) => updateSectionName(sIndex, val)}
                                    placeholder="Section Name (e.g., Kitchen)"
                                />
                                <div className="flex items-center gap-4">
                                    <span className="text-sm font-semibold text-slate-600">Subtotal: ₹ {section.items.reduce((s, i) => s + (i.amount || 0), 0).toLocaleString()}</span>
                                    <button type="button" onClick={() => removeSection(sIndex)} className="text-slate-400 hover:text-red-500 transition-colors">
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>

                            {/* Table Header */}
                            <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-slate-50/50 text-xs font-bold text-slate-500 uppercase border-b border-slate-100">
                                <div className="col-span-4">Description</div>
                                <div className="col-span-1 text-center">H (ft)</div>
                                <div className="col-span-1 text-center">W (ft)</div>
                                <div className="col-span-1 text-center">Sft</div>
                                <div className="col-span-2 text-right">Rate (₹)</div>
                                <div className="col-span-2 text-right">Amount (₹)</div>
                                <div className="col-span-1"></div>
                            </div>

                            {/* Items */}
                            <div className="p-4 space-y-4">
                                {section.items.map((item, iIndex) => (
                                    <div key={iIndex} className="grid grid-cols-12 gap-4 items-start group relative hover:z-10 focus-within:z-10 bg-white/50 hover:bg-white transition-colors rounded-lg p-2 border border-transparent hover:border-slate-100">
                                        <div className="col-span-4 space-y-2 relative">
                                            {/* Custom Item Toggle */}
                                            <div className="flex items-center gap-2 mb-1">
                                                <label className="flex items-center gap-1.5 text-[10px] font-bold uppercase text-slate-400 hover:text-blue-600 cursor-pointer select-none">
                                                    <input
                                                        type="checkbox"
                                                        className="w-3 h-3 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                                                        checked={item.isCustom || false}
                                                        onChange={(e) => {
                                                            // For edit page, if we toggle custom on existing item, we might want to preserve description
                                                            updateItem(sIndex, iIndex, 'isCustom', e.target.checked);
                                                        }}
                                                    />
                                                    Custom Item
                                                </label>
                                            </div>

                                            {item.isCustom ? (
                                                <input
                                                    type="text"
                                                    className="w-full px-3 py-2 text-sm font-medium border border-slate-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all placeholder:font-normal"
                                                    placeholder="Enter item description..."
                                                    value={item.description}
                                                    onChange={(e) => updateItem(sIndex, iIndex, 'description', e.target.value)}
                                                    autoFocus
                                                />
                                            ) : (
                                                <SearchableSelect
                                                    options={getFilteredItems(section.name)}
                                                    value={item.description}
                                                    onChange={(val) => updateItem(sIndex, iIndex, 'description', val)}
                                                    placeholder="Select Item from Catalog..."
                                                />
                                            )}

                                            {/* Image Upload Trigger */}
                                            <div className="text-xs pt-1">
                                                {item.image ? (
                                                    <div className="flex items-center gap-2 text-green-600">
                                                        <ImageIcon className="w-3 h-3" /> Image Added
                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                const newSections = [...sections];
                                                                newSections[sIndex].items[iIndex].image = undefined;
                                                                newSections[sIndex].items[iIndex].imageFile = null;
                                                                setSections(newSections);
                                                            }}
                                                            className="text-red-500 hover:underline ml-2"
                                                        >Remove</button>
                                                    </div>
                                                ) : (
                                                    <label className="flex items-center gap-1 text-slate-400 hover:text-blue-600 cursor-pointer transition-colors w-max">
                                                        <ImageIcon className="w-3 h-3" />
                                                        Add Image
                                                        <input
                                                            type="file"
                                                            accept="image/*"
                                                            className="hidden"
                                                            onChange={(e) => handleImageChange(sIndex, iIndex, e)}
                                                        />
                                                    </label>
                                                )}
                                            </div>
                                        </div>
                                        <div className="col-span-1 pt-6 text-center">
                                            <input
                                                type="number"
                                                className="w-full p-2 text-center bg-slate-50 border border-slate-200 hover:border-slate-300 focus:bg-white focus:border-blue-400 rounded outline-none transition-all font-mono text-sm"
                                                placeholder="H"
                                                value={item.height || ''}
                                                onChange={(e) => updateItem(sIndex, iIndex, 'height', parseFloat(e.target.value))}
                                            />
                                        </div>
                                        <div className="col-span-1 pt-6 text-center">
                                            <input
                                                type="number"
                                                className="w-full p-2 text-center bg-slate-50 border border-slate-200 hover:border-slate-300 focus:bg-white focus:border-blue-400 rounded outline-none transition-all font-mono text-sm"
                                                placeholder="W"
                                                value={item.width || ''}
                                                onChange={(e) => updateItem(sIndex, iIndex, 'width', parseFloat(e.target.value))}
                                            />
                                        </div>
                                        <div className="col-span-1 pt-8 text-center font-mono text-slate-500 text-sm font-semibold">
                                            {item.sft}
                                        </div>
                                        <div className="col-span-2 pt-6">
                                            <div className="relative">
                                                <span className="absolute left-2 top-2 text-slate-400 text-xs">₹</span>
                                                <input
                                                    type="number"
                                                    className="w-full pl-6 p-2 text-right bg-slate-50 border border-slate-200 hover:border-slate-300 focus:bg-white focus:border-blue-400 rounded outline-none transition-all font-mono text-sm font-medium"
                                                    value={item.unitPrice || ''}
                                                    onChange={(e) => updateItem(sIndex, iIndex, 'unitPrice', parseFloat(e.target.value))}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-span-2 pt-8 text-right font-mono font-bold text-slate-800 text-sm">
                                            ₹ {item.amount.toLocaleString()}
                                        </div>
                                        <div className="col-span-1 pt-8 text-center">
                                            <button
                                                type="button"
                                                onClick={() => removeItem(sIndex, iIndex)}
                                                className="text-slate-300 hover:text-red-500 transition-colors p-1"
                                                title="Remove Item"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                ))}

                                <button type="button" onClick={() => addItem(sIndex)} className="flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-700 mt-4 px-3 py-2 rounded-lg hover:bg-blue-50 transition-colors border border-dashed border-blue-200 hover:border-blue-300 w-full justify-center">
                                    <Plus className="w-4 h-4" /> Add New Item
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Add Section Button */}
                <button
                    type="button"
                    onClick={addSection}
                    className="w-full py-4 border-2 border-dashed border-slate-300 rounded-xl text-slate-500 font-semibold hover:border-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
                >
                    <Plus className="w-5 h-5" /> Add New Section (Room)
                </button>

                {/* Notes & Totals */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Notes Field */}
                    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                        <label className="text-xs font-bold text-slate-500 uppercase mb-2 block">Notes & Terms</label>
                        <textarea
                            className="w-full h-48 p-4 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:bg-white focus:border-slate-400 text-sm font-medium text-slate-700 resize-none"
                            placeholder="Add your terms and conditions here..."
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                        />
                    </div>

                    {/* Totals Box */}
                    <div className="bg-slate-900 text-white rounded-xl p-6 shadow-lg flex flex-col justify-between">
                        <div>
                            <h3 className="text-xl font-bold">Final Costing</h3>
                            <p className="text-slate-400 text-sm">Review the totals and apply any discounts.</p>
                        </div>
                        <div className="space-y-4 mt-8">
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-slate-400">Sub Total</span>
                                <span className="font-mono font-semibold">₹ {getSubTotal().toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <label className="text-sm font-bold text-blue-400">Discount (₹)</label>
                                <input
                                    type="number"
                                    min="0"
                                    value={discount}
                                    onChange={(e) => setDiscount(parseFloat(e.target.value) || 0)}
                                    className="w-24 p-1 text-center text-slate-900 font-bold rounded bg-white outline-none focus:ring-2 focus:ring-blue-400"
                                />
                            </div>
                            <div className="flex justify-between items-center">
                                <label className="text-sm font-bold text-blue-400">GST (%)</label>
                                <input
                                    type="number"
                                    min="0"
                                    max="100"
                                    value={gst}
                                    onChange={(e) => setGst(parseFloat(e.target.value) || 0)}
                                    className="w-20 p-1 text-center text-slate-900 font-bold rounded bg-white outline-none focus:ring-2 focus:ring-blue-400"
                                />
                            </div>
                            {gst > 0 && (
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-slate-400">GST Amount</span>
                                    <span className="font-mono font-semibold text-blue-200">+ ₹ {getRefinedTotal('tax').toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                                </div>
                            )}
                        </div>
                        <div className="text-right border-t border-slate-700 pt-4 mt-4">
                            <p className="text-sm text-slate-400 uppercase font-semibold mb-1">Grand Total</p>
                            <p className="text-4xl font-bold text-white">₹ {getRefinedTotal('total').toLocaleString()}</p>
                        </div>
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="flex justify-end pt-4 gap-4">
                    <button type="button" onClick={() => router.back()} className="px-6 py-3 text-slate-600 font-bold hover:bg-slate-100 rounded-lg transition-colors">
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={saving}
                        className="bg-emerald-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-900/20 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                        Update Quotation
                    </button>
                </div>
            </form>
        </div>
    );
}
