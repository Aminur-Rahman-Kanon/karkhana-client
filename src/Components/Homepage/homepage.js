import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import styles from './homepage.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import Banner from "./banner/banner";
import { ToastContainer, toast } from 'react-toastify';
import { ContextProvider } from "../Others/AuthContext/authContext";
import DisplayProducts from "./DisplayProducts/displayProducts";
import DisplayDefaultProduct from "./DisplayDefaultProduct/displayDefaultProduct";
import { itemCategories } from "../../data/data";

const Homepage = () => {

    const context = useContext(ContextProvider);

    const [featuredProducts, setFeaturedProducts] = useState([]);

    const [exclusiveProducts, setExclusiveProducts] = useState([]);

    const [trendingProducts, setTrendingProducts] = useState([]);

    const [topSellerProducts, setTopSellerProducts] = useState([]);

    const cartItemStorage = sessionStorage.getItem('cart') ? JSON.parse(sessionStorage.getItem('cart')) : null;

    useEffect(() => {
        if (context.data !== undefined){
            setFeaturedProducts(context.data.featured);
            setExclusiveProducts(context.data.exclusive)
            setTrendingProducts(context.data.trending);
            setTopSellerProducts(context.data.topseller);
        }
    }, [context.data])

    let displayFeatured = <DisplayDefaultProduct />

    let displayTopSeller = <DisplayDefaultProduct />

    let displayTrending = <DisplayDefaultProduct />

    let exclusiveItem = <div className={styles.defaultExclusiveItems}>
        <div className={styles.defaultExclusiveItem}>
                <div className={styles.defaultExclusiveItemImgContainer}>
                    <FontAwesomeIcon icon={faSpinner} spinPulse className={styles.spinnerPulse} />
                </div>
                <div className={styles.defaultExclusiveName}></div>
                <div className={styles.defaultExclusiveLink}></div>
            </div>
            <div className={styles.defaultExclusiveItem}>
                <div className={styles.defaultExclusiveItemImgContainer}>
                    <FontAwesomeIcon icon={faSpinner} spinPulse className={styles.spinnerPulse} />
                </div>
                <div className={styles.defaultExclusiveName}></div>
                <div className={styles.defaultExclusiveLink}></div>
            </div>
    </div>;

    if (featuredProducts.length) {
        displayFeatured = <DisplayProducts product={featuredProducts}
                                                   data={context}
                                                   cartItem={cartItemStorage}
                                                   route={'featured'}/>
    }
    if (trendingProducts.length){
        displayTrending = <DisplayProducts product={trendingProducts}
                                              data={context}
                                              cartItem={cartItemStorage}
                                              route={'trending'}/>
    }

    if (topSellerProducts.length){
        displayTopSeller = <DisplayProducts product={topSellerProducts}
                                      data={context}
                                      cartItem={cartItemStorage}
                                      route={'topseller'}/>
    }

    let itemCategory = itemCategories.map(item => {
        return <Link key={item.item} to={`/products/${item.routeName}`} className={styles.itemCategory}>
            <div className={styles.itemCategoryImgContainer}>
                <img src={item.img} alt={item.name} className={styles.itemCategoryImg}/>
            </div>
            <p className={styles.itemCategoryP}>{item.name}</p>
        </Link>
    })

    if (exclusiveProducts.length){
        exclusiveItem = exclusiveProducts.map(exclusiveItem => {
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
    
    return (
        <>
        <ToastContainer autoClose={1500} limit={5} />
        <div className={styles.homepageMain}>
            <Banner />

            <section className={styles.itemCategoryContainer}>
                <h2 className={styles.featuredProductsH2}>Categories</h2>
                <div className={styles.itemCategories}>
                    {itemCategory}
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

export default Homepage;
