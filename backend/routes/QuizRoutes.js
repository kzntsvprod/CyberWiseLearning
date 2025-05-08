import express from "express";
import {
    getQuestionsByModule,
    submitAnswers,
    checkQuizCompletion,
    getUserResults
} from "../controllers/QuizController.js";

const router = express.Router();

router.get("/questions", getQuestionsByModule);
router.post("/submit", submitAnswers);
router.get("/check-completion", checkQuizCompletion);
router.get('/results', getUserResults);

export default router;