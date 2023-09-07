import React from 'react';
import styles from './displayProducts.module.css';
import AddToCart from '../../Others/AddToCart/addToCart';

function DisplayProducts ( { product, data, cartStorage, route } ) {

    //if there is no product then it simply return from here
    if (!product.length) return;

    //if there is products then it will iterate through and render them in the display
    const displayProducts = product.map(products => <div key={products._id} className={styles.productContainer}>
        <a href={`/products/${route}/${products.name}`} className={styles.productLink}>
            <div className={styles.productsImgContainer}>
                <img src={products.img[0]} alt={products.name} className={styles.productsImg}/>
                <div className={styles.addToCartContainer}>
                    <AddToCart context={data} cartStorage={cartStorage} product={products} amount={1}/>
                </div>
            </div>
        </a>
        <div className={styles.productDetails}>
            <a href={`/products/${route}/${products.name}`} className={styles.productsName}>{products.name}</a>
            <p className={styles.productPrice}>	&#2547; {products.price}</p>
        </div>
    </div>)

    return displayProducts;
}

export default DisplayProducts;
