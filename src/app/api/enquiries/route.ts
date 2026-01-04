import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Enquiry from '@/models/Enquiry';
import { sendWhatsAppNotification } from '@/lib/whatsapp';
import { sendWelcomeEmail } from '@/lib/email';

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

        // Send WhatsApp notification for Contact Page submissions
        if (body.source === 'Contact Page') {
            // 2. Send Welcome Email to Lead (if email provided)
            if (body.email) {
                // Must await email sending in Vercel/Serverless environment
                // otherwise execution stops immediately after response is returned
                try {
                    await sendWelcomeEmail(body.email, body.name);
                } catch (error) {
                    console.error('Welcome email failed:', error);
                    // Don't fail the request if email fails, just log it
                }
            }
        }

        return NextResponse.json(enquiry, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create enquiry' }, { status: 500 });
    }
}
