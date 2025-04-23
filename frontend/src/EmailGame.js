import React from 'react';
import style from "./style/EmailGame.module.css";
import Header from "./components/Header";
import logo from "./assets/logo.png";
import BackButton from "./components/BackButton";
import Label from "./components/Label";
import LogoCont from "./components/LogoCont";
import logo2 from "./assets/logo2.png";
import CardList from "./components/CardList";

function EmailGame() {
    return (
        <div className={style.emailGamePage}>
            <div className={style.header}>
                <Header src={logo} showMenu={true}/>
            </div>
            <div className={style.main}>
                <div className={style.leftColumn}>
                </div>
                <div className={style.middleColumn}>
                    <div className={style.emailGamePagePanel}>
                        <div className={style.emailGamePagePanel2}>
                            <div className={style.leftColumn2}>
                                <BackButton/>
                            </div>
                            <div className={style.infoCont}>
                                <div className={style.labelCont}>
                                    <Label title={"Знайди фішинговий лист"}/>
                                </div>
                                <div className={style.emailGameCont}>
                                    <CardList />
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

export default EmailGame;