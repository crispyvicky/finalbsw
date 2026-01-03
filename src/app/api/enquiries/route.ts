import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Enquiry from '@/models/Enquiry';
import { sendWhatsAppNotification } from '@/lib/whatsapp';

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
            sendWhatsAppNotification({
                name: body.name,
                phone: body.phone,
                email: body.email,
                source: body.source,
                notes: body.notes,
                budget: body.budget,
            }).catch(err => console.error('WhatsApp notification failed:', err));
        }

        return NextResponse.json(enquiry, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create enquiry' }, { status: 500 });
    }
}
