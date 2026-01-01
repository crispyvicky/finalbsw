import mongoose, { Schema, model, models } from 'mongoose';

const ClientSchema = new Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: String,
    address: String,
    budget: String,
    projectId: String,
}, { timestamps: true });

const Client = models.Client || model('Client', ClientSchema);

export default Client;
