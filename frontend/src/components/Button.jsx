import React from "react";
import style from "../style/Button.module.css";

const Button = (props) => {
    return (
        <div className={style.buttonCont} style={{ alignItems: props.alignItems }}>
            <button className={style.button} onClick={props.onClick} style={{ backgroundColor: props.backgroundColor, color: props.color }}>{props.title}</button>
        </div>
    );
};

export default Button;