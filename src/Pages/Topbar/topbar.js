import React from 'react';
import Navbar from './navbar/navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import ShoppingCart from './shoppingCart/shoppingCart';
import DrawToggle from '../Others/Drawtoggle/drawToggle';
import styles from './topbar.module.css';

const Topbar = ({toggleSidedrawer}) => {

    return (
        <div className={styles.topbarMain}>
            <div className={styles.topbarItems} style={{minWidth: '90px'}}>
                <DrawToggle toggleSidedrawer={toggleSidedrawer}/>
                <FontAwesomeIcon icon={faMagnifyingGlass} className={styles.searchIcon} />
            </div>
            <div className={styles.topbarItems} id={styles.navbar}>
                <Navbar />
            </div>
            <div className={styles.topbarItems} style={{minWidth: '125px'}}>
                <ShoppingCart />
            </div>
        </div>
    )
}

export default Topbar;
