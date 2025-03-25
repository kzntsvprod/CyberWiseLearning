import React, { useState } from "react";
import style from "../style/Input.module.css";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";

const Input = (props) => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

    return (
        <div className={style.input}>
            <label className={style.inputLabel}>{props.label}</label>
            <div className={style.inputWrapper}>
                {props.type === "email" && <Mail className={style.inputIcon} size={20} />}
                {props.type === "password" && <Lock className={style.inputIcon} size={20} />}
                <input type={props.type === "password" && !showPassword ? "password" : "text"}
                       className={style.inputField} placeholder={props.placeholder}/>
                {props.type === "password" && (
                    <button
                        type="button"
                        className={style.togglePassword}
                        onClick={togglePasswordVisibility}
                    >
                        {showPassword ? <EyeOff size={20}/> : <Eye size={20}/>}
                    </button>
                )}
            </div>
        </div>
    );
}

export default Input;