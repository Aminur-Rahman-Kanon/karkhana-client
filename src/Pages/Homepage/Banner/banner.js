import React, { useEffect, useState } from "react";
import styles from './banner.module.css';
import b1 from '../../../Assets/i1.png';
import b2 from '../../../Assets/i2.png';
import b3 from '../../../Assets/i3.png';
import b4 from '../../../Assets/i4.png';
import b5 from '../../../Assets/i5.png';
import b6 from '../../../Assets/i6.png';
import b7 from '../../../Assets/i7.png';

const banner = [b1, b2, b3, b4, b5, b6, b7];


const Banner = () => {

    let [imgIndex, setImgIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            if (imgIndex >= 6){
                setImgIndex(imgIndex = 0 );
            }
            else {
                setImgIndex(imgIndex += 1);
            }
        }, 5000, imgIndex)

        return () => clearInterval(timer);
    }, [])

    useEffect(() => {
        const img = document.getElementById('img')
        img.animate([
            {transform: 'scale(0.7)'},
            {transform: 'scale(1)'}
        ], {duration: 2000, iterations: 1})
    }, [imgIndex])
    

    return (
        <div className={styles.bannerImgContainer}>
            <img src={banner[imgIndex]} className= {styles.bannerImg} id="img"/>
        </div>
    )
}

export default Banner;
