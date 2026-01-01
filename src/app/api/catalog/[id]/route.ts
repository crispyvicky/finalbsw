
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import CatalogItem from '@/models/CatalogItem';

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        await dbConnect();
        const { id } = await params;
        const body = await request.json();
        const item = await CatalogItem.findByIdAndUpdate(id, body, { new: true });
        if (!item) return NextResponse.json({ error: 'Item not found' }, { status: 404 });
        return NextResponse.json(item);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update item' }, { status: 500 });
    }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        await dbConnect();
        const { id } = await params;
        const item = await CatalogItem.findByIdAndDelete(id);
        if (!item) return NextResponse.json({ error: 'Item not found' }, { status: 404 });
        return NextResponse.json({ message: 'Item deleted' });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete item' }, { status: 500 });
    }
}
