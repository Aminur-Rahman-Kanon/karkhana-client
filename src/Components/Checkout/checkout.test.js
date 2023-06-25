import Checkout from "./checkout";
import { render } from '@testing-library/react';
import AuthContext from "../Others/AuthContext/authContext";
import { MemoryRouter } from "react-router-dom";
import { mockProducts } from "../Products/ProductsList/mockProductsData/mockProductsData";

beforeEach(() => {
    sessionStorage.setItem('cart', JSON.stringify({'Latest 1': [mockProducts.latest[0]]}));
})

test('should render checkout component', () => {
    const checkout = render(
        <MemoryRouter initialEntries={['/checkout']}>
            <AuthContext value={{ data: 'test' }}>
                <Checkout />
            </AuthContext>
        </MemoryRouter>
    )

    //checking products image and details are present
    expect(checkout.getByRole('img', { name: 'Latest 1' })).toBeInTheDocument();
    expect(checkout.getByText('Latest 1')).toBeInTheDocument();
    expect(checkout.getByText('৳1200')).toBeInTheDocument();
    expect(checkout.getByText('Total: ৳1320')).toBeInTheDocument();

    //checking input fields are empty
    expect(checkout.getByTestId('name-on-card').value).toBe('');
    expect(checkout.getByTestId('card-number').value).toBe('');
    expect(checkout.getByTestId('month').value).toBe('Select Month');
    expect(checkout.getByTestId('year').value).toBe('Select Year');
    expect(checkout.getByTestId('cvv').value).toBe('');
})

afterAll(() => {
    sessionStorage.removeItem('cart');
})
