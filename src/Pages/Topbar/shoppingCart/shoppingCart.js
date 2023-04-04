import React, { useEffect, useState, useContext } from "react";
import { ContextApi } from "../../../App";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faBagShopping } from '@fortawesome/free-solid-svg-icons';
import styles from './shoppingCart.module.css';
import { Link } from "react-router-dom";

const ShoppingCart = () => {

    const context = useContext(ContextApi);

    console.log(context);

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

    console.log(cartItems);
    console.log(context.cartItem);

    useEffect(() => {
        if (sessionStorage.getItem('user')){
            const user = JSON.parse(sessionStorage.getItem('user'));
            setLoggedInUser(user);
        }
    }, [])

    const loginSection =  Object.keys(loggedInUser).length > 0 ? <div className={styles.shoppingCartContainer}>
        <div className={styles.userProfile}>
            <p className={styles.userProfileP}>{loggedInUser.firstName}</p>
            <p className={styles.userProfileP}>{loggedInUser.lastName}</p>
        </div>
        <div className={styles.userContainers}>
            <div className={styles.userContainer}>
                <div className={styles.profileItem}>
                    {/* <FontAwesomeIcon className={styles.profileIcon} /> */}
                    <a href="/profile" className={styles.shoppingCartLink}>Profile</a>
                </div>
                <div className={styles.profileItem}>
                    {/* <FontAwesomeIcon className={styles.profileIcon} /> */}
                    <a href="/login" className={styles.shoppingCartLink}>Orders</a>
                </div>
                <button className={styles.logoutBtn} onClick={() => {
                    sessionStorage.removeItem('user');
                    window.location.reload();
                }}>Log out</button>
            </div>
        </div>
    </div>
    :
    <div className={styles.shoppingCartContainer}>
        <FontAwesomeIcon icon={faUser} className={styles.shoppingCartIcon}/>
        <div className={styles.userContainers}>
            <div style={{padding: '15px', boxSizing: 'border-box'}}>
                <a href="/login" className={styles.shoppingCartLink}>Login</a>
                <a href="/register" className={styles.shoppingCartLink}>Register</a>
            </div>
        </div>
    </div>

    const removeItem = (item)  => {
        const data = JSON.parse(sessionStorage.getItem('cart'));

        Object.keys(data).map(items => {
            if (items === item){
                data[items].pop();
                if (!data[items].length){
                    delete data[items];
                }
                sessionStorage.setItem('cart', JSON.stringify(data));
                context.setCartItem(context.cartItem + 1)
            }
        })
        if (Object.keys(data).length <= 0){
            sessionStorage.removeItem('cart');
            if (context.cartItem > 0){
                context.setCartItem(context.cartItem - 1);
            }
            else {
                context.setCartItem(context.cartItem + 1);
            }
        }
    }
    
    let displayCartItems = <div className={styles.displayCartItemsContainer} style={{width: '150px'}}>
        <h5 className={styles.defaultCartHeader}>Your cart is empty</h5>
    </div>

    if (Object.keys(cartItems).length){
        displayCartItems = <div className={styles.displayCartItemsContainer}>
            <div className={styles.displayCarts}>
                {Object.values(cartItems).map((item, index) => {
                    return <div key={index} className={styles.displayCartItem}>
                        <div className={styles.displayCartItemImgContainer}>
                            <img src={item[0].img} alt={item[0].name} className={styles.displayCartItemImg}/>
                         </div>   
                        <div className={styles.displayCartItemDetails}>
                            <h5 className={styles.displayCartItemName}>{item[0].name}</h5>
                            <p className={styles.displayCartItemPrice}><span>{item.length}</span> x <span>	&#2547; {item[0].price}</span></p>
                            <p className={styles.displayCartItemName}>Total: &#2547; {item.length * Number(item[0].price)}</p>
                            <button className={styles.removeBtn} onClick={() => removeItem(item[0].name)}>Remove</button>
                        </div>
                    </div>
                })}
            </div>
            <div className={styles.displayCartBtns}>
                <Link to="" className={styles.checkoutBtn}>CHECK OUT NOW</Link>
                <Link to="" className={styles.cartBtn}>VIEW CART</Link>
            </div>
        </div>
    }

    return (
        <div className={styles.shoppingCartMain}>
            {loginSection}
            <div className={styles.shoppingCartContainer}>
                <div className={styles.shoppingCartItem}>
                    <FontAwesomeIcon icon={faBagShopping} className={styles.shoppingCartIcon}/>
                </div>
                <span className={styles.itemCount}>{Object.keys(cartItems).length || 0}</span>
                <div className={styles.cartContainer}>
                    {displayCartItems}
                </div>
            </div>
        </div>
    )
}

export default ShoppingCart;
