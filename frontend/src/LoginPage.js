import React, { useState, useEffect } from "react";
import style from "./style/LoginPage.module.css";
import Header from "./components/Header";
import logo from "./assets/logo.png";
import logo2 from "./assets/logo2.png";
import Label from "./components/Label";
import Input from "./components/Input";
import Button from "./components/Button";
import LogoCont from "./components/LogoCont";
import Footer from "./components/Footer";
import {Link, useNavigate} from "react-router-dom";
import { useUser } from "./contexts/UserContext";

function LoginPage() {
    const { loginUser } = useUser();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);

    const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

    useEffect(() => {
        // Перевірка наявності токена у localStorage при завантаженні сторінки
        const savedToken = localStorage.getItem('token');
        if (savedToken) {
            loginUser(savedToken);
        }
    }, [loginUser, navigate]);

    const handleLogin = async () => {
        try {
            if (!password || !email) {
                alert("Введіть свої дані!");
                return;
            }

            const response = await fetch(`${BACKEND_URL}/api/auth/login`, {
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

            await loginUser(data.token, rememberMe);

            // Якщо користувач вибрав "Залишитись у системі", зберігаємо токен у localStorage
            if (rememberMe) {
                localStorage.setItem("authToken", data.token);
            }

            navigate('/main');
        } catch (err) {
            alert(err.message);
        }
    };

    const handleRememberMeChange = () => {
        setRememberMe(!rememberMe);
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
                                                <input type={"checkbox"} className={style.checkbox} checked={rememberMe}
                                                       onChange={handleRememberMeChange}/>
                                            </div>
                                            <div className={style.label}>
                                                Залишитись у системі
                                            </div>
                                        </div>
                                        <div className={style.passwordRec}>
                                            <Link to="/forgot-password" className={style.forgotPasswordLink}>
                                                Забули пароль?
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                <div className={style.button}>
                                    <Button title={"Увійти"} onClick={handleLogin} backgroundColor={"#171A1FFF"} color={"white"} alignItems={"start"} />
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
                <div className={style.rightColumn}></div>
            </div>
        </div>
    );
}

export default LoginPage;