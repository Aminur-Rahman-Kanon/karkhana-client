import React from "react";
import styles from './displayExclusiveProducts.module.css';
import { Link } from "react-router-dom";

const DisplayExclusiveProducts = ({product}) => {
    if (!product) return;

    return product.map(exclusiveItem => {
        return <div key={exclusiveItem._id} className={styles.exclusiveItem}>
            <div className={styles.exclusiveItemImgContainer}>
                <img src={exclusiveItem.img[0]} alt={exclusiveItem.name} className={styles.exclusiveItemImg}/>
                <div className={styles.exclusiveItemHeader}>
                    <h2>{exclusiveItem.name}</h2>
                </div>
            </div>
            <div className={styles.exclusiveItemDetailsContainer}>
                <div className={styles.exclusiveItemP}>{exclusiveItem.details}</div>
                <div className={styles.exclusiveItemPrice}>	&#2547; {exclusiveItem.price}</div>
            </div>
            <Link to={`/products/exclusive/${exclusiveItem.name}`} className={styles.exclusiveLink}>SHOP NOW</Link>
        </div>
    })
}

export default DisplayExclusiveProducts;
