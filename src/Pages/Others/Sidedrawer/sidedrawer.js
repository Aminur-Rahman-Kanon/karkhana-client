import React from "react";
import Navbar from "../../Topbar/navbar/navbar";
import styles from './sidedrawer.module.css';

const Sidedrawer = ({sidedrawer}) => {

    return (
        <div className={sidedrawer ? styles.sidedrawerMain : `${styles.sidedrawerMain} ${styles.sidedrawerOff}`}>
            <Navbar />
        </div>
    )
}

export default Sidedrawer;
