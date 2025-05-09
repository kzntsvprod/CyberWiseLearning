import React, { useState } from "react";
import style from "../style/Header.module.css";
import { FaSearch, FaHome, FaGamepad } from "react-icons/fa";
import { useModule } from "../contexts/ModuleContext";
import { useUser } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import AccountPreview from "./AccountPreview";

const Header = (props) => {
    const { searchQuery, setSearchQuery } = useModule();
    const { user } = useUser();
    const navigate = useNavigate();
    const [showGameMenu, setShowGameMenu] = useState(false);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleProfileClick = () => {
        if (user?.role === "admin") {
            navigate("/admin");
        } else {
            navigate("/user");
        }
    }

    const handleMainClick = () => {
        navigate("/main");
    }

    const toggleGameMenu = () => {
        setShowGameMenu(prev => !prev);
    };

    const handleGameOption = (option) => {
        setShowGameMenu(false);
        if (option === "password") {
            navigate("/game/password");
        } else if (option === "email") {
            navigate("/game/email");
        }
    };

    return (
        <div className={style.header}>
            <div className={style.logoCont}>
                <img src={props.src} alt={props.alt} className={style.logo} />
            </div>

            {props.showMenu && (
                <>
                    {props.showSearch && (
                        <div className={style.searchBar}>
                            <FaSearch className={style.searchIcon} />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={handleSearchChange}
                                placeholder="Пошук модулів..."
                            />
                        </div>
                    )}

                    <div className={style.icons}>
                        <button className={style.iconButton} onClick={handleMainClick}>
                            <FaHome />
                        </button>

                        <div className={style.gameWrapper}>
                            <button className={style.iconButton} onClick={toggleGameMenu}>
                                <FaGamepad />
                            </button>
                            {showGameMenu && (
                                <div className={style.gameMenu}>
                                    <button onClick={() => handleGameOption("password")}>Гра з паролем</button>
                                    <button onClick={() => handleGameOption("email")}>Гра з ел. листами</button>
                                </div>
                            )}
                        </div>

                        <AccountPreview user={user} handleProfileClick={handleProfileClick} />
                    </div>
                </>
            )}
        </div>
    );
}

export default Header;