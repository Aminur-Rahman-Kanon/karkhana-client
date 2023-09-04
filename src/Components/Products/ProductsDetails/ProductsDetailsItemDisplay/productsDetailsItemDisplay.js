import React from "react";
import styles from './productsDetailsItemDisplay.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faEye, faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { addToCart } from "../../../Others/HelperFunction/helperFunction";

const ProductsDetailsItemDisplay = ({item,
                                     additionalImg,
                                     changeAdditionalImg,
                                     quantity,
                                     changeQuantity,
                                     context,
                                     cartItemStorage
                                    }) => {
    if (!item) return;

    return (
        <div className={styles.displayProductContainer}>
            <div className={styles.displayProductImgsContainer}>
                <div className={styles.displayProductImgContainer}>
                    <img src={item.img[additionalImg]} alt={item.name} className={styles.displayProductImg}/>
                </div>
                <div className={styles.additionalImgsContainer}>
                    {item.img.map((img, index) => <div key={index}
                                                        className={ additionalImg === index ? `${styles.additionalImgContainer} ${styles.addImgActive}` : styles.additionalImgContainer}
                                                        onClick={() => changeAdditionalImg(index)}>
                        <img src={img} alt={item.name} className={styles.additionalImg}/>
                    </div>)}
                </div>
            </div>

            <div className={styles.sidePanelContainer}>
                <div className={styles.productsDetails} style={{fontSize: '20px'}}>{item.name}</div>
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

                <p className={styles.productsDetails}>&#2547;{item.price}</p>
                <div className={styles.availablity}>Item Available: {item.quantity ? item.quantity : 1}</div>
                <div className={styles.productDetailsContainer}>
                    <h2 className={styles.productHeader}>Details</h2>
                    <p className={styles.productDetailsP}>{item.details ? item.details : "Elevate your fashion game with our men's kurta collection. Made from premium quality fabrics, our kurtas are designed to provide maximum comfort and durability. With a wide range of colors, patterns, and designs to choose from, Experience the perfect blend of traditional elegance and modern style."}</p>
                </div>

                <div className={styles.quantityContainer}>
                    <p className={styles.quantityLabel}>Quantity</p>
                    <div className={styles.quantity}>
                        <button disabled={!quantity}
                                className={styles.quantityBtn}
                                onClick={() => changeQuantity(quantity - 1)}
                                aria-label="decrement">
                            <span className={styles.iconContainer}><FontAwesomeIcon icon={faAngleDown} className={styles.angle}/></span>
                        </button>
                        <div data-testid="item-count" className={styles.quantityAmount}>{quantity}</div>
                        <button disabled={item.quantity ? quantity >= item.quantity : false}
                                className={styles.quantityBtn}
                                onClick={() => changeQuantity(quantity + 1)}
                                aria-label="increment">
                            <span className={styles.iconContainer}><FontAwesomeIcon icon={faAngleUp} className={styles.angle}/></span>
                        </button>
                    </div>
                </div>
                <div className={styles.productDetailsBtnGroup}>
                    <button disabled={!quantity}
                            className={styles.productDetailsBtn}
                            id={styles.cartBtn}
                            onClick={(e) => addToCart(e, context, cartItemStorage, item, quantity) }
                            >Add to Cart</button>
                    <button className={styles.productDetailsBtn}>+ Wishlist</button>
                </div>
            </div>
        </div>
    )
}

export default ProductsDetailsItemDisplay;
