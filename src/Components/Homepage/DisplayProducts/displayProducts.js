import React from 'react';
import styles from './displayProducts.module.css';
import AddToCart from './AddToCart/addToCart';

function DisplayProducts ( { product, data, cartItem, route } ) {

    if (!product.length) return;

    const displayProducts = product.map(products => <div key={products._id} className={styles.productContainer}>
        <a href={`/products/${route}/${products.name}`} className={styles.productLink}>
            <div className={styles.productsImgContainer}>
                <img src={products.img[0]} alt={products.name} className={styles.productsImg}/>
                <div className={styles.addToCartContainer}>
                    <AddToCart data={data} cartItem={cartItem} products={products} amount={1}/>
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
