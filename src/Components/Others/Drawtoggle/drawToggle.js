import React from "react";
import styles from './drawToggle.module.css';

const DrawToggle = ({toggleSidedrawer}) => {
    return (
        <div data-testid="drawToggle" className={styles.drawToggleMain} onClick={ toggleSidedrawer }>
            <div className={styles.drawToggleBar}></div>
            <div className={styles.drawToggleBar}></div>
            <div className={styles.drawToggleBar}></div>
        </div>
    )
}

export default DrawToggle;
