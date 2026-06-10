import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Enquiry from '@/models/Enquiry';
import { sendWhatsAppNotification } from '@/lib/whatsapp';
import { sendWelcomeEmail, sendAdminNotificationEmail } from '@/lib/email';

export async function GET() {
    try {
        await dbConnect();
        const enquiries = await Enquiry.find({}).sort({ createdAt: -1 });
        return NextResponse.json(enquiries);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch enquiries' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        await dbConnect();
        const body = await request.json();
        const enquiry = await Enquiry.create(body);

        // 1. Send Admin Notification Email (to bswinteriors11@gmail.com)
        try {
            await sendAdminNotificationEmail(body);
        } catch (error) {
            console.error('Admin email failed:', error);
        }

        // Send WhatsApp notification for Contact Page submissions
        if (body.source === 'Contact Page') {
            // 2. Send Welcome Email to Lead (if email provided)
            if (body.email) {
                try {
                    await sendWelcomeEmail(body.email, body.name);
                } catch (error) {
                    console.error('Welcome email failed:', error);
                }
            }
        }

        return NextResponse.json(enquiry, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create enquiry' }, { status: 500 });
    }
}
