import { Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Topbar from './Components/Topbar/topbar';
import Homepage from './Components/Homepage/homepage';
import './App.css';
import Sidedrawer from './Components/Others/Sidedrawer/sidedrawer';
import Backdrop from './Components/Others/Backdrop/backdrop';
import Footer from './Components/Footer/footer';
import Login from './Components/Login/login';
import Register from './Components/Register/register';
import Profile from './Components/Profile/profile';
import ProductsList from './Components/Products/ProductsList/productsList';
import ProductsDetails from './Components/Products/ProductsDetails/productsDetails';
import DisplayCart from './Components/DisplayCart/displayCart';
import { disableScroll } from './Components/Others/HelperFunction/helperFunction';
import Checkout from './Components/Checkout/checkout';
import ForgotPassword from './Components/Login/ForgotPassword/forgotPassword';
import AboutUs from './Components/AboutUs/aboutUs';
import Blog from './Components/Blog/blog';
import thunder from './Assets/test.gif';
import logo from './Assets/logo.jpg';
import DefaultRoute from './Components/DefaultRoute/defaultRoute';
import AuthContext from './Components/Others/AuthContext/authContext';
import { useQuery } from 'react-query';

function App() {

  const [sidedrawer, setSidedrawer] = useState(false);
  
  const [backdrop, setBackdrop] = useState(false);

  const [cartItem, setCartItem] = useState(0);

  const {data, isLoading, isError, error} = useQuery(['data'], async () => await fetch('https://karkhana-server.onrender.com/products').then(result => result.json()).then(res => res.data), { staleTime: 30000 })

  useEffect(() => {
    if (backdrop) {
      disableScroll();
    }
    else {
      window.onscroll = () => {};
    }

  }, [backdrop])

  const closeSidedrawer = () => {
    setSidedrawer(false);
    setBackdrop(false);
  }

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
      <AuthContext value={ {cartItem, setCartItem, data} }>
        <Backdrop backdrop={ backdrop } toggleBackdrop={ closeSidedrawer }/>
        <Topbar toggleSidedrawer={ openSideDrawer }/>
        <Sidedrawer sidedrawer={sidedrawer}/>
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/products/:productId' element={<ProductsList />} />
          <Route path='/products/:productId/:productDetails' element={<ProductsDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path="/profile" element={<Profile />}/>
          <Route path='/shopping-cart' element={<DisplayCart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path='/about-us' element={<AboutUs />} />
          <Route path='/blog' element={<Blog />} />
          <Route path="*" element={<DefaultRoute />} />
        </Routes>
        <Footer />
      </AuthContext>
    </div>
    </>
  );
}

export default App;
