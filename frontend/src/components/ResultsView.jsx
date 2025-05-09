import React, { useState, useEffect } from "react";
import { useQuiz } from "../contexts/QuizContext";
import { useModule } from "../contexts/ModuleContext";
import style from "../style/ResultsView.module.css";

const ResultsView = ({ userId }) => {
    const { modules } = useModule();
    const { userResults, resultsLoading, fetchUserResults } = useQuiz();
    const [selectedModule, setSelectedModule] = useState(modules[0]?._id || "");

    useEffect(() => {
        if (userId) {
            fetchUserResults(userId, selectedModule);
        }
    }, [userId, selectedModule, fetchUserResults]);

    const handleModuleChange = (e) => {
        setSelectedModule(e.target.value);
    };

    return (
        <div className={style.resultsCont}>
            <h2>Результати тестів</h2>

            <div className={style.moduleSelector}>
                <label htmlFor="module-select">Оберіть модуль: </label>
                <select
                    id="module-select"
                    value={selectedModule}
                    onChange={handleModuleChange}
                >
                    {modules.map(module => (
                        <option key={module._id} value={module._id}>
                            {module.title}
                        </option>
                    ))}
                </select>
            </div>

            {resultsLoading ? (
                <p>Завантаження результатів...</p>
            ) : userResults.length === 0 ? (
                <p>Немає результатів для відображення</p>
            ) : (
                <div className={style.resultsList}>
                    {userResults.map(result => (
                        <div key={result._id} className={style.resultCard}>
                            <h3>{result.moduleId?.title || "Невідомий модуль"}</h3>
                            <p>
                                Результат: {result.correctAnswers}/{result.totalQuestions} (
                                {Math.round((result.correctAnswers / result.totalQuestions) * 100)}%)
                            </p>
                            <p>
                                Дата проходження: {new Date(result.completedAt).toLocaleDateString()}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ResultsView;