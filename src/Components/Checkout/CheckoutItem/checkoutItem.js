import React from 'react';
import styles from './checkoutItem.module.css';

function CheckoutItem ({item}) {
    return <div key={item[0]._id} className={styles.orderDetailsItemContainer}>
        <div className={styles.orderDetailsItem}>
            <div className={styles.orderDetailsImgContainer}>
                <img src={item[0].img[0]} alt={item[0].name} className={styles.orderDetailsImg} />
            </div>

            <div className={styles.orderDetailsSummaryContainer}>
                <h4 className={styles.orderDetailsH4}>{item[0].name}</h4>
                <p className={styles.orderDetailsP}>{item.length} x {item[0].price}</p>
                <p className={styles.orderDetailsP}>&#2547;{item.length * Number(item[0].price)}</p>
            </div>
        </div>
    </div>
}

export default CheckoutItem;
