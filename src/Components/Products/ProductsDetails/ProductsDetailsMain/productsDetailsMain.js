import React, { useEffect, useRef, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import styles from './productsDetailsMain.module.css';
import AdditionalDetails from "../AdditionalDetails/additionalDetails";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ContextProvider } from "../../../Others/AuthContext/authContext";
import ProductsDetailsTemplate from "../ProductsDetailsTemplate/productsDetailsTemplate";
import ProductsDetailsItemDisplay from "../ProductsDetailsItemDisplay/productsDetailsItemDisplay";
import OtherProducts from "../OtherProducts/otherProducts";

const ProductsDetailsMain = () => {

    const context = useContext(ContextProvider);

    const relatedItemRef = useRef(null);

    const { category, productId } = useParams();

    const [item, setItem] = useState([]);

    const [additionalImg, setAdditionalImg] = useState(0);

    const [relatedItem, setRelatedItem] = useState([]);

    const [quantity, setQuantity] = useState(0);

    const cartItemStorage = sessionStorage.getItem('cart') ? JSON.parse(sessionStorage.getItem('cart')) : null;

    const user = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')) : {};

    // this hook separate the products into different category and store them into local state
    useEffect(() => {
        window.scrollTo(0, 0);
        fetch(`https://karkhana-server.onrender.com/product/${category}`)
        .then(res => res.json())
        .then(data => {
            //here we seaprate products into different category
            if (data.data){
                let filteredProducts;
                const relatedProducts = [];
    
                data.data.forEach((item, idx) => {
                    if (item.name === productId){
                        return filteredProducts = item;
                    }
                    else {
                        return relatedProducts.push(item);
                    }
                })
                setItem(filteredProducts);
                setRelatedItem(relatedProducts);
            }
        }).catch(err => console.log(err));
    }, []);

    //default product template
    let displayProduct = <ProductsDetailsTemplate />

    //display products
    if (item.name){
        displayProduct = <ProductsDetailsItemDisplay item={item}
                                                     additionalImg={additionalImg}
                                                     changeAdditionalImg={setAdditionalImg}
                                                     quantity={quantity}
                                                     changeQuantity={setQuantity}
                                                     context={context}
                                                     cartItemStorage={cartItemStorage}/>
    }

    //if no related or other products found
    let relatedProducts = <div className={styles.relatedProductsContainer}>
        <h2 className={styles.defaultHeadings}>No Products Found</h2>
    </div>

    //display related or other products found
    if (relatedItem.length){
        relatedProducts = <OtherProducts product={relatedItem} />
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
        </div>
        </>
    )
}

export default ProductsDetailsMain;
