import React, { useEffect, useState } from 'react';
import styles from './checkoutMain.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCreditCard, faMoneyBillTransfer } from '@fortawesome/free-solid-svg-icons';
import { faPaypal } from '@fortawesome/free-brands-svg-icons';
import { months } from '../../../data/data';
import { useNavigate } from 'react-router-dom';
import CheckoutItem from '../CheckoutItem/checkoutItem';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import Spinner from '../../Others/Spinner/spinner';
import Modal from '../../Others/Modal/modal';
import { PaymentHandlerMessage } from '../../Others/DisplayMessage/displayMessage';
import { ToastContainer, toast } from 'react-toastify';

const cardStyle = {
    hidePostalCode: true,
    iconStyle: 'solid',
    style: {
        base: {
        color: "#7db2ed",
        fontFamily: 'Arial, sans-serif',
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
            color: "lightgray"
        }
        },
        invalid: {
        fontFamily: 'Arial, sans-serif',
        color: "#fa755a",
        iconColor: "#fa755a"
        }
    }
};

function CheckoutMain() {

    const navigate = useNavigate();

    const elements = useElements();

    const stripe = useStripe();

    const [spinner, setSpinner] = useState(false);

    const [products, setProducts] = useState({})
    
    const [productsCount, setProductsCount] = useState({});

    const [status, setStatus] = useState('');

    const [modal, setModal] = useState(false);

    const [name, setName] = useState('');

    //if user is not logged in or there is no products added to the cart then we redirect user to the hoempage
    useEffect(() => {
        if (!Object.keys(itemObj).length || !Object.keys(userObj).length){
            navigate('/');
        }

        if (Object.keys(itemObj)){
            const productCount = {}
            Object.keys(itemObj).forEach(item => {
                productCount[item] = itemObj[item].length;
            })
            setProductsCount(productCount);
            setProducts(itemObj);
        }
    }, []);

    //getting cart object
    const itemObj = sessionStorage.getItem('cart') ? JSON.parse(sessionStorage.getItem('cart')) : {};
    //getting user object
    const userObj = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')) : {};

    //generating 12 months select options
    const month = months.map(mon => <option key={mon} value={mon} className={styles.otherOption}>{mon}</option>)

    //generating 15 years select options ranging from the current years
    let currentYear = new Date().getFullYear();
    let year = [];
    for (let i = 0; i < 15; i++){
        year.push(<option key={i} className={styles.otherOption} value={currentYear + i}>{currentYear + i}</option>)
    }

    //if there is not item in the cart object
    let displayOrdersummary = <div className={styles.defaultOrdersummary}>
        <h3 className={styles.defaultHeader}>No Item</h3>
    </div>
    
    let price = 0;

    //if there is items in the cart object then we iterate through the items and render them to the display
    if (Object.keys(products)) {
        displayOrdersummary = Object.values(products).map((item, idx) => {
            price += item.length * Number(item[0].price);
            return <CheckoutItem key={idx} item={item} />
        })
    }

    const handleSubmitPayment = async (e) => {
        e.preventDefault();

        if (!userObj.address) {
            return toast.info("Please add your address to your profile to continue", {
                position: toast.POSITION.TOP_RIGHT
            })
        }
        
        setSpinner(true);
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement)
        })

        try {
            const { id } = paymentMethod
    
            await fetch('https://karkhana-server.onrender.com/submit-payment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    productCount: productsCount,
                    total: (price + 120),
                    id
                })
            }).then(res => res.json()).then(async result => {
                if (result.status === 'payment success'){
                    await fetch('https://karkhana-server.onrender.com/update-user-purchased-item', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            products,
                            userObj
                        })
                    }).then(response => response.json()).then(data => {
                        setSpinner(false);
                        setStatus(data.status);
                        setModal(true);
                        sessionStorage.setItem('user', JSON.stringify(data.data))
                    }).catch(err => {
                        setSpinner(false);
                        setStatus('failed');
                        setModal(true);
                    });
                }
            }).catch(err => {
                setSpinner(false);
                setStatus('failed');
                setModal(true);
            });
        } catch (error) {
            setSpinner(false);
            setStatus('payment failed');
            setModal(true);
        }
    }

    const otherMessageHandler = () => {
        setModal(false);
        setStatus('');
    }

    const successResponseHandler = () => {
        sessionStorage.removeItem('cart');
        window.location.href = '/';
    }

    return (
        <>
        <ToastContainer autoClose={2000} limit={5}/>
        <Spinner spinner={spinner} />
        <Modal modal={modal}>
            <PaymentHandlerMessage status={status} responseHandler={{successResponseHandler, otherMessageHandler}} />
        </Modal>
        <div className={styles.checkoutMain}>
            <form className={styles.checkoutContainer}>
                <div className={styles.paymentContainer}>
                    <h2 className={styles.paymentHeader}>SELECT PAYMENT METHOD</h2>
                    <div className={styles.paymentMethodBtns}>
                        <div className={`${styles.paymentBtn} ${styles.active}`}>
                            <FontAwesomeIcon icon={faCreditCard} className={styles.paymentIcon} />
                            <p className={styles.paymentP}>Credit Card</p>
                        </div>
                        <div className={styles.paymentBtn}>
                            <FontAwesomeIcon icon={faMoneyBillTransfer} className={styles.paymentIcon} />
                            <p className={styles.paymentP}>Bank Transfer</p>
                        </div>
                        <div className={styles.paymentBtn}>
                            <FontAwesomeIcon icon={faPaypal} className={styles.paymentIcon} />
                            <p className={styles.paymentP}>Paypal</p>
                        </div>
                    </div>

                    <div className={styles.nameContainer}>
                        <h3 className={styles.nameHeader}>NAME ON CARD</h3>  
                        <input type='text'
                            data-testid="name-on-card"
                            className={styles.nameInput}
                            placeholder='Name On Card'
                            onChange={(e) => setName(e.target.value)} />
                    </div>

                    <div data-testid="stripe-container" className={styles.nameContainer}>
                        <h3 className={styles.nameHeader}>CARD NUMBER</h3>  
                        <CardElement options={cardStyle} className={styles.cardElements} id='stripe'/>
                    </div>

                    <div className={styles.otherInputContainer}>
                        <div className={styles.otherInput}>
                            <h3 className={styles.nameHeader}>MONTH</h3>
                            <select data-testid="month" className={styles.otherSelect} defaultValue="Select Month">
                                <option disabled>Select Month</option>
                                {month}
                            </select>
                        </div>

                        <div className={styles.otherInput}>
                            <h3 className={styles.nameHeader}>YEAR</h3>
                            <select data-testid="year" className={styles.otherSelect} defaultValue="Select Year">
                                <option disabled>Select Year</option>
                                {year}
                            </select>
                        </div>

                        <div className={styles.otherInput}>
                            <h3 className={styles.nameHeader}>CVV</h3>
                            <input type='number'
                                data-testid="cvv"
                                className={styles.nameInput}
                                placeholder='CVV'/>
                        </div>
                    </div>

                    <div className={styles.addressContainer}>
                        <h3 className={styles.nameHeader}>BILLING ADDRESS</h3>
                        <div className={styles.addressDetails}>
                            <p className={styles.address} style={{fontWeight: '600'}}>Name: {Object.keys(userObj).length ? `${userObj.firstName} ${userObj.lastName}` : 'No information'}</p>
                            <p className={styles.address}>Street: {userObj.address || 'No information'}</p>
                            <p className={styles.address}>Thana: {userObj.thana || 'No information'}</p>
                            <p className={styles.address}>City: {userObj.state || 'No information'}</p>
                            <p className={styles.address}>Country: Bangladesh</p>
                        </div>
                    </div>
                </div>

                <div className={styles.summaryContainer}>
                    <h2 className={styles.paymentHeader}>ORDER SUMMARY</h2>
                    <div className={styles.orderDetails}>
                        {displayOrdersummary}
                    </div>
                    <div className={styles.deliveryInformationContainer}>
                        <p className={styles.address} style={{fontWeight: '600'}}>Subtotal: &#2547;{price}</p>
                        <p className={styles.address} style={{fontWeight: '600'}}>Shipping: &#2547;120</p>
                        <h3 className={styles.totalH3}>Total: &#2547;{price + 120}</h3>
                        <h4 className={styles.deliveryInformationH4}>Estimated Delivery Date</h4>
                        <p className={styles.deliveryInformationP}>Wednesday May 12 2023</p>
                    </div>
                    <button disabled={!stripe || !elements || !name.length}
                            className={styles.purchaseBtn}
                            onClick={ handleSubmitPayment }>PURCHASE NOW</button>
                </div>
            </form>
        </div>
        </>
    )
}

export default CheckoutMain;
