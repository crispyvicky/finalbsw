import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Invoice from '@/models/Invoice';
import Client from '@/models/Client';

export async function GET(request: Request) {
    try {
        await dbConnect();
        const { searchParams } = new URL(request.url);
        const clientId = searchParams.get('clientId');

        const query = clientId ? { clientId } : {};
        const invoices = await Invoice.find(query)
            .populate('clientId')
            .sort({ createdAt: -1 });
        return NextResponse.json(invoices);
    } catch (error) {
        console.error('Failed to fetch invoices:', error);
        return NextResponse.json({ error: 'Failed to fetch invoices' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        await dbConnect();
        const body = await request.json();

        // Generate invoice number if not provided
        if (!body.invoiceNumber) {
            const year = new Date().getFullYear();
            const count = await Invoice.countDocuments();
            body.invoiceNumber = `INV-${year}-${String(count + 1).padStart(4, '0')}`;
        }

        // If clientId is provided, fetch client details
        if (body.clientId) {
            const client = await Client.findById(body.clientId);
            if (client) {
                body.clientName = client.name;
                body.clientPhone = client.phone;
                body.clientEmail = client.email;
                body.clientAddress = client.address;
            }
        }

        // Initialize amountPaid and payments array
        body.amountPaid = 0;
        body.payments = [];

        const invoice = await Invoice.create(body);
        return NextResponse.json(invoice, { status: 201 });
    } catch (error) {
        console.error('Failed to create invoice:', error);
        return NextResponse.json({ error: 'Failed to create invoice' }, { status: 500 });
    }
}
