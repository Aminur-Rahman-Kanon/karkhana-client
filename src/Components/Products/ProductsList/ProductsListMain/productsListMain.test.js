import ProductsListMain from "./productsListMain";
import { findAllByTestId, render, waitFor } from '@testing-library/react';
import { mockProducts } from "../../../Others/mockProductsData/mockProductsData";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import AuthContext from "../../../Others/AuthContext/authContext";


describe('<ProductsListMain />', () => {
    beforeEach(() => {
        window.scrollTo = jest.fn();
        global.ResizeObserver = require('resize-observer-polyfill');
    })
    //checking commponent rendered correctly
    test('should render productsList comonent with default behaviour', () => {
        const productsList = render(
            <MemoryRouter initialEntries={['/products/latest']}>
                <AuthContext value={{ data: mockProducts }}>
                    <Routes>
                        <Route path="/products/:productId" element={<ProductsListMain />} />
                    </Routes>
                </AuthContext>
            </MemoryRouter>
        )

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
    //checking products for latest
    test('should render productsList component with product latest', async () => {
        const productsList = render(
            <MemoryRouter initialEntries={['/products/latest']}>
                <AuthContext value={{ data: mockProducts }}>
                    <Routes>
                        <Route path="/products/:productId" element={<ProductsListMain />} />
                    </Routes>
                </AuthContext>
            </MemoryRouter>
        )

        // productsList.debug();
        
        //checking for individual product link and details
        const products = await productsList.findAllByTestId('product-list-item');
        console.log(products);
        // expect(productsList.getByRole('link', { name: 'Featured 1 Add To Cart Featured 1 ৳5000' })).toHaveAttribute('href', '/products/latest/Latest 1');
        // expect(productsList.getByRole('img', { name: 'Featured 1' })).toBeInTheDocument();
        // expect(productsList.queryByText('Featured 1')).toBeInTheDocument();
        // expect(productsList.queryByText('৳5000')).toBeInTheDocument();
    })
    //we are testing it bypassing one type of product
    //checking products for bracelet
    test('should render productsList component with product bracelet', async () => {
        const productsList = render(
            <MemoryRouter initialEntries={['/products/bracelet']}>
                <AuthContext value={{ data: mockProducts }}>
                    <Routes>
                        <Route path="/products/:productId" element={<ProductsListMain />} />
                    </Routes>
                </AuthContext>
            </MemoryRouter>
        )
        
        //checking for individual product link and details
        expect(productsList.getByRole('link', { name: 'Bracelet 1 Add To Cart Bracelet 1 ৳1200' })).toHaveAttribute('href', '/products/bracelet/Bracelet 1');
        expect(productsList.getByRole('img', { name: 'Bracelet 1' })).toBeInTheDocument();
        expect(productsList.queryByText('Bracelet 1')).toBeInTheDocument();
        expect(productsList.queryByText('৳1200')).toBeInTheDocument();
    })

    afterEach(() => {
        jest.clearAllMocks();
    })
})