import mongoose from 'mongoose';

const CatalogItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide an item name'],
        trim: true,
    },
    category: {
        type: String,
        default: 'general',
    },
    defaultRate: {
        type: Number,
        required: [true, 'Please provide a default rate'],
    },
    image: {
        type: String,
        default: '',
    },
    description: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.models.CatalogItem || mongoose.model('CatalogItem', CatalogItemSchema);
