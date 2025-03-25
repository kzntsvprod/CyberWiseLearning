import React from "react";
import style from "../style/LogoCont.module.css";

const LogoCont = (props) => {
    return (
      <div className={style.logoCount}>
          <img src={props.src} className={style.logo}/>
      </div>
    );
}

export default LogoCont;