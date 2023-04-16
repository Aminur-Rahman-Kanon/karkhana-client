import React, { useContext, useEffect, useState, useTransition } from 'react';
import Navbar from './navbar/navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faRectangleXmark, faSpinner } from '@fortawesome/free-solid-svg-icons';
import ShoppingCart from './shoppingCart/shoppingCart';
import DrawToggle from '../Others/Drawtoggle/drawToggle';
import styles from './topbar.module.css';
import { ContextApi } from '../../App';

const Topbar = ({toggleSidedrawer}) => {

    const context = useContext(ContextApi);

    const [searchInput, setSearchInput] = useState('');

    const [searchResult, setSearchResult] = useState([]);

    const [isPending, startTransition] = useTransition();

    const [noItemFound, setNoItemFound] = useState(false);

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

    console.log(context.products);

    const showSearchBar = () => {
        const searchBar = document.querySelector(`.${styles.searchInputMain}`);
        searchBar.className = `${styles.searchInputMain} ${styles.show}`
    }

    const closeSearchBar = () => {
        const searchBar = document.querySelector(`.${styles.searchInputMain}`);
        const input = document.getElementById('input');

        if (document.activeElement === input ){
            searchBar.className = `${styles.searchInputMain} ${styles.show}`
        }
        else {
            searchBar.className = styles.searchInputMain
        }
    }

    const exitSearchBar = () => {
        const searchBar = document.querySelector(`.${styles.searchInputMain}`);
        const input = document.getElementById('input');
        const noResult = document.querySelector(`.${styles.defaultResultContainer}`);

        searchBar.className = styles.searchInputMain;
        input.value = '';
        setSearchInput('');
        setSearchResult([])
        if (noResult){
            if(noResult.style.display === 'block'){
                noResult.style.display = 'none'
            }
        }
    }

    return (
        <div className={styles.topbarMain}>
            <div className={styles.topbarItems}>
                <DrawToggle toggleSidedrawer={toggleSidedrawer}/>
                <div className={styles.searchContainer} onMouseOver={ showSearchBar } onMouseLeave={ closeSearchBar }>
                    <FontAwesomeIcon icon={faMagnifyingGlass} className={styles.searchIcon}/>
                    <div className={styles.searchInputMain}>
                        <div className={styles.searchInputBox}>
                            <div className={styles.searchInputContainer}>
                                <input type='text'
                                    className={styles.searchInput}
                                    placeholder='Search Product'
                                    onChange={ (e) => setSearchInput(e.target.value) }
                                    id="input"/>
                                <FontAwesomeIcon icon={faSpinner}
                                                spinPulse
                                                style={isPending ? {visibility: 'visible'} : {display: 'hidden'}}
                                                className={styles.spinnerIcon}/>
                            </div>
                            <FontAwesomeIcon icon={faRectangleXmark} className={styles.xBtn} onClick={ exitSearchBar }/>
                        </div>
                        <div className={styles.searchInputResultContainer} style={searchInput.length ? {display: 'flex'}: {display: 'none'}}>
                            <div className={styles.defaultResultContainer} style={noItemFound ? {display: 'block'} : {display: 'none'}}>
                                <p className={styles.itemCounter}>{`${searchResult.length} item found`}</p>
                            </div>
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
    )
}

export default Topbar;
