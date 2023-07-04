import React, { useContext, useEffect, useState, useTransition } from 'react';
import Navbar from '../Navbar/navbar';
import ShoppingCartMain from '../ShoppingCart/ShoppingCartMain/shoppingCartMain';
import DrawToggle from '../../Others/Drawtoggle/drawToggle';
import styles from './topbarMain.module.css';
import { ContextProvider } from '../../Others/AuthContext/authContext';
import { disableScroll } from '../../Others/HelperFunction/helperFunction';
import Searchbar from '../Searchbar/searchbar';

const TopbarMain = ({toggleSidedrawer}) => {

    const context = useContext(ContextProvider);

    const [products, setProducts] = useState([]);

    const [searchInput, setSearchInput] = useState('');

    const [searchResult, setSearchResult] = useState([]);

    const [isPending, startTransition] = useTransition();

    const [noItemFound, setNoItemFound] = useState(false);

    const [backdrop, setBackdrop] = useState(false);

    //this hook remove the blog products and store the rest of the products to local state to perform search operation
    useEffect(() => {
        if (context.data !== undefined){
            const copiedData = {...context.data}
            if (copiedData.hasOwnProperty('blog')){
                delete copiedData['blog'];
                const dataToSave = Object.values(copiedData).flat();
                setProducts(dataToSave);
            }
        }
    }, [ context.data ])

    //this hook perform search operation based on user inputs
    useEffect(() => {
        startTransition(() => {
            if (searchInput.length && products.length){
                const result = searchInput.length && products.filter(item => item.name.toLowerCase().slice(0, searchInput.length) === searchInput.toLowerCase());
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

    //when backdrop compnent is on then disable the scrolling and enable otherwise
    useEffect(() => {
        if (backdrop){
            disableScroll()
        }
        else {
            window.onscroll = () => {};
        }
    }, [backdrop])

    return (
        <>
        <div data-testid="topbar" className={styles.topbarMain}>
            <div className={styles.topbarItems}>
                <DrawToggle toggleSidedrawer={toggleSidedrawer}/>
                <Searchbar searchInput={searchInput}
                           noItemFound={noItemFound}
                           searchResult={searchResult}
                           isPending={isPending}
                           changeSearchResult={setSearchResult}
                           changeBackdrop={setBackdrop}
                           changeSearchInput={setSearchInput} />
            </div>
            <div className={styles.topbarItems} id={styles.navbar}>
                <Navbar />
            </div>
            <div className={styles.topbarItems} style={{justifyContent: 'flex-end'}}>
                <ShoppingCartMain />
            </div>
        </div>
        </>
    )
}

export default TopbarMain;
