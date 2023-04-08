import React, { useState } from 'react';
import styles from './checkout.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCreditCard, faMoneyBillTransfer } from '@fortawesome/free-solid-svg-icons';
import { faPaypal } from '@fortawesome/free-brands-svg-icons';
import { months } from '../../data/data';

function Checkout() {

    const [totalPrice, setTotalPrice] = useState(0);

    const itemObj = sessionStorage.getItem('cart') ? JSON.parse(sessionStorage.getItem('cart')) : null;

    const userObj = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')) : null;

    const month = months.map(mon => <option key={mon} value={mon} className={styles.otherOption}>{mon}</option>)

    let currentYear = new Date().getFullYear();

    let year = [];

    for (let i = 0; i < 15; i++){
        year.push(<option key={i} className={styles.otherOption} value={currentYear + i}>{currentYear + i}</option>)
    }

    let displayOrdersummary = <div className={styles.defaultOrdersummary}>
        <h3 className={styles.defaultHeader}>No Item</h3>
    </div>
    
    let price = 0;

    if (itemObj) {
        displayOrdersummary = Object.values(itemObj).map(item => {
            price += item.length * Number(item[0].price);
            return <div key={item[0]._id} className={styles.orderDetailsItemContainer}>
                <div className={styles.orderDetailsItem}>
                    <div className={styles.orderDetailsImgContainer}>
                        <img src={item[0].img} alt={item[0].name} className={styles.orderDetailsImg} />
                    </div>

                    <div className={styles.orderDetailsSummaryContainer}>
                        <h4 className={styles.orderDetailsH4}>{item[0].name}</h4>
                        <p className={styles.orderDetailsP}>{item.length} x {item[0].price}</p>
                        <p className={styles.orderDetailsP}>&#2547;{item.length * Number(item[0].price)}</p>
                    </div>
                </div>
            </div>
        })
    }

    console.log(userObj);

  return (
    <div className={styles.checkoutMain}>
        <div className={styles.checkoutContainer}>
            <div className={styles.paymentContainer}>
                <h2 className={styles.paymentHeader}>SELECT PAYMENT METHOD</h2>

                <div className={styles.paymentMethodBtns}>
                    <div className={`${styles.paymentBtn} ${styles.active}`}>
                        <FontAwesomeIcon icon={faCreditCard} className={styles.paymentIcon} />
                        <p className={styles.paymentP}>Credit Card</p>
                    </div>
                    <div className={styles.paymentBtn}>
                        <FontAwesomeIcon icon={faMoneyBillTransfer} className={styles.paymentIcon} />
                        <p className={styles.paymentP}>Bank Transfer</p>
                    </div>
                    <div className={styles.paymentBtn}>
                        <FontAwesomeIcon icon={faPaypal} className={styles.paymentIcon} />
                        <p className={styles.paymentP}>Paypal</p>
                    </div>
                </div>

                <div className={styles.nameContainer}>
                    <h3 className={styles.nameHeader}>NAME ON CARD</h3>  
                    <input type='text'
                           className={styles.nameInput}
                           placeholder='Name On Card' />
                </div>

                <div className={styles.nameContainer}>
                    <h3 className={styles.nameHeader}>CARD NUMBER</h3>  
                    <input type='number'
                           className={styles.nameInput}
                           placeholder='xxxx - xxxx - xxxx - xxxx' />
                </div>

                <div className={styles.otherInputContainer}>
                    <div className={styles.otherInput}>
                        <h3 className={styles.nameHeader}>MONTH</h3>
                        <select className={styles.otherSelect} defaultValue="Select Month">
                            <option disabled>Select Month</option>
                            {month}
                        </select>
                    </div>

                    <div className={styles.otherInput}>
                        <h3 className={styles.nameHeader}>YEAR</h3>
                        <select className={styles.otherSelect} defaultValue="Select Month">
                            <option disabled>Select Month</option>
                            {year}
                        </select>
                    </div>

                    <div className={styles.otherInput}>
                        <h3 className={styles.nameHeader}>CVV</h3>
                        <input type='number'
                               className={styles.nameInput}
                               placeholder='CVV'/>
                    </div>
                </div>

                <div className={styles.addressContainer}>
                    <h3 className={styles.nameHeader}>BILLING ADDRESS</h3>
                    <div className={styles.addressDetails}>
                        <p className={styles.address} style={{fontWeight: '600'}}>Name: {`${userObj.firstName} ${userObj.lastName}`}</p>
                        <p className={styles.address}>Street: {userObj.address || 'No information'}</p>
                        <p className={styles.address}>Thana: {userObj.thana || 'No information'}</p>
                        <p className={styles.address}>City: {userObj.state || 'No information'}</p>
                        <p className={styles.address}>Country: Bangladesh</p>
                    </div>
                </div>
            </div>

            <div className={styles.summaryContainer}>
                <h2 className={styles.paymentHeader}>ORDER SUMMARY</h2>
                <div className={styles.orderDetails}>
                    {displayOrdersummary}
                </div>
                <div className={styles.deliveryInformationContainer}>
                    <p className={styles.address} style={{fontWeight: '600'}}>Subtotal: &#2547;{price}</p>
                    <p className={styles.address} style={{fontWeight: '600'}}>Shipping: &#2547;120</p>
                    <h3 className={styles.totalH3}>Total: &#2547;{price + 120}</h3>
                    <h4 className={styles.deliveryInformationH4}>Estimated Delivery Date</h4>
                    <p className={styles.deliveryInformationP}>Wednesday May 12 2023</p>
                </div>
                <button className={styles.purchaseBtn}>PURCHASE NOW</button>
            </div>

        </div>
    </div>
  )
}

export default Checkout
