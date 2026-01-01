
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Enquiry from '@/models/Enquiry';
import Project from '@/models/Project';
import Invoice from '@/models/Invoice';

export async function GET() {
    await dbConnect();

    try {
        const totalEnquiries = await Enquiry.countDocuments({});

        const activeProjects = await Project.countDocuments({ status: 'In Progress' });
        const completedProjects = await Project.countDocuments({ status: 'Completed' });

        const invoices = await Invoice.find({});
        const totalRevenue = invoices
            .filter((inv: any) => inv.status === 'Paid')
            .reduce((acc: number, curr: any) => acc + curr.amount, 0);

        const pendingRevenue = invoices
            .filter((inv: any) => inv.status === 'Pending' || inv.status === 'Overdue')
            .reduce((acc: number, curr: any) => acc + curr.amount, 0);

        const recentEnquiries = await Enquiry.find({}).sort({ createdAt: -1 }).limit(5);

        return NextResponse.json({
            totalEnquiries,
            activeProjects,
            completedProjects,
            totalRevenue,
            pendingRevenue,
            recentEnquiries
        });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 });
    }
}
