import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCartShopping } from '@fortawesome/free-solid-svg-icons';
import styles from './shoppingCart.module.css';
import { Link } from "react-router-dom";

const ShoppingCart = () => {

    return (
        <div className={styles.shoppingCartMain}>
            <Link to="/login" className={styles.shoppingCartItem}>
                <FontAwesomeIcon icon={faUser} className={styles.shoppingCartIcon}/>
            </Link>
            <Link to="" className={styles.shoppingCartItem}>
                <FontAwesomeIcon icon={faCartShopping} className={styles.shoppingCartIcon}/>
            </Link>
        </div>
    )
}

export default ShoppingCart;
