import ProductsList from "./productsList";
import { render, waitFor } from '@testing-library/react';
import { mockProducts } from "./mockProductsData/mockProductsData";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import AuthContext from "../../Others/AuthContext/authContext";

window.scrollTo = jest.fn();
global.ResizeObserver = require('resize-observer-polyfill')

describe('should render productsList component', () => {
    //checking commponent rendered correctly
    test('should render productsList comonent with default behaviour', () => {
        const productsList = render(
            <MemoryRouter initialEntries={['/products/latest']}>
                <AuthContext value={{ data: mockProducts }}>
                    <Routes>
                        <Route path="/products/:productId" element={<ProductsList/>} />
                    </Routes>
                </AuthContext>
            </MemoryRouter>
        )

        //checking for the products sidebar links
        expect(productsList.getByRole('link', { name: 'Bracelets' })).toHaveAttribute('href', '/products/Bracelet');
        expect(productsList.getByRole('link', { name: 'Finger Rings' })).toHaveAttribute('href', '/products/Finger Ring');
        expect(productsList.getByRole('link', { name: 'Necklace' })).toHaveAttribute('href', '/products/Necklace');
        expect(productsList.getByRole('link', { name: 'Toe Ring' })).toHaveAttribute('href', '/products/Toe Ring');
        expect(productsList.getByRole('link', { name: 'Others' })).toHaveAttribute('href', '/products/Other');

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
                        <Route path="/products/:productId" element={<ProductsList/>} />
                    </Routes>
                </AuthContext>
            </MemoryRouter>
        )
        
        //checking for individual product link and details
        expect(productsList.getByRole('link', { name: 'Latest 1 Latest 1 ৳1200' })).toHaveAttribute('href', '/products/latest/Latest 1');
        expect(productsList.getByRole('img', { name: 'Latest 1' })).toBeInTheDocument();
        expect(productsList.queryByText('Latest 1')).toBeInTheDocument();
        expect(productsList.queryByText('৳1200')).toBeInTheDocument();
    })
    //checking products for bracelet
    test('should render productsList component with product bracelet', async () => {
        const productsList = render(
            <MemoryRouter initialEntries={['/products/bracelet']}>
                <AuthContext value={{ data: mockProducts }}>
                    <Routes>
                        <Route path="/products/:productId" element={<ProductsList/>} />
                    </Routes>
                </AuthContext>
            </MemoryRouter>
        )
        
        //checking for individual product link and details
        expect(productsList.getByRole('link', { name: 'Bracelet 1 Bracelet 1 ৳1200' })).toHaveAttribute('href', '/products/bracelet/Bracelet 1');
        expect(productsList.getByRole('img', { name: 'Bracelet 1' })).toBeInTheDocument();
        expect(productsList.queryByText('Bracelet 1')).toBeInTheDocument();
        expect(productsList.queryByText('৳1200')).toBeInTheDocument();
    })

    //checking products for finger ring
    test('should render productsList component with product finger ring', async () => {
        const productsList = render(
            <MemoryRouter initialEntries={['/products/fingerring']}>
                <AuthContext value={{ data: mockProducts }}>
                    <Routes>
                        <Route path="/products/:productId" element={<ProductsList/>} />
                    </Routes>
                </AuthContext>
            </MemoryRouter>
        )
        
        //checking for individual product link and details
        expect(productsList.getByRole('link', { name: 'Finger Ring 1 Finger Ring 1 ৳1200' })).toHaveAttribute('href', '/products/fingerring/Finger Ring 1');
        expect(productsList.getByRole('img', { name: 'Finger Ring 1' })).toBeInTheDocument();
        expect(productsList.queryByText('Finger Ring 1')).toBeInTheDocument();
        expect(productsList.queryByText('৳1200')).toBeInTheDocument();
    })

    //checking products for ear ring
    test('should render productsList component with product ear ring', async () => {
        const productsList = render(
            <MemoryRouter initialEntries={['/products/earring']}>
                <AuthContext value={{ data: mockProducts }}>
                    <Routes>
                        <Route path="/products/:productId" element={<ProductsList/>} />
                    </Routes>
                </AuthContext>
            </MemoryRouter>
        )
        
        //checking for individual product link and details
        expect(productsList.getByRole('link', { name: 'Ear Ring 1 Ear Ring 1 ৳1200' })).toHaveAttribute('href', '/products/earring/Ear Ring 1');
        expect(productsList.getByRole('img', { name: 'Ear Ring 1' })).toBeInTheDocument();
        expect(productsList.queryByText('Ear Ring 1')).toBeInTheDocument();
        expect(productsList.queryByText('৳1200')).toBeInTheDocument();
    })

    //checking products for necklace
    test('should render productsList component with product necklace', async () => {
        const productsList = render(
            <MemoryRouter initialEntries={['/products/necklace']}>
                <AuthContext value={{ data: mockProducts }}>
                    <Routes>
                        <Route path="/products/:productId" element={<ProductsList/>} />
                    </Routes>
                </AuthContext>
            </MemoryRouter>
        )
        
        //checking for individual product link and details
        expect(productsList.getByRole('link', { name: 'Necklace 1 Necklace 1 ৳1200' })).toHaveAttribute('href', '/products/necklace/Necklace 1');
        expect(productsList.getByRole('img', { name: 'Necklace 1' })).toBeInTheDocument();
        expect(productsList.queryByText('Necklace 1')).toBeInTheDocument();
        expect(productsList.queryByText('৳1200')).toBeInTheDocument();
    })

    //checking products for toe ring
    test('should render productsList component with product toe ring', async () => {
        const productsList = render(
            <MemoryRouter initialEntries={['/products/toering']}>
                <AuthContext value={{ data: mockProducts }}>
                    <Routes>
                        <Route path="/products/:productId" element={<ProductsList/>} />
                    </Routes>
                </AuthContext>
            </MemoryRouter>
        )
        
        //checking for individual product link and details
        expect(productsList.getByRole('link', { name: 'Toe Ring 1 Toe Ring 1 ৳1200' })).toHaveAttribute('href', '/products/toering/Toe Ring 1');
        expect(productsList.getByRole('img', { name: 'Toe Ring 1' })).toBeInTheDocument();
        expect(productsList.queryByText('Toe Ring 1')).toBeInTheDocument();
        expect(productsList.queryByText('৳1200')).toBeInTheDocument();
    })

    //checking products for nepali
    test('should render productsList component with product nepali', async () => {
        const productsList = render(
            <MemoryRouter initialEntries={['/products/nepali']}>
                <AuthContext value={{ data: mockProducts }}>
                    <Routes>
                        <Route path="/products/:productId" element={<ProductsList/>} />
                    </Routes>
                </AuthContext>
            </MemoryRouter>
        )
        
        //checking for individual product link and details
        expect(productsList.getByRole('link', { name: 'Nepali 1 Nepali 1 ৳5000' })).toHaveAttribute('href', '/products/nepali/Nepali 1');
        expect(productsList.getByRole('img', { name: 'Nepali 1' })).toBeInTheDocument();
        expect(productsList.queryByText('Nepali 1')).toBeInTheDocument();
        expect(productsList.queryByText('৳5000')).toBeInTheDocument();
    })

    //checking products for other
    test('should render productsList component with product other', async () => {
        const productsList = render(
            <MemoryRouter initialEntries={['/products/other']}>
                <AuthContext value={{ data: mockProducts }}>
                    <Routes>
                        <Route path="/products/:productId" element={<ProductsList/>} />
                    </Routes>
                </AuthContext>
            </MemoryRouter>
        )
        
        //checking for individual product link and details
        expect(productsList.getByRole('link', { name: 'Other 1 Other 1 ৳1200' })).toHaveAttribute('href', '/products/other/Other 1');
        expect(productsList.getByRole('img', { name: 'Other 1' })).toBeInTheDocument();
        expect(productsList.queryByText('Other 1')).toBeInTheDocument();
        expect(productsList.queryByText('৳1200')).toBeInTheDocument();
    })

    //checking products for featured
    test('should render productsList component with product featured', async () => {
        const productsList = render(
            <MemoryRouter initialEntries={['/products/featured']}>
                <AuthContext value={{ data: mockProducts }}>
                    <Routes>
                        <Route path="/products/:productId" element={<ProductsList/>} />
                    </Routes>
                </AuthContext>
            </MemoryRouter>
        )
        
        //checking for individual product link and details
        expect(productsList.getByRole('link', { name: 'Featured 1 Featured 1 ৳5000' })).toHaveAttribute('href', '/products/featured/Featured 1');
        expect(productsList.getByRole('img', { name: 'Featured 1' })).toBeInTheDocument();
        expect(productsList.queryByText('Featured 1')).toBeInTheDocument();
        expect(productsList.queryByText('৳5000')).toBeInTheDocument();
    })

    afterEach(() => {
        jest.clearAllMocks();
    })
})