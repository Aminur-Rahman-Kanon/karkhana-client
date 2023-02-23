import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCartShopping } from '@fortawesome/free-solid-svg-icons';
import styles from './shoppingCart.module.css';
import { Link } from "react-router-dom";

const ShoppingCart = () => {

    return (
        <div className={styles.shoppingCartMain}>
            <div className={styles.shoppingCartContainer}>
                <FontAwesomeIcon icon={faUser} className={styles.shoppingCartIcon}/>
                <div className={styles.userContainer}>
                    <div style={{padding: '15px', boxSizing: 'border-box'}}>
                        <a href="/login" className={styles.shoppingCartLink}>Login</a>
                        <a href="/register" className={styles.shoppingCartLink}>Register</a>
                    </div>
                </div>
            </div>
            <div className={styles.shoppingCartContainer}>
                <Link to="" className={styles.shoppingCartItem}>
                    <FontAwesomeIcon icon={faCartShopping} className={styles.shoppingCartIcon}/>
                </Link>
            </div>
        </div>
    )
}

export default ShoppingCart;
