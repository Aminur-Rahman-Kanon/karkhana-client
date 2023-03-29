import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from './homepage.module.css';
import bracelet from '../../Assets/bracelet.png';
import others from '../../Assets/charms.png';
import fingerRing from '../../Assets/ring.png';
import earRing from '../../Assets/earRing.png';
import necklace from '../../Assets/necklace.png';
import toeRing from '../../Assets/daimond.png';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import Banner from "./banner/banner";


const itemCategories = [
    {item: 1, id: 'bracelet', img: bracelet, name: 'Bracelet'},
    {item: 2, id: 'others', img: others, name: 'Others'},
    {item: 3, id: 'finger-rings', img: fingerRing, name: 'Finger Ring'},
    {item: 4, id: 'ear-rings', img: earRing, name: 'Ear Ring'},
    {item: 5, id: 'necklace', img: necklace, name: 'Necklace'},
    {item: 6, id: 'toe-rings', img: toeRing, name: 'Toe Ring'},
]

const Homepage = () => {

    const [featuredProducts, setFeaturedProducts] = useState([]);

    useEffect(() => {
        fetch('https://karkhana-server.onrender.com/featuredProducts').then(res => res.json()).then(data => {
            if (data.status === 'success'){
                setFeaturedProducts(data.data);
            }
        }).catch(err => console.log(err))
    }, [])

    let displayFeaturedProducts = Array.from(Array(6).keys()).map(item => {
        return <div key={item} className={styles.featuredProductsItem} id={styles.loader}>
        <div className={styles.productsImgContainer}>
            <FontAwesomeIcon icon={faSpinner} spinPulse className={styles.spinnerPulse} />
        </div>
        <div className={styles.loadingName}></div>
        <div className={styles.loadingLink}></div>
    </div>
    });

    let topSellers = Array.from(Array(6).keys()).map(item => {
        return <div key={item} className={styles.featuredProductsItem} id={styles.loader}>
        <div className={styles.productsImgContainer}>
            <FontAwesomeIcon icon={faSpinner} spinPulse className={styles.spinnerPulse} />
        </div>
        <div className={styles.loadingName}></div>
        <div className={styles.loadingLink}></div>
    </div>
    });

    let trendingCategories = Array.from(Array(6).keys()).map(item => {
        return <div key={item} className={styles.featuredProductsItem} id={styles.loader}>
        <div className={styles.productsImgContainer}>
            <FontAwesomeIcon icon={faSpinner} spinPulse className={styles.spinnerPulse} />
        </div>
        <div className={styles.loadingName}></div>
        <div className={styles.loadingLink}></div>
    </div>
    });

    if (featuredProducts.length) {
        displayFeaturedProducts = featuredProducts.slice(0, 6).map(products => {
            return <div key={products._id} className={styles.featuredProductsItem}>
                <div className={styles.productsImgContainer}>
                    <img src={products.img} alt={products.name} className={styles.productsImg}/>
                </div>
                <h3 className={styles.productsName}>{products.name}</h3>
                <p className={styles.productPrice}>৳ {products.price}</p>
                <Link to="" className={styles.productsLink}>Buy Now</Link>
            </div>
        })

        
        trendingCategories = featuredProducts.slice(6, 12).map(products => {
            return <div key={products._id} className={styles.featuredProductsItem}>
                <div className={styles.productsImgContainer}>
                    <img src={products.img} alt={products.name} className={styles.productsImg}/>
                </div>
                <h3 className={styles.productsName}>{products.name}</h3>
                <p className={styles.productPrice}>৳ {products.price}</p>
                <Link to="" className={styles.productsLink}>Buy Now</Link>
            </div>
        })

        topSellers = featuredProducts.slice(12, 18).map(products => {
            return <div key={products._id} className={styles.featuredProductsItem}>
                <div className={styles.productsImgContainer}>
                    <img src={products.img} alt={products.name} className={styles.productsImg}/>
                </div>
                <h3 className={styles.productsName}>{products.name}</h3>
                <p className={styles.productPrice}>৳ {products.price}</p>
                <Link to="" className={styles.productsLink}>Buy Now</Link>
            </div>
        })
    }

    let itemCategory = itemCategories.map(item => {
        return <Link key={item.item} to={`/${item.id}`} className={styles.itemCategory}>
            <div className={styles.itemCategoryImgContainer}>
                <img src={item.img} alt={item.name} className={styles.itemCategoryImg}/>
            </div>
            <p className={styles.itemCategoryP}>{item.name}</p>
        </Link>
    })
    
    return (
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
                    <div className={styles.exclusiveItem}>
                        <div className={styles.exclusiveItemImgContainer}>
                            <img src="https://karkhana-server.onrender.com/assets/products/exclusive/exclusive1.jpg" alt="karkhana exclusive item" className={styles.exclusiveItemImg}/>
                            <div className={styles.exclusiveItemHeader}>
                                <h2>Exclusive Item 1</h2>
                            </div>
                        </div>
                        <span className={styles.exclusiveItemP}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</span>
                        <Link to="" className={styles.exclusiveLink}>SHOP NOW</Link>
                    </div>

                    <div className={styles.exclusiveItem}>
                        <div className={styles.exclusiveItemImgContainer}>
                            <img src="https://karkhana-server.onrender.com/assets/products/exclusive/exclusive2.jpg" alt="karkhana exclusive item" className={styles.exclusiveItemImg}/>
                            <div className={styles.exclusiveItemHeader}>
                                <h2>Exclusive Item 2</h2>
                            </div>
                        </div>
                        <span className={styles.exclusiveItemP}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</span>
                        <Link to="" className={styles.exclusiveLink}>SHOP NOW</Link>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Homepage;
