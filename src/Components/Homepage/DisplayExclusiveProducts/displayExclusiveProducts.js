import React, { useEffect, useState } from "react";
import styles from './displayExclusiveProducts.module.css';
import { Link } from "react-router-dom";
import ProductsTemplateExclusive from "../ProductsTemplates/productsTemplateExclusive";

const DisplayExclusiveProducts = () => {

    const [product, setProduct] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetch('https://karkhana-server.onrender.com/products/exclusive')
        .then(res => res.json())
        .then(data => {
            setIsLoading(false);
            if (data.data){
                setProduct(data.data);
            }
        })
        .catch(err => {
            setIsLoading(false);
            console.log(err);
        })
    }, []);

    let displayProduct = null;

    if (product.length){
        displayProduct = product.map(exclusiveItem => {
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
    else if (isLoading){
        displayProduct = <ProductsTemplateExclusive />
    }
    else {
        displayProduct = <h3>Nothing to display</h3>
    }

    return displayProduct;
}

export default DisplayExclusiveProducts;
