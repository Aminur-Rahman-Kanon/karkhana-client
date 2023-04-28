import React from 'react';
import logo from '../../../Assets/logo.jpg';
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faStore, faGem, faRss, faHeart, faDesktop } from '@fortawesome/free-solid-svg-icons';
import styles from './navbar.module.css';
import bracelet from '../../../Assets/bracelet.jpg';
import earRing from '../../../Assets/earRing.jpg';
import fingerRing from '../../../Assets/fingerRing.jpg';
import necklace from '../../../Assets/necklace.jpg';
import toeRing from '../../../Assets/toeRing.jpg';
import nepali from '../../../Assets/nepali.jpg';
import others from '../../../Assets/other.jpg';


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
                        <a href="/products/Latest" className={location === '/products/Latest' ? `${styles.navItem} ${styles.navActive}` : styles.navItem}>
                            <FontAwesomeIcon icon={faStore} className={styles.navIcon} />
                            <span className={styles.navP}>Latest</span>
                        </a>
                    </li>
                    <li className={styles.navList} id={styles.parentNavItem}>
                        <div className={styles.navItem}>
                            <FontAwesomeIcon icon={faGem} className={styles.navIcon} />
                            <span className={splitLocation[1] === 'products' && splitLocation[2] !== 'Latest' && splitLocation[2] !== 'Featured' ? `${styles.navP} ${styles.navActive}` : styles.navP}>Products</span>
                        </div>
                        <ul className={styles.childNavElement}>
                            <li className={styles.childNavList}>
                                <a href='/products/Bracelet' className={splitLocation[2] ? splitLocation[2] === 'Bracelet' ? `${styles.childNavItem} ${styles.childActive}` : styles.childNavItem : styles.childNavItem}>
                                    <img src={bracelet} alt="bracelet" className={styles.childNavImg}/>
                                    <p className={styles.childNavP}>Bracelets</p>
                                </a>
                            </li>
                            <li className={styles.childNavList}>
                                <a href='/products/Finger Ring' className={splitLocation[2] ? splitLocation[2] === 'Finger Ring' ? `${styles.childNavItem} ${styles.childActive}` : styles.childNavItem : styles.childNavItem}>
                                    <img src={fingerRing} alt="finger ring" className={styles.childNavImg}/>
                                    <p className={styles.childNavP}>Finger Rings</p>
                                </a>
                            </li>
                            <li className={styles.childNavList}>
                                <a href='/products/Ear Ring' className={splitLocation[2] ? splitLocation[2] === 'Ear Ring' ? `${styles.childNavItem} ${styles.childActive}` : styles.childNavItem : styles.childNavItem}>
                                    <img src={earRing} alt="ear ring" className={styles.childNavImg}/>
                                    <p className={styles.childNavP}>Ear Rings</p>
                                </a>
                            </li>
                            <li className={styles.childNavList}>
                                <a href='/products/Necklace' className={splitLocation[2] ? splitLocation[2] === 'Necklace' ? `${styles.childNavItem} ${styles.childActive}` : styles.childNavItem : styles.childNavItem}>
                                    <img src={necklace} alt="necklace" className={styles.childNavImg}/>
                                    <p className={styles.childNavP}>Necklaces</p>
                                </a>
                            </li>
                            <li className={styles.childNavList}>
                                <a href='/products/Toe Ring' className={splitLocation[2] ? splitLocation[2] === 'Toe Ring' ? `${styles.childNavItem} ${styles.childActive}` : styles.childNavItem : styles.childNavItem}>
                                    <img src={toeRing} alt="toe ring" className={styles.childNavImg}/>
                                    <p className={styles.childNavP}>Toe Rings</p>
                                </a>
                            </li>
                            <li className={styles.childNavList}>
                                <a href='/products/Nepali' className={splitLocation[2] ? splitLocation[2] === 'Nepali' ? `${styles.childNavItem} ${styles.childActive}` : styles.childNavItem : styles.childNavItem}>
                                    <img src={nepali} alt="nepali" className={styles.childNavImg}/>
                                    <p className={styles.childNavP}>Nepali</p>
                                </a>
                            </li>
                            <li className={styles.childNavList}>
                                <a href='/products/Other' className={splitLocation[2] ? splitLocation[2] === 'Other' ? `${styles.childNavItem} ${styles.childActive}` : styles.childNavItem : styles.childNavItem}>
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
                    <img src={logo} className={styles.logo}/>
                </div>
            </a>
            <div className={styles.navElements}>
                <ul className={styles.navElement} id={styles.rightElements}>
                    <li className={styles.navList}>
                        <a href="/products/Featured" className={location === '/products/Featured' ? `${styles.navItem} ${styles.navActive}` : styles.navItem}>
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
