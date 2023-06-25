import { toast } from "react-toastify";

export const addToCart = (e, context, cartItem, item, amount) => {
    e.preventDefault();
    const user = sessionStorage.getItem('user')
    if (!user) {
        return toast.info("Please log in to continue", {
            position: toast.POSITION.TOP_RIGHT
        })
    }
    else {
        //if sessionStorage is empty
        if (cartItem === null) {
            const itemToStore = {};
            itemToStore[item.name] = [];
            [...Array(amount).keys()].map(i => {
                itemToStore[item.name].push(item);
            });
            sessionStorage.setItem('cart', JSON.stringify(itemToStore));
            context.setCartItem(context.cartItem + 1);
        }
        //if item exist in the sessionStorage
        else {
            //if similiar item exist in the sessionStorage
            if (Object.keys(cartItem).includes(item.name)) {
                [...Array(amount).keys()].map(i => {
                    cartItem[item.name].push(item);
                })
                sessionStorage.setItem('cart', JSON.stringify(cartItem));
                context.setCartItem(context.cartItem + 1);
            }
            //new item to sessionStorage
            else {
                cartItem[item.name] = [];
                [...Array(amount).keys()].map(i => {
                    cartItem[item.name].push(item);
                })
                sessionStorage.setItem('cart', JSON.stringify(cartItem))
                context.setCartItem(context.cartItem + 1);
            }
        }
        
        return toast.success(`${amount} ${item.name} added to Cart`, {
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