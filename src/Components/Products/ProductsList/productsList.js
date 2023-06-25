import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import styles from './productsList.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import Backdrop from "../../Others/Backdrop/backdrop";
import Modal from '../../Others/Modal/modal';
import ReactPaginate from 'react-paginate';
import ReactSlider from 'react-slider';
import { disableScroll } from "../../Others/HelperFunction/helperFunction";
import { ContextProvider } from "../../Others/AuthContext/authContext";
import './slider.css';
import AddToCart from "../../Homepage/DisplayProducts/AddToCart/addToCart";
import { ToastContainer } from "react-toastify";

const ProductsList = () => {

    const context = useContext(ContextProvider);

    const productId = useParams().productId;

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

    if (filteredProducts.length){
        pageCount = Math.ceil(filteredProducts.length / itemPerPage);
    }

    else {
        pageCount = Math.ceil(products.length / itemPerPage);
    }

    const handlePageClick = (event) => {
        if (filteredProducts.length){
            const newOffset = (event.selected * itemPerPage) % filteredProducts.length;
            setItemOffset(newOffset);
        }
        else {
            const newOffset = (event.selected * itemPerPage) % products.length;
            setItemOffset(newOffset);
        }
    }

    useEffect(() => {
        window.scrollTo(0, 0);
        if (context.data !== undefined){
            const product = context.data[productId] !== undefined ? context.data[productId] : [];
            if (product.length){
                setProducts(product);
                setStatus('success');
            }
            else {
                setStatus('not found');
            }
        }
    }, [context.data] );

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [itemOffset, filteredProducts.length]);

    useEffect(() => {
        if (backdrop){
            disableScroll();
        }
        else {
            window.onscroll = () => {
                
            }
        }
    }, [backdrop])

    let defaultView = Array.from(Array(12).keys()).map(item => {
            return <div key={item} className={styles.defaultItemContainer} id={styles.loader}>
            <div className={styles.defaultItemImgContainer}>
                <FontAwesomeIcon icon={faSpinner} spinPulse className={styles.spinnerPulse} />
            </div>
            <div className={styles.loadingName}></div>
            <div className={styles.loadingLink}></div>
        </div>
    });

    if (products.length){
        if (!itemNotFound && filteredProducts.length){
            defaultView = filteredProducts.slice(itemOffset, endOffset).map(item => {
            return <div key={item._id} className={styles.productsContainer} id={styles.loader}>
                    <a href={`/products/${productId}/${item.name}`} className={styles.productsLink}>
                        <div className={styles.productsImgContainer}>
                            <img src={item.img[0]} alt={item.name} className={styles.productsImg}/>
                        </div>
                        <div className={styles.addToCartContainer}>
                            <AddToCart context={context} cartStorage={cartItemStorage} product={item} amount={1} />
                        </div>
                        <div className={styles.productsName}>{item.name}</div>
                        <div className={styles.productsPrice}>&#2547;{item.price}</div>
                    </a>
                </div>
            });
        }
        else if (itemNotFound) {
            defaultView = <div className={styles.notFoundContainer}>
                <h2 className={styles.notFoundHeader}>Nothing found based on your range</h2>
            </div>
        }

        else {
            defaultView = products.slice(itemOffset, endOffset).map(item => {
            return <div key={item._id} className={styles.productsContainer} id={styles.loader}>
                    <a href={`/products/${productId}/${item.name}`} className={styles.productsLink}>
                        <div className={styles.productsImgContainer}>
                            <img src={item.img[0]} alt={item.name} className={styles.productsImg}/>
                        </div>
                        <div className={styles.addToCartContainer}>
                            <AddToCart context={context} cartStorage={cartItemStorage} product={item} amount={1} />
                        </div>
                        <div className={styles.productsName}>{item.name}</div>
                        <div className={styles.productsPrice}>&#2547;{item.price}</div>
                    </a>
                </div>
            });
        }
    }
    else if(status === 'not found') {
        defaultView = <div className={styles.fallbackContainer}>
            <h2 className={styles.fallbackHeader}>Nothing found</h2>
        </div>
    }

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

    const resetFilter = () => {
        setPriceFrom(0);
        setPriceTo(1000);
        setFilteredProducts([]);
    }

    const openSidebar = () => {
        if (!sidebar){
            setSidebar(true);
            setBackdrop(true);
        }
    }

    const closeSidebar = () => {
        if (sidebar){
            setSidebar(false);
            setBackdrop(false);
        }
        else {
            setBackdrop(false);
        }
    }

    let displayStatus = <div className={styles.statusMsgContainer}>
        <h2 className={styles.statusMsgHeader}>Something went wrong</h2>
        <p className={styles.statusMsgP}>Please try again</p>
        <button className={styles.statusMsgBtn} onClick={() => {
            setModal(false);
        }}>Ok</button>
    </div>

    if (status === 'database error'){
        displayStatus = <div className={styles.statusMsgContainer}>
            <h2 className={styles.statusMsgHeader}>Database error</h2>
            <p className={styles.statusMsgP}>Please try again or contact the admin</p>
            <button className={styles.statusMsgBtn} onClick={() => {
            setError(false);
            setStatus('');
            setModal(false);
        }}>Ok</button>
        </div>
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
                    <div className={styles.categoryType}>
                        <h2 className={styles.categoryH2}>Categories</h2>
                        <ul className={styles.sidebarLists}>
                            <a href="/products/Bracelet" className={styles.sidebarLink}><li className={productId === 'Bracelet' ? `${styles.sidebarList} ${styles.active}` : styles.sidebarList}>Bracelets</li></a>
                            <a href="/products/Finger Ring" className={styles.sidebarLink}><li className={productId === 'Finger Ring' ? `${styles.sidebarList} ${styles.active}` : styles.sidebarList}>Finger Rings</li></a>
                            <a href="/products/Ear Ring" className={styles.sidebarLink}><li className={productId === 'Ear Ring' ? `${styles.sidebarList} ${styles.active}` : styles.sidebarList}>Ear Rings</li></a>
                            <a href="/products/Necklace" className={styles.sidebarLink}><li className={productId === 'Necklace' ? `${styles.sidebarList} ${styles.active}` : styles.sidebarList}>Necklace</li></a>
                            <a href="/products/Toe Ring" className={styles.sidebarLink}><li className={productId === 'Toe Ring' ? `${styles.sidebarList} ${styles.active}` : styles.sidebarList}>Toe Ring</li></a>
                            <a href="/products/Other" className={styles.sidebarLink}><li className={productId === 'Other' ? `${styles.sidebarList} ${styles.active}` : styles.sidebarList}>Others</li></a>
                        </ul>
                    </div>

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
                           renderOnZeroPageCount={null}/>
        </div>
        </>
    )
}

export default ProductsList;
