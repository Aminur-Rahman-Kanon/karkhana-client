import AddToCart from "./addToCart";
import { render, waitFor } from '@testing-library/react';
import { sessionStorageMock } from "../../../utils/utils";
import userEvent from "@testing-library/user-event";
import { mockProducts } from "../mockProductsData/mockProductsData";

const context = {
    setItem: () => {},
    cartItem: 0
}

describe('<AddToCart />', () => {
    beforeAll(() => {
        Object.defineProperty(window, 'sessionStorage', { value: sessionStorageMock })
    })

    test('should render addToCart component', async () => {
        const addToCart = render(
            <AddToCart context={context} cartStorage={sessionStorageMock.getItem('cart')} product={mockProducts.latest[0]} amount={1}/>
        )
        
        //simulating addToCart button
        const addToCartBtn = addToCart.getByTestId('addToCart-btn');
        userEvent.click(addToCartBtn);
        
        //simulating storing item to the cart
        await waitFor(() => sessionStorageMock.setItem('cart', mockProducts.latest[0]));

        //asserting the value with the item that was stored
        const data = await waitFor(() => sessionStorageMock.getItem('cart'));
        expect(data).toEqual(mockProducts.latest[0]);
    })

    afterAll(() => {
        sessionStorageMock.clear();
    })
})
