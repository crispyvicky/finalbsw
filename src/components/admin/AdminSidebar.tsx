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
    LogOut,
    Book
} from 'lucide-react';
import { logout } from '@/lib/adminAuth';
import { useRouter } from 'next/navigation';

const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/admin' },
    { icon: Contact, label: 'Enquiries & Leads', href: '/admin/enquiries' },
    { icon: Users, label: 'Clients', href: '/admin/clients' },
    { icon: Briefcase, label: 'Projects', href: '/admin/projects' },
    // { icon: FileImage, label: 'Designs & Files', href: '/admin/designs' },
    { icon: FileText, label: 'Quotations', href: '/admin/quotations' },
    // { icon: Book, label: 'Master Catalog', href: '/admin/catalog' },
    { icon: CreditCard, label: 'Payments', href: '/admin/payments' },
    // { icon: CheckSquare, label: 'Tasks', href: '/admin/tasks' },
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
        <aside className="h-screen w-64 bg-[#1a1a1a] text-white flex flex-col transition-all duration-300 shadow-2xl border-r border-white/5 lg:fixed lg:left-0 lg:top-0 lg:z-50">
            {/* Header */}
            <div className="p-8 pb-6 border-b border-white/5">
                <div className="mb-1">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-[#D4AF37]/80">Admin Panel</span>
                </div>
                <h1 className="text-2xl font-heading-02 font-bold tracking-tight text-white">
                    BSW
                </h1>
                <p className="text-xs text-white/40 font-light mt-1 tracking-wide">Interior Management System</p>
            </div>

            {/* Nav */}
            <nav className="flex-1 overflow-y-auto py-6 px-4">
                <ul className="space-y-1.5">
                    {menuItems.map((item) => {
                        const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
                        // Fix for dashboard exact match since other routes start with /admin
                        const isDashboard = item.href === '/admin';
                        const active = isDashboard ? pathname === '/admin' : isActive;

                        return (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    className={cn(
                                        "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 group relative overflow-hidden",
                                        active
                                            ? "bg-[#D4AF37] text-black shadow-lg shadow-[#D4AF37]/20"
                                            : "text-white/60 hover:text-white hover:bg-white/5"
                                    )}
                                >
                                    <item.icon className={cn("w-4 h-4 transition-transform group-hover:scale-110", active ? "scale-110" : "")} strokeWidth={2} />
                                    <span className="tracking-wide">{item.label}</span>

                                    {active && (
                                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white/20 rounded-l-full" />
                                    )}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>

            {/* Footer */}
            <div className="p-6 border-t border-white/5 bg-black/20">
                <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all group"
                >
                    <LogOut className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    Logout
                </button>
            </div>
        </aside>
    );
}
