import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useModule } from "./contexts/ModuleContext";
import style from "./style/LearnPage.module.css";
import Header from "./components/Header";
import logo from "./assets/logo.png";
import Label from "./components/Label";
import LogoCont from "./components/LogoCont";
import logo2 from "./assets/logo2.png";
import Button from "./components/Button";
import YouTubePlayer from "./components/YouTubePlayer";
import BackButton from "./components/BackButton";

const getVideoId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
};

function LearnPage() {
    const { id } = useParams();
    const { module, moduleLoading, moduleError, setModuleById } = useModule();

    const textRef = useRef(null);
    const [pages, setPages] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);

    useEffect(() => {
        setModuleById(id);
    }, [id]);

    useEffect(() => {
        if (module?.content && textRef.current) {
            const container = textRef.current;
            const words = module.content.split(" ");
            const tempDiv = document.createElement("div");
            tempDiv.style.visibility = "hidden";
            tempDiv.style.position = "absolute";
            tempDiv.style.width = container.offsetWidth + "px";
            tempDiv.style.fontFamily = window.getComputedStyle(container).fontFamily;
            tempDiv.style.fontSize = window.getComputedStyle(container).fontSize;
            tempDiv.style.lineHeight = window.getComputedStyle(container).lineHeight;
            document.body.appendChild(tempDiv);

            let currentText = "";
            const newPages = [];

            for (let i = 0; i < words.length; i++) {
                const testText = currentText + words[i] + " ";
                tempDiv.innerText = testText;
                if (tempDiv.offsetHeight > container.offsetHeight) {
                    newPages.push(currentText.trim());
                    currentText = words[i] + " ";
                } else {
                    currentText = testText;
                }
            }

            if (currentText.trim()) {
                newPages.push(currentText.trim());
            }

            document.body.removeChild(tempDiv);
            setPages(newPages);
            setCurrentPage(0);
        }
    }, [module]);

    if (moduleLoading) return <div>Loading...</div>;
    if (moduleError) return <div>Error loading module: {moduleError.message}</div>;
    if (!module) return <div>Module not found</div>;

    return (
        <div className={style.learnPage}>
            <div className={style.header}>
                <Header src={logo} showMenu={true}/>
            </div>
            <div className={style.main}>
                <div className={style.leftColumn}>
                </div>
                <div className={style.middleColumn}>
                    <div className={style.learnPagePanel}>
                        <div className={style.learnPagePanel2}>
                            <div className={style.leftColumn2}>
                                <BackButton />
                            </div>
                            <div className={style.infoCont}>
                                <div className={style.info}>
                                    <div className={style.label}>
                                        <Label title={module.title.replace(/^Модуль №\s*\d+\s*-\s*/, "")
                                        }/>
                                    </div>
                                    <div className={style.text} ref={textRef}>
                                        {pages[currentPage] || ""}
                                    </div>
                                    <div className={style.buttonCont}>
                                        <div className={style.button1}>
                                            <Button title={"Назад"} backgroundColor={"#DEE1E6FF"} color={"black"} alignItems={"center"} onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))} />
                                        </div>
                                        <div className={style.button2}>
                                            <Button title={"Далі"} backgroundColor={"#171A1FFF"} color={"white"} alignItems={"center"} onClick={() => setCurrentPage((prev) => Math.min(prev + 1, pages.length - 1))} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={style.separator}>

                            </div>
                            <div className={style.videoCont}>
                                <div className={style.video}>
                                    {module.videoUrl && <YouTubePlayer videoId={getVideoId(module.videoUrl)} />}
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

export default LearnPage;
