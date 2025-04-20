import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: { type: String, default: "Гість" },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatar: { type: String, default: "" },
    viewedModules: [{ type: mongoose.Schema.Types.ObjectId, ref: "Module" }],
    resetToken: { type: String, default: null },
    resetTokenExpiry: { type: Date, default: null },
}, { timestamps: true });

export default mongoose.model("User", UserSchema);