import React, { createContext, useContext, useEffect, useState, useCallback } from "react";

const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchQuiz = useCallback((moduleId) => {
        setLoading(true);
        setQuestions([]);
        setError(null);
        setSubmitted(false);
        setResult(null);
        fetch(`http://localhost:5000/api/quiz/questions?moduleId=${moduleId}`)
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
            const res = await fetch("http://localhost:5000/api/quiz/submit", {
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
                fetchQuiz,
                handleSelect,
                handleMultipleSelect,
                submitQuiz,
            }}
        >
            {children}
        </QuizContext.Provider>
    );
};

export const useQuiz = () => useContext(QuizContext);