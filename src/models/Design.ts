import mongoose, { Schema, model, models } from 'mongoose';

const DesignSchema = new Schema({
    name: { type: String, required: true },
    projectName: { type: String, required: true },
    type: {
        type: String,
        enum: ['2D', '3D', 'PDF'],
        required: true
    },
    version: { type: String, default: 'v1' },
    size: String,
    url: String, // In a real app, this would be the S3/Cloudinary URL
    uploadedBy: { type: String, default: 'Admin' },
    date: { type: String, default: () => new Date().toISOString().split('T')[0] },
    status: {
        type: String,
        enum: ['Approved', 'Pending', 'Rejected'],
        default: 'Pending'
    }
}, { timestamps: true });

const Design = models.Design || model('Design', DesignSchema);

export default Design;
