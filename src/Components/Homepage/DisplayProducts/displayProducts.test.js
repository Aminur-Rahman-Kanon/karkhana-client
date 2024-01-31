import DisplayProducts from "./displayProducts";
import { findByText, render, screen, waitFor } from '@testing-library/react';
import { mockFetchForProducts } from '../../../utils/utils';

test('should render DisplayProducts with products', async () => {
  window.fetch = () => mockFetchForProducts();
  render(
    <DisplayProducts category={'featured'}/>
  )

  waitFor(() => expect(screen.findByRole('link', { name: 'Featured 1' })).toHaveAttribute('href', '/products/featured/Featured 1'));
  waitFor(() => expect(screen.findByText('৳ 5000')).toBeInTheDocument());
})

