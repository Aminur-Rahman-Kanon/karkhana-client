import React from 'react';
import styles from './displayProducts.module.css';
import { addToCart } from '../../Others/HelperFunction/helperFunction';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';

function DisplayProducts ( { product, data, cartItem, route } ) {

    if (!product.length) return;

    const displayProducts = product.map(products => <div key={products._id} className={styles.productContainer}>
        <a href={`/products/${route}/${products.name}`} className={styles.productLink}>
            <div className={styles.productsImgContainer}>
                <img src={products.img[0]} alt={products.name} className={styles.productsImg}/>
                <div className={styles.addToCartContainer} onClick={(e) => addToCart(e, data, cartItem, products, 1) }>
                    <FontAwesomeIcon icon={faCartShopping} className={styles.shoppingIcon}/>
                    <p className={styles.shoppingP}>Add To Cart</p>
                </div>
            </div>
        </a>
        <div className={styles.productDetails}>
            <a href={`/products/${route}/${products.name}`} className={styles.productsName}>{products.name}</a>
            <p className={styles.productPrice}>	&#2547; {products.price}</p>
        </div>
    </div>)

    return (
        <div className={styles.productMain}>
            {displayProducts}
        </div>
    )
}

export default DisplayProducts
