import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Task from '@/models/Task';

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        await dbConnect();
        const { id } = await params;
        const body = await request.json();
        const task = await Task.findByIdAndUpdate(id, body, { new: true });
        if (!task) return NextResponse.json({ error: 'Task not found' }, { status: 404 });
        return NextResponse.json(task);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update task' }, { status: 500 });
    }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        await dbConnect();
        const { id } = await params;
        const task = await Task.findByIdAndDelete(id);
        if (!task) return NextResponse.json({ error: 'Task not found' }, { status: 404 });
        return NextResponse.json({ message: 'Task deleted' });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete task' }, { status: 500 });
    }
}
