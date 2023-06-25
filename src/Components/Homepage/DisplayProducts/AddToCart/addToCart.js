import React from 'react';
import { addToCart } from '../../../Others/HelperFunction/helperFunction';
import styles from './addToCart.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';

function AddToCart ({ context, cartStorage, product, amount }) {
    return (
        <div className={styles.addToCartItem} onClick={(e) => addToCart(e, context, cartStorage, product, amount) }>
            <FontAwesomeIcon icon={faCartShopping} className={styles.shoppingIcon}/>
            <p className={styles.shoppingP}>Add To Cart</p>
        </div>
    )
}

export default AddToCart;
