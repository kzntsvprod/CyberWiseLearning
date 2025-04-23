import mongoose from "mongoose";

const CardSchema = new mongoose.Schema({
    html: { type: String, required: true },
    css: { type: String, required: true },
    isPhishing: { type: Boolean, required: true }
});

export default mongoose.model('EmailCard', CardSchema);