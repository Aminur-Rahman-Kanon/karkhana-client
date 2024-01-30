import React from "react";
import styles from './productsListItemDisplay.module.css';
import AddToCart from "../../../Others/AddToCart/addToCart";

const ProductsListItemDisplay = ({products, itemOffset, endOffset, category, context, cartItemStorage}) => {
    return products.slice(itemOffset, endOffset).map(item => {
        return <div data-testid='product-list-item' key={item._id} className={styles.productsContainer} id={styles.loader}>
                <a href={`/products/${category}/${item.name}`} className={styles.productsLink}>
                    <div className={styles.productsImgContainer}>
                        <img src={item.img[0]} alt={item.name} className={styles.productsImg}/>
                    </div>
                    <div className={styles.addToCartContainer}>
                        <AddToCart context={context} cartStorage={cartItemStorage} product={item} amount={1} />
                    </div>
                    <div className={styles.productsName}>{item.name}</div>
                    <div className={styles.productsPrice}>&#2547;{item.price}</div>
                </a>
            </div>
        });
}

export default ProductsListItemDisplay;
