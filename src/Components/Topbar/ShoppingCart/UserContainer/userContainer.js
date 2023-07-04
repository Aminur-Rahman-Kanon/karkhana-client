import React from "react";
import styles from './userContainer.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from '@fortawesome/free-solid-svg-icons';

const UserContainer = ({loggedInUser}) => {

    const userContainerDisplay =  Object.keys(loggedInUser).length > 0 ? <div className={styles.userDisplayContainer}>
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
        <FontAwesomeIcon icon={faUser} className={styles.userIcon} style={{fontSize: '20px'}}/>
        <div className={styles.userContainers}>
            <div style={{padding: '15px', boxSizing: 'border-box'}}>
                <a href="/login" className={styles.shoppingCartLink}>Login</a>
                <a href="/register" className={styles.shoppingCartLink}>Register</a>
            </div>
        </div>
    </div>

    return userContainerDisplay;

}

export default UserContainer;
