import React, { useState } from 'react';
import styles from './searchbar.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faSpinner, faXmark } from '@fortawesome/free-solid-svg-icons';
import Backdrop from '../../Others/Backdrop/backdrop';

function Searchbar ({ searchInput, noItemFound, searchResult, isPending,
                      changeSearchInput, changeSearchResult, changeBackdrop }) {

    const [backdrop, setBackdrop] = useState(false);

    //display search bar
    const showSearchBar = () => {
        const searchBar = document.getElementById('search-input-main')
        searchBar.className = `${styles.searchInputMain} ${styles.show}`;
        setBackdrop(true);
    }

    //hide search bar
    const exitSearchBar = () => {
        const searchBar = document.getElementById('search-input-main')
        const input = document.getElementById('input');
        const noResult = document.querySelector(`.${styles.defaultResultContainer}`);

        searchBar.className = styles.searchInputMain;
        input.value = '';
        changeSearchInput('');
        changeSearchResult([]);
        setBackdrop(false);
        if (noResult){
            if(noResult.style.display === 'block'){
                noResult.style.display = 'none'
            }
        }
    }
    
    return (
        <>
        <Backdrop backdrop={backdrop} toggleBackdrop={ exitSearchBar } />
        <div className={styles.searchContainer}>
            <FontAwesomeIcon icon={faMagnifyingGlass}
                                className={styles.searchIcon}
                                onClick={ showSearchBar } />
            <div data-testid="search-input-main" className={styles.searchInputMain} id='search-input-main'>
                <div className={styles.searchInputBox}>
                    <div className={styles.searchInputContainer}>
                        <div className={styles.inputItemContainer}>
                            <FontAwesomeIcon icon={faMagnifyingGlass} className={styles.searchItemIcon}/>
                            <input type='text'
                                className={styles.searchInput}
                                placeholder='Search Product'
                                onChange={ (e) => changeSearchInput(e.target.value) }
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
                    {searchResult.length > 0 ? searchResult.map(item => <a href={`/products/${item.category.split(' ').join('').toLowerCase()}/${item.name}`} key={item._id} className={styles.searchResultItem}>
                        <div className={styles.searchResultImgContainer}>
                            <img src={item.img[0]} alt={item.name} className={styles.searchResultImg}/>
                        </div>
                        <div className={styles.searchResultDetails}>
                            <h4 className={styles.searchResultHeading}>{item.name}</h4>
                        </div>
                    </a>)
                    :
                    null}
                </div>
            </div>
        </div>
        </>
    )
}

export default Searchbar;
