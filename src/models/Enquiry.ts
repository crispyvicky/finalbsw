import mongoose, { Schema, model, models } from 'mongoose';

const EnquirySchema = new Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true },
    location: String,
    budget: String,
    status: {
        type: String,
        enum: ['New', 'Follow-up', 'Converted', 'Lost'],
        default: 'New'
    },
    notes: String,
    date: { type: String, default: () => new Date().toISOString().split('T')[0] }
}, { timestamps: true });

const Enquiry = models.Enquiry || model('Enquiry', EnquirySchema);

export default Enquiry;
