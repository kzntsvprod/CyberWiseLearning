import express from "express";
import {
    getQuestionsByModule,
    submitAnswers,
    checkQuizCompletion
} from "../controllers/QuizController.js";

const router = express.Router();

router.get("/questions", getQuestionsByModule);
router.post("/submit", submitAnswers);
router.get("/check-completion", checkQuizCompletion);

export default router;