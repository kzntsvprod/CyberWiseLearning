import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "./style/RegisterPage.module.css";
import Header from "./components/Header";
import logo from "./assets/logo.png";
import logo2 from "./assets/logo2.png";
import Label from "./components/Label";
import Input from "./components/Input";
import Button from "./components/Button";
import LogoCont from "./components/LogoCont";
import Footer from "./components/Footer";
import BackButton from "./components/BackButton";
import {useUser} from "./contexts/UserContext";

function RegisterPage() {
    const { loginUser } = useUser();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const validatePassword = (password) => {
        const minLength = 8;
        const hasNumber = /\d/.test(password);
        const hasLetter = /[a-zA-Z]/.test(password);
        return password.length >= minLength && hasNumber && hasLetter;
    };

    // Функція для відправки форми
    const handleRegister = async (e) => {
        e.preventDefault(); // Перешкоджаємо стандартній поведінці форми
        try {
            if(!password) {
                alert("Введіть свої дані!");
                return;
            }

            if(!email) {
                alert("Введіть свої дані!");
                return;
            }

            if (!validatePassword(password)) {
                alert("Пароль має містити не менше 8 символів, включати цифри та літери.");
                return;
            }

            const response = await fetch("http://localhost:5000/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                // Успіх, перехід на іншу сторінку чи інша логіка
                alert("Користувач успішно зареєстрований");
                await loginUser(data.token);
                setTimeout(() => navigate("/main"), 1000);
            } else {
                alert(data.message); // Вивести помилку, якщо реєстрація не вдалася
            }
        } catch (error) {
            alert("Помилка при реєстрації"); // Логування помилки сервера
        }
    };

    return (
        <div className={style.regPage}>
            <div className={style.header}>
                <Header src={logo} showMenu={false}/>
            </div>
            <div className={style.main}>
                <div className={style.leftColumn}></div>
                <div className={style.middleColumn}>
                    <div className={style.regForm}>
                        <div className={style.regForm2}>
                            <div className={style.regForm3}>
                                <div className={style.leftColumn2}>
                                    <BackButton />
                                </div>
                                <div className={style.regForm4}>
                                    <div className={style.text}>
                                        <Label title={"Реєстрація"}/>
                                    </div>
                                    <div className={style.inputCont}>
                                        <div className={style.inputCont2}>
                                            <Input
                                                type={"email"}
                                                label={"Адреса електронної пошти"}
                                                placeholder={"Введіть електронну адресу"}
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                            />
                                            <Input
                                                type={"password"}
                                                label={"Пароль"}
                                                placeholder={"Введіть пароль"}
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className={style.button}>
                                        <Button title={"Зареєструватися"} onClick={handleRegister}/>
                                    </div>
                                </div>
                                <div className={style.rightColumn2}></div>
                            </div>
                        </div>
                    </div>
                    <div className={style.footer}>
                        <Footer/>
                    </div>
                </div>
                <div className={style.rightColumn}>
                    <LogoCont src={logo2}/>
                </div>
            </div>
        </div>
    );
}

export default RegisterPage;
