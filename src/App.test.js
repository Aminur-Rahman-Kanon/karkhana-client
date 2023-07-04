import React from 'react';
import { fireEvent, waitForElementToBeRemoved } from '@testing-library/react';
import { renderWithClient } from './utils/utils';
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
    const result = renderWithClient({ children: <App/>, route: ['/'] });

    //checking loading... text to be removed from dom
    waitForElementToBeRemoved(async () => await result.findByText(/Loading.../))
    // expect(result.queryByText('Loading...')).toBeInTheDocument();

    //checking topbar and footer is rendered
    expect(result.getByTestId('topbar')).toBeInTheDocument();
    expect(result.getByTestId('footer')).toBeInTheDocument();

    //checking backdrop and sidedrawer is working properly
    fireEvent.click(result.getByTestId('drawToggle'));
    expect(result.getByTestId('backdrop')).toBeInTheDocument();
    expect(result.getByTestId('sidedrawer')).toBeInTheDocument();
  })

  test('should render homepage route', () => {
    HomepageMain.mockImplementation(() => <div>Homepage</div>);
    const result = renderWithClient({children: <App />, route: ['/']});
    expect(result.getByText('Homepage')).toBeInTheDocument();
  })

  test('should render product list route', () => {
    ProductsListMain.mockImplementation(() => <div>ProductList</div>);
    const result = renderWithClient({children: <App />, route: ['/products/productsId']});
    expect(result.getByText('ProductList')).toBeInTheDocument();
  })
  
  test('should render productDetails route', () => {
    ProductsDetailsMain.mockImplementation(() => <div>ProductDetails</div>);
    const result = renderWithClient({children: <App />, route: ['/products/productId/productDetails']});
    expect(result.queryByText('ProductDetails')).toBeInTheDocument();
  })

  test('should render login route', () => {
    LoginMain.mockImplementation(() => <div>Login</div>);
    const result = renderWithClient({children: <App />, route: ['/login']});
    expect(result.queryByText('Login')).toBeInTheDocument();
  })

  test('should render register route', () => {
    RegisterMain.mockImplementation(() => <div>Register</div>);
    const result = renderWithClient({children: <App />, route: ['/register']});
    expect(result.queryByText('Register')).toBeInTheDocument();
  })

  test('should render forgot password route', () => {
    ForgotPassword.mockImplementation(() => <div>ForgotPassword</div>);
    const result = renderWithClient({children: <App />, route: ['/forgot-password']});
    expect(result.queryByText('ForgotPassword')).toBeInTheDocument();
  })

  test('should render profile route', () => {
    ProfileMain.mockImplementation(() => <div>Profile</div>);
    const result = renderWithClient({children: <App />, route: ['/profile']});
    expect(result.queryByText('Profile')).toBeInTheDocument();
  })

  test('should render shopping cart route', () => {
    ShoppingCartMain.mockImplementation(() => <div>ShoppingCart</div>);
    const result = renderWithClient({children: <App />, route: ['/shopping-cart']});
    expect(result.queryByText('ShoppingCart')).toBeInTheDocument();
  })
  
  test('should render checkout route', () => {
    CheckoutMain.mockImplementation(() => <div>Checkout</div>);
    const result = renderWithClient({children: <App />, route: ['/checkout']});
    expect(result.queryByText('Checkout')).toBeInTheDocument();
  })

  test('should render about us route', () => {
    AboutUs.mockImplementation(() => <div>AboutUs</div>);
    const result = renderWithClient({children: <App />, route: ['/about-us']});
    expect(result.queryByText('AboutUs')).toBeInTheDocument();
  })

  test('should render blog route', () => {
    BlogMain.mockImplementation(() => <div>BlogPost</div>);
    const result = renderWithClient({children: <App />, route: ['/blog']});
    expect(result.queryByText('BlogPost')).toBeInTheDocument();
  })

  test('should render no match route route', () => {
    DefaultRoute.mockImplementation(() => <div>NoMatchRoute</div>);
    const result = renderWithClient({children: <App />, route: ['/*']});
    expect(result.queryByText('NoMatchRoute')).toBeInTheDocument();
  })
})

