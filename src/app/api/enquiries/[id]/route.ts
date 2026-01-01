import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Enquiry from '@/models/Enquiry';

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        await dbConnect();
        const { id } = await params;
        const body = await request.json();
        const enquiry = await Enquiry.findByIdAndUpdate(id, body, { new: true });
        if (!enquiry) return NextResponse.json({ error: 'Enquiry not found' }, { status: 404 });
        return NextResponse.json(enquiry);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update enquiry' }, { status: 500 });
    }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        await dbConnect();
        const { id } = await params;
        const enquiry = await Enquiry.findByIdAndDelete(id);
        if (!enquiry) return NextResponse.json({ error: 'Enquiry not found' }, { status: 404 });
        return NextResponse.json({ message: 'Enquiry deleted' });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete enquiry' }, { status: 500 });
    }
}
