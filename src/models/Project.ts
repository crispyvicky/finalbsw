import mongoose, { Schema, model, models } from 'mongoose';

const ProjectSchema = new Schema({
    name: { type: String, required: true },
    clientName: { type: String, required: true }, // Ideally this should be a reference, but keeping it simple as per original type
    cliendId: { type: Schema.Types.ObjectId, ref: 'Client' }, // Optional reference for future
    stage: {
        type: String,
        enum: ['Design', 'Approval', 'Execution', 'Handover'],
        default: 'Design'
    },
    progress: { type: Number, default: 0 },
    startDate: { type: String, required: true },
    endDate: String,
    budget: { type: Number, default: 0 }
}, { timestamps: true });

const Project = models.Project || model('Project', ProjectSchema);

export default Project;
