import DisplayCart from "./displayCart";
import { render } from '@testing-library/react';
import AuthContext from "../Others/AuthContext/authContext";
import { MemoryRouter } from "react-router-dom";
import { mockProducts } from "../Products/ProductsList/mockProductsData/mockProductsData";

beforeEach(() => {
    sessionStorage.setItem('cart', JSON.stringify({"Latest 1" : [mockProducts.latest[0]]}))
})

test('should displayCart render with sessionStorage', () => {
    const displayCart = render(
        <MemoryRouter initialEntries={['/shopping-cart']}>
            <AuthContext value={{data: 'test'}}>
                <DisplayCart />
            </AuthContext>
        </MemoryRouter>
    )

    //checking products image and details
    expect(displayCart.getByRole('img', { name: 'Latest 1' })).toHaveAccessibleName('Latest 1');
    expect(displayCart.getByRole('img', { name: 'bkash' })).toBeInTheDocument();
    expect(displayCart.getByRole('img', { name: 'visa' })).toBeInTheDocument();
    expect(displayCart.getByText('Latest 1')).toBeInTheDocument();
    expect(displayCart.getByText('৳ 1200')).toBeInTheDocument();

    //checking buttons for not to be disabled
    expect(displayCart.getByRole('link', { name: 'CHECKOUT' })).toHaveAttribute('href', '/checkout');
    expect(displayCart.getByRole('button', { name: 'CONTINUE SHOPPING' })).not.toBeDisabled();
    expect(displayCart.getByRole('button', { name: 'Apply' })).not.toBeDisabled();
})

afterAll(() => {
    sessionStorage.removeItem('cart');
})