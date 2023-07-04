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

    const [featuredProducts, setFeaturedProducts] = useState([]);

    const [exclusiveProducts, setExclusiveProducts] = useState([]);

    const [trendingProducts, setTrendingProducts] = useState([]);

    const [topSellerProducts, setTopSellerProducts] = useState([]);

    const cartItemStorage = sessionStorage.getItem('cart') ? JSON.parse(sessionStorage.getItem('cart')) : null;

    //saving products from context
    useEffect(() => {
        if (context.data !== undefined){
            setFeaturedProducts(context.data.featured);
            setExclusiveProducts(context.data.exclusive)
            setTrendingProducts(context.data.trending);
            setTopSellerProducts(context.data.topseller);
        }
    }, [context.data])

    let displayFeatured = <ProductsTemplateAll item={8} />

    let displayTopSeller = <ProductsTemplateAll item={8} />

    let displayTrending = <ProductsTemplateAll item={8} />

    //display default exclusive template
    let exclusiveItem = <ProductsTemplateExclusive />

    //rendering featured products
    if (featuredProducts.length) {
        displayFeatured = <DisplayProducts product={featuredProducts}
                                            data={context}
                                            cartStorage={cartItemStorage}
                                            route={'featured'}/>
    }
    //rendering trending products
    if (trendingProducts.length){
        displayTrending = <DisplayProducts product={trendingProducts}
                                            data={context}
                                            cartStorage={cartItemStorage}
                                            route={'trending'}/>
    }
    //rendering topSeller products
    if (topSellerProducts.length){
        displayTopSeller = <DisplayProducts product={topSellerProducts}
                                            data={context}
                                            cartStorage={cartItemStorage}
                                            route={'topseller'}/>
    }
    //rendering exclusive products
    if (exclusiveProducts.length){
        exclusiveItem = <DisplayExclusiveProducts product={exclusiveProducts} />
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
                {displayFeatured}
            </section>

            <section className={styles.featuredProducts}>
                <h2 className={styles.featuredProductsH2}>Trending Categories</h2>
                {displayTrending}
            </section>

            <section className={styles.featuredProducts}>
                <h2 className={styles.featuredProductsH2}>Top Sellers</h2>
                {displayTopSeller}
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