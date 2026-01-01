import mongoose, { Schema, model, models } from 'mongoose';

const InvoiceSchema = new Schema({
    invoiceNumber: { type: String, required: true, unique: true },
    clientName: { type: String, required: true },
    projectName: { type: String, required: true },
    amount: { type: Number, required: true },
    date: { type: String, required: true },
    dueDate: { type: String, required: true },
    status: {
        type: String,
        enum: ['Paid', 'Pending', 'Overdue'],
        default: 'Pending'
    }
}, { timestamps: true });

const Invoice = models.Invoice || model('Invoice', InvoiceSchema);

export default Invoice;
