import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from './homepage.module.css';
import banner1 from '../../Assets/bg/bannerBg1.jpg';
import banner2 from '../../Assets/bg/bannerBg2.jpg';
import banner3 from '../../Assets/bg/bannerBg3.jpg';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight, faSpinner } from "@fortawesome/free-solid-svg-icons";

const bannerItems = [
    {item: 1, img: banner1, firstHeader: "Karkhana", secondHeader: "Free delivery inside Dhaka"},
    {item: 2, img: banner2, firstHeader: "Lorem A Cosmo", secondHeader: "Discover a World of Jewellary"},
    {item: 1, img: banner3, firstHeader: "Save Up To 30% Off", secondHeader: "Nullam aliquet vestibulum augue non varius"},
]

const Homepage = () => {

    const [featuredProducts, setFeaturedProducts] = useState([]);

    const [bannerSlice, setBannerSlice] = useState(0);

    useEffect(() => {
        fetch('https://karkhana-server.onrender.com/featuredProducts').then(res => res.json()).then(data => {
            if (data.status === 'success'){
                setFeaturedProducts(data.data);
            }
        }).catch(err => console.log(err))
    }, [])

    const displayBanner = bannerItems.slice(bannerSlice, bannerSlice + 1).map(banner => {
        return <div key={banner.item} className={styles.bannerMain}>
            <div className={styles.bannerBg}>
                <img src={banner.img} alt="karkhana" className={styles.bannerBgImg}/>
            </div>

            <div className={styles.bannerHeading}>
                <h2 className={styles.bannerH2}>{banner.firstHeader}</h2>
                <p className={styles.bannerP}>{banner.secondHeader}</p>
                <Link to="" className={styles.shoppingLink}>Shop Now</Link>
            </div>
            <div className={styles.indexContainer}>
                <div className={ bannerSlice === 0 ? `${styles.index} ${styles.active}` : styles.index}></div>
                <div className={ bannerSlice === 1 ? `${styles.index} ${styles.active}` : styles.index}></div>
                <div className={ bannerSlice === 2 ? `${styles.index} ${styles.active}` : styles.index}></div>
            </div>
            <div className={styles.paginationContainer}>
                <FontAwesomeIcon icon={faAngleLeft}
                                 className={styles.arrow}
                                 onClick={() => setBannerSlice(bannerSlice - 1)}
                                 style={bannerSlice <= 0 ? {visibility: 'hidden'} : {visibility: 'visible'}}/>
                <FontAwesomeIcon icon={faAngleRight} 
                                 className={styles.arrow}
                                 onClick={() => setBannerSlice(bannerSlice + 1)}
                                 style={bannerSlice >= 2 ? {visibility: 'hidden'} : {visibility: 'visible'}}/>
            </div>
        </div>
    })

    let displayFeaturedProducts = Array.from(Array(30).keys()).map(item => {
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

    if (featuredProducts.length) {
        displayFeaturedProducts = featuredProducts.slice(0, 15).map(products => {
            return <div key={products._id} className={styles.featuredProductsItem}>
                <div className={styles.productsImgContainer}>
                    <img src={products.img} alt={products.name} className={styles.productsImg}/>
                </div>
                <h3 className={styles.productsName}>{products.name}</h3>
                <Link to="" className={styles.productsLink}>Buy Now</Link>
            </div>
        })

        topSellers = featuredProducts.slice(15, 21).map(products => {
            return <div key={products._id} className={styles.featuredProductsItem}>
                <div className={styles.productsImgContainer}>
                    <img src={products.img} alt={products.name} className={styles.productsImg}/>
                </div>
                <h3 className={styles.productsName}>{products.name}</h3>
                <Link to="" className={styles.productsLink}>Buy Now</Link>
            </div>
        })
    }

    return (
        <div className={styles.homepageMain}>
            {displayBanner}
            
            <section className={styles.featuredProducts}>
                <h2 className={styles.featuredProductsH2}>Featured Products</h2>
                
                <div className={styles.featuredProductsContainer}>
                    {displayFeaturedProducts}
                </div>
            </section>

            <section className={styles.featuredProducts}>
                <h2 className={styles.featuredProductsH2}>Top Sellers</h2>
                
                <div className={styles.featuredProductsContainer}>
                    {topSellers}
                </div>
            </section>

            <section className={styles.exclusiveItemContainer}>
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
            </section>
        </div>
    )
}

export default Homepage;
