import React from 'react';
import styles from './displayCartItem.module.css';
import { addToCart, removeItem, removeAllItem } from "../../Others/HelperFunction/helperFunction";

function DisplayCartItem ({itemObj, items, context}) {

    let displayShoppingItems = <div className={styles.defultDisplay}>
        <h3 className={styles.defaultHeader}>Nothing to display</h3>
    </div>;

    //rendering all items to the UI if there is items in the cart object
    if (itemObj !== null){
        if (Object.keys(items).length){
            displayShoppingItems = Object.values(items).map(item => {
                return <div key={item[0]._id} className={styles.displayCartItem}>
                    <div className={styles.displayCartImgContainer}>
                        <img src={item[0].img[0]} alt={item[0].name} className={styles.displayCartImg} />
                        <div className={styles.displayCartImgDetails}>
                            <p className={styles.displayCartP}>{item[0].name}</p>
                            <p className={styles.displayCartP}>&#2547;{item[0].price} / Item</p>
                        </div>
                    </div>
        
                    <div className={styles.panelContainer}>
                        <div className={styles.addItemContainer}>
                            <div className={styles.addItemBtns}>
                                <button className={styles.addItemBtn}
                                        onClick={(e) => addToCart(e, context, items, item[0], 1)}>+</button>
                                <span className={styles.addItemValue}><p style={{margin: '0'}}>{item.length}</p></span>
                                <button className={styles.addItemBtn}
                                        onClick={() => removeItem(context, items, item[0].name)}>-</button>
                            </div>
                        </div>
                        <div className={styles.priceContainer}>
                            <p className={styles.priceP}>&#2547; {item.length * Number(item[0].price)}</p>
                        </div>
                        <div className={styles.removeContainer}>
                            <button className={styles.removeBtn} onClick={() => removeAllItem(context, items, item[0].name)}>Remove</button>
                        </div>
                    </div>
                </div>
            }
        )}
    }
    return (
        <div className={styles.displayItems}>
            <div className={styles.labelContainer}>
                <div className={styles.label} id={styles.label1}>Product</div>
                <div className={styles.labelGroups}>
                    <div className={styles.label} id={styles.label2}>Quantity</div>
                    <div className={styles.label} id={styles.label3}>Subtotal</div>
                    <div className={styles.label} id={styles.label4}>Action</div>
                </div>
            </div>
            {displayShoppingItems}
        </div>
    )
}

export default DisplayCartItem ;
