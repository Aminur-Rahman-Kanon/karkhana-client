import React, { useEffect, useState, useContext } from "react";
import styles from './homepageMain.module.css';
import Banner from "../banner/banner";
import { ToastContainer, toast } from 'react-toastify';
import { ContextProvider } from "../../Others/AuthContext/authContext";
import DisplayProducts from "../DisplayProducts/displayProducts";
import DisplayExclusiveProducts from "../DisplayExclusiveProducts/displayExclusiveProducts";
import ProductsTemplateAll from "../ProductsTemplates/productsTemplateAll";
import ProductsTemplateExclusive from "../ProductsTemplates/productsTemplateExclusive";
import ItemCategory from "../ItemCategory/itemCategory";

const HomepageMain = () => {

    const context = useContext(ContextProvider);

    const [initialProducts, setinitialProducts] = useState({});

    const cartItemStorage = sessionStorage.getItem('cart') ? JSON.parse(sessionStorage.getItem('cart')) : null;

    useEffect(() => {
        fetch('https://karkhana-server.onrender.com/products/initial-products')
        .then(res => res.json())
        .then(data => setinitialProducts(data.data))
        .catch(err => console.log(err));
      }, [])

    let displayFeatured = <ProductsTemplateAll item={8} />

    let displayTopSeller = <ProductsTemplateAll item={8} />

    let displayTrending = <ProductsTemplateAll item={8} />

    //display default exclusive template
    let exclusiveItem = <ProductsTemplateExclusive />

    //rendering featured products
    if (initialProducts.featured) {
        displayFeatured = <DisplayProducts product={initialProducts.featured}
                                            data={context}
                                            cartStorage={cartItemStorage}
                                            route={'featured'}/>
    }
    //rendering trending products
    if (initialProducts.trending){
        displayTrending = <DisplayProducts product={initialProducts.trending}
                                            data={context}
                                            cartStorage={cartItemStorage}
                                            route={'trending'}/>
    }
    //rendering topSeller products
    if (initialProducts.topSeller){
        displayTopSeller = <DisplayProducts product={initialProducts.topSeller}
                                            data={context}
                                            cartStorage={cartItemStorage}
                                            route={'topseller'}/>
    }
    //rendering exclusive products
    if (initialProducts.exclusive){
        exclusiveItem = <DisplayExclusiveProducts product={initialProducts.exclusive} />
    }
    
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
            
            <section className={styles.featuredProducts}>
                <h2 className={styles.featuredProductsH2}>Featured Products</h2>
                <div className={styles.productDisplayContainer}>
                    {displayFeatured}
                </div>
            </section>

            <section className={styles.featuredProducts}>
                <h2 className={styles.featuredProductsH2}>Trending Categories</h2>
                <div className={styles.productDisplayContainer}>
                    {displayTrending}
                </div>
            </section>

            <section className={styles.featuredProducts}>
                <h2 className={styles.featuredProductsH2}>Top Sellers</h2>
                <div className={styles.productDisplayContainer}>
                    {displayTopSeller}
                </div>
            </section>

            <section className={styles.exclusiveItemContainer}>
                <h2 className={styles.featuredProductsH2}>Exclusive Items</h2>
                <div className={styles.exclusiveItems}>
                    {exclusiveItem}
                </div>
            </section>
        </div>
        </>
    )
}

export default HomepageMain;
