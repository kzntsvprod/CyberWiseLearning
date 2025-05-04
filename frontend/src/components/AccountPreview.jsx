import React from "react";
import style from "../style/AccountPreview.module.css";

const AccountPreview = (props) => {
    const user = props.user;

    // Перевірка на наявність користувача
    if (!user) {
        return null;
    }

    return props.user?.avatar ? (
        <div className={style.userAvatarCont} onClick={props.handleProfileClick}>
            <img
                src={props.user.avatar}
                alt="User Avatar"
                className={style.userAvatar}
            />
            <span className={props.user.isOnline ? style.onlineDot : style.offlineDot}></span>
        </div>
    ) : (
        <button className={style.iconUser} onClick={props.handleProfileClick}>
            <span>{props.user?.name?.charAt(0).toUpperCase()}</span>
            <span className={props.user.isOnline ? style.onlineDot : style.offlineDot}></span>
        </button>
    );
};

export default AccountPreview;