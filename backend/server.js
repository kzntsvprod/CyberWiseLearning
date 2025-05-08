import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import authRoutes from "./routes/AuthRoutes.js";
import moduleRoutes from "./routes/ModuleRoutes.js";
import userRoutes from "./routes/UserRoutes.js";
import emailCardRoute from "./routes/EmailCardRoute.js";
import quizRoutes from "./routes/QuizRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Підключення до MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("MongoDB Connected"))
    .catch((error) => console.log("MongoDB Connection Error:", error));

app.use("/api/auth", authRoutes);
app.use("/api/modules", moduleRoutes);
app.use("/api/user", userRoutes);
app.use("/api/cards", emailCardRoute);
app.use("/api/quiz", quizRoutes);

app.get("/", (req, res) => {
    res.send("Backend is running...");
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});