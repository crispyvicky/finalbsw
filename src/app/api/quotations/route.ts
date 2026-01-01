import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Quotation from '@/models/Quotation';

export async function GET() {
    try {
        await dbConnect();
        const quotations = await Quotation.find({}).sort({ createdAt: -1 });
        return NextResponse.json(quotations);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch quotations' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        await dbConnect();
        const body = await request.json();
        // Simple mock quote ID generation if not provided, though schema requires it.
        // In real app, might want auto-increment or UUID.
        // Generate Sequential Quote Number
        const count = await Quotation.countDocuments();
        const nextNum = count + 1;
        body.quoteNumber = `II-${String(nextNum).padStart(3, '0')}`; // II-001, II-002...
        const quotation = await Quotation.create(body);
        return NextResponse.json(quotation, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create quotation' }, { status: 500 });
    }
}
