import React from "react";
import { useNavigate } from "react-router-dom";
import style from "../style/BackButton.module.css";
import { IoIosArrowDropleft } from "react-icons/io";

const BackButton = () => {
    const navigate = useNavigate();

    return (
        <div className={style.backButtonCont}>
            <IoIosArrowDropleft className={style.backButton} onClick={() => navigate(-1)} />
        </div>
    );
}

export default BackButton;