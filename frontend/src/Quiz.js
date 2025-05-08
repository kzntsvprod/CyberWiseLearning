import React from "react";
import { useParams } from "react-router-dom";
import style from "./style/Quiz.module.css";
import Header from "./components/Header";
import logo from "./assets/logo.png";
import BackButton from "./components/BackButton";
import Label from "./components/Label";
import LogoCont from "./components/LogoCont";
import logo2 from "./assets/logo2.png";
import QuizBody from "./components/QuizBody";
import { useUser } from "./contexts/UserContext";

function Quiz() {
    const { user } = useUser();

    const userId = user?._id;
    const { id: moduleId } = useParams();

    return (
        <div className={style.quizPage}>
            <div className={style.header}>
                <Header src={logo} showMenu={true}/>
            </div>
            <div className={style.main}>
                <div className={style.leftColumn}>
                </div>
                <div className={style.middleColumn}>
                    <div className={style.quizPagePanel}>
                        <div className={style.quizPagePanel2}>
                            <div className={style.leftColumn2}>
                                <BackButton/>
                            </div>
                            <div className={style.infoCont}>
                                <div className={style.labelCont}>
                                    <Label title={"Пройди тестування"}/>
                                </div>
                                <div className={style.helpCont}>

                                </div>
                                <div className={style.quizCont}>
                                    <QuizBody moduleId={moduleId} userId={userId}/>
                                </div>
                                <div className={style.helpCont2}>

                                </div>
                            </div>
                            <div className={style.rightColumn2}>

                            </div>
                        </div>
                    </div>
                </div>
                <div className={style.rightColumn}>
                    <div className={style.logoCont}>
                        <LogoCont src={logo2}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Quiz;