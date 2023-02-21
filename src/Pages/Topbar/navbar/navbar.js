import React from 'react';
import logo from '../../../Assets/logo.jpg';
import { NavLink } from 'react-router-dom';
import styles from './navbar.module.css';

const Navbar = () => {

    return (
        <div className={styles.navBarMain}>
            <div className={styles.navElements}>
                <ul className={styles.navElement}>
                    <li className={styles.navList}><NavLink to="/" className={({isActive}) => isActive ? styles.navActive : styles.navItem}>Home</NavLink></li>
                    <li className={styles.navList}><NavLink to="/shop" className={({isActive}) => isActive ? styles.navActive : styles.navItem}>Shop</NavLink></li>
                    <li className={styles.navList}><NavLink to="/products" className={({isActive}) => isActive ? styles.navActive : styles.navItem}>Products</NavLink></li>
                </ul>
            </div>
            <div className={styles.navElements}>
                <img src={logo} className={styles.logo}/>
            </div>
            <div className={styles.navElements}>
                <ul className={styles.navElement}>
                    <li className={styles.navList}><NavLink to="/blog" className={({isActive}) => isActive ? styles.navActive : styles.navItem}>Blog</NavLink></li>
                    <li className={styles.navList}><NavLink to="/featured" className={({isActive}) => isActive ? styles.navActive : styles.navItem}>Featured</NavLink></li>
                    <li className={styles.navList}><NavLink to="/about" className={({isActive}) => isActive ? styles.navActive : styles.navItem}>About us</NavLink></li>
                </ul>
            </div>
        </div>
    )
}

export default Navbar;
