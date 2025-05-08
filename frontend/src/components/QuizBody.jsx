import React, { useEffect, useState } from "react";
import { useQuiz } from "../contexts/QuizContext";
import style from "../style/QuizBody.module.css";
import Button from "./Button";

const QuizBody = ({ moduleId, userId }) => {
    const {
        questions,
        answers,
        submitted,
        result,
        loading,
        error,
        fetchQuiz,
        handleSelect,
        handleMultipleSelect,
        submitQuiz
    } = useQuiz();

    const [alreadyCompleted, setAlreadyCompleted] = useState(false);

    useEffect(() => {
        if (moduleId) {
            fetchQuiz(moduleId);
        }
    }, [moduleId, fetchQuiz]);

    const handleSubmit = () => {
        const allAnswered = questions.every((q, index) => {
            if (q.questionType === "single") {
                return (
                    typeof answers[index] === "number" &&
                    answers[index] >= 0 &&
                    answers[index] < q.options.length
                );
            } else {
                return (
                    Array.isArray(answers[index]) &&
                    answers[index].length > 0 &&
                    answers[index].every((ans) => ans >= 0 && ans < q.options.length)
                );
            }
        });

        if (!allAnswered) {
            alert("Будь ласка, дайте відповідь на всі питання перед завершенням тесту.");
            return;
        }

        submitQuiz({ userId, moduleId });
    };

    if (alreadyCompleted) {
        return (
            <div className={style.resultBox}>
                <h2>Тест вже завершено</h2>
                <p>Ви вже завершили цей тест і не можете пройти його знову.</p>
            </div>
        );
    }

    if (loading) return <p>Завантаження...</p>;
    if (error) {
        return (
            <div className={style.resultBox}>
                <h2>Помилка</h2>
                <p>Ви вже завершили цей тест і не можете пройти його знову</p>
            </div>
        );
    }

    if (submitted) {
        return (
            <div className={style.resultBox}>
                <h2>Результат тесту</h2>
                <p>Правильних відповідей: {result.correct} з {result.total}</p>
            </div>
        );
    }

    return (
        <div className={style.questionBlockCont}>
            {questions.map((q, index) => (
                <div key={index} className={style.questionBlock}>
                    <div className={style.question}>
                        <strong>{index + 1}. {q.questionText}</strong>
                        <span> ({q.questionType === "single" ? "Одна правильна відповідь" : "Кілька правильних відповідей"})</span>
                    </div>
                    {q.options.map((opt, i) => (
                        <label key={i} className={style.optionLabel}>
                            {q.questionType === "single" ? (
                                <input
                                    type="radio"
                                    name={`q-${index}`}
                                    value={i}
                                    checked={answers[index] === i}
                                    onChange={() => handleSelect(index, i)}
                                />
                            ) : (
                                <input
                                    type="checkbox"
                                    name={`q-${index}`}
                                    value={i}
                                    checked={Array.isArray(answers[index]) && answers[index].includes(i)}
                                    onChange={() => handleMultipleSelect(index, i)}
                                />
                            )}
                            {" "}{opt}
                        </label>
                    ))}
                </div>
            ))}
            <div className={style.submitButton}>
                <Button
                    title={"Завершити тест"}
                    backgroundColor={"#171A1FFF"}
                    color={"white"}
                    alignItems={"center"}
                    onClick={handleSubmit}
                />
            </div>
        </div>
    );
};

export default QuizBody;