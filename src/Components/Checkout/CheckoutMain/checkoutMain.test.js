import CheckoutMain from "./checkoutMain";
import { render, waitFor } from '@testing-library/react';
import AuthContext from "../../Others/AuthContext/authContext";
import { MemoryRouter } from "react-router-dom";
import { mockProducts } from "../../Others/mockProductsData/mockProductsData";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const mockElement = () => ({
    mount: jest.fn(),
    destroy: jest.fn(),
    on: jest.fn(),
    update: jest.fn(),
})

const mockElements = () => {
    const elements = {};
    return {
        create: jest.fn((type) => {
            elements[type] = mockElement();
            return elements[type];
        }),
        getElement: jest.fn((type) => {
            return elements[type] || null;
        }),
    }
}

const mockStripe = () => ({
    elements: jest.fn(() => mockElements()),
    createToken: jest.fn(),
    createSource: jest.fn(),
    createPaymentMethod: jest.fn(),
    confirmCardPayment: jest.fn(),
    confirmCardSetup: jest.fn(),
    paymentRequest: jest.fn(),
    _registerWrapper: jest.fn(),
})

beforeEach(() => {
    sessionStorage.setItem('cart', JSON.stringify({'Latest 1': [mockProducts.latest[0]]}));
    jest.mock('@stripe/react-stripe-js', () => {
        const stripe = jest.requireActual('@stripe/react-stripe-js')
        return ({
            ...stripe,
            Element: () => {
            return mockElement
            },
            useStripe: () => {
            return mockStripe
            },
            useElements: () => {
            return mockElements
            },
        })
    })
})

test('should render checkout component', async () => {
    const checkout = render(
        <MemoryRouter initialEntries={['/checkout']}>
            <AuthContext value={{ data: 'test' }}>
                <Elements stripe={loadStripe('test_key')}>
                    <CheckoutMain />
                </Elements>
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
    expect(checkout.queryByRole('heading', { name: 'CARD NUMBER' })).toBeInTheDocument();
    expect(checkout.getByTestId('month').value).toBe('Select Month');
    expect(checkout.getByTestId('year').value).toBe('Select Year');
    expect(checkout.getByTestId('cvv').value).toBe('');
})

afterAll(() => {
    sessionStorage.removeItem('cart');
    jest.clearAllMocks();
})
