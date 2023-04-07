import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from './displayCart.module.css';
import bkash from '../../Assets/bkash.png';
import visa from '../../Assets/payment.png';
import { ContextApi } from '../../App';
import { addToCart, removeItem, removeAllItem } from "../Others/HelperFunction/helperFunction";

const DisplayCart = () => {

    const context = useContext(ContextApi);

    const itemObj = sessionStorage.getItem('cart');

    const navigate = useNavigate();

    const [items, setItems] = useState({});

    const [totalPrice, setTotalPrice] = useState(0);

    const [discount, setDiscount] = useState(10);

    // useEffect(() => {
    //     console.log(document.getElementById('test').getBoundingClientRect());
    // }, [])

    useEffect(() => {
        if (itemObj !== null){
            const shoppingItems = JSON.parse(itemObj);
            setItems(shoppingItems);
            let totalPrice = 0;
            Object.values(shoppingItems).map(item => {
                totalPrice = (Number(item[0].price) * item.length) + totalPrice;
            })
            setTotalPrice(totalPrice)
        }
        else {
            setItems({});
        }
    }, [context.cartItem])

    let displayShoppingItems = null;

    if (Object.keys(items).length){
        displayShoppingItems = Object.values(items).map(item => {
            return <div key={item[0]._id} className={styles.displayCartItem}>
                <div className={styles.displayCartImgContainer}>
                    <img src={item[0].img} alt={item[0].name} className={styles.displayCartImg} />
                    <div className={styles.displayCartImgDetails}>
                        <p className={styles.displayCartP}>{item[0].name}</p>
                        <p className={styles.displayCartP}>&#2547;{item[0].price} / Item</p>
                    </div>
                </div>

                <div className={styles.panelContainer}>
                    <div className={styles.addItemContainer}>
                        <div className={styles.addItemBtns}>
                            <button className={styles.addItemBtn}
                                    onClick={(e) => addToCart(e, context, items, item[0], 1)}>+</button>
                            <span className={styles.addItemValue}><p style={{margin: '0'}}>{item.length}</p></span>
                            <button className={styles.addItemBtn}
                                    onClick={() => removeItem(context, items, item[0].name)}>-</button>
                        </div>
                    </div>
                    <div className={styles.priceContainer}>
                        <p className={styles.priceP}>&#2547; {item.length * Number(item[0].price)}</p>
                    </div>
                    <div className={styles.removeContainer}>
                        <button className={styles.removeBtn} onClick={() => removeAllItem(context, items, item[0].name)}>Remove</button>
                    </div>
                </div>
            </div>
        })
    }
    else {
        displayShoppingItems = <div className={styles.defultDisplay}>
        <h3 className={styles.defaultHeader}>Nothing to display</h3>
    </div>;
    }

    return (
        <div className={styles.displayCartContainer}>
            <div className={styles.displayCartMain}>
                <div className={styles.displayItems}>
                    <div className={styles.labelContainer}>
                        <div className={styles.label} id={styles.label1}>Product</div>
                        <div className={styles.labelGroups}>
                            <div className={styles.label} id={styles.label2}>Quantity</div>
                            <div className={styles.label} id={styles.label3}>Subtotal</div>
                            <div className={styles.label} id={styles.label4}>Action</div>
                        </div>
                    </div>
                    {displayShoppingItems}
                </div>

                <div className={styles.summaryContainer}>
                    <div className={styles.discountContainer}>
                        <p className={styles.couponP}>Have coupon?</p>
                        <div className={styles.couponInputContainer}>
                            <input type="text" className={styles.couponInput} placeholder="Coupon code"/>
                            <button className={styles.couponBtn}>Apply</button>
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
                                <span className={styles.totalAmountPrice}>&#2547;{discount}</span>
                            </div>
                            <div className={styles.totalAmountItem}>
                                <span className={styles.totalAmountPrice}>SubTotal:</span>
                                <span className={styles.totalAmountPrice}>&#2547;{totalPrice - discount}</span>
                            </div>

                            <div className={styles.paymentMethodContainer}>
                                <img src={bkash} alt="bkash" className={styles.paymentMethod}/>
                                <img src={visa} alt="visa" className={styles.paymentMethod} style={{width: '120px'}}/>
                            </div>
                        </div>

                        <div className={styles.purchaseBtnContainer}>
                            <Link to="/checkout" className={styles.purchaseBtn}>CHECKOUT</Link>
                            <button className={styles.purchaseBtn} onClick={() => navigate(-1)}>CONTINUE SHOPPING</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DisplayCart;
