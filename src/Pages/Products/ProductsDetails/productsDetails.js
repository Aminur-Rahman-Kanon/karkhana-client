import React, { useEffect, useRef, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faStar, faAngleDown, faAngleUp, faEye, faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import styles from './productsDetails.module.css';
import AdditionalDetails from "./AdditionalDetails/additionalDetails";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ContextApi } from "../../../App";
import { addToCart } from "../../Others/HelperFunction/helperFunction";

const ProductsDetails = () => {

    const context = useContext(ContextApi);

    const relatedItemRef = useRef(null);

    const otherItemRef = useRef(null);

    const { productId, productDetails } = useParams();

    const [item, setItem] = useState([]);

    const [relatedItem, setRelatedItem] = useState([]);

    const [status, setStatus] = useState('');

    const [error, setError] = useState(false);

    const [quantity, setQuantity] = useState(0);

    const cartItemStorage = sessionStorage.getItem('cart') ? JSON.parse(sessionStorage.getItem('cart')) : null;

    const user = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')) : {};

    useEffect(() => {
        window.scrollTo(0, 0);

        fetch(`https://karkhana-server.onrender.com/products/${productId}`)
        .then(res => res.json()).then(data => {
            if (data.status === 'success' && data.data.length){
                const filteredItem = [];
                const relatedItem = [];

                console.log(data);

                data.data.map(item => {
                    if (item.name === productDetails){
                        return filteredItem.push(item);
                    }
                    else {
                        return relatedItem.push(item);
                    }
                })

                setItem(filteredItem);
                setRelatedItem(relatedItem);
            }
        })
        .catch(err => setError(true));
    }, []);

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
            <div className={styles.productsDetails} style={{fontSize: '20px'}}>{item[0].name}</div>
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

            <div className={styles.productsDetails}><span className={styles.currency}>&#2547; </span>{item[0].price}</div>
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
                <button disabled={!quantity}
                        className={styles.productDetailsBtn}
                        id={styles.cartBtn}
                        onClick={(e) => addToCart(e, context, cartItemStorage, item[0], quantity) }
                        >Add to Cart</button>
                <button className={styles.productDetailsBtn}>+ Wishlist</button>
            </div>
        </div>
    </div>
    }

    let relatedProducts = <div className={styles.relatedProductsContainer}>
        <h2 className={styles.defaultHeadings}>No Products Found</h2>
    </div>

    let otherProducts = <div className={styles.relatedProductsContainer}>
        <h2 className={styles.defaultHeadings}>No Products Found</h2>
        </div>

    if (relatedItem.length){
        relatedProducts = relatedItem.map(products => {
            return <div key={products._id} className={styles.relatedProduct}>
                <a href={`https://karkhana.onrender.com/${productId}/${products.name}`} className={styles.relatedProductLink}>
                    <div className={styles.relatedProductImgContainer}>
                        <img src={products.img} alt={products.name} className={styles.relatedProductImg}/>
                    </div>
                    <div className={styles.relatedProductDetailsContainer}>
                        <h3 className={styles.relatedProductDetailsHeader}>{products.name}</h3>
                        <p className={styles.relatedProductDetailsP}>&#2547; {products.price}</p>
                    </div>
                </a>
            </div>
        })

        otherProducts = relatedItem.slice(-8).map(products => {
            return <div key={products._id} className={styles.relatedProduct}>
                <a href={`https://karkhana.onrender.com/${productId}/${products.name}`} className={styles.relatedProductLink}>
                    <div className={styles.relatedProductImgContainer}>
                        <img src={products.img} alt={products.name} className={styles.relatedProductImg}/>
                    </div>
                    <div className={styles.relatedProductDetailsContainer}>
                        <h3 className={styles.relatedProductDetailsHeader}>{products.name}</h3>
                        <p className={styles.relatedProductDetailsP}>&#2547; {products.price}</p>
                    </div>
                </a>
            </div>
        })
    }

    return (
        <>
        <ToastContainer autoClose={1000}
                        limit={5}/>
        <div className={styles.productsDetailsMain}>
            <section className={styles.productsDetailsContainer}>
                {displayProduct}
            </section>
            <AdditionalDetails />

            <section className={styles.relatedProductsMain}>
                <h2 className={styles.relatedProductsHeader}>Related Products</h2>
                <div className={styles.relatedItemsItemContainer} ref={relatedItemRef}>
                    {relatedProducts}
                </div>
                <div className={styles.pagintaionContainer}>
                    <button disabled={!relatedItem.length} className={styles.angleIconContainer} onClick={() => relatedItemRef.current.scrollBy(-270, 0)}>
                        <FontAwesomeIcon icon={faAngleLeft} className={styles.angleIcon}/>
                    </button>

                    <button disabled={!relatedItem.length} className={styles.angleIconContainer} onClick={() => relatedItemRef.current.scrollBy(270, 0)}>
                        <FontAwesomeIcon icon={faAngleRight} className={styles.angleIcon}/>
                    </button>
                </div>
            </section>

            <section className={styles.relatedProductsMain}>
                <h2 className={styles.relatedProductsHeader}>Customers Also Viewed</h2>
                <div className={styles.relatedItemsItemContainer} ref={otherItemRef}>
                    {otherProducts}
                </div>
                <div className={styles.pagintaionContainer}>
                    <button disabled={!relatedItem.length} className={styles.angleIconContainer} onClick={() => otherItemRef.current.scrollBy(-270, 0)}>
                        <FontAwesomeIcon icon={faAngleLeft} className={styles.angleIcon}/>
                    </button>

                    <button disabled={!relatedItem.length} className={styles.angleIconContainer} onClick={() => otherItemRef.current.scrollBy(270, 0)}>
                        <FontAwesomeIcon icon={faAngleRight} className={styles.angleIcon}/>
                    </button>
                </div>
            </section>
        </div>
        </>
    )
}

export default ProductsDetails;
