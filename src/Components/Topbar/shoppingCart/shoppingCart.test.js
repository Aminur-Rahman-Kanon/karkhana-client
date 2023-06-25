import ShoppingCart from "./shoppingCart";
import { render } from '@testing-library/react';
import AuthContext from "../../Others/AuthContext/authContext";
import { MemoryRouter } from "react-router-dom";

test('should render shopping container', () => {
    const shoppingContainer = render(<MemoryRouter initialEntries={['/']}>
        <AuthContext value={{value: 'test'}}>
            <ShoppingCart />
        </AuthContext>
    </MemoryRouter>)

    //checking for user and shopping cart icon
    expect(shoppingContainer.container.querySelector("[data-icon='user']")).toBeInTheDocument();
    expect(shoppingContainer.container.querySelector("[data-icon='cart-shopping']")).toBeInTheDocument();

    //checking for login and register link
    expect(shoppingContainer.getByRole('link', { name: 'Login' })).toHaveAttribute('href', '/login');
    expect(shoppingContainer.getByRole('link', { name: 'Register' })).toHaveAttribute('href', '/register');

    //checking shopiing cart is empty
    expect(shoppingContainer.getByTestId('shopping-cart')).toBeVisible();
    expect(shoppingContainer.getByTestId('item-count').textContent).toContainEqual('0');
})
