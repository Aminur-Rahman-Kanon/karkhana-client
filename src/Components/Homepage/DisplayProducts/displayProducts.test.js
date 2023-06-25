import DisplayProducts from "./displayProducts";
import { renderWithClient } from '../../../utils/utils';
import AuthContext from "../../Others/AuthContext/authContext";
import { render } from '@testing-library/react';
import { featuredData, trendingData, topSellerData, exclusiveData } from "./MockDisplayData/mockDisplayData";

describe('should render product details as per products category', () => {
  
  test('should render featured product details', () => {
    const displayProducts = render(<DisplayProducts product={featuredData}/>)
  
    expect(displayProducts.getByText(/Featured 1/i)).toBeInTheDocument();
    expect(displayProducts.getByRole('img', { name: 'Featured 1' })).toBeInTheDocument();
  })

  test('should render trending product details', () => {
    const displayProducts = render(<DisplayProducts product={trendingData}/>)
  
    expect(displayProducts.getByText(/Trending 1/i)).toBeInTheDocument();
    expect(displayProducts.getByRole('img', { name: 'Trending 1' })).toBeInTheDocument();
  })

  test('should render top seller product details', () => {
    const displayProducts = render(<DisplayProducts product={topSellerData}/>)

    expect(displayProducts.getByText(/Top Seller 1/i)).toBeInTheDocument();
    expect(displayProducts.getByRole('img', { name: 'Top Seller 1' })).toBeInTheDocument();
  })

  test('should render exclusive product details', () => {
    const displayProducts = render(<DisplayProducts product={exclusiveData}/>)
  
    expect(displayProducts.getByText(/Exclusive 1/i)).toBeInTheDocument();
    expect(displayProducts.getByRole('img', { name: 'Exclusive 1' })).toBeInTheDocument();
  })
})

