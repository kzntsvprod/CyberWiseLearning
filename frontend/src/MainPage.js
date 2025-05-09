import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useModule } from "./contexts/ModuleContext";
import style from "./style/MainPage.module.css";
import Header from "./components/Header";
import Label from "./components/Label";
import logo from "./assets/logo.png";
import LogoCont from "./components/LogoCont";
import logo2 from "./assets/logo2.png";
import { useUser } from "./contexts/UserContext";

function MainPage() {
    const { modules } = useModule();
    const { user, fetchUserData } = useUser();
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredModules, setFilteredModules] = useState(modules);

    const handleModuleClick = async (modId) => {
        try {
            const response = await fetch("http://localhost:5000/api/user/view-module", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userId: user._id,
                    moduleId: modId,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Помилка сервера");
            }

            await fetchUserData();

            navigate(`/learn/${modId}`);
        } catch (err) {
            console.error("Помилка при оновленні прогресу:", err);
        }
    };

    useEffect(() => {
        // Фільтрація модулів на основі searchQuery
        if (searchQuery === "") {
            setFilteredModules(modules); // Якщо пошук порожній, вивід всіх модулів
        } else {
            setFilteredModules(
                modules.filter((mod) =>
                    mod.title.toLowerCase().includes(searchQuery.toLowerCase())
                )
            );
        }
    }, [searchQuery, modules]); // Перерахування, коли змінюється searchQuery або modules

    return (
        <div className={style.mainPage}>
            <div className={style.header}>
                <Header src={logo} showMenu={true} setSearchQuery={setSearchQuery} showSearch={true} />
            </div>
            <div className={style.main}>
                <div className={style.leftColumn}></div>
                <div className={style.middleColumn}>
                    <div className={style.mainPagePanel}>
                        <div className={style.mainPagePanel2}>
                            <div className={style.infoCont}>
                                <div className={style.info}>
                                    <div className={style.label}>
                                        <Label title={"CyberWise"} />
                                    </div>
                                    <div className={style.text}>
                                        Ласкаво просимо на CyberWise — ваш надійний супутник на орбіті цифрового всесвіту!
                                        У сучасному світі технологій важливо не лише впевнено користуватись гаджетами, але й знати, як захистити себе в інтернет-просторі. CyberWise — це освітній портал, створений для тих, хто прагне опанувати цифрову гігієну, дізнатися, як убезпечити свої дані та уникати онлайн-загроз.
                                        Наш сайт — це космічна подорож у глибини кіберпростору, де кожен модуль навчання — це зірка на вашій карті знань. Ви навчитесь створювати надійні паролі, розпізнавати фішингові атаки, захищати свої пристрої та керувати особистими даними.
                                        Пориньте у захопливий світ кібербезпеки разом із CyberWise,
                                        Вирушайте у подорож уже зараз — знання, як і космос, не мають меж!
                                    </div>
                                </div>
                            </div>
                            <div className={style.separator}></div>
                            <div className={style.modListCont}>
                                <div className={style.modList}>
                                    {filteredModules.length === 0 ? (
                                        <div></div>
                                    ) : (
                                        filteredModules.map((mod) => (
                                            <div
                                                key={mod._id}
                                                className={style.moduleItem}
                                                onClick={() => handleModuleClick(mod._id)}
                                            >
                                                <Label title={mod.title} />
                                            </div>
                                        ))
                                    )}
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

export default MainPage;