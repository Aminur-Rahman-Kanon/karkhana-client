import React from 'react';
import logo from '../../../Assets/Logo/logo.jpg';
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faStore, faGem, faRss, faHeart, faDesktop } from '@fortawesome/free-solid-svg-icons';
import styles from './navbar.module.css';
import bracelet from '../../../Assets/Topbar/Navbar/bracelet.jpg';
import earRing from '../../../Assets/Topbar/Navbar/earRing.jpg';
import fingerRing from '../../../Assets/Topbar/Navbar/fingerRing.jpg';
import necklace from '../../../Assets/Topbar/Navbar/necklace.jpg';
import toeRing from '../../../Assets/Topbar/Navbar/toeRing.jpg';
import nepali from '../../../Assets/Topbar/Navbar/nepali.jpg';
import others from '../../../Assets/Topbar/Navbar/other.jpg';

const Navbar = () => {

    const location = useLocation().pathname;

    //splitLocation to break url into requested pieces and use them to implement active route
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
                        <a href="/products/latest" className={location === '/products/latest' ? `${styles.navItem} ${styles.navActive}` : styles.navItem}>
                            <FontAwesomeIcon icon={faStore} className={styles.navIcon} />
                            <span className={styles.navP}>Latest</span>
                        </a>
                    </li>
                    <li data-testid="products-parent-link" className={styles.navList} id={styles.parentNavItem}>
                        <div className={styles.navItem}>
                            <FontAwesomeIcon icon={faGem} className={styles.navIcon} />
                            <span className={splitLocation[1] === 'products' && splitLocation[2] !== 'latest' && splitLocation[2] !== 'featured' ? `${styles.navP} ${styles.navActive}` : styles.navP}>Products</span>
                        </div>
                        <ul data-testid="products-childs-link" className={styles.childNavElement}>
                            <li className={styles.childNavList}>
                                <a href='/products/bracelet' className={splitLocation[2] ? splitLocation[2] === 'bracelet' ? `${styles.childNavItem} ${styles.childActive}` : styles.childNavItem : styles.childNavItem}>
                                    <img src={bracelet} alt="bracelet" className={styles.childNavImg}/>
                                    <p className={styles.childNavP}>Bracelets</p>
                                </a>
                            </li>
                            <li className={styles.childNavList}>
                                <a href='/products/finger-ring' className={splitLocation[2] ? splitLocation[2] === 'finger-ring' ? `${styles.childNavItem} ${styles.childActive}` : styles.childNavItem : styles.childNavItem}>
                                    <img src={fingerRing} alt="finger ring" className={styles.childNavImg}/>
                                    <p className={styles.childNavP}>Finger Rings</p>
                                </a>
                            </li>
                            <li className={styles.childNavList}>
                                <a href='/products/ear-ring' className={splitLocation[2] ? splitLocation[2] === 'ear-ring' ? `${styles.childNavItem} ${styles.childActive}` : styles.childNavItem : styles.childNavItem}>
                                    <img src={earRing} alt="ear ring" className={styles.childNavImg}/>
                                    <p className={styles.childNavP}>Ear Rings</p>
                                </a>
                            </li>
                            <li className={styles.childNavList}>
                                <a href='/products/necklace' className={splitLocation[2] ? splitLocation[2] === 'necklace' ? `${styles.childNavItem} ${styles.childActive}` : styles.childNavItem : styles.childNavItem}>
                                    <img src={necklace} alt="necklace" className={styles.childNavImg}/>
                                    <p className={styles.childNavP}>Necklaces</p>
                                </a>
                            </li>
                            <li className={styles.childNavList}>
                                <a href='/products/toe-ring' className={splitLocation[2] ? splitLocation[2] === 'toe-ring' ? `${styles.childNavItem} ${styles.childActive}` : styles.childNavItem : styles.childNavItem}>
                                    <img src={toeRing} alt="toe ring" className={styles.childNavImg}/>
                                    <p className={styles.childNavP}>Toe Rings</p>
                                </a>
                            </li>
                            <li className={styles.childNavList}>
                                <a href='/products/nepali' className={splitLocation[2] ? splitLocation[2] === 'nepali' ? `${styles.childNavItem} ${styles.childActive}` : styles.childNavItem : styles.childNavItem}>
                                    <img src={nepali} alt="nepali" className={styles.childNavImg}/>
                                    <p className={styles.childNavP}>Nepali</p>
                                </a>
                            </li>
                            <li className={styles.childNavList}>
                                <a href='/products/others' className={splitLocation[2] ? splitLocation[2] === 'others' ? `${styles.childNavItem} ${styles.childActive}` : styles.childNavItem : styles.childNavItem}>
                                    <img src={others} alt="other" className={styles.childNavImg}/>
                                    <p className={styles.childNavP}>Others</p>
                                </a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
            <a href='/' className={styles.navElements}>
                <div className={styles.navElements} id={styles.logoEl}>
                    <img src={logo} alt="karkhana logo" className={styles.logo}/>
                </div>
            </a>
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
                        <a href="/about-us" className={location === '/about-us' ? `${styles.navItem} ${styles.navActive}` : styles.navItem}>
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
