import React from "react";
import { SpinnerDotted } from "spinners-react";
import styles from './spinner.module.css';

const Spinner = ({spinner}) => {
    if (!spinner) return;

    return (
        <div className={styles.spinner}>
            <SpinnerDotted size={70} thickness={100} speed={100} color="#d0b09b" secondaryColor="rgba(0, 0, 0, 0.44)" />
            <p className={styles.spinnerP}>Please wait</p>
        </div>
    )
}

export default Spinner;
