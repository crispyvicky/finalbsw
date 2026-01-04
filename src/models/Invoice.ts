import mongoose, { Schema, model, models } from 'mongoose';

const PaymentSchema = new Schema({
    amount: { type: Number, required: true },
    date: { type: Date, required: true, default: Date.now },
    method: {
        type: String,
        enum: ['Cash', 'UPI', 'Bank Transfer', 'Cheque', 'Card', 'Other'],
        default: 'Cash'
    },
    reference: { type: String }, // Transaction ID, Cheque number, etc.
    notes: { type: String },
    recordedBy: { type: String, default: 'Admin' },
}, { timestamps: true });

const InvoiceSchema = new Schema({
    invoiceNumber: { type: String, required: true, unique: true },
    clientId: { type: Schema.Types.ObjectId, ref: 'Client' },
    clientName: { type: String, required: true },
    clientPhone: { type: String },
    clientEmail: { type: String },
    clientAddress: { type: String },
    projectName: { type: String, required: true },
    description: { type: String }, // Invoice notes/description

    // Financial fields
    totalAmount: { type: Number, required: true }, // Original invoice amount
    discount: { type: Number, default: 0 }, // Discount amount
    amountPaid: { type: Number, default: 0 }, // Sum of all payments
    balance: { type: Number }, // Calculated: totalAmount - discount - amountPaid

    // Dates
    date: { type: Date, required: true, default: Date.now },
    dueDate: { type: Date, required: true },

    // Payment tracking
    payments: [PaymentSchema],

    // Status (auto-calculated based on balance and dates)
    status: {
        type: String,
        enum: ['Paid', 'Partially Paid', 'Pending', 'Overdue'],
        default: 'Pending'
    }
}, { timestamps: true });

// Pre-save middleware to calculate balance and status
InvoiceSchema.pre('save', function () {
    // Calculate balance
    this.balance = this.totalAmount - this.discount - this.amountPaid;

    // Auto-calculate status
    if (this.balance <= 0) {
        this.status = 'Paid';
    } else if (this.amountPaid > 0) {
        this.status = 'Partially Paid';
    } else if (new Date() > new Date(this.dueDate)) {
        this.status = 'Overdue';
    } else {
        this.status = 'Pending';
    }
});

const Invoice = models.Invoice || model('Invoice', InvoiceSchema);

export default Invoice;
