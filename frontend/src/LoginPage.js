import React from "react";
import style from "./style/LoginPage.module.css";
import Header from "./components/Header";
import logo from "./assets/logo.png";
import logo2 from "./assets/logo2.png";
import Label from "./components/Label";
import Input from "./components/Input";
import Button from "./components/Button";
import LogoCont from "./components/LogoCont";
import Footer from "./components/Footer";

function LoginPage() {
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
                                        <Input type={"email"} label={"Адреса електронної пошти"} placeholder={"Введіть електронну адресу"}/>
                                        <Input type={"password"} label={"Пароль"} placeholder={"Введіть пароль"}/>
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
                                    <Button title={"Увійти"}/>
                                </div>
                                <div className={style.reg}>
                                    Не маєте облікового запису?&nbsp;<b>Зареєструватися</b>
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