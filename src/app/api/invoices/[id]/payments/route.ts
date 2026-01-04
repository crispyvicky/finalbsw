import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Invoice from '@/models/Invoice';

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        await dbConnect();
        const { id } = await params;
        const body = await request.json();

        // Validate payment amount
        const invoice = await Invoice.findById(id);
        if (!invoice) {
            return NextResponse.json({ error: 'Invoice not found' }, { status: 404 });
        }

        const remainingBalance = invoice.totalAmount - invoice.discount - invoice.amountPaid;
        if (body.amount > remainingBalance) {
            return NextResponse.json({
                error: 'Payment amount cannot exceed remaining balance',
                remainingBalance
            }, { status: 400 });
        }

        // Add payment to payments array
        invoice.payments.push({
            amount: body.amount,
            date: body.date || new Date(),
            method: body.method || 'Cash',
            reference: body.reference || '',
            notes: body.notes || '',
            recordedBy: body.recordedBy || 'Admin'
        });

        // Update amountPaid
        invoice.amountPaid += body.amount;

        // Save (will trigger pre-save middleware to recalculate balance and status)
        await invoice.save();

        return NextResponse.json(invoice, { status: 201 });
    } catch (error) {
        console.error('Failed to add payment:', error);
        return NextResponse.json({ error: 'Failed to add payment' }, { status: 500 });
    }
}

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        await dbConnect();
        const { id } = await params;
        const invoice = await Invoice.findById(id);
        if (!invoice) {
            return NextResponse.json({ error: 'Invoice not found' }, { status: 404 });
        }
        return NextResponse.json(invoice.payments);
    } catch (error) {
        console.error('Failed to fetch payments:', error);
        return NextResponse.json({ error: 'Failed to fetch payments' }, { status: 500 });
    }
}
