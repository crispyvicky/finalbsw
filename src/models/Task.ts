import mongoose, { Schema, model, models } from 'mongoose';

const TaskSchema = new Schema({
    title: { type: String, required: true },
    assignee: { type: String, default: 'Unassigned' },
    status: {
        type: String,
        enum: ['Pending', 'Done'],
        default: 'Pending'
    },
    dueDate: String
}, { timestamps: true });

const Task = models.Task || model('Task', TaskSchema);

export default Task;
