import mongoose, { Schema, model, models } from 'mongoose';

const QuotationSchema = new Schema({
    quoteNumber: { type: String, required: true, unique: true },
    clientId: { type: Schema.Types.ObjectId, ref: 'Client' }, // Changed to Ref
    clientName: { type: String }, // Keep for fallback or direct entry
    clientPhone: { type: String },
    clientEmail: { type: String },
    projectId: { type: Schema.Types.ObjectId, ref: 'Project' }, // Linked Project
    projectName: { type: String },

    // Structure matching "Infinity Interiors" Excel
    sections: [{
        name: { type: String, required: true }, // e.g. "Master Bedroom"
        items: [{
            description: { type: String, required: true },
            height: { type: Number },
            width: { type: Number },
            sft: { type: Number },
            unitPrice: { type: Number, required: true },
            amount: { type: Number, required: true },
            image: { type: String }, // Optional image URL
            isCustom: { type: Boolean, default: false }, // Manual entry flag
        }],
        subTotal: { type: Number }
    }],

    totalAmount: { type: Number, required: true }, // Subtotal before discount
    discount: { type: Number, default: 0 }, // Fixed Amount (₹)
    gstRate: { type: Number, default: 0 }, // GST Percentage
    finalAmount: { type: Number, required: true }, // Total after discount & tax

    status: {
        type: String,
        enum: ['Draft', 'Sent', 'Approved', 'Revised'],
        default: 'Draft'
    },
    date: { type: String, default: () => new Date().toISOString().split('T')[0] },
    validUntil: { type: String },
    notes: { type: String }, // Customizable final note
    termsAndConditions: { type: String }
}, { timestamps: true });

const Quotation = models.Quotation || model('Quotation', QuotationSchema);

export default Quotation;
