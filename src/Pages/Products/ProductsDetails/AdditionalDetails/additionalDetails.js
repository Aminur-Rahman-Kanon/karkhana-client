import React, { useEffect, useState, useLayoutEffect, useRef } from "react";
import styles from './additionalDetails.module.css';
import profile from '../../../../Assets/profile.jpg';
import avatar from '../../../../Assets/avatar.png'
import obama from '../../../../Assets/obama.jpg';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faAngleUp, faAngleDown } from "@fortawesome/free-solid-svg-icons";

const reviews = [
    {img: profile, name: 'Karkhana User', comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla at venenatis eros. Nulla efficitur, orci ut cursus consectetur, nisi elit convallis odio khdkhdkhkjhdhwj khjkdh djhh dh khkhd hhk hjdd'},
    {img: avatar, name: 'Karkhana User', comment: 'Lorem ipsum dolor sit amet,'},
    {img: obama, name: 'Karkhana User', comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla at venenatis eros. Nulla efficitur,'}
]

const AdditionalDetails = () => {

    const detailsRef = useRef(null);
    const reviewRef = useRef(null);
    const shippingRef = useRef(null);
    const chargesRef = useRef(null);

    useEffect(() => {
        if (screenWidth <= 992){
            if (displayItem !== ''){
                setDisplayItem('');
                setInfoDisplayToggle('');
            }
        }
    }, [])

    useLayoutEffect(() => {
        function updateDisplay() {
            if (window.screen.width >= 991){
                Array.from(document.querySelectorAll(`.${styles.infoHeaderDetails}`)).map(item => {
                    if (item.style.display === 'block'){
                        item.style.display = 'none'
                    }
                })
            }
        }
        window.addEventListener('resize', updateDisplay);
        
        return () => window.removeEventListener('resize', updateDisplay);
    }, []);

    
    
    const [displayItem, setDisplayItem] = useState('');

    const [infoDisplayToggle, setInfoDisplayToggle] = useState('');

    const screenWidth = window.screen.width;

    let displayItemContainer = <div className={styles.detailsContainer}>
        <p className={styles.infoHeaderP}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla at venenatis eros. Nulla efficitur, orci ut cursus consectetur, nisi elit convallis odio, non hendrerit arcu tortor aliquet eros. Nullam imperdiet diam ut neque ullamcorper semper. Mauris consequat ex sed elit venenatis, eu varius nulla posuere. Nullam gravida mattis velit, id commodo nunc rhoncus ut. Phasellus congue felis tortor, nec eleifend lacus tincidunt vitae. Nullam dapibus tempus tempor. Maecenas massa neque, tempus in efficitur at, scelerisque sed tortor. Morbi vulputate ipsum odio, non posuere sem suscipit accumsan. Cras fermentum nunc quis tempor iaculis. Praesent dictum augue sit amet neque faucibus, ac varius enim convallis. Curabitur volutpat ligula sit amet nibh vehicula egestas. Etiam eget dolor ipsum. Phasellus varius, metus sit amet aliquet tempor, erat ante rhoncus magna, quis vehicula tortor nunc at ipsum. Duis vitae erat vitae turpis cursus pretium. Quisque pulvinar sapien at mi efficitur, sed faucibus nulla accumsan.</p>
        <p className={styles.infoHeaderP}>Ut a leo interdum, imperdiet ante quis, euismod quam. Nam eget auctor risus. In a bibendum diam. Curabitur non lectus pharetra, maximus dolor mattis, auctor dolor. Maecenas placerat ipsum vitae elementum vulputate. Morbi lacinia libero lorem, in dignissim ante convallis at. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed in purus vulputate sem tempor tincidunt ac sed turpis. Pellentesque erat justo, feugiat eget vestibulum molestie, cursus ac ex. Phasellus magna enim, placerat non lacus varius, cursus consectetur urna</p>
        <p className={styles.infoHeaderP}>Phasellus finibus nulla vitae malesuada efficitur. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Phasellus sed pharetra risus. Quisque ante sem, faucibus id velit eget, bibendum sodales purus. Donec congue ipsum leo, aliquet aliquam lectus suscipit et. Pellentesque viverra, enim et pulvinar aliquet, dolor magna gravida lectus, sit amet pellentesque turpis elit id enim. Nulla a lectus viverra, ultricies urna ac, cursus turpis. Sed et purus vitae nunc molestie molestie sit amet eget nisl. Ut non nunc erat. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus</p>
        <p className={styles.infoHeaderP}>Suspendisse imperdiet enim in porttitor dignissim. Nam iaculis enim vel nunc commodo cursus. Donec vitae magna eget nunc fringilla pharetra vitae id risus. Proin in aliquam ex. Ut purus sem, fermentum ut aliquam at, ornare quis nisl. Aliquam feugiat dapibus nunc, sit amet aliquam metus sollicitudin eget. Integer gravida ligula vitae leo suscipit, eget pretium augue tempus. Integer fringilla justo id purus pulvinar iaculis. Fusce in lorem pulvinar, suscipit ipsum id, volutpat dui. Fusce eu sem sapien. Duis sit amet nisi leo.</p>
    </div>

    switch (displayItem) {
        case "details":
            displayItemContainer = <div className={styles.detailsContainer}>
                <p className={styles.infoHeaderP}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla at venenatis eros. Nulla efficitur, orci ut cursus consectetur, nisi elit convallis odio, non hendrerit arcu tortor aliquet eros. Nullam imperdiet diam ut neque ullamcorper semper. Mauris consequat ex sed elit venenatis, eu varius nulla posuere. Nullam gravida mattis velit, id commodo nunc rhoncus ut. Phasellus congue felis tortor, nec eleifend lacus tincidunt vitae. Nullam dapibus tempus tempor. Maecenas massa neque, tempus in efficitur at, scelerisque sed tortor. Morbi vulputate ipsum odio, non posuere sem suscipit accumsan. Cras fermentum nunc quis tempor iaculis. Praesent dictum augue sit amet neque faucibus, ac varius enim convallis. Curabitur volutpat ligula sit amet nibh vehicula egestas. Etiam eget dolor ipsum. Phasellus varius, metus sit amet aliquet tempor, erat ante rhoncus magna, quis vehicula tortor nunc at ipsum. Duis vitae erat vitae turpis cursus pretium. Quisque pulvinar sapien at mi efficitur, sed faucibus nulla accumsan.</p>
                <p className={styles.infoHeaderP}>Ut a leo interdum, imperdiet ante quis, euismod quam. Nam eget auctor risus. In a bibendum diam. Curabitur non lectus pharetra, maximus dolor mattis, auctor dolor. Maecenas placerat ipsum vitae elementum vulputate. Morbi lacinia libero lorem, in dignissim ante convallis at. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed in purus vulputate sem tempor tincidunt ac sed turpis. Pellentesque erat justo, feugiat eget vestibulum molestie, cursus ac ex. Phasellus magna enim, placerat non lacus varius, cursus consectetur urna</p>
                <p className={styles.infoHeaderP}>Phasellus finibus nulla vitae malesuada efficitur. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Phasellus sed pharetra risus. Quisque ante sem, faucibus id velit eget, bibendum sodales purus. Donec congue ipsum leo, aliquet aliquam lectus suscipit et. Pellentesque viverra, enim et pulvinar aliquet, dolor magna gravida lectus, sit amet pellentesque turpis elit id enim. Nulla a lectus viverra, ultricies urna ac, cursus turpis. Sed et purus vitae nunc molestie molestie sit amet eget nisl. Ut non nunc erat. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus</p>
                <p className={styles.infoHeaderP}>Suspendisse imperdiet enim in porttitor dignissim. Nam iaculis enim vel nunc commodo cursus. Donec vitae magna eget nunc fringilla pharetra vitae id risus. Proin in aliquam ex. Ut purus sem, fermentum ut aliquam at, ornare quis nisl. Aliquam feugiat dapibus nunc, sit amet aliquam metus sollicitudin eget. Integer gravida ligula vitae leo suscipit, eget pretium augue tempus. Integer fringilla justo id purus pulvinar iaculis. Fusce in lorem pulvinar, suscipit ipsum id, volutpat dui. Fusce eu sem sapien. Duis sit amet nisi leo.</p>
            </div>
            
            break;
        
        case "reviews":
            displayItemContainer = <div className={styles.reviewContainer}>
                <h2 className={styles.reviewsCount}>3 Reviews</h2>
                <div className={styles.reviewsMain}>
                    {reviews.map((review, index) => <div key={index} className={styles.reviewItem}>
                        <div className={styles.reviewImgContainer}><img src={review.img} alt="karkhana user" className={styles.reviewImg}/></div>
                        <div className={styles.reviewDetails}>
                            <h2 className={styles.reviewItemHeader}>{review.name}</h2>
                            <p className={styles.reviewItemP}>{review.comment}</p>
                        </div>
                        <div className={styles.starContainer}>
                            <FontAwesomeIcon icon={faStar} className={styles.star}/>
                            <FontAwesomeIcon icon={faStar} className={styles.star}/>
                            <FontAwesomeIcon icon={faStar} className={styles.star}/>
                            <FontAwesomeIcon icon={faStar} className={styles.star}/>
                            <FontAwesomeIcon icon={faStar} className={styles.star}/>
                        </div>
                    </div>)}
                </div>
            </div>

            break;

        case "shipping":
            displayItemContainer = <div className={styles.shippingContainer}>
                <div className={styles.shippingItem}>
                    <h5 className={styles.shippingItemHeader}>Returns Policy</h5>
                    <p className={styles.shippingItemP}>You may return most new, unopened items within 30 days of delivery for a full refund. We'll also pay the return shipping costs if the return is a result of our error (you received an incorrect or defective item, etc.).</p>
                    <p className={styles.shippingItemP}>You should expect to receive your refund within four weeks of giving your package to the return shipper, however, in many cases you will receive a refund more quickly. This time period includes the transit time for us to receive your return from the shipper (5 to 10 business days), the time it takes us to process your return once we receive it (3 to 5 business days), and the time it takes your bank to process our refund request (5 to 10 business days).</p>
                    <p className={styles.shippingItemP}>If you need to return an item, simply login to your account, view the order using the "Complete Orders" link under the My Account menu and click the Return Item(s) button. We'll notify you via e-mail of your refund once we've received and processed the returned item.</p>
                </div>

                <div className={styles.shippingItem}>
                    <h5 className={styles.shippingItemHeader}>Shipping</h5>
                    <p className={styles.shippingItemP}>We can ship to virtually any address in the world. Note that there are restrictions on some products, and some products cannot be shipped to international destinations.</p>
                    <p className={styles.shippingItemP}>When you place an order, we will estimate shipping and delivery dates for you based on the availability of your items and the shipping options you choose. Depending on the shipping provider you choose, shipping date estimates may appear on the shipping quotes page.</p>
                    <p className={styles.shippingItemP}>Please also note that the shipping rates for many items we sell are weight-based. The weight of any such item can be found on its detail page. To reflect the policies of the shipping companies we use, all weights will be rounded up to the next full pound.</p>
                </div>
            </div>

            break;

        case "charges":
            displayItemContainer = <div className={styles.chargesContainer}>
                <div className={styles.chargesItem}>
                    <h5 className={styles.shippingItemHeader}>Shipping & Charges</h5>
                    <p className={styles.shippingItemP}>After selecting your desired product from the checkout page, you have to choose shipping options, to confirm how the item will be delivered to you. We are offering below shipping method for your conveniences</p>
                </div>
                <div className={styles.chargesItem}>
                    <h5 className={styles.shippingItemHeader}>Standard Shipping</h5>
                    <ul className={styles.chargesItemListContainer}>
                        <li className={styles.chargesItemList}>
                            <p className={styles.shippingItemP}>Inside Dhaka:   Delivers within 1-3 business days</p>
                        </li>
                        <li className={styles.chargesItemList}>
                            <p className={styles.shippingItemP}>Inside Dhaka:   Delivers within 1-3 business days</p>
                        </li>
                    </ul>
                </div>
                <div className={styles.chargesItem}>
                    <h5 className={styles.shippingItemHeader}>Delivery Charges Details</h5>
                    <table className={styles.chargeTableContainer}>
                        <tr className={styles.tableRow}>
                            <th className={styles.tableHeader}>No of Items</th>
                            <th className={styles.tableHeader} style={{textAlign: 'center'}}>Inside Dhaka</th>
                            <th className={styles.tableHeader} style={{textAlign: 'center'}}>Outside Dhaka</th>
                        </tr>
                        <tr className={styles.tableRow}>
                            <td className={styles.tableData}>Upto 2 Items</td>
                            <td className={styles.tableData} style={{textAlign: 'center'}}>Free</td>
                            <td className={styles.tableData} style={{textAlign: 'center'}}>120TK</td>
                        </tr>
                        <tr className={styles.tableRow}>
                            <td className={styles.tableData}>Upto 4 Items</td>
                            <td className={styles.tableData} style={{textAlign: 'center'}}>Free</td>
                            <td className={styles.tableData} style={{textAlign: 'center'}}>120TK</td>
                        </tr>
                        <tr className={styles.tableRow}>
                            <td className={styles.tableData}>Upto 6 Items</td>
                            <td className={styles.tableData} style={{textAlign: 'center'}}>Free</td>
                            <td className={styles.tableData} style={{textAlign: 'center'}}>170TK</td>
                        </tr>
                        <tr className={styles.tableRow}>
                            <td className={styles.tableData}>Upto 8 Items</td>
                            <td className={styles.tableData} style={{textAlign: 'center'}}>Free</td>
                            <td className={styles.tableData} style={{textAlign: 'center'}}>200TK</td>
                        </tr>
                        <tr className={styles.tableRow}>
                            <td className={styles.tableData}>Over 10 Items</td>
                            <td className={styles.tableData} style={{textAlign: 'center'}}>Free</td>
                            <td className={styles.tableData} style={{textAlign: 'center'}}>20TK</td>
                        </tr>
                    </table>
                </div>
            </div>

            break;
        
        default:
            break;
    }

    const detailsIntoView = (item) => {
        switch(item){
            case "details":
                detailsRef.current.scrollIntoView(true);
                break;
            case "reviews":
                reviewRef.current.scrollIntoView(true);
                break;
            case "shipping":
                shippingRef.current.scrollIntoView(true);
                break;
            case "charges":
                chargesRef.current.scrollIntoView(true);
                break;
            default: 
                break;
        }
    }

    const displayItemHanlder = (item) => {
        if (window.screen.width <= 992){
            if (displayItem === item && infoDisplayToggle === item){
                setDisplayItem('');
                setInfoDisplayToggle('');
            }
            else {
                setDisplayItem(item);
                setInfoDisplayToggle(item);
                detailsIntoView(item);
            }
        }
        else {
            setDisplayItem(item);
        }
    }

    return (
        <section className={styles.additionalInfoContainer}>
            <div className={styles.inforHeaderItems}>
                <div className={styles.infoHeaderItem}>
                    <div className={displayItem === 'details' || displayItem == '' ? `${styles.infoHeader} ${styles.active}` : styles.infoHeader} onClick={() => displayItemHanlder('details') } ref={detailsRef}>
                        <p className={styles.infoHeaderH2}>Details</p>
                        <div className={styles.angleContainer}>
                            <FontAwesomeIcon icon={faAngleUp}
                                            className={styles.angleIcon}
                                            style={displayItem === 'details' ? {display: 'block'} : {display: 'none'}}/>
                            <FontAwesomeIcon icon={faAngleDown}
                                            className={styles.angleIcon}
                                            style={displayItem ===  '' || displayItem !== 'details' ? {display: 'block'} : {display: 'none'}}/>
                        </div>
                    </div>
                    <div className={styles.infoHeaderDetails} style={displayItem === 'details' && infoDisplayToggle === 'details' && screenWidth <= 992 ? {display: 'block'} : {display: 'none'}}>
                        {displayItemContainer}
                    </div>
                </div>
                <div className={styles.infoHeaderItem}>
                    <div className={displayItem === 'reviews' ? `${styles.infoHeader} ${styles.active}` : styles.infoHeader} onClick={() => displayItemHanlder('reviews') } ref={reviewRef}>
                        <p className={styles.infoHeaderH2}>Customer review</p>
                        <div className={styles.angleContainer}>
                            <FontAwesomeIcon icon={faAngleUp}
                                            className={styles.angleIcon}
                                            style={displayItem === 'reviews' ? {display: 'block'} : {display: 'none'}}/>
                            <FontAwesomeIcon icon={faAngleDown}
                                            className={styles.angleIcon}
                                            style={displayItem ===  '' || displayItem !== 'reviews' ? {display: 'block'} : {display: 'none'}}/>
                        </div>
                    </div>
                    <div className={styles.infoHeaderDetails} style={displayItem === 'reviews' && infoDisplayToggle === 'reviews' && screenWidth <= 992 ? {display: 'block'} : {display: 'none'}}>
                        {displayItemContainer}
                    </div>
                </div>
                <div className={styles.infoHeaderItem}>
                    <div className={displayItem === 'shipping' ? `${styles.infoHeader} ${styles.active}` : styles.infoHeader} onClick={() => displayItemHanlder('shipping') } ref={shippingRef}>
                        <p className={styles.infoHeaderH2}>Shipping & return</p>
                        <div className={styles.angleContainer}>
                            <FontAwesomeIcon icon={faAngleUp}
                                            className={styles.angleIcon}
                                            style={displayItem === 'shipping' ? {display: 'block'} : {display: 'none'}}/>
                            <FontAwesomeIcon icon={faAngleDown}
                                            className={styles.angleIcon}
                                            style={displayItem ===  '' || displayItem !== 'shipping' ? {display: 'block'} : {display: 'none'}}/>
                        </div>
                    </div>
                    <div className={styles.infoHeaderDetails} style={displayItem === 'shipping' && infoDisplayToggle === 'shipping' && screenWidth <= 992 ? {display: 'block'} : {display: 'none'}}>
                        {displayItemContainer}
                    </div>
                </div>
                <div className={styles.infoHeaderItem}>
                    <div className={displayItem === 'charges' ? `${styles.infoHeader} ${styles.active}` : styles.infoHeader} onClick={() => displayItemHanlder('charges') } ref={chargesRef}>
                        <p className={styles.infoHeaderH2}>Charges</p>
                        <div className={styles.angleContainer}>
                            <FontAwesomeIcon icon={faAngleUp}
                                            className={styles.angleIcon}
                                            style={displayItem === 'charges' ? {display: 'block'} : {display: 'none'}}/>
                            <FontAwesomeIcon icon={faAngleDown}
                                            className={styles.angleIcon}
                                            style={displayItem ===  '' || displayItem !== 'charges' ? {display: 'block'} : {display: 'none'}}/>
                        </div>
                    </div>
                    <div className={styles.infoHeaderDetails} style={displayItem === 'charges' && infoDisplayToggle === 'charges' && screenWidth <= 992 ? {display: 'block'} : {display: 'none'}}>
                        {displayItemContainer}
                    </div>
                </div>
            </div>
            <div className={styles.displaySectionContainer}>
                {displayItemContainer}
            </div>
        </section>
    )
}

export default AdditionalDetails;