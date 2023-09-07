import React from "react";
import styles from '../HomepageMain/homepageMain.module.css';
import banner1 from '../../../Assets/Homepage/Banner/banner8.jpg';
import banner2 from '../../../Assets/Homepage/Banner/banner1.jpg';
import banner3 from '../../../Assets/Homepage/Banner/banner4.jpg';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import './banner.css';

const Banner = () => {

    return (
        <section className={styles.bannerContainer}>
            <Carousel autoPlay={true}
                    infiniteLoop={true}
                    interval={5000}
                    transitionTime={1000}
                    showStatus={false}
                    showThumbs={false}
                    preventMovementUntilSwipeScrollTolerance={true}
                    swipeScrollTolerance={50}
                    className="carousel-container">
                <div className={styles.bannerMain}>
                    <div className={styles.bannerBg}>
                        <img src={banner1} alt="karkhana-slider" className={styles.bannerBgImg}/>
                    </div>
                </div>
                <div className={styles.bannerMain}>
                    <div className={styles.bannerBg}>
                        <img src={banner2} alt="karkhana-slider" className={styles.bannerBgImg}/>
                    </div>
                </div>
                <div className={styles.bannerMain}>
                    <div className={styles.bannerBg}>
                        <img src={banner3} alt="karkhana-slider" className={styles.bannerBgImg}/>
                    </div>
                </div>
            </Carousel>
        </section>
    )
}

export default Banner;
