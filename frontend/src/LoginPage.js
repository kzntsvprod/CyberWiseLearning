import React, { useState } from "react";
import style from "./style/LoginPage.module.css";
import Header from "./components/Header";
import logo from "./assets/logo.png";
import logo2 from "./assets/logo2.png";
import Label from "./components/Label";
import Input from "./components/Input";
import Button from "./components/Button";
import LogoCont from "./components/LogoCont";
import Footer from "./components/Footer";
import { Link } from "react-router-dom";

function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const validatePassword = (password) => {
        const minLength = 8;
        const hasNumber = /\d/.test(password);
        const hasLetter = /[a-zA-Z]/.test(password);
        return password.length >= minLength && hasNumber && hasLetter;
    };

    const handleLogin = async () => {
        if (!validatePassword(password)) {
            alert("Пароль має містити не менше 8 символів, включати цифри та літери.");
            return;
        }

        try {
            const response = await fetch("http://localhost:5000/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Помилка авторизації");
            }

            console.log("JWT Token:", data.token); // Вивід токена у консоль
            sessionStorage.setItem("token", data.token);
        } catch (err) {
            alert(err.message); // Вивід помилки у вигляді alert
        }
    };

    return (
        <div className={style.loginPage}>
            <div className={style.header}>
                <Header src={logo} showMenu={false}/>
            </div>
            <div className={style.main}>
                <div className={style.leftColumn}>
                    <LogoCont src={logo2} />
                </div>
                <div className={style.middleColumn}>
                    <div className={style.loginForm}>
                        <div className={style.loginForm2}>
                            <div className={style.loginForm3}>
                                <div className={style.text}>
                                    <Label title={"Вхід"} />
                                </div>
                                <div className={style.inputCont}>
                                    <div className={style.inputCont2}>
                                        <Input type={"email"} label={"Адреса електронної пошти"} placeholder={"Введіть електронну адресу"} value={email}
                                               onChange={(e) => setEmail(e.target.value)}/>
                                        <Input type={"password"} label={"Пароль"} placeholder={"Введіть пароль"} value={password}
                                               onChange={(e) => setPassword(e.target.value)}/>
                                    </div>
                                </div>
                                <div className={style.infoCont}>
                                    <div className={style.info}>
                                        <div className={style.save}>
                                            <div className={style.checkboxCont}>
                                                <input type={"checkbox"} className={style.checkbox}/>
                                            </div>
                                            <div className={style.label}>
                                                Залишитись у системі
                                            </div>
                                        </div>
                                        <div className={style.passwordRec}>
                                            Забули пароль?
                                        </div>
                                    </div>
                                </div>
                                <div className={style.button}>
                                    <Button title={"Увійти"} onClick={handleLogin} />
                                </div>
                                <div className={style.reg}>
                                    Не маєте облікового запису?&nbsp;
                                    <Link to={"/register"} className={style.regLink}>
                                        <b>Зареєструватися</b>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={style.footer}>
                        <Footer />
                    </div>
                </div>
                <div className={style.rightColumn}>

                </div>
            </div>
        </div>
    );
}

export default LoginPage;