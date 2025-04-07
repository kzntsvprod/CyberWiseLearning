import mongoose from "mongoose";

const ModuleSchema = new mongoose.Schema({
    title: { type: String, required: true },
});

export default mongoose.model("Module", ModuleSchema);