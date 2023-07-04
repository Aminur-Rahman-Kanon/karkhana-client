import React from "react";
import styles from './itemCategory.module.css';
import { itemCategories } from "../../../data/data";
import { Link } from "react-router-dom";

const ItemCategory = () => {
    return itemCategories.map(item => {
        return <Link key={item.item} to={`/products/${item.routeName}`} className={styles.itemCategory}>
            <div className={styles.itemCategoryImgContainer}>
                <img src={item.img} alt={item.name} className={styles.itemCategoryImg}/>
            </div>
            <p className={styles.itemCategoryP}>{item.name}</p>
        </Link>
    })
}

export default ItemCategory;
