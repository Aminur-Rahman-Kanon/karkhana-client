import React from 'react';
import styles from './displayDefaultProduct.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

function DisplayDefaultProduct () {

    const displayDefaultProduct = Array.from(Array(8).keys()).map(item => {
        return <div key={item} className={styles.defaultProductsItem} id={styles.loader}>
        <div className={styles.defaultImgContainer}>
            <FontAwesomeIcon icon={faSpinner} spinPulse className={styles.spinnerPulse} />
        </div>
        <div className={styles.loadingName}></div>
        <div className={styles.loadingLink}></div>
    </div>
    });

    return (
        <div className={styles.defaultProductContainer}>
            {displayDefaultProduct}
        </div>
    )
}

export default DisplayDefaultProduct
