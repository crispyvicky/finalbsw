import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Enquiry from '@/models/Enquiry';

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
        return NextResponse.json(enquiry, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create enquiry' }, { status: 500 });
    }
}
