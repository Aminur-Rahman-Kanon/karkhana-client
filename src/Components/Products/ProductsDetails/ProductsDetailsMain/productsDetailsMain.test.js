import ProductsDetailsMain from "./productsDetailsMain";
import { render, waitFor, fireEvent } from '@testing-library/react';
import AuthContext from "../../../Others/AuthContext/authContext";
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { mockProducts } from "../../../Others/mockProductsData/mockProductsData";

window.scrollTo = jest.fn();

describe('<ProductsDetailsMain />', () => {
    test('should productsDetails render with product featured', async () => {
        const productDetails = render(
            <MemoryRouter initialEntries={['/products/featured/Featured 1']}>
                <AuthContext value={{data: mockProducts}}>
                    <Routes>
                        <Route path="/products/:productId/:productDetails" element={<ProductsDetailsMain />}/>
                    </Routes>
                </AuthContext>
            </MemoryRouter>
        )

        //checking all featured products images
        const images = productDetails.getAllByRole('img', { name: 'Featured 1' });
        images.forEach(img => expect(img).toBeInTheDocument());

        //checking products related info
        expect(productDetails.getByText('Featured 1')).toBeInTheDocument();

        //checking buttons for disabilities
        expect(productDetails.getByRole('button', { name: 'decrement' })).toBeDisabled();
        expect(productDetails.getByRole('button', { name: 'increment' })).not.toBeDisabled();
        expect(productDetails.getByRole('button', { name: 'Add to Cart' })).toBeDisabled();
        expect(productDetails.getByRole('button', { name: '+ Wishlist' })).not.toBeDisabled();

        //should incrementing item enable add to cart button
        const incrementBtn = productDetails.getByRole('button', { name: 'increment' });
        fireEvent.click(incrementBtn);
        expect(productDetails.getByRole('button', { name: 'decrement' })).not.toBeDisabled();
        await waitFor(() => expect(productDetails.getByTestId('item-count').textContent).toBe('1'));
        await waitFor(() => expect(productDetails.getByRole('button', { name: 'Add to Cart' })).not.toBeDisabled());
    })
})