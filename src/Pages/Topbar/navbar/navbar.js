import React from 'react';
import logo from '../../../Assets/logo.jpg';
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faStore, faGem, faRss, faHeart, faDesktop } from '@fortawesome/free-solid-svg-icons';
import styles from './navbar.module.css';

const Navbar = () => {

    const location = useLocation().pathname;

    return (
        <div className={styles.navBarMain}>
            <div className={styles.navElements}>
                <ul className={styles.navElement}>
                    <li className={styles.navList}>
                        <a href="/" className={location === '/' ? `${styles.navItem} ${styles.navActive}` : styles.navItem}>
                            <FontAwesomeIcon icon={faHouse} className={styles.navIcon} />
                            <span className={styles.navP}>Home</span>
                        </a>
                    </li>
                    <li className={styles.navList}>
                        <a href="/shop" className={location === '/shop' ? `${styles.navItem} ${styles.navActive}` : styles.navItem}>
                            <FontAwesomeIcon icon={faStore} className={styles.navIcon} />
                            <span className={styles.navP}>Shop</span>
                        </a>
                    </li>
                    <li className={styles.navList}>
                        <a href="/products" className={location === '/products' ? `${styles.navItem} ${styles.navActive}` : styles.navItem}>
                            <FontAwesomeIcon icon={faGem} className={styles.navIcon} />
                            <span className={styles.navP}>Products</span>
                        </a>
                    </li>
                </ul>
            </div>
            <div className={styles.navElements} id={styles.logoEl}>
                <a href='/'><img src={logo} className={styles.logo}/></a>
            </div>
            <div className={styles.navElements}>
                <ul className={styles.navElement} id={styles.rightElements}>
                    <li className={styles.navList}>
                        <a href="/featured" className={location === '/featured' ? `${styles.navItem} ${styles.navActive}` : styles.navItem}>
                            <FontAwesomeIcon icon={faHeart} className={styles.navIcon} />
                            <span className={styles.navP}>Featured</span>
                        </a>
                    </li>
                    <li className={styles.navList}>
                        <a href="/blog" className={location === '/blog' ? `${styles.navItem} ${styles.navActive}` : styles.navItem}>
                            <FontAwesomeIcon icon={faRss} className={styles.navIcon} />
                            <span className={styles.navP}>Blog</span>
                        </a>
                    </li>
                    <li className={styles.navList}>
                        <a href="/about" className={location === '/about' ? `${styles.navItem} ${styles.navActive}` : styles.navItem}>
                            <FontAwesomeIcon icon={faDesktop} className={styles.navIcon} />
                            <span className={styles.navP}>About Us</span>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Navbar;
