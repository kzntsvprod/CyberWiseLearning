import React, { useState } from "react";
import style from "./style/PassGame.module.css";
import Header from "./components/Header";
import logo from "./assets/logo.png";
import BackButton from "./components/BackButton";
import LogoCont from "./components/LogoCont";
import logo2 from "./assets/logo2.png";
import Input from "./components/Input";
import Label from "./components/Label";

function PassGame() {
    const [password, setPassword] = useState("");

    const getPasswordStrength = (password) => {
        let score = 0;
        if (password.length >= 8) score++;
        if (/[A-Z]/.test(password)) score++;
        if (/[0-9]/.test(password)) score++;
        if (/[^A-Za-z0-9]/.test(password)) score++;
        if (password.length >= 10) score++;
        return score;
    };

    const getStrengthLabel = (score) => {
        switch (score) {
            case 0:
            case 1:
                return { text: "Ненадійний пароль", color: "#ef4444" };
            case 2:
                return { text: "Слабкий пароль", color: "#f59e0b" };
            case 3:
            case 4:
                return { text: "Помірний пароль", color: "#eab308" };
            case 5:
                return { text: "Чудовий пароль", color: "#22c55e" };
            default:
                return { text: "", color: "transparent" };
        }
    };

    const score = getPasswordStrength(password);
    const strength = getStrengthLabel(score);

    return (
        <div className={style.passGamePage}>
            <div className={style.header}>
                <Header src={logo} showMenu={true}/>
            </div>
            <div className={style.main}>
                <div className={style.leftColumn}>
                </div>
                <div className={style.middleColumn}>
                    <div className={style.passGamePagePanel}>
                        <div className={style.passGamePagePanel2}>
                            <div className={style.leftColumn2}>
                                <BackButton/>
                            </div>
                            <div className={style.infoCont}>
                                <div className={style.labelCont}>
                                    <Label title={"Створи надійний пароль"}/>
                                </div>
                                <div className={style.passGameCont}>
                                    <div className={style.passInput}>
                                        <Input
                                            className={style.inputField}
                                            type="password"
                                            placeholder="Введіть пароль"
                                            alignItems={"center"}
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                        {password && (
                                            <div className={style.strengthMeter}>
                                                <div className={style.strengthBarContainer}>
                                                    <div
                                                        className={style.strengthBar}
                                                        style={{
                                                            width: `${(score / 5) * 100}%`,
                                                            backgroundColor: strength.color,
                                                        }}
                                                    />
                                                </div>
                                                <div
                                                    className={style.strengthLabel}
                                                    style={{color: strength.color}}
                                                >
                                                    {strength.text}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className={style.helpCont}>

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

export default PassGame;