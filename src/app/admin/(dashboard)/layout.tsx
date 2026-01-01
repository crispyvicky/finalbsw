'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { checkAuth } from '@/lib/adminAuth';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function AdminDashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const pathname = usePathname();
    const [authorized, setAuthorized] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    useEffect(() => {
        const isAuth = checkAuth();
        if (!isAuth) {
            router.push('/admin/login');
        } else {
            setAuthorized(true);
        }
    }, [router, pathname]);

    // Close sidebar on route change on mobile
    useEffect(() => {
        setSidebarOpen(false);
    }, [pathname]);

    if (!authorized) {
        return null; // Or a loading spinner
    }

    return (
        <div className="min-h-screen bg-slate-50 relative">
            {/* Mobile Sidebar Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <div
                className={cn(
                    "fixed inset-y-0 left-0 z-50 transform lg:transform-none lg:static transition-transform duration-300 ease-in-out",
                    sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
                )}
            >
                <AdminSidebar />
            </div>

            {/* Main Content */}
            <div className="lg:pl-64 min-h-screen flex flex-col transition-all duration-300">
                {/* Mobile Header */}
                <header className="h-16 bg-white border-b border-slate-200 lg:hidden flex items-center px-4 sticky top-0 z-30">
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg"
                    >
                        <Menu className="w-6 h-6" />
                    </button>
                    <span className="ml-4 font-semibold text-slate-800">Admin Dashboard</span>
                </header>

                {/* Page Content */}
                <main className="flex-1 p-4 lg:p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
