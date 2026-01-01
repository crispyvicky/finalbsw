import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Design from '@/models/Design';

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        await dbConnect();
        const { id } = await params;
        const body = await request.json();
        const design = await Design.findByIdAndUpdate(id, body, { new: true });
        if (!design) return NextResponse.json({ error: 'Design not found' }, { status: 404 });
        return NextResponse.json(design);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update design' }, { status: 500 });
    }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        await dbConnect();
        const { id } = await params;
        const design = await Design.findByIdAndDelete(id);
        if (!design) return NextResponse.json({ error: 'Design not found' }, { status: 404 });
        return NextResponse.json({ message: 'Design deleted' });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete design' }, { status: 500 });
    }
}
