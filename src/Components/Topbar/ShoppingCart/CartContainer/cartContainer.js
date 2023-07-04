import React from 'react';
import styles from './cartContainer.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { removeItem } from '../../../Others/HelperFunction/helperFunction';

function CartContainer ({cartItems, context}) {

    let displayCartItems = <div className={styles.displayCartItemsContainer} style={{width: '150px'}}>
        <h5 data-testid="shopping-cart" className={styles.defaultCartHeader}>Your cart is empty</h5>
    </div>

    //if there is products in the cart then display it
    if (Object.keys(cartItems).length){
        displayCartItems = <div className={styles.displayCartItemsContainer}>
            <div className={styles.displayCarts}>
                {Object.values(cartItems).map((item, index) => {
                    return <div key={index} className={styles.displayCartItem}>
                        <div className={styles.displayCartItemImgContainer}>
                            <img src={item[0].img[0]} alt={item[0].name} className={styles.displayCartItemImg}/>
                         </div>   
                        <div className={styles.displayCartItemDetails}>
                            <h5 className={styles.displayCartItemName}>{item[0].name}</h5>
                            <p className={styles.displayCartItemPrice}><span>{item.length}</span> x <span>&#2547;{item[0].price}</span></p>
                            <p className={styles.displayCartItemName}>Total: &#2547;{item.length * Number(item[0].price)}</p>
                            <button className={styles.removeBtn} onClick={() => removeItem(context, cartItems, item[0].name)}>Remove</button>
                        </div>
                    </div>
                })}
            </div>
            <div className={styles.displayCartBtns}>
                <a href="/checkout" className={styles.checkoutBtn}>CHECK OUT NOW</a>
                <a href="/shopping-cart" className={styles.cartBtn}>VIEW CART</a>
            </div>
        </div>
    }

    return (
        <div className={styles.shoppingCartContainer}>
            <div className={styles.shoppingCartItem}>
                <FontAwesomeIcon icon={faCartShopping} className={styles.cartIcon}/>
            </div>
            <span data-testid="item-count" className={styles.itemCount}>{Object.keys(cartItems).length || 0}</span>
                {displayCartItems}
        </div>
    )
}

export default CartContainer;
