'use client';

import { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, Users, Wallet, CreditCard, ArrowUpRight, ArrowDownRight, Loader2 } from 'lucide-react';

export default function ReportsPage() {
    const [stats, setStats] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchStats() {
            try {
                const res = await fetch('/api/stats');
                if (res.ok) {
                    const data = await res.json();
                    setStats(data);
                }
            } catch (error) {
                console.error('Failed to fetch stats', error);
            } finally {
                setLoading(false);
            }
        }
        fetchStats();
    }, []);

    if (loading) {
        return <div className="flex h-96 items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-slate-400" /></div>;
    }

    return (
        <div className="space-y-6">
            <div className="space-y-1">
                <h1 className="text-2xl font-bold text-slate-900">Business Reports</h1>
                <p className="text-slate-500">Key metrics and financial health of your business.</p>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm transition-all hover:shadow-md">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-sm font-medium text-slate-500">Total Revenue</p>
                            <h3 className="text-2xl font-bold text-slate-900 mt-2">₹ {(stats?.totalRevenue / 10000000).toFixed(2)}Cr</h3>
                        </div>
                        <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
                            <Wallet className="w-5 h-5" />
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm transition-all hover:shadow-md">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-sm font-medium text-slate-500">Est. Profit (20%)</p>
                            <h3 className="text-2xl font-bold text-slate-900 mt-2">₹ {(stats?.totalRevenue * 0.2 / 100000).toFixed(2)}L</h3>
                        </div>
                        <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                            <TrendingUp className="w-5 h-5" />
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm transition-all hover:shadow-md">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-sm font-medium text-slate-500">Pending Payments</p>
                            <h3 className="text-2xl font-bold text-red-600 mt-2">₹ {(stats?.pendingRevenue / 100000).toFixed(2)}L</h3>
                        </div>
                        <div className="p-2 bg-red-50 text-red-600 rounded-lg">
                            <CreditCard className="w-5 h-5" />
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm transition-all hover:shadow-md">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-sm font-medium text-slate-500">Completed Projects</p>
                            <h3 className="text-2xl font-bold text-slate-900 mt-2">{stats?.completedProjects}</h3>
                        </div>
                        <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
                            <Users className="w-5 h-5" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Monthly Revenue Chart Placeholder */}
                <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <h3 className="font-bold text-slate-900 mb-6">Revenue Trend</h3>
                    <div className="h-64 flex items-end justify-between gap-4 px-2">
                        {[35, 45, 30, 60, 75, 50, 65, 80, 70, 85, 90, 95].map((h, i) => (
                            <div key={i} className="w-full bg-slate-100 rounded-t-lg relative group">
                                <div className="absolute bottom-0 w-full bg-slate-900 rounded-t-lg transition-all duration-500 hover:bg-amber-500" style={{ height: `${h}%` }}></div>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-between mt-4 text-xs text-slate-400 font-medium uppercase">
                        <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span><span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span>
                    </div>
                </div>

                {/* Lead Stats */}
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6">
                    <h3 className="font-bold text-slate-900">Lead Pipeline</h3>
                    <div className="space-y-4">
                        <div>
                            <div className="flex justify-between text-sm mb-1">
                                <span className="text-slate-500">Total Enquiries</span>
                                <span className="font-bold text-slate-900">{stats?.totalEnquiries}</span>
                            </div>
                            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                                <div className="bg-blue-500 h-full rounded-full" style={{ width: '100%' }}></div>
                            </div>
                        </div>
                        {/* Other lead metrics would go here if we had more granular status data from API */}
                    </div>
                </div>
            </div>
        </div>
    );
}
