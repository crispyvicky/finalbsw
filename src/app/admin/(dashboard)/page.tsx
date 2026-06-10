'use client';

import { useEffect, useState } from 'react';
import { Wallet, Users, FileText, CheckCircle2, Loader2, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboardPage() {
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

    const StatCards = [
        { name: 'Total Revenue', value: `₹ ${(stats?.totalRevenue / 100000).toFixed(2)}L`, change: 'Lifetime Collected', icon: Wallet, color: 'text-emerald-600', bg: 'bg-emerald-100' },
        { name: 'Pending Revenue', value: `₹ ${(stats?.pendingRevenue / 100000).toFixed(2)}L`, change: 'Unpaid Invoices', icon: CheckCircle2, color: 'text-red-600', bg: 'bg-red-100' },
        { name: 'Active Projects', value: stats?.activeProjects || 0, change: 'In Progress', icon: FileText, color: 'text-blue-600', bg: 'bg-blue-100' },
        { name: 'Lead Conversion', value: `${stats?.conversionRate || 0}%`, change: `From ${stats?.totalEnquiries || 0} Leads`, icon: Users, color: 'text-blue-600', bg: 'bg-blue-100' },
    ];

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-slate-900">Good Morning, Owner</h1>
                <p className="text-slate-500 mt-2">Here is what's happening in your business today.</p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {StatCards.map((stat) => (
                    <div key={stat.name} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-slate-500">{stat.name}</p>
                                <p className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</p>
                            </div>
                            <div className={`p-3 rounded-lg ${stat.bg} ${stat.color}`}>
                                <stat.icon className="w-6 h-6" />
                            </div>
                        </div>
                        <div className="mt-4 flex items-center text-sm">
                            <span className="font-medium text-slate-600">{stat.change}</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Main Content Area */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column (2/3) */}
                <div className="lg:col-span-2 space-y-8">

                    {/* Recent Enquiries Preview */}
                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                            <h3 className="font-semibold text-slate-900">Recent Enquiries</h3>
                            <Link href="/admin/enquiries" className="text-sm text-blue-600 font-medium hover:text-blue-700 flex items-center gap-1">
                                View All <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                        <div className="divide-y divide-slate-50">
                            {stats?.recentEnquiries?.length > 0 ? (
                                stats.recentEnquiries.map((enq: any) => (
                                    <div key={enq._id} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                                        <div>
                                            <p className="font-medium text-slate-900">{enq.name}</p>
                                            <p className="text-xs text-slate-500">{enq.phone}</p>
                                        </div>
                                        <span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-full">{enq.status}</span>
                                    </div>
                                ))
                            ) : (
                                <div className="p-8 text-center text-slate-500">No recent enquiries.</div>
                            )}
                        </div>
                    </div>

                    {/* Check Reports Prompt */}
                    <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-xl shadow-lg overflow-hidden text-white p-6 flex justify-between items-center">
                        <div>
                            <h3 className="font-bold text-lg">View Detailed Reports</h3>
                            <p className="text-slate-300 text-sm mt-1">Analyze revenue, project performance, and more.</p>
                        </div>
                        <Link href="/admin/reports" className="bg-white text-slate-900 px-4 py-2 rounded-lg font-medium hover:bg-slate-100 transition-colors">
                            Go to Reports
                        </Link>
                    </div>

                </div>

                {/* Right Column (1/3) */}
                <div className="space-y-8">

                    {/* Project Status Summary */}
                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                        <div className="p-6 border-b border-slate-100">
                            <h3 className="font-semibold text-slate-900">Project Overview</h3>
                        </div>
                        <div className="p-6 space-y-4">
                            <div className="flex justify-between items-center">
                                <span className="text-slate-600">Active</span>
                                <span className="font-bold text-slate-900 bg-blue-50 text-blue-700 px-2 py-1 rounded">{stats?.activeProjects}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-slate-600">Completed</span>
                                <span className="font-bold text-slate-900 bg-emerald-50 text-emerald-700 px-2 py-1 rounded">{stats?.completedProjects}</span>
                            </div>
                            <div className="pt-4 mt-2 border-t border-slate-50">
                                <Link href="/admin/projects" className="text-sm text-center block text-slate-500 hover:text-slate-700">
                                    Manage Projects
                                </Link>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
