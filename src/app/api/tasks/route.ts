import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Task from '@/models/Task';

export async function GET() {
    try {
        await dbConnect();
        const tasks = await Task.find({}).sort({ createdAt: -1 });
        return NextResponse.json(tasks);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch tasks' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        await dbConnect();
        const body = await request.json();
        const task = await Task.create(body);
        return NextResponse.json(task, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create task' }, { status: 500 });
    }
}
