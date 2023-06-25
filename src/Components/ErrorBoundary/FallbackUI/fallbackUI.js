import React from 'react';
import styles from './fallbackUI.module.css';
import logo from '../../../Assets/logo.jpg';

function FallbackUI() {
    return (
        <div className={styles.fallbackContainer}>
            <div className={styles.logoContainer}>
                <img src={logo} className={styles.logo} />
            </div>
            <h2>Something went wrong</h2>
            <p>We are trying to fix it ASAP</p>
            <a href="/" className={styles.fallbackBtn}>Return to the Homepage</a>
        </div>
    )
}

export default FallbackUI;
