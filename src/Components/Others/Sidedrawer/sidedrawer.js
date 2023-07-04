import React from "react";
import Navbar from "../../Topbar/Navbar/navbar";
import styles from './sidedrawer.module.css';

const Sidedrawer = ({sidedrawer}) => {

    return (
        <div data-testid="sidedrawer" className={sidedrawer ? styles.sidedrawerMain : `${styles.sidedrawerMain} ${styles.sidedrawerOff}`}>
            <Navbar />
        </div>
    )
}

export default Sidedrawer;
