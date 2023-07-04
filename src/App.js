import { Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import TopbarMain from './Components/Topbar/TopbarMain/topbarMain';
import HomepageMain from './Components/Homepage/HomepageMain/homepageMain';
import './App.css';
import Sidedrawer from './Components/Others/Sidedrawer/sidedrawer';
import Backdrop from './Components/Others/Backdrop/backdrop';
import Footer from './Components/Footer/footer';
import LoginMain from './Components/Login/LoginMain/loginMain';
import RegisterMain from './Components/Register/RegisterMain/registerMain';
import ProfileMain from './Components/Profile/ProfileMain/profileMain';
import ProductsListMain from './Components/Products/ProductsList/ProductsListMain/productsListMain';
import ProductsDetailsMain from './Components/Products/ProductsDetails/ProductsDetailsMain/productsDetailsMain';
import DisplayCartMain from './Components/DisplayCart/DisplayCartMain/displayCartMain';
import { disableScroll } from './Components/Others/HelperFunction/helperFunction';
import CheckoutMain from './Components/Checkout/CheckoutMain/checkoutMain';
import ForgotPassword from './Components/Login/ForgotPassword/forgotPassword';
import AboutUs from './Components/AboutUs/aboutUs';
import BlogMain from './Components/Blog/BlogMain/blogMain';
import thunder from './Assets/Others/test.gif';
import logo from './Assets/Logo/logo.jpg';
import DefaultRoute from './Components/DefaultRoute/defaultRoute';
import AuthContext from './Components/Others/AuthContext/authContext';
import { useQuery } from 'react-query';
import {NetworkError} from './Components/Others/DisplayMessage/displayMessage';
import Modal from './Components/Others/Modal/modal';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

//return Stripe promise to pass it to the Elements component
const stripePromise = loadStripe('pk_test_51NPRurHZovVrLdmoqBHc4bdzZoZ6QfG8WvAKIpCtnUtGtF9ADsjJgQIYmEuQ4DMR0o20qCe8uWFH2SuG5GZ4HSFj00BLGIlN1j');

function App() {

  const [sidedrawer, setSidedrawer] = useState(false);
  
  const [backdrop, setBackdrop] = useState(false);

  const [cartItem, setCartItem] = useState(0);

  const [modal, setModal] = useState(true)

  const {data, isLoading, isError} = useQuery(['data'], async () => await fetch('https://karkhana-server.onrender.com/products').then(result => result.json()).then(res => res.data), { staleTime: 1800000, cacheTime: 1800000});
  
  useEffect(() => {
    //when backdrop is on we disable scrolling
    if (backdrop) {
      disableScroll();
    }
    //when off we enable scrolling
    else {
      window.onscroll = () => {};
    }

  }, [backdrop])

  //this method close sidedrawer
  const closeSidedrawer = () => {
    setSidedrawer(false);
    setBackdrop(false);
  }

  //this method open sidedrawer
  const openSideDrawer = () => {
    setSidedrawer(true);
    setBackdrop(true);
  }

  return (
    <>
    <div className="spinner-container" style={ isLoading ? {display: 'flex'} : {display: 'none'}}>
      <div className='logo-container'>
        <img src={logo} alt="karkhana" className='spinner-container-logo'/>
      </div>
      <div className='spinner-effect-container'>
        <img src={thunder} alt="karkhana" className='spinner-effect'/>
        <p className='spinner-effect-p'>Loading...</p>
      </div>
    </div>
    <div className="App">
      <Modal modal={isError && modal}>
        <NetworkError closeModal={() => setModal(false)}/>
      </Modal>
      <AuthContext value={ {cartItem, setCartItem, data} }>
        <Elements stripe={stripePromise}>
          <Backdrop backdrop={ backdrop } toggleBackdrop={ closeSidedrawer }/>
          <TopbarMain toggleSidedrawer={ openSideDrawer }/>
          <Sidedrawer sidedrawer={sidedrawer}/>
          <Routes>
            <Route path='/' element={<HomepageMain />} />
            <Route path='/products/:productId' element={<ProductsListMain />} />
            <Route path='/products/:productId/:productDetails' element={<ProductsDetailsMain />} />
            <Route path="/login" element={<LoginMain />} />
            <Route path="/register" element={<RegisterMain />} />
            <Route path='/forgot-password' element={<ForgotPassword />} />
            <Route path="/profile" element={<ProfileMain />}/>
            <Route path="/profile/:orders" element={<ProfileMain />}/>
            <Route path='/shopping-cart' element={<DisplayCartMain />} />
            <Route path="/checkout" element={<CheckoutMain />} />
            <Route path='/about-us' element={<AboutUs />} />
            <Route path='/blog' element={<BlogMain />} />
            <Route path="*" element={<DefaultRoute />} />
          </Routes>
          <Footer />
        </Elements>
      </AuthContext>
    </div>
    </>
  );
}

export default App;
