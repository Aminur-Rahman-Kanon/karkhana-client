import React from 'react';
import styles from './productsTemplate.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

function ProductsTemplateAll ({item}) {

    //if there is no products found then we render a template to the UI
    const displayDefaultProduct = Array.from(Array(item).keys()).map(item => {
        return <div key={item} className={styles.defaultProductsItem} id={styles.loader}>
        <div className={styles.defaultImgContainer}>
            <FontAwesomeIcon icon={faSpinner} spinPulse className={styles.spinnerPulse} />
        </div>
        <div className={styles.loadingName}></div>
        <div className={styles.loadingLink}></div>
    </div>
    });

    // return (
    //     <div className={styles.defaultProductContainer}>
    //     </div>
    // )
    return displayDefaultProduct;
}

export default ProductsTemplateAll;
