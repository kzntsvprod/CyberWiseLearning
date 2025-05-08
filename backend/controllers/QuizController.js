import Question from "../models/Question.js";
import Result from "../models/QuizRes.js";
import mongoose from "mongoose";

// Отримати всі питання по moduleId
export const getQuestionsByModule = async (req, res) => {
    try {
        const { moduleId } = req.query;

        if (!mongoose.Types.ObjectId.isValid(moduleId)) {
            return res.status(400).json({ error: "Невірний формат moduleId" });
        }

        const questions = await Question.find({ moduleId: moduleId });
        res.json(questions);
    } catch (err) {
        console.error("Помилка при завантаженні питань:", err);
        res.status(500).json({ error: "Помилка при завантаженні питань" });
    }
};

// Надіслати відповіді та зберегти результат
export const submitAnswers = async (req, res) => {
    try {
        const { userId, moduleId, answers } = req.body;

        // Перевірка наявності обов'язкових полів
        if (!userId || !moduleId || !answers) {
            return res.status(400).json({ error: "Відсутні обов'язкові поля" });
        }

        // Перевіряємо, чи вже є завершений тест для цього користувача і модуля
        const existingResult = await Result.findOne({
            userId,
            moduleId,
            complete: true
        });

        if (existingResult) {
            return res.status(400).json({
                error: "Ви вже завершили цей тест і не можете пройти його знову"
            });
        }

        // Отримуємо всі питання для модуля
        const questions = await Question.find({
            moduleId: new mongoose.Types.ObjectId(moduleId),
        }).sort('_id'); // Сортуємо для узгодженості з масивом відповідей

        // Перевірка кількості питань
        if (questions.length === 0) {
            return res.status(404).json({ error: "Питання для даного модуля не знайдено" });
        }

        // Перевірка відповідності кількості питань і відповідей
        if (!Array.isArray(answers) || answers.length !== questions.length) {
            return res.status(400).json({
                error: `Очікується ${questions.length} відповідей, отримано ${answers.length}`
            });
        }

        let correct = 0;

        // Перевіряємо кожну відповідь
        questions.forEach((question, index) => {
            const userAnswer = answers[index];
            const correctAnswers = question.correctAnswerIndex;

            if (question.questionType === "single") {
                // Перевірка для питань з однією правильною відповіддю
                if (userAnswer === correctAnswers[0]) {
                    correct++;
                }
            } else {
                // Перевірка для питань з кількома правильними відповідями
                const userAnswers = Array.isArray(userAnswer) ? userAnswer : [];
                const correctAnswersArray = Array.isArray(correctAnswers) ? correctAnswers : [];

                // Відсортовуємо для порівняння
                const sortedUserAnswers = [...userAnswers].sort();
                const sortedCorrectAnswers = [...correctAnswersArray].sort();

                // Вважаємо відповідь правильною, якщо точно збігаються
                if (sortedUserAnswers.length === sortedCorrectAnswers.length &&
                    sortedUserAnswers.every((val, i) => val === sortedCorrectAnswers[i])) {
                    correct++;
                }
            }
        });

        // Зберігаємо результат
        const result = new Result({
            userId,
            moduleId,
            correctAnswers: correct,
            totalQuestions: questions.length,
            percentage: Math.round((correct / questions.length) * 100),
            submittedAt: new Date()
        });

        await result.save();

        res.json({
            success: true,
            correct,
            total: questions.length,
            percentage: Math.round((correct / questions.length) * 100),
            details: questions.map((q, i) => ({
                questionId: q._id,
                questionText: q.questionText,
                userAnswer: answers[i],
                correctAnswer: q.correctAnswerIndex,
                isCorrect: q.questionType === "single"
                    ? answers[i] === q.correctAnswerIndex[0]
                    : JSON.stringify([...answers[i]].sort()) === JSON.stringify([...q.correctAnswerIndex].sort())
            }))
        });
    } catch (err) {
        console.error("Помилка при збереженні результату:", err);
        res.status(500).json({
            error: "Помилка при збереженні результату",
            details: process.env.NODE_ENV === "development" ? err.message : undefined
        });
    }
};

// Перевірити, чи вже завершено тест
export const checkQuizCompletion = async (req, res) => {
    try {
        const { userId, moduleId } = req.query;

        if (!userId || !moduleId) {
            return res.status(400).json({ error: "Відсутні обов'язкові параметри" });
        }

        const existingResult = await Result.findOne({
            userId,
            moduleId,
            complete: true
        });

        res.json({ completed: !!existingResult });
    } catch (err) {
        console.error("Помилка при перевірці завершення тесту:", err);
        res.status(500).json({ error: "Помилка при перевірці завершення тесту" });
    }
};