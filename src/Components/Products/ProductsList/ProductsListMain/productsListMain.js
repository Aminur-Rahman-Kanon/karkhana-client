import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import styles from './productsListMain.module.css';
import Backdrop from "../../../Others/Backdrop/backdrop";
import Modal from '../../../Others/Modal/modal';
import ReactPaginate from 'react-paginate';
import ReactSlider from 'react-slider';
import { disableScroll } from "../../../Others/HelperFunction/helperFunction";
import { ContextProvider } from "../../../Others/AuthContext/authContext";
import './slider.css';
import { ToastContainer } from "react-toastify";
import ProductsListItemDisplay from "../ProductsListItemDisplay/productsListItemDisplay";
import { NetworkError } from "../../../Others/DisplayMessage/displayMessage";
import ProductsListSidebar from "../ProductsListSidebar/productsListSidebar";
import ProductsTemplateAll from "../../../Homepage/ProductsTemplates/productsTemplateAll";

const ProductsListMain = () => {

    const context = useContext(ContextProvider);

    const category = useParams().category;

    const [sidebar, setSidebar] = useState(false);

    const [backdrop, setBackdrop] = useState(false);

    const [products, setProducts] = useState([]);

    const [filteredProducts, setFilteredProducts] = useState([]);

    const [error, setError] = useState(false);

    const [status, setStatus] = useState('');

    const [modal, setModal] = useState(false);

    const [priceFrom, setPriceFrom] = useState(0);

    const [priceTo, setPriceTo] = useState(10000);

    const [itemOffset, setItemOffset] = useState(0);

    const [itemNotFound, setItemNotFound] = useState(false);

    const cartItemStorage = sessionStorage.getItem('cart') ? JSON.parse(sessionStorage.getItem('cart')) : null;

    const itemPerPage = 9;

    const endOffset = itemOffset + itemPerPage;
    
    let pageCount = 0;

    //this hook store the products to a local state "products" if the context.data is not empty
    //and scroll to the top when products were filtered
    useEffect(() => {
        window.scrollTo(0, 0);
        fetch(`https://karkhana-server.onrender.com/products/${category}`)
        .then(res => res.json())
        .then(data => {
            setProducts(data.data);
            setStatus('success');
        }).catch(err => setStatus('not found'))
    }, []);

    
    //this hook also scroll to the top when products were filtered
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [itemOffset, filteredProducts.length]);

    //this hook disable scrolling when backdrop is enable and enable scrolling when backdrop is disabled
    useEffect(() => {
        if (backdrop){
            disableScroll();
        }
        else {
            window.onscroll = () => {
            }
        }
    }, [backdrop])

    //if the products was filtered by price then we set the page count by the total products/itemPerPage
    //otherwise all products/itemPerPage
    if (filteredProducts.length){
        pageCount = Math.ceil(filteredProducts.length / itemPerPage);
    }
    else {
        pageCount = Math.ceil(products.length / itemPerPage);
    }

    //this method handles the pagination system by calculating items to display nest page or previous page
    const handlePageClick = (event) => {
        if (filteredProducts.length){
            const newOffset = (event.selected * itemPerPage) % filteredProducts.length;
            setItemOffset(newOffset);
        }
        else {
            console.log(event.selected);
            const newOffset = (event.selected * itemPerPage) % products.length;
            setItemOffset(newOffset);
        }
    }

    //if no response from server then we display a defaut template
    let defaultView = <ProductsTemplateAll item={12} />

    // if (products.length){
    //     //if product found and products been filtered based on price then we iterate through the products and display it
    //     if (!itemNotFound && filteredProducts.length){
    //         defaultView = <ProductsListItemDisplay products={filteredProducts}
    //                                                itemOffset={itemOffset}
    //                                                endOffset={endOffset}
    //                                                category={category}
    //                                                context={context}
    //                                                cartItemStorage={cartItemStorage} />
    //     }
    //     //if no product found
    //     else if (itemNotFound) {
    //         defaultView = <div className={styles.notFoundContainer}>
    //             <h2 className={styles.notFoundHeader}>Nothing found based on your range</h2>
    //         </div>
    //     }
    //     //iterate though the products and display
    //     else {
    //         defaultView = <ProductsListItemDisplay products={products}
    //                                                itemOffset={itemOffset}
    //                                                endOffset={endOffset}
    //                                                category={category}
    //                                                context={context}
    //                                                cartItemStorage={cartItemStorage}/>
    //     }
    // }
    // //if server is good and no products are returned
    // else if(status === 'not found') {
    //     defaultView = <div className={styles.fallbackContainer}>
    //         <h2 className={styles.fallbackHeader}>Nothing found</h2>
    //     </div>
    // }

    //filter products function
    const filterItem = () => {
        if (priceFrom && priceTo) {
            const filteredData = products.filter(item => Number(item.price) >= priceFrom && Number(item.price) <= priceTo);
            if (filteredData.length){
                setItemNotFound(false)
                setFilteredProducts(filteredData);
                setSidebar(false);
                setBackdrop(false);
            }
            else {
                setItemNotFound(true);
                setItemOffset(0);
                setSidebar(false);
                setBackdrop(false);
            }
        }
    }

    //function to clear filter
    const resetFilter = () => {
        setPriceFrom(0);
        setPriceTo(1000);
        setFilteredProducts([]);
    }

    //function of open sidebar
    const openSidebar = () => {
        if (!sidebar){
            setSidebar(true);
            setBackdrop(true);
        }
    }

    //function of close sidebar
    const closeSidebar = () => {
        if (sidebar){
            setSidebar(false);
            setBackdrop(false);
        }
        else {
            setBackdrop(false);
        }
    }

    //function to close displayStatus message
    const closeModal = () => {
        setError(false);
        setStatus('');
        setModal(false);
    }

    //if no response from server
    let displayStatus = null;
    if (status === 'database error'){
        displayStatus =<NetworkError closeModal={closeModal} />
    }

    return (
        <>
        <Backdrop backdrop={ backdrop } toggleBackdrop={ closeSidebar }/>
        <Modal modal={modal}>
            {displayStatus}
        </Modal>
        <ToastContainer autoClose={1500} limit={5} />
        <div className={styles.productsListMain}>
            <div className={styles.productsListContainer}>
                <div className={styles.sidebarSwitcher} onClick={ openSidebar }>
                    <p className={styles.sidebarSwitcherP}>Show Sidebar</p>
                </div>
                <div className={ sidebar ? `${styles.sidebarContainer} ${styles.on}` : styles.sidebarContainer}>
                    <ProductsListSidebar category={category} />
                    <div className={styles.categoryType} id={styles.categoryType2}>
                        <h2 className={styles.categoryH2}>Price Range</h2>
                        <ReactSlider
                            max={10000}
                            className="horizontal-slider"
                            thumbClassName="example-thumb"
                            trackClassName="example-track"
                            defaultValue={[priceFrom, priceTo]}
                            value={[priceFrom, priceTo]}
                            ariaLabel={['Lower thumb', 'Upper thumb']}
                            ariaValuetext={state => `Thumb value ${state.valueNow}`}
                            renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
                            minDistance={1}
                            onChange={([v1, v2]) => {
                                setPriceFrom(v1);
                                setPriceTo(v2);
                            }}
                            pearling
                        />
                        <button disabled={!priceFrom || !priceTo}
                                className={styles.filterBtn}
                                onClick={ resetFilter }>Reset</button>
                        <button disabled={(!priceFrom || !priceTo) || (priceFrom >= priceTo)}
                                className={styles.filterBtn}
                                onClick={filterItem}>Apply</button>
                    </div>
                </div>

                <div className={styles.ProductsLists}>
                    <h2 className={styles.productHeader}>{products.length ? products[0].category : null}</h2>
                    <div className={styles.productsDisplayContainer}>
                        {defaultView}
                    </div>
                </div>
            </div>

            <ReactPaginate breakLabel="..."
                           nextLabel=">"
                           className={styles.paginationContainer}
                           pageClassName={styles.paginationItem}
                           previousClassName={styles.previousItem}
                           nextClassName={styles.nextItem}
                           activeClassName={styles.paginationActive}
                           disabledClassName={styles.paginationDisabled}
                           onPageChange={handlePageClick}
                           pageRangeDisplayed={5}
                           pageCount={itemNotFound ? 0 : pageCount}
                           previousLabel="<"
                           renderOnZeroPageCount={null} />
        </div>
        </>
    )
}

export default ProductsListMain;
