import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCartShopping } from '@fortawesome/free-solid-svg-icons';
import styles from './shoppingCart.module.css';
import { Link } from "react-router-dom";

const ShoppingCart = () => {

    const [loggedInUser, setLoggedInUser] = useState({});

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

    return (
        <div className={styles.shoppingCartMain}>

            {loginSection}

            <div className={styles.shoppingCartContainer}>
                <Link to="" className={styles.shoppingCartItem}>
                    <FontAwesomeIcon icon={faCartShopping} className={styles.shoppingCartIcon}/>
                </Link>
            </div>
        </div>
    )
}

export default ShoppingCart;
