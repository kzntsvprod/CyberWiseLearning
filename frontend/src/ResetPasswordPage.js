import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import style from "./style/ResetPasswordPage.module.css";
import Header from "./components/Header";
import logo from "./assets/logo.png";
import Label from "./components/Label";
import Input from "./components/Input";
import Button from "./components/Button";
import Footer from "./components/Footer";
import LogoCont from "./components/LogoCont";
import logo2 from "./assets/logo2.png";

function ResetPasswordPage() {
    const { token } = useParams();
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const validatePassword = (password) => {
        const minLength = 8;
        const hasNumber = /\d/.test(password);
        const hasLetter = /[a-zA-Z]/.test(password);
        return password.length >= minLength && hasNumber && hasLetter;
    };

    const handleResetPassword = async () => {
        try {
            if (!password) {
                alert("Будь ласка, введіть новий пароль");
                return;
            }

            if (!validatePassword(password)) {
                alert("Пароль має містити не менше 8 символів, включати цифри та літери.");
                return;
            }

            const response = await fetch(`http://localhost:5000/api/auth/reset-password/${token}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem('token')}` // Додавання токена авторизації
                },
                body: JSON.stringify({ password })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Сталася помилка при зміні пароля");
            }

            alert("Пароль успішно змінено! Перенаправлення на сторінку входу...");
            setTimeout(() => navigate("/"), 1000);
        } catch (err) {
            alert(err.message || "Сталася невідома помилка");
            console.error("Reset password error:", err);
        }
    };

    return (
        <div className={style.resPassPage}>
            <div className={style.header}>
                <Header src={logo} showMenu={false}/>
            </div>
            <div className={style.main}>
                <div className={style.leftColumn}></div>
                <div className={style.middleColumn}>
                    <div className={style.resPassForm}>
                        <div className={style.resPassForm2}>
                            <div className={style.resPassForm3}>
                                <div className={style.leftColumn2}>
                                </div>
                                <div className={style.resPassForm4}>
                                    <div className={style.text}>
                                        <Label title={"Створення паролю"}/>
                                    </div>
                                    <div className={style.inputCont}>
                                        <div className={style.inputCont2}>
                                            <Input
                                                type={"password"}
                                                label={"Новий пароль"}
                                                placeholder={"Введіть пароль"}
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className={style.button}>
                                        <Button title={"Змінити пароль"} onClick={handleResetPassword}/>
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

export default ResetPasswordPage;