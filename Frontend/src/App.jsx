import React, { useEffect } from 'react'
import Navbar from './components/navbar/Navbar'
import Footer from './components/footer/Footer'
import Home from './pages/Home.jsx'
import {Routes, Route} from 'react-router-dom'
import AllServices from './pages/AllServices.jsx'
import LogIn from './pages/LogIn.jsx'
import SignUp from './pages/SignUp.jsx'
import AboutUS from './pages/AboutUS.jsx'
import Cart from './pages/Cart.jsx'
import Profile from './pages/Profile.jsx'
import ViewServicesDetails from './components/ViewServicesDetails/ViewServicesDetails.jsx'
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from './store/auth.js';
import Favourites from './components/Profile/Favourites.jsx'
import UserOrderHistory from './components/Profile/UserOrderHistory.jsx'
import Settings from './components/Profile/Settings.jsx'
import AllOrders from './pages/AllOrders'
import AddServices from './pages/AddServices.jsx'
import UpdateServices from './pages/UpdateServices.jsx'

const App = () => {
  const dispatch = useDispatch();
  const role = useSelector((state) => state.auth.role);
  useEffect(() => {
    if (
      localStorage.getItem("id") &&
      localStorage.getItem("token") &&
      localStorage.getItem("role")
    ) {
      dispatch(authActions.login());
      dispatch(authActions.changeRole(localStorage.getItem("role")));
    }
  }, []);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <div style={{ flex: '1' }}>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/all-services" element={<AllServices />} />
          <Route exact path="/cart" element={<Cart />} />
          <Route exact path="/profile" element={<Profile />}>
            {role === "user" ? (<Route index element={<Favourites />} />) : (<Route index element={<AllOrders />} />)}
            {role === "admin" && (<Route path="/profile/add-services" element={<AddServices />} />)}
            <Route path="/profile/orderHistory" element={<UserOrderHistory />} />
            <Route path="/profile/settings" element={<Settings />} />
          </Route>
          <Route exact path="/LogIn" element={<LogIn />} />
          <Route exact path="/updateServices/:id" element={<UpdateServices />} />
          <Route exact path="/SignUp" element={<SignUp />} />
          <Route exact path="/about-us" element={<AboutUS />} />
          <Route exact path="/view-services-details/:id" element={<ViewServicesDetails />} />
        </Routes>
      </div>
      <Footer style={{ position: 'fixed', bottom: '0', width: '100%' }} />
    </div>
  )
}

export default App