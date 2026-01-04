
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Enquiry from '@/models/Enquiry';
import Project from '@/models/Project';
import Invoice from '@/models/Invoice';

export async function GET() {
    await dbConnect();

    try {
        const totalEnquiries = await Enquiry.countDocuments({});
        const convertedEnquiries = await Enquiry.countDocuments({ status: 'Converted' });

        const activeProjects = await Project.countDocuments({ stage: { $ne: 'Handover' } });
        const completedProjects = await Project.countDocuments({ stage: 'Handover' });

        const invoices = await Invoice.find({});

        // Accurate calculations based on New Invoice Model
        const totalRevenue = invoices.reduce((acc: number, curr: any) => acc + (curr.amountPaid || 0), 0);
        const pendingRevenue = invoices.reduce((acc: number, curr: any) => acc + (curr.balance || 0), 0);

        const recentEnquiries = await Enquiry.find({}).sort({ createdAt: -1 }).limit(5);

        // Calculate Lead Conversion %
        const conversionRate = totalEnquiries > 0 ? ((convertedEnquiries / totalEnquiries) * 100).toFixed(1) : 0;

        // Revenue Trend (Current Year)
        const revenueTrend = new Array(12).fill(0);
        const currentYear = new Date().getFullYear();

        invoices.forEach((inv: any) => {
            if (inv.payments && inv.payments.length > 0) {
                inv.payments.forEach((pay: any) => {
                    const payDate = new Date(pay.date);
                    if (payDate.getFullYear() === currentYear) {
                        revenueTrend[payDate.getMonth()] += pay.amount;
                    }
                });
            }
        });

        // Lead Pipeline Stats
        const pipeline = {
            New: await Enquiry.countDocuments({ status: 'New' }),
            FollowUp: await Enquiry.countDocuments({ status: 'Follow-up' }),
            Converted: convertedEnquiries,
            Lost: await Enquiry.countDocuments({ status: 'Lost' })
        };

        return NextResponse.json({
            totalEnquiries,
            conversionRate,
            activeProjects,
            completedProjects,
            totalRevenue,
            pendingRevenue,
            recentEnquiries,
            revenueTrend,
            pipeline
        });
    } catch (error) {
        console.error('Stats Error:', error);
        return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 });
    }
}
