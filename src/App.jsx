import React, { useState, useEffect, useContext } from 'react'
import Navbar from './components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import AboutUs from './pages/AboutUs/AboutUs'
import Menu from './pages/Menu/Menu'
import Cart from './pages/Cart/Cart'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import Footer from './components/Footer/Footer'
import ScrollToTop from './context/ScrollToTop'
import SignIn from './pages/SignIn/SignIn'
import SignUp from './pages/SignUp/SignUp'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import DefaultRoute from './components/DefaultRoute/DefaultRoute'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/ReactToastify.css'
import { StoreContext } from './context/StoreContext'
import Account from './pages/Account/Account'
import VerifyOrder from './pages/VerifyOrder/VerifyOrder'
import Orders from './pages/Orders/Orders'

const App = () => {

    return (
        <div className='app'>
            <ToastContainer />
            <ScrollToTop />
            <Navbar />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/aboutUs' element={<AboutUs />} />
                <Route path='/menu' element={<Menu />} />
                <Route path='/cart' element={<Cart />} />
                
                <Route path='/signIn' element={<SignIn />} />
                <Route path='/signUp' element={<SignUp />} />

                <Route path='/orders' element={<ProtectedRoute><Orders /></ProtectedRoute>} />
                <Route path='/account' element={<ProtectedRoute><Account /></ProtectedRoute>} />

                <Route path='/placeOrder' element={<ProtectedRoute><PlaceOrder /></ProtectedRoute>} />
                <Route path='/verifyOrder' element={<ProtectedRoute><VerifyOrder /></ProtectedRoute>} />
                
                <Route path="*" element={<DefaultRoute></DefaultRoute>} />
            </Routes>
            <Footer />
        </div>
    )
}

export default App