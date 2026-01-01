import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Design from '@/models/Design';

export async function GET() {
    try {
        await dbConnect();
        const designs = await Design.find({}).sort({ createdAt: -1 });
        return NextResponse.json(designs);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch designs' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        await dbConnect();

        const formData = await request.formData();
        const file = formData.get('file') as File | null;
        const name = formData.get('name') as string;
        const description = formData.get('description') as string;
        const category = formData.get('category') as string;

        let imageUrl = '';

        if (file) {
            const { uploadToCloudinary } = await import('@/lib/cloudinary');
            const uploadResult = await uploadToCloudinary(file);
            imageUrl = uploadResult.secure_url;
        }

        const design = await Design.create({
            name,
            description,
            imageUrl,
            category,
            status: 'Draft', // Default status
            approvalStatus: 'Pending'
        });

        return NextResponse.json(design, { status: 201 });
    } catch (error) {
        console.error('Upload error:', error);
        return NextResponse.json({ error: 'Failed to upload design' }, { status: 500 });
    }
}
