import React from 'react';
import logo from '../../../Assets/logo.jpg';
import { NavLink, useLocation } from 'react-router-dom';
import styles from './navbar.module.css';

const Navbar = () => {

    const location = useLocation().pathname;

    return (
        <div className={styles.navBarMain}>
            <div className={styles.navElements}>
                <ul className={styles.navElement}>
                    <li className={styles.navList}><a href="/" className={location === '/' ? styles.navActive : styles.navItem}>Home</a></li>
                    <li className={styles.navList}><a href="/shop" className={location === '/shop' ? styles.navActive : styles.navItem}>Shop</a></li>
                    <li className={styles.navList}><a href="/products" className={location === '/products' ? styles.navActive : styles.navItem}>Products</a></li>
                </ul>
            </div>
            <div className={styles.navElements} id={styles.logoEl}>
                <a href='/'><img src={logo} className={styles.logo}/></a>
            </div>
            <div className={styles.navElements}>
                <ul className={styles.navElement}>
                    <li className={styles.navList}><a href="/blog" className={location === '/blog' ? styles.navActive : styles.navItem}>Blog</a></li>
                    <li className={styles.navList}><a href="/featured" className={location === '/featured' ? styles.navActive : styles.navItem}>Featured</a></li>
                    <li className={styles.navList}><a href="/about" className={location === '/about' ? styles.navActive : styles.navItem}>About us</a></li>
                </ul>
            </div>
        </div>
    )
}

export default Navbar;
