import React, { useContext, useEffect, useState, useTransition } from 'react';
import Navbar from './navbar/navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faXmark, faSpinner } from '@fortawesome/free-solid-svg-icons';
import ShoppingCart from './shoppingCart/shoppingCart';
import DrawToggle from '../Others/Drawtoggle/drawToggle';
import styles from './topbar.module.css';
import { ContextApi } from '../../App';
import Backdrop from '../Others/Backdrop/backdrop';
import { disableScroll } from '../Others/HelperFunction/helperFunction';

const Topbar = ({toggleSidedrawer}) => {

    const context = useContext(ContextApi);

    const [searchInput, setSearchInput] = useState('');

    const [searchResult, setSearchResult] = useState([]);

    const [isPending, startTransition] = useTransition();

    const [noItemFound, setNoItemFound] = useState(false);

    const [backdrop, setBackdrop] = useState(false);

    useEffect(() => {
        startTransition(() => {
            if (searchInput.length){
                const result = searchInput.length && context.products.filter(item => item.name.toLowerCase().slice(0, searchInput.length) === searchInput.toLowerCase());
                if (result.length){
                    setSearchResult(result);
                    setNoItemFound(true);
                }
                else {
                    setSearchResult([]);
                    setNoItemFound(true);
                }
            }
            else {
                setSearchResult([]);
                setNoItemFound(false);
            }
        })
    }, [searchInput])

    useEffect(() => {
        if (backdrop){
            disableScroll()
        }
        else {
            window.onscroll = () => {};
        }
    }, [backdrop])

    const showSearchBar = () => {
        const searchBar = document.querySelector(`.${styles.searchInputMain}`);
        searchBar.className = `${styles.searchInputMain} ${styles.show}`;
        setBackdrop(true);
    }

    const exitSearchBar = () => {
        const searchBar = document.querySelector(`.${styles.searchInputMain}`);
        const input = document.getElementById('input');
        const noResult = document.querySelector(`.${styles.defaultResultContainer}`);

        searchBar.className = styles.searchInputMain;
        input.value = '';
        setSearchInput('');
        setSearchResult([]);
        setBackdrop(false);
        if (noResult){
            if(noResult.style.display === 'block'){
                noResult.style.display = 'none'
            }
        }
    }

    return (
        <>
        <div className={styles.topbarMain}>
            <Backdrop backdrop={backdrop} toggleBackdrop={ exitSearchBar } />
            <div className={styles.topbarItems}>
                <DrawToggle toggleSidedrawer={toggleSidedrawer}/>
                <div className={styles.searchContainer}>
                    <FontAwesomeIcon icon={faMagnifyingGlass}
                                     className={styles.searchIcon}
                                     onClick={ showSearchBar } />
                    <div className={styles.searchInputMain}>
                        <div className={styles.searchInputBox}>
                            <div className={styles.searchInputContainer}>
                                <div className={styles.inputItemContainer}>
                                    <FontAwesomeIcon icon={faMagnifyingGlass} className={styles.searchItemIcon}/>
                                    <input type='text'
                                        className={styles.searchInput}
                                        placeholder='Search Product'
                                        onChange={ (e) => setSearchInput(e.target.value) }
                                        id="input"/>
                                </div>
                                <div className={styles.searchInputIconContainer}>
                                    <FontAwesomeIcon icon={faSpinner}
                                                    spinPulse
                                                    style={isPending ? {visibility: 'visible'} : {display: 'hidden'}}
                                                    className={styles.spinnerIcon}/>
                                    <FontAwesomeIcon icon={faXmark}
                                                    className={styles.xBtn}
                                                    onClick={ exitSearchBar }/>
                                </div>
                            </div>
                        </div>
                        <div className={styles.defaultResultContainer} style={noItemFound ? {display: 'block'} : {display: 'none'}}>
                            <p className={styles.itemCounter}>{`${searchResult.length} item found`}</p>
                        </div>
                        <div className={styles.searchInputResultContainer} style={searchInput.length ? {display: 'flex'}: {display: 'none'}}>
                            {searchResult.length > 0 ? searchResult.map(item => <a href={`/products/${item.category}/${item.name}`} key={item._id} className={styles.searchResultItem}>
                                <div className={styles.searchResultImgContainer}>
                                    <img src={item.img} alt={item.name} className={styles.searchResultImg}/>
                                </div>
                                <div className={styles.searchRsultDetails}>
                                    <h4 className={styles.searchResultHeading}>{item.name}</h4>
                                </div>
                            </a>)
                            :
                            null}
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.topbarItems} id={styles.navbar}>
                <Navbar />
            </div>
            <div className={styles.topbarItems} style={{justifyContent: 'flex-end'}}>
                <ShoppingCart />
            </div>
        </div>
        </>
    )
}

export default Topbar;
