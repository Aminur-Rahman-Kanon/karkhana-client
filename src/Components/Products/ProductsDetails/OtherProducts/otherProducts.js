import React from "react";
import styles from './otherProducts.module.css';

const OtherProducts = ({product}) => {
    return product.map(products => {
        return <div key={products._id} className={styles.relatedProduct}>
            <a href={`/products/${products.category.split(' ').join('').toLowerCase()}/${products.name}`} className={styles.relatedProductLink}>
                <div className={styles.relatedProductImgContainer}>
                    <img src={products.img[0]} alt={products.name} className={styles.relatedProductImg}/>
                </div>
                <div className={styles.relatedProductDetailsContainer}>
                    <h3 className={styles.relatedProductDetailsHeader}>{products.name}</h3>
                    <p className={styles.relatedProductDetailsP}>&#2547;{products.price}</p>
                </div>
            </a>
        </div>
    })
}

export default OtherProducts;
