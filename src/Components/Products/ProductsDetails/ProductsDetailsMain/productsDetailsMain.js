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

    const otherItemRef = useRef(null);

    const { productId, productDetails } = useParams();

    const [item, setItem] = useState([]);

    const [additionalImg, setAdditionalImg] = useState(0);

    const [relatedItem, setRelatedItem] = useState([]);

    const [otherItem, setOtherItem] = useState([]);

    const [quantity, setQuantity] = useState(0);

    const cartItemStorage = sessionStorage.getItem('cart') ? JSON.parse(sessionStorage.getItem('cart')) : null;

    // const user = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')) : {};

    //this hook separate the products into different category and store them into local state
    useEffect(() => {
        window.scrollTo(0, 0);
        if (context.data !== undefined){
            const copiedData = JSON.parse(JSON.stringify(context.data));
            //first we check if there is blog products is present, if yes then remove it
            if (copiedData.hasOwnProperty('blog')){
                delete copiedData.blog;
            }

            //here we seaprate products into different category
            if (copiedData[productId] !== undefined){
                const product = copiedData[productId]
                delete copiedData[productId]

                let filteredProducts;
                const relatedProducts = [];
    
                product.forEach((item, idx) => {
                    if (item.name === productDetails){
                        return filteredProducts = product.splice(idx, 1);
                    }
                    else {
                        return relatedProducts.push(item);
                    }
                })

                const otherProducts = Object.values(copiedData).map(item => item.shift())
    
                setItem(filteredProducts);
                setRelatedItem(relatedProducts);
                setOtherItem(otherProducts);
            }
        }
    }, [ context.data ]);

    // //default product template
    let displayProduct = <ProductsDetailsTemplate />

    //display products
    if (item.length){
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

    let otherProducts = <div className={styles.relatedProductsContainer}>
        <h2 className={styles.defaultHeadings}>No Products Found</h2>
        </div>

    //display related or other products found
    if (relatedItem.length){
        relatedProducts = <OtherProducts product={relatedItem} />
    }

    if (otherItem.length){
        otherProducts = <OtherProducts product={otherItem} />
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

export default ProductsDetailsMain;
