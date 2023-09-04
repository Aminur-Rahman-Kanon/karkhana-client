import React from "react";
import styles from './productsListSidebar.module.css';

const ProductsListSidebar = ({category}) => {
    return (
        <div className={styles.categoryType}>
            <h2 className={styles.categoryH2}>Categories</h2>
            <ul className={styles.sidebarLists}>
                <a href="/products/bracelet" className={styles.sidebarLink}><li className={category === 'Bracelet' ? `${styles.sidebarList} ${styles.active}` : styles.sidebarList}>Bracelets</li></a>
                <a href="/products/finger-ring" className={styles.sidebarLink}><li className={category === 'Finger Ring' ? `${styles.sidebarList} ${styles.active}` : styles.sidebarList}>Finger Rings</li></a>
                <a href="/products/ear-ring" className={styles.sidebarLink}><li className={category === 'Ear Ring' ? `${styles.sidebarList} ${styles.active}` : styles.sidebarList}>Ear Rings</li></a>
                <a href="/products/necklace" className={styles.sidebarLink}><li className={category === 'Necklace' ? `${styles.sidebarList} ${styles.active}` : styles.sidebarList}>Necklace</li></a>
                <a href="/products/toe-ring" className={styles.sidebarLink}><li className={category === 'Toe Ring' ? `${styles.sidebarList} ${styles.active}` : styles.sidebarList}>Toe Ring</li></a>
                <a href="/products/others" className={styles.sidebarLink}><li className={category === 'Other' ? `${styles.sidebarList} ${styles.active}` : styles.sidebarList}>Others</li></a>
            </ul>
        </div>
    )
}

export default ProductsListSidebar;
