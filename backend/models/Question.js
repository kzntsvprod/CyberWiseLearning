import mongoose from "mongoose";

const QuestionSchema = new mongoose.Schema({
    moduleId: { type: mongoose.Schema.Types.ObjectId, ref: "Module", required: true },
    questionText: { type: String, required: true },
    options: [{ type: String, required: true }],
    correctAnswerIndex: { type: [Number], required: true },
    questionType: {
        type: String,
        required: true,
        enum: ["single", "multiple"],
        default: "single"
    },
});

export default mongoose.model("Question", QuestionSchema);