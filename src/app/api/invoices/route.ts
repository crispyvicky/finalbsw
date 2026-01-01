import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Invoice from '@/models/Invoice';

export async function GET() {
    try {
        await dbConnect();
        const invoices = await Invoice.find({}).sort({ createdAt: -1 });
        return NextResponse.json(invoices);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch invoices' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        await dbConnect();
        const body = await request.json();
        if (!body.invoiceNumber) {
            body.invoiceNumber = `INV-${Date.now()}`;
        }
        const invoice = await Invoice.create(body);
        return NextResponse.json(invoice, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create invoice' }, { status: 500 });
    }
}
