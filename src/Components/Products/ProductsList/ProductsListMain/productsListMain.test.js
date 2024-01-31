import ProductsListMain from "./productsListMain";
import { findAllByTestId, render, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import { mockProducts } from "../../../Others/mockProductsData/mockProductsData";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import AuthContext from "../../../Others/AuthContext/authContext";
import { mockFetchForProducts } from '../../../../utils/utils';

//this is an e2e test
const mockFetchApi = global.fetch = () => jest.fn(() => mockFetchForProducts());
//mocking the necessary dependencies
describe('<ProductsListMain />', () => {
    beforeEach(() => {
        window.scrollTo = jest.fn();
        global.fetch = jest.fn(() => mockFetchForProducts());
        global.ResizeObserver = require('resize-observer-polyfill');
    })
    //clearing mocks after each test
    afterEach(() => {
        fetch.mockClear();
    })
    //checking commponent rendered correctly
    test('should render productsList comonent with default behaviour', () => {
        const productsList = render(
            <MemoryRouter initialEntries={['/products/featured']}>
                <AuthContext value={{}}>
                    <Routes>
                        <Route path="/products/:productId" element={<ProductsListMain />} />
                    </Routes>
                </AuthContext>
            </MemoryRouter>
        )
        //checking for side effect cause by fetch api
        waitForElementToBeRemoved(() => productsList.findAllByTestId('product-spinner'));
        //checking for the products sidebar links
        expect(productsList.getByRole('link', { name: 'Bracelets' })).toHaveAttribute('href', '/products/bracelet');
        expect(productsList.getByRole('link', { name: 'Finger Rings' })).toHaveAttribute('href', '/products/finger-ring');
        expect(productsList.getByRole('link', { name: 'Necklace' })).toHaveAttribute('href', '/products/necklace');
        expect(productsList.getByRole('link', { name: 'Toe Ring' })).toHaveAttribute('href', '/products/toe-ring');
        expect(productsList.getByRole('link', { name: 'Others' })).toHaveAttribute('href', '/products/others');

        //checking filter buttons are disabled
        expect(productsList.getByRole('button', { name: 'Reset' })).toBeDisabled();
        expect(productsList.getByRole('button', { name: 'Apply' })).toBeDisabled();
    })
    //we are testing it bypassing product category latest
    //checking products for latest
    test('should render productsList component with product latest', async () => {
        const productsList = render(
            <MemoryRouter initialEntries={['/products/featured']}>
                <AuthContext value={{ data: mockProducts }}>
                    <Routes>
                        <Route path="/products/:productId" element={<ProductsListMain />} />
                    </Routes>
                </AuthContext>
            </MemoryRouter>
        )
        //checking for side effect cause by fetch api
        waitForElementToBeRemoved(() => productsList.findAllByTestId('product-spinner'));
        //checking for one product details to make sure that products are rendered
        waitFor(() => expect(productsList.findAllByTestId('product-list-item').length).toEqual(2));
        waitFor(() => expect(productsList.getByRole('link', { name: 'Featured 1 Add To Cart Featured 1 ৳5000' })).toHaveAttribute('href', '/products/latest/Latest 1'));
        waitFor(() => expect(productsList.getByRole('img', { name: 'Featured 1' })).toBeInTheDocument());
        waitFor(() => expect(productsList.queryByText('Featured 1')).toBeInTheDocument());
        waitFor(() => expect(productsList.queryByText('৳5000')).toBeInTheDocument());
    })

    afterEach(() => {
        jest.clearAllMocks();
    })
})