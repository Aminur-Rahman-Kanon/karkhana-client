import { Routes, Route } from 'react-router-dom';
import { useEffect, useState, createContext } from 'react';
import Topbar from './Pages/Topbar/topbar';
import Homepage from './Pages/Homepage/homepage';
import './App.css';
import Sidedrawer from './Pages/Others/Sidedrawer/sidedrawer';
import Backdrop from './Pages/Others/Backdrop/backdrop';
import Footer from './Pages/Footer/footer';
import Login from './Pages/Login/login';
import Register from './Pages/Register/register';
import Profile from './Pages/Profile/profile';
import ProductsList from './Pages/Products/ProductsList/productsList';
import ProductsDetails from './Pages/Products/ProductsDetails/productsDetails';
import DisplayCart from './Pages/DisplayCart/displayCart';

export const ContextApi = createContext(null);

function App() {

  const [sidedrawer, setSidedrawer] = useState(false);
  
  const [backdrop, setBackdrop] = useState(false);

  const [cartItem, setCartItem] = useState(0);

  useEffect(() => {
    if (backdrop) {
      // document.body.scrollBy(document.documentElement.scrollTop || document.body.scrollTop, document.documentElement.scrollLeft);
      document.body.style.position = 'fixed';
      document.body.style.overflowY = 'hidden';
    }
    
    return () => {
      document.body.style.position = 'unset';
      document.body.style.overflowY = 'auto';
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
    <div className="App">
      <ContextApi.Provider value={{cartItem, setCartItem}} >
        <Backdrop backdrop={ backdrop } toggleBackdrop={ closeSidedrawer }/>
        <Topbar toggleSidedrawer={ openSideDrawer }/>
        <Sidedrawer sidedrawer={sidedrawer}/>
        <Routes>
          <Route path='/' element={<Homepage />}/>
          <Route path='/:productId' element={<ProductsList />}/>
          <Route path='/:productId/:productDetails' element={<ProductsDetails />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/register" element={<Register />}/>
          <Route path="/profile" element={<Profile />}/>
          <Route path='/shopping-cart' element={<DisplayCart />}/>
          <Route path="*" element={<h1>404</h1>}/>
        </Routes>
        <Footer />
      </ContextApi.Provider>
    </div>
  );
}

export default App;
