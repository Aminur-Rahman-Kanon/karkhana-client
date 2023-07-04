import React, { useEffect, useState, useContext } from "react";
import { ContextProvider } from "../../../Others/AuthContext/authContext";
import styles from './shoppingCartMain.module.css';
import UserContainer from "../UserContainer/userContainer";
import CartContainer from "../CartContainer/cartContainer";

const ShoppingCartMain = () => {

    const context = useContext(ContextProvider);

    const [loggedInUser, setLoggedInUser] = useState({});

    const [cartItems, setCartItems] = useState({});
    
    //this hook look for products into sessionStorage and store them into a local state "cartItems"
    useEffect(() => {
        const shoppingCartItems = sessionStorage.getItem('cart') ? JSON.parse(sessionStorage.getItem('cart')) : null;
        if (shoppingCartItems){
            setCartItems(shoppingCartItems);
        }
        else {
            setCartItems({});
        }
    }, [context.cartItem])

    //this hook look for logged in user in sessionStorage and store it into a local state "loggedInUser"
    useEffect(() => {
        if (sessionStorage.getItem('user')){
            const user = JSON.parse(sessionStorage.getItem('user'));
            setLoggedInUser(user);
        }
    }, [])

    return (
        <div className={styles.shoppingCartMain}>
            <UserContainer loggedInUser={loggedInUser} />
            <CartContainer context={context} cartItems={cartItems} />
        </div>
    )
}

export default ShoppingCartMain;
