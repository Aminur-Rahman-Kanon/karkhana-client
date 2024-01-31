import React from "react";
import styles from './promoteBanner.module.css';
import banner1 from '../../Assets/banner/banner1.jpg';
import banner2 from '../../Assets/banner/banner2.jpg';
import banner3 from '../../Assets/banner/banner3.jpg';

//defining an object of images to render
const imgType = {
    cat1: banner1,
    cat2: banner2,
    cat3: banner3
}

const PromoteBanner = ({ category }) => {
    //if no category bypassed then we abort rendering
    if (!category) return;

    return (
        <div data-testid='promote-banner' className={styles.bannerContainer} style={{backgroundImage: `url(${imgType[category]})`}}>
            <img src={imgType[category]} alt="banner" className={styles.bannerImg} />
        </div>
    )    
}

export default PromoteBanner;