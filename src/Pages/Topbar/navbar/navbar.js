import React from 'react';
import logo from '../../../Assets/logo.jpg';
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faStore, faGem, faRss, faHeart, faDesktop } from '@fortawesome/free-solid-svg-icons';
import styles from './navbar.module.css';

const Navbar = () => {

    const location = useLocation().pathname;

    const splitLocation = location.split('/');

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
                    <li className={styles.navList} id={styles.parentNavItem}>
                        <div className={splitLocation[1] ? splitLocation[1] === 'products' ? `${styles.navItem} ${styles.navActive}` : styles.navItem : styles.navItem}>
                            <FontAwesomeIcon icon={faGem} className={styles.navIcon} />
                            <span className={styles.navP}>Products</span>
                        </div>
                        <ul className={styles.childNavElement}>
                            <li className={styles.childNavList}>
                                <a href='/products/bracelet' className={splitLocation[2] ? splitLocation[2] === 'bracelet' ? `${styles.childNavItem} ${styles.childActive}` : styles.childNavItem : styles.childNavItem}>Bracelets</a>
                            </li>
                            <li className={styles.childNavList}>
                                <a href='/products/finger-rings' className={splitLocation[2] ? splitLocation[2] === 'finger-rings' ? `${styles.childNavItem} ${styles.childActive}` : styles.childNavItem : styles.childNavItem}>Finger Rings</a>
                            </li>
                            <li className={styles.childNavList}>
                                <a href='/products/ear-rings' className={splitLocation[2] ? splitLocation[2] === 'ear-rings' ? `${styles.childNavItem} ${styles.childActive}` : styles.childNavItem : styles.childNavItem}>Ear Rings</a>
                            </li>
                            <li className={styles.childNavList}>
                                <a href='/products/necklace' className={splitLocation[2] ? splitLocation[2] === 'necklace' ? `${styles.childNavItem} ${styles.childActive}` : styles.childNavItem : styles.childNavItem}>Necklaces</a>
                            </li>
                            <li className={styles.childNavList}>
                                <a href='/products/toe-rings' className={splitLocation[2] ? splitLocation[2] === 'toe-rings' ? `${styles.childNavItem} ${styles.childActive}` : styles.childNavItem : styles.childNavItem}>Toe Rings</a>
                            </li>
                            <li className={styles.childNavList}>
                                <a href='/products/nepali' className={splitLocation[2] ? splitLocation[2] === 'nepali' ? `${styles.childNavItem} ${styles.childActive}` : styles.childNavItem : styles.childNavItem}>Nepali</a>
                            </li>
                            <li className={styles.childNavList}>
                                <a href='/products/others' className={splitLocation[2] ? splitLocation[2] === 'others' ? `${styles.childNavItem} ${styles.childActive}` : styles.childNavItem : styles.childNavItem}>Others</a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
            <div className={styles.navElements} id={styles.logoEl}>
                <a href='/'><img src={logo} className={styles.logo}/></a>
            </div>
            <div className={styles.navElements}>
                <ul className={styles.navElement} id={styles.rightElements}>
                    <li className={styles.navList}>
                        <a href="/products/featured" className={location === '/products/featured' ? `${styles.navItem} ${styles.navActive}` : styles.navItem}>
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
