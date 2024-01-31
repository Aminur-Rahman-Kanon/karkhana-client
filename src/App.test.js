// import React from 'react';
import { render, screen } from '@testing-library/react';
import { fireEvent, waitForElementToBeRemoved } from '@testing-library/react';
import { renderWithClient, mockFallback } from './utils/utils';
import App from './App';
import HomepageMain from './Components/Homepage/HomepageMain/homepageMain';
import ProductsListMain from './Components/Products/ProductsList/ProductsListMain/productsListMain';
import ProductsDetailsMain from './Components/Products/ProductsDetails/ProductsDetailsMain/productsDetailsMain';
import BlogMain from './Components/Blog/BlogMain/blogMain';
import LoginMain from './Components/Login/LoginMain/loginMain';
import RegisterMain from './Components/Register/RegisterMain/registerMain';
import ForgotPassword from './Components/Login/ForgotPassword/forgotPassword';
import ProfileMain from './Components/Profile/ProfileMain/profileMain';
import ShoppingCartMain from './Components/Topbar/ShoppingCart/ShoppingCartMain/shoppingCartMain';
import CheckoutMain from './Components/Checkout/CheckoutMain/checkoutMain';
import AboutUs from './Components/AboutUs/aboutUs';
import DefaultRoute from './Components/DefaultRoute/defaultRoute';
import ErrorBoundary from './Components/ErrorBoundary/errorBoundary';
import { MemoryRouter } from 'react-router-dom';

jest.mock('./Components/Homepage/HomepageMain/homepageMain.js');
jest.mock('./Components/Products/ProductsList/ProductsListMain/productsListMain.js');
jest.mock('./Components/Products/ProductsDetails/ProductsDetailsMain/productsDetailsMain.js');
jest.mock('./Components/Blog/BlogMain/blogMain.js');
jest.mock('./Components/Login/LoginMain/loginMain.js');
jest.mock('./Components/Register/RegisterMain/registerMain.js');
jest.mock('./Components/Login/ForgotPassword/forgotPassword.js');
jest.mock('./Components/Profile/ProfileMain/profileMain.js');
jest.mock('./Components/Topbar/ShoppingCart/ShoppingCartMain/shoppingCartMain.js');
jest.mock('./Components/Checkout/CheckoutMain/checkoutMain.js');
jest.mock('./Components/AboutUs/aboutUs.js');
jest.mock('./Components/DefaultRoute/defaultRoute.js');

