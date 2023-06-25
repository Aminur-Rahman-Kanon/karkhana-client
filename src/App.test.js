import React from 'react';
import { fireEvent, waitForElementToBeRemoved } from '@testing-library/react';
import { renderWithClient } from './utils/utils';
import App from './App';
import Homepage from './Components/Homepage/homepage';
import ProductsList from './Components/Products/ProductsList/productsList';
import ProductsDetails from './Components/Products/ProductsDetails/productsDetails';
import Blog from './Components/Blog/blog';
import Login from './Components/Login/login';
import Register from './Components/Register/register';
import ForgotPassword from './Components/Login/ForgotPassword/forgotPassword';
import Profile from './Components/Profile/profile';
import ShoppingCart from './Components/Topbar/shoppingCart/shoppingCart';
import Checkout from './Components/Checkout/checkout';
import AboutUs from './Components/AboutUs/aboutUs';
import DefaultRoute from './Components/DefaultRoute/defaultRoute';

jest.mock('./Components/Homepage/homepage.js');
jest.mock('./Components/Products/ProductsList/productsList.js');
jest.mock('./Components/Products/ProductsDetails/productsDetails.js');
jest.mock('./Components/Blog/blog.js');
jest.mock('./Components/Login/login.js');
jest.mock('./Components/Register/register.js');
jest.mock('./Components/Login/ForgotPassword/forgotPassword.js');
jest.mock('./Components/Profile/profile.js');
jest.mock('./Components/Topbar/shoppingCart/shoppingCart.js');
jest.mock('./Components/Checkout/checkout.js');
jest.mock('./Components/AboutUs/aboutUs.js');
jest.mock('./Components/DefaultRoute/defaultRoute.js');

describe('should render app and all the routes', () => {
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
    Homepage.mockImplementation(() => <div>Homepage</div>);
    const result = renderWithClient({children: <App />, route: ['/']});
    expect(result.getByText('Homepage')).toBeInTheDocument();
  })

  test('should render product list route', () => {
    ProductsList.mockImplementation(() => <div>ProductList</div>);
    const result = renderWithClient({children: <App />, route: ['/products/productsId']});
    expect(result.getByText('ProductList')).toBeInTheDocument();
  })
  
  test('should render productDetails route', () => {
    ProductsDetails.mockImplementation(() => <div>ProductDetails</div>);
    const result = renderWithClient({children: <App />, route: ['/products/productId/productDetails']});
    expect(result.queryByText('ProductDetails')).toBeInTheDocument();
  })

  test('should render login route', () => {
    Login.mockImplementation(() => <div>Login</div>);
    const result = renderWithClient({children: <App />, route: ['/login']});
    expect(result.queryByText('Login')).toBeInTheDocument();
  })

  test('should render register route', () => {
    Register.mockImplementation(() => <div>Register</div>);
    const result = renderWithClient({children: <App />, route: ['/register']});
    expect(result.queryByText('Register')).toBeInTheDocument();
  })

  test('should render forgot password route', () => {
    ForgotPassword.mockImplementation(() => <div>ForgotPassword</div>);
    const result = renderWithClient({children: <App />, route: ['/forgot-password']});
    expect(result.queryByText('ForgotPassword')).toBeInTheDocument();
  })

  test('should render profile route', () => {
    Profile.mockImplementation(() => <div>Profile</div>);
    const result = renderWithClient({children: <App />, route: ['/profile']});
    expect(result.queryByText('Profile')).toBeInTheDocument();
  })

  test('should render shopping cart route', () => {
    ShoppingCart.mockImplementation(() => <div>ShoppingCart</div>);
    const result = renderWithClient({children: <App />, route: ['/shopping-cart']});
    expect(result.queryByText('ShoppingCart')).toBeInTheDocument();
  })
  
  test('should render checkout route', () => {
    Checkout.mockImplementation(() => <div>Checkout</div>);
    const result = renderWithClient({children: <App />, route: ['/checkout']});
    expect(result.queryByText('Checkout')).toBeInTheDocument();
  })

  test('should render about us route', () => {
    AboutUs.mockImplementation(() => <div>AboutUs</div>);
    const result = renderWithClient({children: <App />, route: ['/about-us']});
    expect(result.queryByText('AboutUs')).toBeInTheDocument();
  })

  test('should render blog route', () => {
    Blog.mockImplementation(() => <div>BlogPost</div>);
    const result = renderWithClient({children: <App />, route: ['/blog']});
    expect(result.queryByText('BlogPost')).toBeInTheDocument();
  })

  test('should render no match route route', () => {
    DefaultRoute.mockImplementation(() => <div>NoMatchRoute</div>);
    const result = renderWithClient({children: <App />, route: ['/*']});
    expect(result.queryByText('NoMatchRoute')).toBeInTheDocument();
  })
})

