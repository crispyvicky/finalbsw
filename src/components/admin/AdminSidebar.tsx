'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
    LayoutDashboard,
    Users,
    Contact,
    Briefcase,
    FileImage,
    FileText,
    CreditCard,
    CheckSquare,
    BarChart3,
    Settings,
    LogOut
} from 'lucide-react';
import { logout } from '@/lib/adminAuth';
import { useRouter } from 'next/navigation';

const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/admin' },
    { icon: Contact, label: 'Enquiries & Leads', href: '/admin/enquiries' },
    { icon: Users, label: 'Clients', href: '/admin/clients' },
    { icon: Briefcase, label: 'Projects', href: '/admin/projects' },
    { icon: FileImage, label: 'Designs & Files', href: '/admin/designs' },
    { icon: FileText, label: 'Quotations', href: '/admin/quotations' },
    { icon: CreditCard, label: 'Payments', href: '/admin/payments' },
    { icon: CheckSquare, label: 'Tasks', href: '/admin/tasks' },
    { icon: BarChart3, label: 'Reports', href: '/admin/reports' },
    { icon: Settings, label: 'Settings', href: '/admin/settings' },
];

export function AdminSidebar() {
    const pathname = usePathname();
    const router = useRouter();

    const handleLogout = () => {
        logout();
        router.push('/admin/login');
    };

    return (
        <aside className="fixed left-0 top-0 h-screen w-64 bg-slate-900 text-white flex flex-col z-50 transition-all duration-300">
            <div className="p-6 border-b border-slate-800">
                <h1 className="text-2xl font-bold tracking-tight text-amber-500">BSW Admin</h1>
                <p className="text-xs text-slate-400 mt-1">Interior Management</p>
            </div>

            <nav className="flex-1 overflow-y-auto py-4">
                <ul className="space-y-1 px-3">
                    {menuItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    className={cn(
                                        "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                                        isActive
                                            ? "bg-amber-500/10 text-amber-500"
                                            : "text-slate-400 hover:text-white hover:bg-slate-800"
                                    )}
                                >
                                    <item.icon className="w-5 h-5" />
                                    {item.label}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>

            <div className="p-4 border-t border-slate-800">
                <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-400 hover:bg-red-400/10 hover:text-red-300 transition-colors"
                >
                    <LogOut className="w-5 h-5" />
                    Logout
                </button>
            </div>
        </aside>
    );
}
