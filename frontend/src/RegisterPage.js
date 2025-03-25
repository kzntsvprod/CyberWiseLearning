import React from "react";
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

function RegisterPage() {
    return (
        <div className={style.regPage}>
            <div className={style.header}>
                <Header src={logo} showMenu={false}/>
            </div>
            <div className={style.main}>
                <div className={style.leftColumn}>

                </div>
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
                                            <Input type={"email"} label={"Адреса електронної пошти"}
                                                   placeholder={"Введіть електронну адресу"}/>
                                            <Input type={"password"} label={"Пароль"} placeholder={"Введіть пароль"}/>
                                        </div>
                                    </div>
                                    <div className={style.button}>
                                        <Button title={"Зареєструватися"}/>
                                    </div>
                                </div>
                                <div className={style.rightColumn2}>

                                </div>
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