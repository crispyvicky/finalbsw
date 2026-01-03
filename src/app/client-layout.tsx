'use client';

import { MainHeaderSection } from "../screens/HomeV/sections/MainHeaderSection/MainHeaderSection";
import { ContactFooterSection } from "../screens/HomeV/sections/ContactFooterSection/ContactFooterSection";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { usePathname } from "next/navigation";

export default function ClientLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const isAdminRoute = pathname?.startsWith('/admin');

    return (
        <>
            <CustomCursor />
            {isAdminRoute ? (
                // Admin routes - no header/footer
                children
            ) : (
                // Public routes - with header/footer
                <div className="flex flex-col min-h-screen">
                    <MainHeaderSection />
                    <main className="flex-grow">
                        {children}
                    </main>
                    <ContactFooterSection />
                </div>
            )}
        </>
    );
}
