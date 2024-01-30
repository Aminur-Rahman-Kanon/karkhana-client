import ProductsDetailsMain from "./productsDetailsMain";
import { render, waitFor, fireEvent, findAllByAltText } from '@testing-library/react';
import AuthContext from "../../../Others/AuthContext/authContext";
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { mockFetchForProducts } from '../../../../utils/utils';
import { act } from "react-dom/test-utils";

window.scrollTo = jest.fn();

test('should productsDetails render with product featured', async () => {
    window.fetch = () => mockFetchForProducts();
    const productDetails = render(
        <MemoryRouter initialEntries={['/products/featured/Featured 1']}>
            <AuthContext value={{}}>
                <Routes>
                    <Route path="/products/:category/:productId" element={<ProductsDetailsMain />}/>
                </Routes>
            </AuthContext>
        </MemoryRouter>
    )

    //checking all featured products images
    expect(await productDetails.findByText('Featured 1')).toBeInTheDocument();
    expect((await productDetails.findAllByAltText('Featured 1')).length).toEqual(5);
    //checking buttons for disabilities
    expect(productDetails.getByRole('button', { name: 'decrement' })).toBeDisabled();
    expect(productDetails.getByRole('button', { name: 'increment' })).not.toBeDisabled();
    expect(productDetails.getByRole('button', { name: 'Add to Cart' })).toBeDisabled();
    expect(productDetails.getByRole('button', { name: '+ Wishlist' })).not.toBeDisabled();

    // //should incrementing item enable add to cart button
    const incrementBtn = productDetails.getByRole('button', { name: 'increment' });
    act(() => {
        fireEvent.click(incrementBtn);
    })
    expect(productDetails.getByRole('button', { name: 'decrement' })).not.toBeDisabled();
    await waitFor(() => expect(productDetails.getByTestId('item-count').textContent).toBe('1'));
    await waitFor(() => expect(productDetails.getByRole('button', { name: 'Add to Cart' })).not.toBeDisabled());
})
