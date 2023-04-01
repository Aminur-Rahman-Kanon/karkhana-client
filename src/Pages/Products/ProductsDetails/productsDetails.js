import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faStar, faAngleDown, faAngleUp, faEye, faE } from '@fortawesome/free-solid-svg-icons';
import styles from './productsDetails.module.css';
import AdditionalDetails from "./AdditionalDetails/additionalDetails";

const ProductsDetails = () => {

    const { productId, productDetails } = useParams();

    const [item, setItem] = useState([]);

    const [status, setStatus] = useState('');

    const [error, setError] = useState(false);

    const [quantity, setQuantity] = useState(0);

    useEffect(() => {
        window.scrollTo(0, 0);

        fetch(`https://karkhana-server.onrender.com/product-details/${productId}/${productDetails}`)
        .then(res => res.json()).then(product => {
            if (product.status === 'success' && product.data.length){
                setItem(product.data);
            }
            else {
                setStatus('not found');
            }
        })
        .catch(err => setError(true));
    }, [])

    let displayProduct = <div className={styles.defaultProductContainer}>
        <div className={styles.defaultImgContainer}>
            <FontAwesomeIcon icon={faSpinner} spinPulse className={styles.spinner} />
        </div>

        <div className={styles.defaultSidePanel}>
            <div className={styles.sidePanelItem}></div>
            <div className={styles.sidePanelItem}></div>
            <div className={styles.sidePanelItem}></div>
            <div className={styles.cart}></div>
            <div className={styles.details}></div>
        </div>
    </div>

    if (item.length){
        displayProduct = <div className={styles.displayProductContainer}>
        <div className={styles.displayProductImgContainer}>
            <img src={item[0].img} alt={item[0].name} className={styles.displayProductImg}/>
        </div>

        <div className={styles.sidePanelContainer}>
            <div className={styles.productsDetails} style={{fontSize: '26px'}}>{item[0].name}</div>
            <div className={styles.ratingContainer}>
                <FontAwesomeIcon icon={faStar} className={styles.star}/>
                <FontAwesomeIcon icon={faStar} className={styles.star}/>
                <FontAwesomeIcon icon={faStar} className={styles.star}/>
                <FontAwesomeIcon icon={faStar} className={styles.star}/>
                <FontAwesomeIcon icon={faStar} className={styles.star}/>
            </div>

            <div className={styles.watchListContainer}>
                <FontAwesomeIcon icon={faEye} className={styles.watchListIcon}/>
                <p className={styles.watchListP}>10 customers are watching this products</p>
            </div>

            <div className={styles.productsDetails}><span className={styles.currency}>৳</span>{item[0].price}</div>
            <div className={styles.availablity}>Available: Yes</div>
            <div className={styles.productDetailsContainer}>
                <h2 className={styles.productHeader}>Details</h2>
                <p className={styles.productDetailsP}>Elevate your fashion game with our men's kurta collection. Made from premium quality fabrics, our kurtas are designed to provide maximum comfort and durability. With a wide range of colors, patterns, and designs to choose from, Experience the perfect blend of traditional elegance and modern style.</p>
            </div>

            <div className={styles.quantityContainer}>
                <p className={styles.quantityLabel}>Quantity</p>
                <div className={styles.quantity}>
                    <button disabled={!quantity} className={styles.quantityBtn} onClick={() => setQuantity(quantity - 1)}>
                        <span className={styles.iconContainer}><FontAwesomeIcon icon={faAngleDown} className={styles.angle}/></span>
                    </button>
                    <div className={styles.quantityAmount}>{quantity}</div>
                    <button className={styles.quantityBtn} onClick={() => setQuantity(quantity + 1)}>
                        <span className={styles.iconContainer}><FontAwesomeIcon icon={faAngleUp} className={styles.angle}/></span>
                    </button>
                </div>
            </div>
            <div className={styles.productDetailsBtnGroup}>
                <button disabled={!quantity} className={styles.productDetailsBtn} id={styles.cartBtn}>Add to Cart</button>
                <button className={styles.productDetailsBtn}>+ Wishlist</button>
            </div>
        </div>
    </div>
    }

    return (
        <div className={styles.productsDetailsMain}>
            <section className={styles.productsDetailsContainer}>
                {displayProduct}
            </section>
            <AdditionalDetails />
        </div>
    )
}

export default ProductsDetails;
