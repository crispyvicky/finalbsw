
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Quotation from '@/models/Quotation';

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await dbConnect();
        const { id } = await params;
        const quotation = await Quotation.findById(id).populate('clientId projectId');

        if (!quotation) {
            return NextResponse.json({ error: 'Quotation not found' }, { status: 404 });
        }

        return NextResponse.json(quotation);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch quotation' }, { status: 500 });
    }
}

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await dbConnect();
        const { id } = await params;
        const body = await request.json();
        const quotation = await Quotation.findByIdAndUpdate(id, body, { new: true });

        if (!quotation) {
            return NextResponse.json({ error: 'Quotation not found' }, { status: 404 });
        }

        return NextResponse.json(quotation);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update quotation' }, { status: 500 });
    }
}
