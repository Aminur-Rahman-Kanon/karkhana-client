import { Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Topbar from './Pages/Topbar/topbar';
import Homepage from './Pages/Homepage/homepage';
import './App.css';
import Sidedrawer from './Pages/Others/Sidedrawer/sidedrawer';
import Backdrop from './Pages/Others/Backdrop/backdrop';
import Footer from './Pages/Footer/footer';
import Login from './Pages/Login/login';
import Register from './Pages/Register/register';
import Profile from './Pages/Profile/profile';

function App() {

  const [sidedrawer, setSidedrawer] = useState(false);
  
  const [backdrop, setBackdrop] = useState(false);

  useEffect(() => {
    if (backdrop) {
      document.body.style.position = 'fixed';
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.body.style.position = 'unset';
      document.body.style.overflow = 'auto';
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

  console.log(backdrop);

  return (
    <div className="App">
      <Backdrop backdrop={ backdrop } toggleBackdrop={ closeSidedrawer }/>
      <Topbar toggleSidedrawer={ openSideDrawer }/>
      <Sidedrawer sidedrawer={sidedrawer}/>
      <Routes>
        <Route path='/' element={<Homepage />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/register" element={<Register />}/>
        <Route path="/profile" element={<Profile />}/>
        <Route path="*" element={<h1>404</h1>}/>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
