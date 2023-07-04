import React from 'react';
import styles from './displayCartSummary.module.css';
import bkash from '../../../Assets/DisplayCart/DisplayCartSummary/bkash.png';
import visa from '../../../Assets/DisplayCart/DisplayCartSummary/visa.png';
import { Link, useNavigate } from 'react-router-dom';

function DisplayCartSummary ({items, totalPrice, discount}) {

    const navigate = useNavigate();
    
    return (
        <div className={styles.summaryContainer}>
            <div className={styles.discountContainer}>
                <p className={styles.couponP}>Have coupon?</p>
                <div className={styles.couponInputContainer}>
                    <input type="text" className={styles.couponInput} placeholder="Coupon code"/>
                    <button disabled={!Object.keys(items).length} className={styles.couponBtn}>Apply</button>
                </div>
            </div>
            <div className={styles.totalAmountItemContainer}>
                <div className={styles.totalAmountItems}>
                    <div className={styles.totalAmountItem}>
                        <span className={styles.totalAmountPrice}>Total Price:</span>
                        <span className={styles.totalAmountPrice}>&#2547;{totalPrice}</span>
                    </div>
                    <div className={styles.totalAmountItem}>
                        <span className={styles.totalAmountPrice}>Discount:</span>
                        <span className={styles.totalAmountPrice}>&#2547;{Object.keys(items).length ? discount : 0}</span>
                    </div>
                    <div className={styles.totalAmountItem}>
                        <span className={styles.totalAmountPrice}>SubTotal:</span>
                        <span className={styles.totalAmountPrice}>&#2547;{Object.keys(items).length ? totalPrice - discount : 0}</span>
                    </div>

                    <div className={styles.paymentMethodContainer}>
                        <img src={bkash} alt="bkash" className={styles.paymentMethod}/>
                        <img src={visa} alt="visa" className={styles.paymentMethod} style={{width: '120px'}}/>
                    </div>
                </div>

                <div className={styles.purchaseBtnContainer}>
                    { Object.keys(items).length ? 
                    <Link to="/checkout" className={styles.purchaseBtn}>CHECKOUT</Link> 
                    : 
                    <Link to="#" className={`${styles.purchaseBtn} ${styles.purchaseBtnDisabled}`}>CHECKOUT</Link>
                    }
                    <button className={styles.purchaseBtn}
                            onClick={() => navigate(-1)}
                            disabled={!Object.keys(items).length}
                            >CONTINUE SHOPPING
                    </button>
                </div>
            </div>
        </div>
    )
}

export default DisplayCartSummary;
