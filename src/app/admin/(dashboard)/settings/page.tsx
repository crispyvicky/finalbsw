'use client';

import { useState } from 'react';
import { Save, Building, CreditCard, Paintbrush, Upload } from 'lucide-react';

export default function SettingsPage() {
    const [loading, setLoading] = useState(false);

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // Simulate save
        setTimeout(() => {
            setLoading(false);
            alert('Settings saved!');
        }, 1000);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8 pb-10">
            <div className="space-y-1">
                <h1 className="text-2xl font-bold text-slate-900">Settings</h1>
                <p className="text-slate-500">Manage your company profile and preferences.</p>
            </div>

            <form onSubmit={handleSave} className="space-y-8">
                {/* Company Profile */}
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6">
                    <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                        <div className="p-2 bg-slate-100 rounded-lg text-slate-600"><Building className="w-5 h-5" /></div>
                        <h3 className="font-bold text-lg text-slate-900">Company Details</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-slate-700">Company Name</label>
                            <input type="text" defaultValue="Bravoo Interiors" className="w-full p-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-slate-900/10 focus:outline-none" />
                        </div>
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-slate-700">Phone</label>
                            <input type="tel" defaultValue="+91 98765 43210" className="w-full p-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-slate-900/10 focus:outline-none" />
                        </div>
                        <div className="space-y-1 md:col-span-2">
                            <label className="text-sm font-medium text-slate-700">Office Address</label>
                            <textarea defaultValue="123, Design Street, Indiranagar, Bangalore - 560038" className="w-full p-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-slate-900/10 focus:outline-none h-20 resize-none" />
                        </div>
                    </div>

                    <div className="flex items-center gap-4 pt-2">
                        <div className="w-20 h-20 bg-slate-100 rounded-lg flex items-center justify-center border-2 border-dashed border-slate-300">
                            <span className="text-xs text-slate-400 font-medium">Logo</span>
                        </div>
                        <div>
                            <button type="button" className="text-sm font-medium text-slate-900 border border-slate-300 px-3 py-1.5 rounded-lg hover:bg-slate-50 flex items-center gap-2">
                                <Upload className="w-3.5 h-3.5" /> Upload Logo
                            </button>
                            <p className="text-xs text-slate-400 mt-1">Recommended size: 200x200px</p>
                        </div>
                    </div>
                </div>

                {/* Financial Settings */}
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6">
                    <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                        <div className="p-2 bg-slate-100 rounded-lg text-slate-600"><CreditCard className="w-5 h-5" /></div>
                        <h3 className="font-bold text-lg text-slate-900">Financial Setup</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-slate-700">GST Number</label>
                            <input type="text" defaultValue="29ABCDE1234F1Z5" className="w-full p-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-slate-900/10 focus:outline-none font-mono" />
                        </div>
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-slate-700">Currency Symbol</label>
                            <select className="w-full p-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-slate-900/10 focus:outline-none bg-white">
                                <option value="INR">₹ (INR)</option>
                                <option value="USD">$ (USD)</option>
                            </select>
                        </div>
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-slate-700">Default Tax Rate (%)</label>
                            <input type="number" defaultValue="18" className="w-full p-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-slate-900/10 focus:outline-none" />
                        </div>
                    </div>
                </div>

                {/* Action Bar */}
                <div className="pt-4 flex justify-end">
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-slate-900 text-white px-8 py-3 rounded-lg font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/20 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Saving...' : (
                            <>
                                <Save className="w-5 h-5" /> Save Changes
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}
