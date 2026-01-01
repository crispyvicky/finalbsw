
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import CatalogItem from '@/models/CatalogItem';

export async function GET() {
    await dbConnect();
    try {
        const items = await CatalogItem.find({}).sort({ name: 1 });
        return NextResponse.json(items);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch catalog items' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        await dbConnect();
        const body = await request.json();
        const item = await CatalogItem.create(body);
        return NextResponse.json(item, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create catalog item' }, { status: 500 });
    }
}
