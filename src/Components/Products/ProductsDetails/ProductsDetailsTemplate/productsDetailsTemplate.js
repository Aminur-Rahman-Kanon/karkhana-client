import React from "react";
import styles from './productsDetailsTemplate.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const ProductsDetailsTemplate = () => {
    return (
        <div className={styles.defaultProductContainer}>
            <div className={styles.defaultImgContainer}>
                <FontAwesomeIcon icon={faSpinner} spinPulse className={styles.spinner} />
            </div>

            <div className={styles.defaultSidePanel}>
                <div className={styles.sidePanelItem}></div>
                <div className={styles.sidePanelItem}></div>
                <div className={styles.sidePanelItem}></div>
                <div className={styles.cart}></div>
                <div className={styles.details}></div>
            </div>
        </div>
    )
}

export default ProductsDetailsTemplate;
