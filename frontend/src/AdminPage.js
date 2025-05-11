import React, {useState} from "react";
import style from "./style/AdminPage.module.css";
import Header from "./components/Header";
import logo from "./assets/logo.png";
import BackButton from "./components/BackButton";
import UserIcon from "./components/UserIcon";
import EditIcon from "./components/EditIcon";
import {Link} from "react-router-dom";
import Input from "./components/Input";
import LogoCont from "./components/LogoCont";
import logo2 from "./assets/logo2.png";
import {useUser} from "./contexts/UserContext";
import {useModule} from "./contexts/ModuleContext";
import AccountPreview from "./components/AccountPreview";
import CourseStatus from "./components/CourseStatus";
import ResultsView from "./components/ResultsView";

function AdminPage() {
    const { user, users, loading, updateUser, logoutUser } = useUser();
    const { modules } = useModule();

    const [editingField, setEditingField] = useState(null);
    const [inputValue, setInputValue] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [selectedUserId, setSelectedUserId] = useState(null);

    const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

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

            const response = await fetch(`${BACKEND_URL}/api/user/reset-password`, {
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

    const handleUserSelect = (userId) => {
        setSelectedUserId(userId === selectedUserId ? null : userId);
    };

    return (
        <div className={style.adminPage}>
            <div className={style.header}>
                <Header src={logo} showMenu={true} />
            </div>
            <div className={style.main}>
                <div className={style.leftColumn}></div>
                <div className={style.middleColumn}>
                    <div className={style.adminPagePanel}>
                        <div className={style.adminPagePanel2}>
                            <div className={style.adminInfoCont}>
                                <div className={style.backButton}>
                                    <BackButton/>
                                </div>
                                <div className={style.adminInfoCont2}>
                                    <div className={style.adminIcon}>
                                        <UserIcon/>
                                    </div>
                                    <div className={style.adminInfo}>
                                        <div className={style.adminNameCont}>
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
                                                    <div className={style.adminName}>{user.name}</div>
                                                    <EditIcon onClick={() => handleEditClick("name")}/>
                                                </div>
                                            )}
                                        </div>
                                        <div className={style.adminEmailCont}>
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
                                                    <div className={style.adminEmail}>{user.email}</div>
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
                                <div className={style.adminPassCont}>
                                    <div className={style.adminPass}>
                                        <Input type={"password"} label={"Поточний пароль"}
                                               placeholder={"Введіть пароль"} value={currentPassword}
                                               onChange={(e) => setCurrentPassword(e.target.value)}/>
                                        <Input type={"password"} label={"Новий пароль"} placeholder={"Введіть пароль"}
                                               value={newPassword} onChange={(e) => setNewPassword(e.target.value)}/>
                                    </div>
                                </div>
                            </div>
                            <div className={style.separator}></div>
                            <div className={style.moduleStatusCont}>
                                {users.map((user) => (
                                    <div key={user._id}>
                                        <div
                                            className={style.moduleStatusCont2}
                                            onClick={() => handleUserSelect(user._id)}
                                            style={{ cursor: "pointer" }}
                                        >
                                            <div className={style.accountPreview}>
                                                <AccountPreview user={user} />
                                            </div>
                                            <div className={style.userName}>
                                                {user.name}
                                            </div>
                                            <div className={style.moduleStatus}>
                                                <CourseStatus user={user} modules={modules} />
                                            </div>
                                        </div>
                                        {selectedUserId === user._id && (
                                            <div className={style.userResults}>
                                                <ResultsView userId={user._id} />
                                            </div>
                                        )}
                                    </div>
                                ))}
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

export default AdminPage;