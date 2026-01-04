import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Quotation from '@/models/Quotation';

export async function GET(request: Request) {
    try {
        await dbConnect();
        const { searchParams } = new URL(request.url);
        const clientId = searchParams.get('clientId');

        const query = clientId ? { clientId } : {};
        const quotations = await Quotation.find(query).sort({ createdAt: -1 });

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
        // Generate Sequential Quote Number based on last created
        const lastQuote = await Quotation.findOne({}, { quoteNumber: 1 }).sort({ createdAt: -1 });
        let nextNum = 1;

        if (lastQuote && lastQuote.quoteNumber) {
            const parts = lastQuote.quoteNumber.split('-');
            const lastSeq = parseInt(parts[parts.length - 1]);
            if (!isNaN(lastSeq)) {
                nextNum = lastSeq + 1;
            }
        }

        body.quoteNumber = `II-${String(nextNum).padStart(3, '0')}`; // II-001, II-002...

        // Set defaults for required fields
        if (body.totalAmount === undefined) body.totalAmount = 0;
        if (body.finalAmount === undefined) body.finalAmount = 0;
        if (body.items === undefined) body.items = 0;

        // Sanitize clientId: If null/empty, remove it so Mongoose validation doesn't fail on casting
        if (!body.clientId || body.clientId === '') {
            delete body.clientId;
        }

        const quotation = await Quotation.create(body);
        return NextResponse.json(quotation, { status: 201 });
    } catch (error) {
        console.error('Error creating quotation:', error); // Added detailed logging
        return NextResponse.json({ error: 'Failed to create quotation', details: (error as Error).message }, { status: 500 });
    }
}
