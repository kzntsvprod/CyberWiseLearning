import mongoose from "mongoose";

const ResultSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    moduleId: { type: mongoose.Schema.Types.ObjectId, ref: "Module" },
    correctAnswers: { type: Number },
    totalQuestions: { type: Number },
    completedAt: { type: Date, default: Date.now },
    complete: { type: Boolean, default: true }
});

export default mongoose.model("QuizRes", ResultSchema);