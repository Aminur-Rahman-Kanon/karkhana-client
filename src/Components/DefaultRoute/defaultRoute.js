import React from 'react';
import styles from './defaultRoute.module.css';
import notFound from '../../Assets/DefaultRoute/404.gif';

function DefaultRoute () {
    //this will render when requested route coudn't found
    return (
        <div className={styles.defaultRouteContainer}>
            <div className={styles.defaultImgContainer}>
                <img src={ notFound } alt="default route" className={styles.defaultImg} />
            </div>
            <div className={styles.defaultDetails}>
                <h4 className={styles.defaultRouteH4}>The request url was not found on the server</h4>
            </div>
        </div>
    )
}

export default DefaultRoute;

