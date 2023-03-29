import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from './productsList.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import Backdrop from "../../Others/Backdrop/backdrop";
import Modal from '../../Others/Modal/modal';

const ProductsList = () => {

    const params = useParams();

    const [sidebar, setSidebar] = useState(false);

    const [backdrop, setBackdrop] = useState(false);

    const [products, setProducts] = useState([]);

    const [error, setError] = useState(false);

    const [status, setStatus] = useState('');

    const [modal, setModal] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
        if (params.hasOwnProperty("productId")){
            fetch(`https://karkhana-server.onrender.com/products/${params.productId}`)
            .then(res => res.json())
            .then(result => {
                if (result.status === 'success'){
                    setProducts(result.data);
                }
                else {
                    setStatus(result.status);
                    setModal(true);
                }
            })
            .catch(err => {
                setError(true);
                setModal(true);
            });
        }
    }, [])

    console.log(status);

    useEffect(() => {
        if (backdrop){
            document.body.style.position = 'fixed';
            document.body.style.overflow = 'hidden';
        }
        else {
            document.body.style.position = 'unset';
            document.body.style.overflow = 'auto';
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
        defaultView = products.map(item => {
            return <div key={item._id} className={styles.productsContainer} id={styles.loader}>
                    <div className={styles.productsImgContainer}>
                        <img src={item.img} className={styles.productsImg}/>
                    </div>
                    <div className={styles.productsName}>{item.name}</div>
                    <div className={styles.productsPrice}>৳ {item.price}</div>
                </div>
            });
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
            setBackdrop(false)
        }
        else {
            setBackdrop(false);
        }
    }

    let displayStatus = <div className={styles.statusMsgContainer}>
        <h2 className={styles.statusMsgHeader}>Something went wrong</h2>
        <p className={styles.statusMsgP}>Please try again</p>
        <button className={styles.statusMsgBtn} onClick={() => {
            setError(false);
            setStatus('');
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
        <div className={styles.productsListMain}>
            <div className={styles.productsListContainer}>
                <div className={styles.sidebarSwitcher} onClick={ openSidebar }>
                    <p className={styles.sidebarSwitcherP}>Show Sidebar</p>
                </div>
                <div className={ sidebar ? `${styles.sidebarContainer} ${styles.on}` : styles.sidebarContainer}>
                    <div className={styles.categoryType}>
                        <h2 className={styles.categoryH2}>Categories</h2>
                        <ul className={styles.sidebarLists}>
                            <li className={`${styles.sidebarList} ${styles.active}`}>Bracelets</li>
                            <li className={styles.sidebarList}>Finger Rings</li>
                            <li className={styles.sidebarList}>Ear Rings</li>
                            <li className={styles.sidebarList}>Necklace</li>
                            <li className={styles.sidebarList}>Toe Ring</li>
                            <li className={styles.sidebarList}>Others</li>
                        </ul>
                    </div>

                    <div className={styles.categoryType}>
                        <h2 className={styles.categoryH2}>Price Range</h2>
                        <p>Price high to low</p>
                    </div>
                </div>

                <div className={styles.ProductsLists}>
                    {defaultView}
                </div>
            </div>
        </div>
        </>
    )
}

export default ProductsList;
