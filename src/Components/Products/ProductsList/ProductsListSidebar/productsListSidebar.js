import React from "react";
import styles from './productsListSidebar.module.css';

const ProductsListSidebar = ({productId}) => {
    return (
        <div className={styles.categoryType}>
            <h2 className={styles.categoryH2}>Categories</h2>
            <ul className={styles.sidebarLists}>
                <a href="/products/Bracelet" className={styles.sidebarLink}><li className={productId === 'Bracelet' ? `${styles.sidebarList} ${styles.active}` : styles.sidebarList}>Bracelets</li></a>
                <a href="/products/Finger Ring" className={styles.sidebarLink}><li className={productId === 'Finger Ring' ? `${styles.sidebarList} ${styles.active}` : styles.sidebarList}>Finger Rings</li></a>
                <a href="/products/Ear Ring" className={styles.sidebarLink}><li className={productId === 'Ear Ring' ? `${styles.sidebarList} ${styles.active}` : styles.sidebarList}>Ear Rings</li></a>
                <a href="/products/Necklace" className={styles.sidebarLink}><li className={productId === 'Necklace' ? `${styles.sidebarList} ${styles.active}` : styles.sidebarList}>Necklace</li></a>
                <a href="/products/Toe Ring" className={styles.sidebarLink}><li className={productId === 'Toe Ring' ? `${styles.sidebarList} ${styles.active}` : styles.sidebarList}>Toe Ring</li></a>
                <a href="/products/Other" className={styles.sidebarLink}><li className={productId === 'Other' ? `${styles.sidebarList} ${styles.active}` : styles.sidebarList}>Others</li></a>
            </ul>
        </div>
    )
}

export default ProductsListSidebar;
