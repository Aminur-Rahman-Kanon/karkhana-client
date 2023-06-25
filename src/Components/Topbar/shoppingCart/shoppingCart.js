import React, { useEffect, useState, useContext } from "react";
import { ContextProvider } from "../../Others/AuthContext/authContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCartShopping } from '@fortawesome/free-solid-svg-icons';
import styles from './shoppingCart.module.css';
import { removeItem } from "../../Others/HelperFunction/helperFunction";

const ShoppingCart = () => {

    const context = useContext(ContextProvider);

    const [loggedInUser, setLoggedInUser] = useState({});

    const [cartItems, setCartItems] = useState({});
    
    useEffect(() => {
        const shoppingCartItems = sessionStorage.getItem('cart') ? JSON.parse(sessionStorage.getItem('cart')) : null;
        if (shoppingCartItems){
            setCartItems(shoppingCartItems);
        }
        else {
            setCartItems({});
        }
    }, [context.cartItem])

    useEffect(() => {
        if (sessionStorage.getItem('user')){
            const user = JSON.parse(sessionStorage.getItem('user'));
            setLoggedInUser(user);
        }
    }, [])

    const loginSection =  Object.keys(loggedInUser).length > 0 ? <div className={styles.userDisplayContainer}>
        <div className={styles.userProfile}>
            <p className={styles.userProfileP}>{loggedInUser.firstName}</p>
            <p className={styles.userProfileP}>{loggedInUser.lastName}</p>
        </div>
        <div className={styles.userContainers}>
            <div className={styles.userContainer}>
                <div className={styles.profileItem}>
                    <a href="/profile" className={styles.shoppingCartLink}>Profile</a>
                </div>
                <div className={styles.profileItem}>
                    <a href="/login" className={styles.shoppingCartLink}>Orders</a>
                </div>
                <button className={styles.logoutBtn} onClick={() => {
                    sessionStorage.removeItem('user');
                    sessionStorage.removeItem('cart');
                    window.location.reload();
                }}>Log out</button>
            </div>
        </div>
    </div>
    :
    <div className={styles.userDisplayContainer}>
        <FontAwesomeIcon icon={faUser} className={styles.shoppingCartIcon} style={{fontSize: '20px'}}/>
        <div className={styles.userContainers}>
            <div style={{padding: '15px', boxSizing: 'border-box'}}>
                <a href="/login" className={styles.shoppingCartLink}>Login</a>
                <a href="/register" className={styles.shoppingCartLink}>Register</a>
            </div>
        </div>
    </div>
    
    let displayCartItems = <div className={styles.displayCartItemsContainer} style={{width: '150px'}}>
        <h5 data-testid="shopping-cart" className={styles.defaultCartHeader}>Your cart is empty</h5>
    </div>

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
                            <p className={styles.displayCartItemPrice}><span>{item.length}</span> x <span>	&#2547;{item[0].price}</span></p>
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
        <div className={styles.shoppingCartMain}>
            {loginSection}
            <div className={styles.shoppingCartContainer}>
                <div className={styles.shoppingCartItem}>
                    <FontAwesomeIcon icon={faCartShopping} className={styles.shoppingCartIcon}/>
                </div>
                <span data-testid="item-count" className={styles.itemCount}>{Object.keys(cartItems).length || 0}</span>
                    {displayCartItems}
            </div>
        </div>
    )
}

export default ShoppingCart;
