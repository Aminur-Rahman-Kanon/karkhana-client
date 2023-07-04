import React from 'react';
import styles from './orderStatus.module.css';

function OrderStatus({orders}) {

    let orderStatus = <div className={styles.orderStatusMain}>
            <h4>You dont have any orders yet</h4>
        </div>

    if (orders !== undefined){
        if (orders.products){
            orderStatus = <div className={styles.orderStatusMain}>
                <div className={styles.orderStatusHeader}>
                    <h3 className={styles.orderStatusH3}>Order ID: {orders.orderDetails.orderId}</h3>
                    <p className={styles.orderDetailsP}>Order date: {orders.orderDetails.orderDate}</p>
                    <p className={styles.orderDetailsP}>Est delivery date: {orders.orderDetails.estDeliveryDate}</p>
                </div>

                <hr className={styles.hr}/>

                <div className={styles.orderStatusContainer}>
                    {Object.keys(orders.products).map((order, idx) => 
                    <div key={idx} className={styles.productsContainer}>
                        <div className={styles.productDetailsContainer}>
                            <div className={styles.productImgContainer}>
                                <img src={orders.products[order][0].img[0]} alt={orders.products[order][0].name} className={styles.productImg} />
                            </div>
                            <div className={styles.productNameContainer}>
                                <p className={styles.productNameP}>{orders.products[order][0].name}</p>
                            </div>
                        </div>

                        <div className={styles.productPriceContainer}>
                            <h4 className={styles.productPriceH4}>&#2547;{Number(orders.products[order][0].price) * Number(orders.products[order].length)}</h4>
                            <p className={styles.productPriceP}>Qty: {orders.products[order].length}</p>
                        </div>
                    </div>)}
                </div>

                <hr className={styles.hr}/>


                <div className={styles.orderStatusTrailer}>
                    <div className={styles.paymentStatusContainer}>
                        <h4 className={styles.orderDetailsH4}>Payment</h4>
                        <p className={styles.paymentStatusP}>{orders.orderDetails.payment}</p>
                    </div>

                    <div className={styles.paymentStatusContainer}>
                        <h4 className={styles.orderDetailsH4}>Delivery</h4>
                        <p className={styles.paymentStatusP}>{orders.address.street}</p>
                        <p className={styles.paymentStatusP}>{orders.address.thana}</p>
                        <p className={styles.paymentStatusP}>{orders.address.city}</p>
                        <p className={styles.paymentStatusP}>{orders.address.zipcode}</p>
                    </div>
                </div>
            </div>
        }
    }

    
    return orderStatus;
}

export default OrderStatus;
