import { toast } from "react-toastify";

export const addToCart = (e, context, cartStorage, product, amount) => {
    e.preventDefault();
    //checking whether user logged in or not. If not then request to login
    const user = sessionStorage.getItem('user');
    if (!user) {
        return toast.info("Please log in to continue", {
            position: toast.POSITION.TOP_RIGHT
        })
    }
    else {
        //if sessionStorage is empty then we create an object where item name will be the key and
        //value will be an array storing the item as first element
        if (cartStorage === null) {
            const itemToStore = {};
            itemToStore[product.name] = [];
            [...Array(amount).keys()].map(i => {
                itemToStore[product.name].push(product);
            });
            sessionStorage.setItem('cart', JSON.stringify(itemToStore));
            context.setCartItem(context.cartItem + 1);
        }
        //if item category exist in the sessionStorage then check for similiar item, if exist
        //then we store in the same array otherwise we create a new array and store it into the object
        else {
            //if similiar item exist in the sessionStorage
            if (Object.keys(cartStorage).includes(product.name)) {
                [...Array(amount).keys()].map(i => {
                    cartStorage[product.name].push(product);
                })
                sessionStorage.setItem('cart', JSON.stringify(cartStorage));
                context.setCartItem(context.cartItem + 1);
            }
            //new item to sessionStorage
            else {
                cartStorage[product.name] = [];
                [...Array(amount).keys()].map(i => {
                    cartStorage[product.name].push(product);
                })
                sessionStorage.setItem('cart', JSON.stringify(cartStorage))
                context.setCartItem(context.cartItem + 1);
            }
        }
        
        //finally display a message that n amount of item was stored into the cart
        return toast.success(`${amount} ${product.name} added to Cart`, {
            position: toast.POSITION.TOP_RIGHT
        })
    }
}

export const removeItem = (context, data, item) => {
    Object.keys(data).map(items => {
        if (items === item){
            data[items].pop();
            //delete the product object if there is no products in the array
            if (!data[items].length){
                delete data[items];
            }
            sessionStorage.setItem('cart', JSON.stringify(data));
            context.setCartItem(context.cartItem + 1)
        }
    })
    //delete the entire object from sessionStorage if there no item.
    if (Object.keys(data).length <= 0){
        sessionStorage.removeItem('cart');
        if (context.cartItem > 0){
            context.setCartItem(context.cartItem - 1);
        }
        else {
            context.setCartItem(context.cartItem + 1);
        }
    }
}

export const removeAllItem = (context, data, item) => {
    if (data[item].length){
        delete data[item];
        sessionStorage.setItem('cart', JSON.stringify(data));
        if (context.cartItem > 0){
            context.setCartItem(context.cartItem - 1);
        }
        else {
            context.setCartItem(context.cartItem + 1);
        }
    }
}

export const disableScroll = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
    window.onscroll = () => window.scrollTo(scrollLeft, scrollTop)
}