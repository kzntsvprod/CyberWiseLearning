import React, { useRef } from "react";
import { FaUser, FaPen } from "react-icons/fa";
import style from "../style/UserIcon.module.css";
import { useUser } from "../contexts/UserContext";

const UserIcon = () => {
    const fileInputRef = useRef(null);
    const { user, updateAvatar } = useUser();

    const handleIconClick = () => {
        fileInputRef.current.click(); // Відкриття вибору файлу
    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            try {
                await updateAvatar(file);
            } catch (err) {
                alert("Помилка оновлення аватарки: " + err.message);
            }
        }
    };

    return (
        <div className={style.container}>
            {user?.avatar ? (
                <img
                    src={user.avatar} // Отримання URL аватарки з контексту
                    alt="User Avatar"
                    className={style.userAvatar}
                />
            ) : (
                <div className={style.iconCircle}>
                    <FaUser className={style.userIcon}/>
                </div>
            )}
            <div className={style.editCircle} onClick={handleIconClick}>
                <FaPen className={style.penIcon}/>
            </div>

            {/* Сховане input поле */}
            <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                style={{display: "none"}}
                onChange={handleFileChange}
            />
        </div>
    );
};

export default UserIcon;