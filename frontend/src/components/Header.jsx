import React, { useState } from "react";
import style from "../style/Header.module.css";
import { FaSearch, FaHome, FaGamepad } from "react-icons/fa";
import { useModule } from "../contexts/ModuleContext";  // Імпортуємо контекст

const Header = (props) => {
    const { searchQuery, setSearchQuery } = useModule();

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

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
                        <button className={style.iconButton}>
                            <FaHome />
                        </button>
                        <button className={style.iconButton}>
                            <FaGamepad />
                        </button>
                        <button className={style.iconUser}>
                            <span>A</span>
                            <span className={style.onlineDot}></span>
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}

export default Header;