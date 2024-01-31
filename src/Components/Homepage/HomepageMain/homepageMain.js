import React, { useEffect, useState, useContext } from "react";
import styles from './homepageMain.module.css';
import Banner from "../banner/banner";
import { ToastContainer, toast } from 'react-toastify';
import { ContextProvider } from "../../Others/AuthContext/authContext";
import DisplayProducts from "../DisplayProducts/displayProducts";
import DisplayExclusiveProducts from "../DisplayExclusiveProducts/displayExclusiveProducts";
import ItemCategory from "../ItemCategory/itemCategory";
import PromoteBanner from "../../PromoteBanner/promoteBanner";

const HomepageMain = () => {

    const context = useContext(ContextProvider);

    const cartItemStorage = sessionStorage.getItem('cart') ? JSON.parse(sessionStorage.getItem('cart')) : null;
    
    return (
        <>
        <ToastContainer autoClose={1500} limit={5} />
        <div className={styles.homepageMain}>
            <Banner />

            <section className={styles.itemCategoryContainer}>
                <h2 className={styles.featuredProductsH2}>Categories</h2>
                <div className={styles.itemCategories}>
                    <ItemCategory />
                </div>
            </section>

            <PromoteBanner category={'cat1'}/>
            
            <section className={styles.featuredProducts}>
                <h2 className={styles.featuredProductsH2}>Featured Products</h2>
                <div className={styles.productDisplayContainer}>
                    <DisplayProducts category={'featured'} data={context} cartStorage={cartItemStorage} />
                </div>
            </section>

            <PromoteBanner category={'cat2'}/>

            <section className={styles.featuredProducts}>
                <h2 className={styles.featuredProductsH2}>Trending Categories</h2>
                <div className={styles.productDisplayContainer}>
                    <DisplayProducts category={'trending'} data={context} cartStorage={cartItemStorage} />
                </div>
            </section>

            <PromoteBanner category={'cat3'}/>

            <section className={styles.featuredProducts}>
                <h2 className={styles.featuredProductsH2}>Top Sellers</h2>
                <div className={styles.productDisplayContainer}>
                    <DisplayProducts category={'top-seller'} data={context} cartStorage={cartItemStorage}/>
                </div>
            </section>

            <section className={styles.exclusiveItemContainer}>
                <h2 className={styles.featuredProductsH2}>Exclusive Items</h2>
                <div className={styles.exclusiveItems}>
                    <DisplayExclusiveProducts />
                </div>
            </section>
        </div>
        </>
    )
}

export default HomepageMain;
