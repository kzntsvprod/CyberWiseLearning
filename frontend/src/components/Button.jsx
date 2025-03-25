import React from "react";
import style from "../style/Button.module.css";

const Button = (props) => {
    return (
      <div className={style.buttonCont}>
          <button className={style.button}>{props.title}</button>
      </div>
    );
}

export default Button;