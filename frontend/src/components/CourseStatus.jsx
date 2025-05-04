import React from "react";
import style from "../style/CourseStatus.module.css";
import Label from "./Label";

const CourseStatus = (props) => {
    const progress =
        props.user?.viewedModules && props.modules.length > 0
            ? Math.min((props.user.viewedModules.length / props.modules.length) * 100, 100)
            : 0;

    return (
        <div>
            <div className={style.progressLabel}>
                <Label title={"Прогрес курсу"} />
            </div>
            <div className={style.progressBar}>
                <div
                    className={style.progressFill}
                    style={{ width: `${progress}%` }}
                ></div>
            </div>
        </div>
    );
};

export default CourseStatus;