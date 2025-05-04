import React, { useState } from "react";
import { Link } from "react-router-dom";
import style from "./style/UserPage.module.css";
import Header from "./components/Header";
import logo from "./assets/logo.png";
import BackButton from "./components/BackButton";
import LogoCont from "./components/LogoCont";
import logo2 from "./assets/logo2.png";
import UserIcon from "./components/UserIcon";
import { useUser } from "./contexts/UserContext";
import { useModule } from "./contexts/ModuleContext";
import EditIcon from "./components/EditIcon";
import Input from "./components/Input";
import CourseStatus from "./components/CourseStatus";

function UserPage() {
    const { user, loading, updateUser, logoutUser } = useUser();
    const { modules } = useModule();

    const [editingField, setEditingField] = useState(null);
    const [inputValue, setInputValue] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    if (!user) return <div>Будь ласка, увійдіть у систему</div>;

    const handleEditClick = (field) => {
        setEditingField(field);
        setInputValue(user[field]);
    };

    const handleSave = async () => {
        try {
            await updateUser({ [editingField]: inputValue });
            setEditingField(null);
        } catch (error) {
            console.error("Помилка оновлення:", error);
        }
    };

    const handleLogoutClick = () => {
        logoutUser();
    }

    const handleResetPassword = async () => {
        try {
            if (!newPassword || !currentPassword) {
                alert("Заповніть всі поля");
                return;
            }

            if (currentPassword === newPassword) {
                alert("Новий пароль не може бути таким самим, як поточний");
                return;
            }

            const response = await fetch("http://localhost:5000/api/user/reset-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: user.email,
                    currentPassword,
                    newPassword,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                alert("Пароль успішно змінено");
                setCurrentPassword("");
                setNewPassword("");
            } else {
                alert(data.message || "Помилка зміни пароля");
            }
        } catch (error) {
            console.error("Помилка зміни пароля:", error);
            alert("Щось пішло не так");
        }
    };

    return (
        <div className={style.userPage}>
            <div className={style.header}>
                <Header src={logo} showMenu={true} />
            </div>
            <div className={style.main}>
                <div className={style.leftColumn}></div>
                <div className={style.middleColumn}>
                    <div className={style.userPagePanel}>
                        <div className={style.userPagePanel2}>
                            <div className={style.userInfoCont}>
                                <div className={style.backButton}>
                                    <BackButton />
                                </div>
                                <div className={style.userInfoCont2}>
                                    <div className={style.userIcon}>
                                        <UserIcon />
                                    </div>
                                    <div className={style.userInfo}>
                                        <div className={style.userNameCont}>
                                            {editingField === "name" ? (
                                                <div className={style.editField}>
                                                    <input
                                                        value={inputValue}
                                                        onChange={(e) => setInputValue(e.target.value)}
                                                        className={style.editInput}
                                                    />
                                                    <button onClick={handleSave} className={style.saveBtn}>
                                                        Зберегти
                                                    </button>
                                                </div>
                                            ) : (
                                                <div style={{display: "flex", alignItems: "flex-end"}}>
                                                    <div className={style.userName}>{user.name}</div>
                                                    <EditIcon onClick={() => handleEditClick("name")}/>
                                                </div>
                                            )}
                                        </div>
                                        <div className={style.userEmailCont}>
                                            {editingField === "email" ? (
                                                <div className={style.editField2}>
                                                    <input
                                                        value={inputValue}
                                                        onChange={(e) => setInputValue(e.target.value)}
                                                        className={style.editInput}
                                                    />
                                                    <button onClick={handleSave} className={style.saveBtn}>
                                                        Зберегти
                                                    </button>
                                                </div>
                                            ) : (
                                                <div style={{display: "flex", alignItems: "flex-start"}}>
                                                    <div className={style.userEmail}>{user.email}</div>
                                                    <EditIcon onClick={() => handleEditClick("email")}/>
                                                </div>
                                            )}
                                        </div>
                                        <div className={style.logoutCont}>
                                            {(currentPassword || newPassword) && (
                                                <div className={style.confirmBtn} onClick={handleResetPassword}>
                                                    Підтвердити
                                                </div>
                                            )}
                                            <div>
                                                <Link to={"/"} className={style.logout} onClick={handleLogoutClick}>
                                                    Вийти
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={style.userPassCont}>
                                    <div className={style.userPass}>
                                        <Input type={"password"} label={"Поточний пароль"} placeholder={"Введіть пароль"} value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
                                        <Input type={"password"} label={"Новий пароль"} placeholder={"Введіть пароль"} value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                                    </div>
                                </div>
                            </div>
                            <div className={style.separator}></div>
                            <div className={style.moduleStatus}>
                                <div className={style.progressBarCont}>
                                    <CourseStatus user={user} modules={modules} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={style.rightColumn}>
                    <div className={style.logoCont}>
                        <LogoCont src={logo2}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserPage;
