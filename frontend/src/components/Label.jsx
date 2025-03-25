import React from "react";
import style from "../style/Label.module.css";

const Label = (props) => {
    return <h1 className={style.title}>{props.title}</h1>
}

export default Label;