import mongoose, { Schema, model, models } from 'mongoose';

const EnquirySchema = new Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String },
    location: String,
    budget: String,
    source: {
        type: String,
        enum: ['Contact Page', 'Cost Estimator', 'Newsletter', 'Manual', 'Other'],
        default: 'Manual'
    },
    status: {
        type: String,
        enum: ['New', 'Follow-up', 'Converted', 'Lost'],
        default: 'New'
    },
    notes: String,
    estimateData: {
        type: Schema.Types.Mixed,
        default: null
    },
    date: { type: String, default: () => new Date().toISOString().split('T')[0] }
}, { timestamps: true });

const Enquiry = models.Enquiry || model('Enquiry', EnquirySchema);

export default Enquiry;
