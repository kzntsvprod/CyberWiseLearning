import React, { useState } from "react";
import style from "../style/Header.module.css";
import { FaSearch, FaHome, FaGamepad } from "react-icons/fa";
import { useModule } from "../contexts/ModuleContext";
import { useUser } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";

const Header = (props) => {
    const { searchQuery, setSearchQuery } = useModule();
    const { user, updateAvatar } = useUser();
    const navigate = useNavigate();

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleProfileClick = () => {
        navigate("/user");
    }

    const handleMainClick = () => {
        navigate("/main");
    }

    return (
        <div className={style.header}>
            <div className={style.logoCont}>
                <img src={props.src} alt={props.alt} className={style.logo} />
            </div>

            {props.showMenu && (
                <>
                    <div className={style.searchBar}>
                        <FaSearch className={style.searchIcon} />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={handleSearchChange}
                            placeholder="Пошук модулів..."
                        />
                    </div>

                    <div className={style.icons}>
                        <button className={style.iconButton} onClick={handleMainClick}>
                            <FaHome />
                        </button>
                        <button className={style.iconButton}>
                            <FaGamepad />
                        </button>
                        {user?.avatar ? (
                            <div className={style.userAvatarCont} onClick={handleProfileClick}>
                                <img
                                    src={user.avatar} // Отримання URL аватарки з контексту
                                    alt="User Avatar"
                                    className={style.userAvatar}
                                />
                                <span className={style.onlineDot}></span>
                            </div>
                        ) : (
                            <button className={style.iconUser} onClick={handleProfileClick}>
                                <span>{user?.name?.charAt(0).toUpperCase()}</span>
                                <span className={style.onlineDot}></span>
                            </button>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}

export default Header;