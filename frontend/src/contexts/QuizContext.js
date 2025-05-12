import React, { createContext, useContext, useState, useCallback } from "react";

const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [userResults, setUserResults] = useState([]);
    const [resultsLoading, setResultsLoading] = useState(false);
    const [selectedModuleResults, setSelectedModuleResults] = useState(null);

    const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";

    const fetchQuiz = useCallback((moduleId) => {
        setLoading(true);
        setQuestions([]);
        setError(null);
        setSubmitted(false);
        setResult(null);
        fetch(`${BACKEND_URL}/api/quiz/questions?moduleId=${moduleId}`)
            .then(res => {
                if (!res.ok) throw new Error("Error fetching questions");
                return res.json();
            })
            .then(data => {
                setQuestions(data);
                const initialAnswers = {};
                data.forEach((q, index) => {
                    initialAnswers[index] = q.questionType === "single" ? null : [];
                });
                setAnswers(initialAnswers);
                setLoading(false);
            })
            .catch(err => {
                setError(err);
                setLoading(false);
            });
    }, []);

    const fetchUserResults = useCallback(async (userId, moduleId = null) => {
        setResultsLoading(true);
        setError(null);
        try {
            let url = `${BACKEND_URL}/api/quiz/results?userId=${userId}`;
            if (moduleId) url += `&moduleId=${moduleId}`;

            const res = await fetch(url);
            if (!res.ok) throw new Error("Error fetching results");
            const data = await res.json();
            setUserResults(data);

            // Якщо вибрано конкретний модуль, зберігаємо його результати окремо
            if (moduleId) {
                setSelectedModuleResults(data);
            } else {
                setSelectedModuleResults(null);
            }
        } catch (err) {
            setError(err);
        } finally {
            setResultsLoading(false);
        }
    }, []);

    const checkQuizCompletion = useCallback(async (userId, moduleId) => {
        try {
            const res = await fetch(
                `${BACKEND_URL}/api/quiz/check-completion?userId=${userId}&moduleId=${moduleId}`
            );
            if (!res.ok) throw new Error("Error checking quiz completion");
            const data = await res.json();
            return data.completed;
        } catch (err) {
            setError(err);
            return false;
        }
    }, []);

    const handleSelect = (questionIndex, answerIndex) => {
        setAnswers(prev => ({ ...prev, [questionIndex]: answerIndex }));
    };

    const handleMultipleSelect = (questionIndex, answerIndex) => {
        setAnswers(prev => {
            const currentAnswers = prev[questionIndex] || [];
            const newAnswers = currentAnswers.includes(answerIndex)
                ? currentAnswers.filter(ans => ans !== answerIndex)
                : [...currentAnswers, answerIndex];
            return { ...prev, [questionIndex]: newAnswers };
        });
    };

    const submitQuiz = async ({ userId, moduleId }) => {
        const orderedAnswers = questions.map((q, index) => answers[index] ?? (q.questionType === "multiple" ? [] : null));

        try {
            const res = await fetch(`${BACKEND_URL}/api/quiz/submit`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    userId,
                    moduleId,
                    answers: orderedAnswers,
                }),
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.error || "Помилка при відправці тесту");
            }

            const data = await res.json();
            setResult(data);
            setSubmitted(true);

            await fetchUserResults(userId);
        } catch (err) {
            setError(err);
        }
    };

    return (
        <QuizContext.Provider
            value={{
                questions,
                answers,
                submitted,
                result,
                loading,
                error,
                userResults,
                resultsLoading,
                selectedModuleResults,
                fetchQuiz,
                handleSelect,
                handleMultipleSelect,
                submitQuiz,
                fetchUserResults,
                checkQuizCompletion,
            }}
        >
            {children}
        </QuizContext.Provider>
    );
};

export const useQuiz = () => useContext(QuizContext);