import React, { useEffect, useState, useContext } from "react";
import styles from './displayCartMain.module.css';
import { ContextProvider } from "../../Others/AuthContext/authContext";
import DisplayCartItem from "../DisplayCartItem/displayCartItem";
import DisplayCartSummary from "../DisplayCartSummary/displayCartSummary";

const DisplayCartMain = () => {

    const context = useContext(ContextProvider);

    const itemObj = sessionStorage.getItem('cart');

    const [items, setItems] = useState({});

    const [totalPrice, setTotalPrice] = useState(0);

    const [discount, setDiscount] = useState(10);

    //this hook save the items and totalPrice to local states.
    useEffect(() => {
        if (itemObj !== null){
            const shoppingItems = JSON.parse(itemObj);
            setItems(shoppingItems);
            let totalPrice = 0;
            Object.values(shoppingItems).map(item => {
                totalPrice = (Number(item[0].price) * item.length) + totalPrice;
            })
            setTotalPrice(totalPrice)
        }
        else {
            setItems({});
        }
    }, [context.cartItem])

    return (
        <div className={styles.displayCartContainer}>
            <div className={styles.displayCartMain}>
                <DisplayCartItem itemObj={itemObj} items={items} context={context} />
                <DisplayCartSummary items={items} totalPrice={totalPrice} discount={discount} />
            </div>
        </div>
    )
}

export default DisplayCartMain;
