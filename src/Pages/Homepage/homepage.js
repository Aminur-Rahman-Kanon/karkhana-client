import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import styles from './homepage.module.css';
import bracelet from '../../Assets/bracelet.jpg';
import others from '../../Assets/nepali.jpg';
import fingerRing from '../../Assets/fingerRing.jpg';
import earRing from '../../Assets/earRing.jpg';
import necklace from '../../Assets/necklace.jpg';
import toeRing from '../../Assets/toeRing.jpg';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import Banner from "./banner/banner";
import { ToastContainer, toast } from 'react-toastify';
import { ContextApi } from "../../App";
import { addToCart } from "../Others/HelperFunction/helperFunction";


const itemCategories = [
    {item: 1, img: bracelet, routeName: 'bracelet', name: 'Bracelet'},
    {item: 2, img: others, routeName: 'other', name: 'Others'},
    {item: 3, img: fingerRing, routeName: 'fingerring', name: 'Finger Rings'},
    {item: 4, img: earRing, routeName: 'earring', name: 'Ear Rings'},
    {item: 5, img: necklace, routeName: 'necklace', name: 'Necklaces'},
    {item: 6, img: toeRing, routeName: 'toering', name: 'Toe Rings'},
]

const Homepage = () => {

    const context = useContext(ContextApi);

    const [featuredProducts, setFeaturedProducts] = useState([]);

    const [exclusiveProducts, setExclusiveProducts] = useState([]);

    const [trendingProducts, setTrendingProducts] = useState([]);

    const [topSeller, setTopSeller] = useState([]);

    const cartItemStorage = sessionStorage.getItem('cart') ? JSON.parse(sessionStorage.getItem('cart')) : null;

    useEffect(() => {
        if (context.data !== undefined){
            setFeaturedProducts(context.data.featured);
            setExclusiveProducts(context.data.exclusive)
            setTrendingProducts(context.data.trending);
            setTopSeller(context.data.topseller);
        }
    }, [context.data])

    let displayFeaturedProducts = Array.from(Array(8).keys()).map(item => {
        return <div key={item} className={styles.defaultProductsItem} id={styles.loader}>
        <div className={styles.defaultImgContainer}>
            <FontAwesomeIcon icon={faSpinner} spinPulse className={styles.spinnerPulse} />
        </div>
        <div className={styles.loadingName}></div>
        <div className={styles.loadingLink}></div>
    </div>
    });

    let topSellers = Array.from(Array(8).keys()).map(item => {
        return <div key={item} className={styles.defaultProductsItem} id={styles.loader}>
        <div className={styles.defaultImgContainer}>
            <FontAwesomeIcon icon={faSpinner} spinPulse className={styles.spinnerPulse} />
        </div>
        <div className={styles.loadingName}></div>
        <div className={styles.loadingLink}></div>
    </div>
    });

    let trendingCategories = Array.from(Array(8).keys()).map(item => {
        return <div key={item} className={styles.defaultProductsItem} id={styles.loader}>
        <div className={styles.defaultImgContainer}>
            <FontAwesomeIcon icon={faSpinner} spinPulse className={styles.spinnerPulse} />
        </div>
        <div className={styles.loadingName}></div>
        <div className={styles.loadingLink}></div>
    </div>
    });

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
        displayFeaturedProducts = featuredProducts.map(products => {
            return <div key={products._id} className={styles.featuredProductsItem}>
                <a href={`/products/featured/${products.name}`} className={styles.featuredProductLink}>
                    <div className={styles.productsImgContainer}>
                        <img src={products.img[0]} alt={products.name} className={styles.productsImg}/>
                    </div>
                    <div className={styles.addToCartContainer} onClick={(e) => addToCart(e, context, cartItemStorage, products, 1) }>
                        <FontAwesomeIcon icon={faCartShopping} className={styles.shoppingIcon}/>
                        <p className={styles.shoppingP}>Add To Cart</p>
                    </div>
                </a>
                <div className={styles.productDetails}>
                    <a href={`/products/featured/${products.name}`} className={styles.productsName}>{products.name}</a>
                    <p className={styles.productPrice}>	&#2547; {products.price}</p>
                </div>
            </div>
        })
    }
    if (trendingProducts.length){
        trendingCategories = trendingProducts.map(products => {
            return <div key={products._id} className={styles.featuredProductsItem}>
                <a href={`/products/trending/${products.name}`} className={styles.featuredProductLink}>
                    <div className={styles.productsImgContainer}>
                        <img src={products.img[0]} alt={products.name} className={styles.productsImg}/>
                        <div className={styles.addToCartContainer} onClick={(e) => addToCart(e, context, cartItemStorage, products, 1) }>
                            <FontAwesomeIcon icon={faCartShopping} className={styles.shoppingIcon}/>
                            <p className={styles.shoppingP}>Add To Cart</p>
                        </div>
                    </div>
                </a>
                <div className={styles.productDetails}>
                    <a href={`/products/trending/${products.name}`} className={styles.productsName}>{products.name}</a>
                    <p className={styles.productPrice}>	&#2547; {products.price}</p>
                </div>
            </div>
        })
    }

    if (topSeller.length){
        topSellers = topSeller.map(products => {
            return <div key={products._id} className={styles.featuredProductsItem}>
                <a href={`/products/topseller/${products.name}`} className={styles.featuredProductLink}>
                    <div className={styles.productsImgContainer}>
                        <img src={products.img[0]} alt={products.name} className={styles.productsImg}/>
                        <div className={styles.addToCartContainer} onClick={(e) => addToCart(e, context, cartItemStorage, products, 1) }>
                            <FontAwesomeIcon icon={faCartShopping} className={styles.shoppingIcon}/>
                            <p className={styles.shoppingP}>Add To Cart</p>
                        </div>
                    </div>
                </a>
                <div className={styles.productDetails}>
                    <a href={`/products/topseller/${products.name}`} className={styles.productsName}>{products.name}</a>
                    <p className={styles.productPrice}>	&#2547; {products.price}</p>
                </div>
            </div>
        })
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
                
                <div className={styles.featuredProductsContainer}>
                    {displayFeaturedProducts}
                </div>
            </section>

            <section className={styles.featuredProducts}>
                <h2 className={styles.featuredProductsH2}>Trending Categories</h2>
                
                <div className={styles.featuredProductsContainer}>
                    {trendingCategories}
                </div>
            </section>

            <section className={styles.featuredProducts}>
                <h2 className={styles.featuredProductsH2}>Top Sellers</h2>
                
                <div className={styles.featuredProductsContainer}>
                    {topSellers}
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

export default Homepage;
