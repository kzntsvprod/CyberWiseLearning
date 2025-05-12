import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "./style/ForgotPasswordPage.module.css";
import Header from "./components/Header";
import LogoCont from "./components/LogoCont";
import Label from "./components/Label";
import Input from "./components/Input";
import Button from "./components/Button";
import Footer from "./components/Footer";
import logo from "./assets/logo.png";
import logo2 from "./assets/logo2.png";
import BackButton from "./components/BackButton";

function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";

    const handleResetRequest = async () => {
        try {
            if(!email) {
                alert("Введіть адресу електронної пошти!");
                return;
            }

            const response = await fetch(`${BACKEND_URL}/api/auth/forgot-password`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email })
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || "Не вдалося відправити запит.");
            }

            alert("Посилання для відновлення пароля надіслано на вашу електронну пошту.");
            setTimeout(() => navigate("/"), 1000);
        } catch (err) {
            alert(err.message);
        }
    };

    return (
        <div className={style.fgPassPage}>
            <div className={style.header}>
                <Header src={logo} showMenu={false}/>
            </div>
            <div className={style.main}>
                <div className={style.leftColumn}></div>
                <div className={style.middleColumn}>
                    <div className={style.fgPassForm}>
                        <div className={style.fgPassForm2}>
                            <div className={style.fgPassForm3}>
                                <div className={style.leftColumn2}>
                                    <BackButton/>
                                </div>
                                <div className={style.fgPassForm4}>
                                    <div className={style.text}>
                                        <Label title={"Відновлення паролю"}/>
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
                                        </div>
                                    </div>
                                    <div className={style.button}>
                                        <Button title={"Надіслати"} onClick={handleResetRequest} backgroundColor={"#171A1FFF"} color={"white"} alignItems={"start"} />
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

export default ForgotPasswordPage;
