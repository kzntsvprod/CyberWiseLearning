import React from "react";
import style from "../style/Footer.module.css";
import { FaYoutube, FaGithub, FaTelegram, FaInstagram } from "react-icons/fa";

const Footer = (props) => {
    return (
        <div className={style.footerCont}>
            <div className={style.iconsCont}>
                <a href={"https://www.youtube.com/@guitaristkuzya2090"} target={"_blank"} rel={"noopener noreferrer"}>
                    <FaYoutube className={style.icon}/>
                </a>
                <a href={"https://github.com/kzntsvprod/CyberWiseLearning"} target={"_blank"} rel={"noopener noreferrer"}>
                    <FaGithub className={style.icon}/>
                </a>
                <a href={"https://t.me/kzntsvprod"} target={"_blank"} rel={"noopener noreferrer"}>
                    <FaTelegram className={style.icon}/>
                </a>
                <a href={"https://www.instagram.com/_valik_kuznetsov_/"} target={"_blank"} rel={"noopener noreferrer"}>
                    <FaInstagram className={style.icon}/>
                </a>
            </div>
            <div className={style.credits}>
                © kzntsvprod. All rights reserved
            </div>
        </div>
    );
}

export default Footer;