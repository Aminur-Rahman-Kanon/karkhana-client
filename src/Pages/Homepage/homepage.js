import React, { useEffect, useState } from "react";
import styles from './homepage.module.css';
import Banner from "./Banner/banner";
import { Link } from "react-router-dom";
import diamond from '../../Assets/daimond.png';
import necklaces from '../../Assets/necklaces.png';
import bracelet from '../../Assets/bracelet.png'
import charms from '../../Assets/charms.png'
import earRing from '../../Assets/earRing.png'
import ring from '../../Assets/ring.png'
import necklace from '../../Assets/necklace.png';
import middleIntroImg from '../../Assets/middleIntro.jpg';
import 'aos/dist/aos.css';
import Aos from "aos";

const Homepage = () => {

    const [featuredProducts, setFeaturedProducts] = useState([]);

    useEffect(() => {
        // window.scrollTo(0, 0);
        Aos.init({ duration: 1500, once: true })

        fetch('https://karkhana-server.onrender.com/featured-products').then(res => res.json()).then(data => setFeaturedProducts(data.products.featured)).catch(err => console.log(err))
    }, [])

    const featuredProductsDisplay = featuredProducts.length > 0 ? featuredProducts.map(products => {
        return <div key={products.name} className={styles.featuredProductsItem}>
            <div className={styles.featuredImgContainer}>
                <img src={products.img} alt={products.name} className={styles.featuredImg}/>
            </div>
            <div className={styles.productsDetails}>
                <p className={styles.productsDetailsP}>{products.name}</p>
                <p className={styles.productsDetailsP}>Price: {products.price} ৳</p>
            </div>
        </div>
    })
    :
    <div className={styles.featuredProductsDefault}>
        <h4 className={styles.productsDetailsH3}>No products to display</h4>
    </div>

    return (
        <div className={styles.hompageMain}>
            <div className={styles.headerIntro}>
                <div data-aos="fade-right" className={`${styles.headerIntroItems} ${styles.banner}`}>
                    <div className={styles.headerIntroItem}>
                        <h1 className={styles.headerIntroH1}>Discover a World of Jewellary</h1>
                        <p className={styles.headerIntroH4}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi convallis mauris sit amet magna suscipit rhoncus. Nulla ligula elit, pulvinar nec lectus et, dictum aliquet sapien.</p>
                        <div className={styles.codMain}>
                            <h2 className={styles.codH2}>CASH ON DELIVERY INSIDE DHAKA</h2>
                        </div>
                        <button className={styles.headerIntroBtn}>Shop now</button>
                    </div>
                </div>
                <div className={styles.headerIntroItems}>
                    <div className={styles.headerIntroItem}>
                        <Banner />
                    </div>
                </div>
            </div>

            <div className={styles.shortcutMain}>
                <div data-aos="fade-right" className={styles.shortcutItem}>
                    <div className={styles.shortcutItem1}>

                    </div>
                    <div className={styles.shortcutItemLink}>
                        <h2 className={styles.shortcutItemH2}>NEW ARRIVALS</h2>
                        <Link to="" className={styles.shortcutLink}>SHOP NOW</Link>
                    </div>
                </div>
                <div data-aos="fade-right" className={styles.shortcutItem}>
                    <div className={styles.shortcutItem2}>

                    </div>
                    <div className={styles.shortcutItemLink}>
                        <h2 className={styles.shortcutItemH2}>BEST SELLER</h2>
                        <Link to="" className={styles.shortcutLink}>SHOP NOW</Link>
                    </div>
                </div>
                <div data-aos="fade-right" className={styles.shortcutItem}>
                    <div className={styles.shortcutItem3}>

                    </div>
                    <div className={styles.shortcutItemLink}>
                        <h2 className={styles.shortcutItemH2}>CLEARENCE SALE</h2>
                        <Link to="" className={styles.shortcutLink}>SHOP NOW</Link>
                    </div>
                </div>
            </div>

            <div className={styles.shoppingCategoryMain}>
                <h1>TOP CATEGORIES</h1>
                <div data-aos="flip-left" className={styles.shoppingCategoryContainer}>
                    <div className={styles.shoppingCategoryItems}>
                        <Link to="" className={styles.shoppingCategoryItem}>
                            <img src={bracelet} className={styles.shoppingCategoryImg} />
                        </Link>
                        <p className={styles.shoppingLink}>BRACELETS</p>
                    </div>
                    <div className={styles.shoppingCategoryItems}>
                        <div className={styles.shoppingCategoryItem}>
                            <img src={charms} className={styles.shoppingCategoryImg} />
                        </div>
                        <p className={styles.shoppingLink}>CHARMS</p>
                    </div>
                    <div className={styles.shoppingCategoryItems}>
                        <div className={styles.shoppingCategoryItem}>
                            <img src={earRing} className={styles.shoppingCategoryImg} />
                        </div>
                        <p className={styles.shoppingLink}>EARRINGS</p>
                    </div>
                    <div className={styles.shoppingCategoryItems}>
                        <div className={styles.shoppingCategoryItem}>
                            <img src={necklace} className={styles.shoppingCategoryImg} />
                        </div>
                        <p className={styles.shoppingLink}>NECKLACES</p>
                    </div>
                    <div className={styles.shoppingCategoryItems}>
                        <div className={styles.shoppingCategoryItem}>
                            <img src={ring} className={styles.shoppingCategoryImg} />
                        </div>
                        <p className={styles.shoppingLink}>RINGS</p>
                    </div>
                </div>
            </div>

            <div className={styles.featuredProducts}>
                <h1 className={styles.featuredProductsH1}>FEATURED PRODUCTS</h1>
                <div className={styles.featuredProductsDisplayMain}>
                    {featuredProductsDisplay}
                </div>
            </div>

            <div className={styles.middleIntro}>
                <div className={styles.middleIntroMain}>
                    <h1 className={styles.middleIntroH1}>HANDCRAFTED & ETHICALLY SOURCED</h1>
                    <div className={styles.middleIntroContainer}>
                        <div className={styles.middleIntroItems}>
                            <div className={styles.middleIntroItemContainer}>
                                <div className={styles.middleIntroItem}>
                                    <img src={diamond} alt="karkhana specs" className={styles.middleIntroImg} />
                                    <div className={styles.middleIntroItemHeader}>
                                        <h4>FAIR PRICING</h4>
                                        <p className={styles.middleIntroP}>Nullam quis ante. Pellentesque libero tortor, tincidunt et, tinciduntamet est.In hac habitasse platea dictumst. Praesent nec nisl a purus blandit viverra</p>
                                    </div>
                                </div>
                                <div className={styles.middleIntroItem}>
                                    <img src={necklaces} alt="karkhana specs" className={styles.middleIntroImg} />
                                    <div className={styles.middleIntroItemHeader}>
                                        <h4>HIGH QUALITY</h4>
                                        <p className={styles.middleIntroP}>Nullam quis ante. Pellentesque libero tortor, tincidunt et, tinciduntamet est.In hac habitasse platea dictumst. Praesent nec nisl a purus blandit viverra</p>
                                    </div>
                                </div>
                            </div>

                            <Link to="" className={styles.middleIntroLink}>LEARN MORE</Link>
                        </div>
                        <div className={styles.middleIntroItemsBg}>
                            <img src={middleIntroImg} className={styles.middleIntroBgImg}/>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.summerCollectionMain}>
                <div data-aos="zoom-in-up" className={styles.summerCollectionContainer}>
                    <div className={styles.summerCollectionBg1}>

                    </div>
                    <div className={styles.summerCollectionItems}>
                        <h1 style={{margin: '5px', letterSpacing: '2px'}}>SUMMER COLLECTION</h1>
                        <p className={styles.summerCollectionP}>Freshwater pearl necklace and earrings</p>
                        <Link to="" className={styles.summerCollectionLink}>EXPLORE</Link>
                    </div>
                </div>
                <div data-aos="zoom-in-up" className={styles.summerCollectionContainer}>
                    <div className={styles.summerCollectionBg2}>

                    </div>
                    <div className={styles.summerCollectionItems}>
                        <h1 style={{margin: '5px', letterSpacing: '2px'}}>MAKE IT MEMORABLE</h1>
                        <p className={styles.summerCollectionP}>Freshwater pearl necklace and earrings</p>
                        <Link to="" className={styles.summerCollectionLink}>EXPLORE</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Homepage;
