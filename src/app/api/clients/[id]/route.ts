import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Client from '@/models/Client';

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        await dbConnect();
        const { id } = await params;
        const body = await request.json();
        const client = await Client.findByIdAndUpdate(id, body, { new: true });
        if (!client) return NextResponse.json({ error: 'Client not found' }, { status: 404 });
        return NextResponse.json(client);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update client' }, { status: 500 });
    }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        await dbConnect();
        const { id } = await params;
        const client = await Client.findByIdAndDelete(id);
        if (!client) return NextResponse.json({ error: 'Client not found' }, { status: 404 });
        return NextResponse.json({ message: 'Client deleted' });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete client' }, { status: 500 });
    }
}
