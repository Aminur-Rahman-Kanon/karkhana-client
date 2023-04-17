import React from "react";
import { Link } from "react-router-dom";
import styles from '../homepage.module.css';
import banner1 from '../../../Assets/bg/bannerBg1.jpg';
import banner2 from '../../../Assets/bg/bannerBg2.jpg';
import banner3 from '../../../Assets/bg/baisakh.jpg';
import { useSpringCarousel } from 'react-spring-carousel';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faAngleLeft } from "@fortawesome/free-solid-svg-icons";

const bannerItems = [
    {id: 1, img: banner1, firstHeader: "KARKHANA", secondHeader: "FREE DELIVERY INSIDE DHAKA"},
    {id: 2, img: banner2, firstHeader: "NEW ARRIVAL", secondHeader: "SHOP THE COLLECTION"},
    {id: 3, img: banner3, firstHeader: "PAHELA BAISHAKH", secondHeader: "SAVE UPTO 30%"},
]

const Banner = (img) => {

    const { carouselFragment, slideToNextItem, slideToPrevItem } = useSpringCarousel({
        withLoop: true,
        items: [
            {
                id: 1,
                renderItem: <div className={styles.bannerMain}>
                    <div className={styles.bannerBg}>
                        <img src={bannerItems[0].img} alt="karkhana" className={styles.bannerBgImg}/>
                    </div>
                
                    <div className={styles.bannerHeading}>
                        <h2 className={styles.bannerH2}>{bannerItems[0].firstHeader}</h2>
                        <p className={styles.bannerP}>{bannerItems[0].secondHeader}</p>
                        {/* <Link to="/products/latest" className={styles.shoppingLink}>Shop Now</Link> */}
                    </div>
                </div>
            },
            {
                id: 2,
                renderItem: <div className={styles.bannerMain}>
                    <div className={styles.bannerBg}>
                        <img src={bannerItems[1].img} alt="karkhana" className={styles.bannerBgImg}/>
                    </div>
                
                    <div className={styles.bannerHeading}>
                        <h2 className={styles.bannerH2}>{bannerItems[1].firstHeader}</h2>
                        <p className={styles.bannerP}>{bannerItems[1].secondHeader}</p>
                        {/* <Link to="" className={styles.shoppingLink}>Shop Now</Link> */}
                    </div>
                </div>
            },
            {
                id: 2,
                renderItem: <div className={styles.bannerMain}>
                    <div className={styles.bannerBg}>
                        <img src={bannerItems[2].img} alt="karkhana" className={styles.bannerBgImg}/>
                    </div>
                
                    <div className={styles.bannerHeading}>
                        <h2 className={styles.bannerH2}>{bannerItems[2].firstHeader}</h2>
                        <p className={styles.bannerP}>{bannerItems[2].secondHeader}</p>
                        {/* <Link to="" className={styles.shoppingLink}>Shop Now</Link> */}
                    </div>
                </div>
            }
        ]
    })

    return (
        <div className={styles.bannerContainer}>
            <div className={styles.bannerItem}>{carouselFragment}</div>
            
            <div className={styles.arrowContainer}>
                <FontAwesomeIcon icon={faAngleLeft} className={styles.arrow} onClick={slideToPrevItem} />
                <FontAwesomeIcon icon={faAngleRight} className={styles.arrow} onClick={slideToNextItem} />
            </div>
        </div>
    )
}

export default Banner;