describe('<App />', () => {
  test("should render app, topbar, footer and backdrop and sidedrawer conditionally", async () => {
    render(
      <ErrorBoundary fallbackUI={mockFallback}>
        <MemoryRouter initialEntries={['/']}>
            <App />
        </MemoryRouter>
      </ErrorBoundary>
    )
    //checking loading... text to be removed from dom
    waitForElementToBeRemoved(async () => await screen.findByText(/Loading.../))
    //checking topbar and footer is rendered
    expect(screen.getByTestId('topbar')).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();
    //checking backdrop and sidedrawer is working properly
    fireEvent.click(screen.getByTestId('drawToggle'));
    expect(screen.getByTestId('backdrop')).toBeInTheDocument();
    expect(screen.getByTestId('sidedrawer')).toBeInTheDocument();
  })

  test('should render homepage route', () => {
    HomepageMain.mockImplementation(() => <div>Homepage</div>);
    render(
      <ErrorBoundary fallbackUI={mockFallback}>
        <MemoryRouter initialEntries={['/']}>
            <App />
        </MemoryRouter>
      </ErrorBoundary>
    )
    //checking for element to be present
    expect(screen.getByText('Homepage')).toBeInTheDocument();
  })

  test('should render product list route', () => {
    ProductsListMain.mockImplementation(() => <div>ProductList</div>);
    render(
      <ErrorBoundary fallbackUI={mockFallback}>
        <MemoryRouter initialEntries={['/products/productsId']}>
            <App />
        </MemoryRouter>
      </ErrorBoundary>
    )
    expect(screen.getByText('ProductList')).toBeInTheDocument();
  })
  
  test('should render productDetails route', () => {
    ProductsDetailsMain.mockImplementation(() => <div>ProductDetails</div>);
    render(
      <ErrorBoundary fallbackUI={mockFallback}>
        <MemoryRouter initialEntries={['/products/productId/productDetails']}>
            <App />
        </MemoryRouter>
      </ErrorBoundary>
    )
    expect(screen.queryByText('ProductDetails')).toBeInTheDocument();
  })

  test('should render login route', () => {
    LoginMain.mockImplementation(() => <div>Login</div>);
    render(
      <ErrorBoundary fallbackUI={mockFallback}>
        <MemoryRouter initialEntries={['/login']}>
            <App />
        </MemoryRouter>
      </ErrorBoundary>
    )
    expect(screen.queryByText('Login')).toBeInTheDocument();
  })

  test('should render register route', () => {
    RegisterMain.mockImplementation(() => <div>Register</div>);
    render(
      <ErrorBoundary fallbackUI={mockFallback}>
        <MemoryRouter initialEntries={['/register']}>
            <App />
        </MemoryRouter>
      </ErrorBoundary>
    )
    expect(screen.queryByText('Register')).toBeInTheDocument();
  })

  test('should render forgot password route', () => {
    ForgotPassword.mockImplementation(() => <div>ForgotPassword</div>);
    render(
      <ErrorBoundary fallbackUI={mockFallback}>
        <MemoryRouter initialEntries={['/forgot-password']}>
            <App />
        </MemoryRouter>
      </ErrorBoundary>
    )
    expect(screen.queryByText('ForgotPassword')).toBeInTheDocument();
  })

  test('should render profile route', () => {
    ProfileMain.mockImplementation(() => <div>Profile</div>);
    render(
      <ErrorBoundary fallbackUI={mockFallback}>
        <MemoryRouter initialEntries={['/profile']}>
            <App />
        </MemoryRouter>
      </ErrorBoundary>
    )
    expect(screen.queryByText('Profile')).toBeInTheDocument();
  })

  test('should render shopping cart route', () => {
    ShoppingCartMain.mockImplementation(() => <div>ShoppingCart</div>);
    render(
      <ErrorBoundary fallbackUI={mockFallback}>
        <MemoryRouter initialEntries={['/shopping-cart']}>
            <App />
        </MemoryRouter>
      </ErrorBoundary>
    )
    expect(screen.queryByText('ShoppingCart')).toBeInTheDocument();
  })
  
  test('should render checkout route', () => {
    CheckoutMain.mockImplementation(() => <div>Checkout</div>);
    render(
      <ErrorBoundary fallbackUI={mockFallback}>
        <MemoryRouter initialEntries={['/checkout']}>
            <App />
        </MemoryRouter>
      </ErrorBoundary>
    )
    expect(screen.queryByText('Checkout')).toBeInTheDocument();
  })

  test('should render about us route', () => {
    AboutUs.mockImplementation(() => <div>AboutUs</div>);
    render(
      <ErrorBoundary fallbackUI={mockFallback}>
        <MemoryRouter initialEntries={['/about-us']}>
            <App />
        </MemoryRouter>
      </ErrorBoundary>
    )
    expect(screen.queryByText('AboutUs')).toBeInTheDocument();
  })

  test('should render blog route', () => {
    BlogMain.mockImplementation(() => <div>BlogPost</div>);
    render(
      <ErrorBoundary fallbackUI={mockFallback}>
        <MemoryRouter initialEntries={['/blog']}>
            <App />
        </MemoryRouter>
      </ErrorBoundary>
    )
    expect(screen.queryByText('BlogPost')).toBeInTheDocument();
  })

  test('should render no match route route', () => {
    DefaultRoute.mockImplementation(() => <div>NoMatchRoute</div>);
    render(
      <ErrorBoundary fallbackUI={mockFallback}>
        <MemoryRouter initialEntries={['/*']}>
            <App />
        </MemoryRouter>
      </ErrorBoundary>
    )
    expect(screen.queryByText('NoMatchRoute')).toBeInTheDocument();
  })
})

