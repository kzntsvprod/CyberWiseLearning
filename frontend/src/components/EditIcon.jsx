import React from "react";
import { FaPen } from "react-icons/fa";
import styles from "../style/EditIcon.module.css";

const EditIcon = (props) => {
    return (
        <div className={`${styles.wrapper} ${props.customClass || ""}`}>
            <button className={styles.editIconBase} onClick={props.onClick}>
                <FaPen className={styles.penIcon} />
            </button>
        </div>
    );
};

export default EditIcon;