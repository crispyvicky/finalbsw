'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
    ArrowLeft, User, Phone, Mail, MapPin,
    FileText, CreditCard, Plus, Loader2,
    CheckCircle, Clock, AlertCircle, ChevronRight
} from 'lucide-react';
import Link from 'next/link';

interface Client {
    _id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    createdAt: string;
}

interface Quotation {
    _id: string;
    quoteNumber: string;
    projectName: string;
    finalAmount: number;
    totalAmount: number;
    status: string;
    date: string;
}

interface Invoice {
    _id: string;
    invoiceNumber: string;
    projectName: string;
    totalAmount: number;
    amountPaid: number;
    balance: number;
    status: string;
    date: string;
    dueDate: string;
}

export default function ClientDetailPage() {
    const params = useParams();
    const router = useRouter();
    const [client, setClient] = useState<Client | null>(null);
    const [quotations, setQuotations] = useState<Quotation[]>([]);
    const [invoices, setInvoices] = useState<Invoice[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<'overview' | 'quotations' | 'invoices'>('overview');

    useEffect(() => {
        if (params.id) {
            fetchClientData();
        }
    }, [params.id]);

    const fetchClientData = async () => {
        setLoading(true);
        try {
            // Fetch Client Profile
            const clientRes = await fetch(`/api/clients/${params.id}`);
            if (clientRes.ok) {
                setClient(await clientRes.json());
            }

            // Fetch Related Quotations
            const quotesRes = await fetch(`/api/quotations?clientId=${params.id}`);
            if (quotesRes.ok) {
                setQuotations(await quotesRes.json());
            }

            // Fetch Related Invoices
            const invoicesRes = await fetch(`/api/invoices?clientId=${params.id}`);
            if (invoicesRes.ok) {
                setInvoices(await invoicesRes.json());
            }

        } catch (error) {
            console.error('Failed to fetch client data', error);
        } finally {
            setLoading(false);
        }
    };

    const getFinancialStats = () => {
        const totalQuoted = quotations.reduce((acc, curr) => acc + (curr.finalAmount || curr.totalAmount), 0);
        const totalBilled = invoices.reduce((acc, curr) => acc + curr.totalAmount, 0);
        const totalPaid = invoices.reduce((acc, curr) => acc + curr.amountPaid, 0);
        const totalDue = invoices.reduce((acc, curr) => acc + curr.balance, 0);

        return { totalQuoted, totalBilled, totalPaid, totalDue };
    };

    const stats = getFinancialStats();

    if (loading) return <div className="flex h-screen items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-slate-400" /></div>;
    if (!client) return <div className="text-center p-8">Client not found</div>;

    return (
        <div className="space-y-6 pb-12">
            {/* Header */}
            <div>
                <button
                    onClick={() => router.push('/admin/clients')}
                    className="flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-4 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" /> Back to Clients
                </button>
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 md:p-8">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                        <div className="flex items-center gap-6">
                            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center text-slate-400">
                                <User className="w-10 h-10" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold text-slate-900">{client.name}</h1>
                                <div className="flex flex-wrap gap-4 mt-2 text-slate-500 text-sm">
                                    <div className="flex items-center gap-1">
                                        <Phone className="w-4 h-4" /> {client.phone}
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Mail className="w-4 h-4" /> {client.email}
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <MapPin className="w-4 h-4" /> {client.address}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <Link href={`/admin/quotations/create?clientId=${client._id}`} className="px-4 py-2 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 flex items-center gap-2">
                                <Plus className="w-4 h-4" /> New Quote
                            </Link>
                            {/* In simpler version we just link to generic create, ideally pre-fill */}
                            <Link href={`/admin/invoices/create?clientId=${client._id}`} className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-50 flex items-center gap-2">
                                <CreditCard className="w-4 h-4" /> New Invoice
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Financial Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Quoted</p>
                    <p className="text-2xl font-bold text-slate-900 mt-2">₹ {stats.totalQuoted.toLocaleString('en-IN')}</p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Invoiced</p>
                    <p className="text-2xl font-bold text-blue-600 mt-2">₹ {stats.totalBilled.toLocaleString('en-IN')}</p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Payment Received</p>
                    <p className="text-2xl font-bold text-emerald-600 mt-2">₹ {stats.totalPaid.toLocaleString('en-IN')}</p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Balance Due</p>
                    <p className="text-2xl font-bold text-red-600 mt-2">₹ {stats.totalDue.toLocaleString('en-IN')}</p>
                </div>
            </div>

            {/* Tabs & Content */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm min-h-[400px]">
                <div className="border-b border-slate-200 ">
                    <nav className="flex px-6 gap-6">
                        <button
                            onClick={() => setActiveTab('overview')}
                            className={`py-4 font-medium text-sm border-b-2 transition-colors ${activeTab === 'overview' ? 'border-slate-900 text-slate-900' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
                        >
                            Overview
                        </button>
                        <button
                            onClick={() => setActiveTab('quotations')}
                            className={`py-4 font-medium text-sm border-b-2 transition-colors ${activeTab === 'quotations' ? 'border-slate-900 text-slate-900' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
                        >
                            Quotations ({quotations.length})
                        </button>
                        <button
                            onClick={() => setActiveTab('invoices')}
                            className={`py-4 font-medium text-sm border-b-2 transition-colors ${activeTab === 'invoices' ? 'border-slate-900 text-slate-900' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
                        >
                            Invoices ({invoices.length})
                        </button>
                    </nav>
                </div>

                <div className="p-6">
                    {activeTab === 'overview' && (
                        <div className="space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <h3 className="text-lg font-bold text-slate-900 mb-4">Recent Activity</h3>
                                    {quotations.length === 0 && invoices.length === 0 ? (
                                        <p className="text-slate-500 italic">No activity recorded yet.</p>
                                    ) : (
                                        <div className="space-y-4">
                                            {/* Show mix of recent quotes/invoices */}
                                            {invoices.slice(0, 3).map(inv => (
                                                <Link key={inv._id} href={`/admin/payments/${inv._id}`} className="flex items-center p-3 bg-slate-50 rounded-lg border border-slate-100 hover:bg-slate-100 transition-colors">
                                                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-4">
                                                        <CreditCard className="w-5 h-5" />
                                                    </div>
                                                    <div className="flex-1">
                                                        <p className="text-sm font-bold text-slate-900">Invoiced {inv.invoiceNumber}</p>
                                                        <p className="text-xs text-slate-500">{new Date(inv.date).toLocaleDateString()}</p>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="text-sm font-bold text-slate-900">₹ {inv.totalAmount.toLocaleString('en-IN')}</p>
                                                        <p className="text-xs text-slate-500">{inv.status}</p>
                                                    </div>
                                                </Link>
                                            ))}
                                            {quotations.slice(0, 3).map(quote => (
                                                <Link key={quote._id} href={`/admin/quotations/${quote._id}/print`} className="flex items-center p-3 bg-slate-50 rounded-lg border border-slate-100 hover:bg-slate-100 transition-colors">
                                                    <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 mr-4">
                                                        <FileText className="w-5 h-5" />
                                                    </div>
                                                    <div className="flex-1">
                                                        <p className="text-sm font-bold text-slate-900">Quoted {quote.quoteNumber}</p>
                                                        <p className="text-xs text-slate-500">{new Date(quote.date).toLocaleDateString()}</p>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="text-sm font-bold text-slate-900">₹ {(quote.finalAmount || quote.totalAmount).toLocaleString('en-IN')}</p>
                                                        <p className="text-xs text-slate-500">{quote.status}</p>
                                                    </div>
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                <div className="bg-slate-50 rounded-xl p-6 border border-slate-100">
                                    <h3 className="text-lg font-bold text-slate-900 mb-4">Quick Actions</h3>
                                    <div className="space-y-3">
                                        <Link href={`/admin/quotations/create?clientId=${client._id}`} className="block w-full text-left p-4 bg-white border border-slate-200 rounded-lg hover:border-slate-900 hover:shadow-sm transition-all group">
                                            <div className="flex justify-between items-center">
                                                <div>
                                                    <p className="font-bold text-slate-900">Create New Estimate</p>
                                                    <p className="text-xs text-slate-500">Draft a new proposal for {client.name}</p>
                                                </div>
                                                <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-slate-900" />
                                            </div>
                                        </Link>
                                        <Link href={`/admin/invoices/create?clientId=${client._id}`} className="block w-full text-left p-4 bg-white border border-slate-200 rounded-lg hover:border-slate-900 hover:shadow-sm transition-all group">
                                            <div className="flex justify-between items-center">
                                                <div>
                                                    <p className="font-bold text-slate-900">Draft New Invoice</p>
                                                    <p className="text-xs text-slate-500">Bill {client.name} for work done</p>
                                                </div>
                                                <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-slate-900" />
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'quotations' && (
                        <div className="space-y-4">
                            {quotations.length === 0 ? (
                                <div className="text-center py-12 bg-slate-50 rounded-lg border border-dashed border-slate-300">
                                    <FileText className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                                    <h3 className="text-slate-900 font-medium">No Quotations Found</h3>
                                    <p className="text-slate-500 text-sm mb-4">Create the first estimate for this client.</p>
                                    <Link href={`/admin/quotations/create?clientId=${client._id}`} className="px-4 py-2 bg-slate-900 text-white rounded-lg text-sm font-medium hover:bg-slate-800">
                                        Create Quotation
                                    </Link>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 gap-4">
                                    {quotations.map(quote => (
                                        <div key={quote._id} className="flex items-center justify-between p-4 bg-white border border-slate-100 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 bg-amber-50 rounded-lg flex items-center justify-center text-amber-600">
                                                    <FileText className="w-5 h-5" />
                                                </div>
                                                <div>
                                                    <h3 className="font-bold text-slate-900">{quote.projectName}</h3>
                                                    <p className="text-xs text-slate-500">{quote.quoteNumber} • {new Date(quote.date).toLocaleDateString()}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-6">
                                                <div className="text-right">
                                                    <p className="font-mono font-bold text-slate-900">₹ {(quote.finalAmount || quote.totalAmount).toLocaleString('en-IN')}</p>
                                                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${quote.status === 'Approved' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'
                                                        }`}>{quote.status}</span>
                                                </div>
                                                <Link href={`/admin/quotations/${quote._id}/print`} className="p-2 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-900">
                                                    <ChevronRight className="w-5 h-5" />
                                                </Link>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === 'invoices' && (
                        <div className="space-y-4">
                            {invoices.length === 0 ? (
                                <div className="text-center py-12 bg-slate-50 rounded-lg border border-dashed border-slate-300">
                                    <CreditCard className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                                    <h3 className="text-slate-900 font-medium">No Invoices Found</h3>
                                    <p className="text-slate-500 text-sm mb-4">Create an invoice from an existing quotation or start fresh.</p>
                                    <Link href={`/admin/invoices/create?clientId=${client._id}`} className="px-4 py-2 bg-slate-900 text-white rounded-lg text-sm font-medium hover:bg-slate-800">
                                        Create Invoice
                                    </Link>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 gap-4">
                                    {invoices.map(inv => (
                                        <div key={inv._id} className="flex items-center justify-between p-4 bg-white border border-slate-100 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600">
                                                    <CreditCard className="w-5 h-5" />
                                                </div>
                                                <div>
                                                    <h3 className="font-bold text-slate-900">{inv.projectName}</h3>
                                                    <p className="text-xs text-slate-500">{inv.invoiceNumber} • Due {new Date(inv.dueDate).toLocaleDateString()}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-6">
                                                <div className="text-right">
                                                    <p className="font-mono font-bold text-slate-900">₹ {inv.totalAmount.toLocaleString('en-IN')}</p>
                                                    <div className="flex items-center gap-1 justify-end">
                                                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${inv.status === 'Paid' ? 'bg-emerald-100 text-emerald-700' :
                                                                inv.status === 'Overdue' ? 'bg-red-100 text-red-700' :
                                                                    'bg-amber-100 text-amber-700'
                                                            }`}>{inv.status}</span>
                                                        {inv.balance > 0 && <span className="text-xs text-red-500 font-bold">Due: ₹{inv.balance.toLocaleString('en-IN')}</span>}
                                                    </div>
                                                </div>
                                                <Link href={`/admin/payments/${inv._id}`} className="p-2 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-900">
                                                    <ChevronRight className="w-5 h-5" />
                                                </Link>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
