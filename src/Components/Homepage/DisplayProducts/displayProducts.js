import React, { useEffect, useState } from 'react';
import styles from './displayProducts.module.css';
import AddToCart from '../../Others/AddToCart/addToCart';
import ProductsTemplateAll from '../ProductsTemplates/productsTemplateAll';

function DisplayProducts ( { category, data, cartStorage } ) {

    const [product, setProduct] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        fetch(`https://karkhana-server.onrender.com/products/${category}`)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            setIsLoading(false);
            if (data.data) {
                setProduct(data.data);
            }
        })
        .catch(err => {
            setIsLoading(false);
            console.log(err);
        })
    }, [])

    let displayProducts = null;

    //if there is products then it will iterate through and render them in the display
    if (product.length){
        displayProducts = product.map(products => <div key={products._id} className={styles.productContainer}>
            <a href={`/products/${category}/${products.name}`} className={styles.productLink}>
                <div className={styles.productsImgContainer}>
                    <img src={products.img[0]} alt={products.name} className={styles.productsImg}/>
                    <div className={styles.addToCartContainer}>
                        <AddToCart context={data} cartStorage={cartStorage} product={products} amount={1}/>
                    </div>
                </div>
            </a>
            <div className={styles.productDetails}>
                <a href={`/products/${category}/${products.name}`} className={styles.productsName}>{products.name}</a>
                <p className={styles.productPrice}>	&#2547; {products.price}</p>
            </div>
        </div>)
    }
    else if (isLoading){
        displayProducts = <ProductsTemplateAll item={8}/>
    }
    else {
        displayProducts = <h3>Nothing to display</h3>
    }

    return (
        <div className={styles.productMain}>
            {displayProducts}
        </div>
    )
}

export default DisplayProducts;
