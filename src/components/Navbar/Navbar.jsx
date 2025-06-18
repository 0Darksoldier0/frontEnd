import React, { useContext, useEffect } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import {Link, useNavigate} from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext'

const Navbar = () => {

    const navigate = useNavigate();

    const {getCartTotalAmount, token, setToken, menu } = useContext(StoreContext);

    const onSignOutClickHandler = () => {
        localStorage.removeItem("token");
        setToken("");
        navigate('/');
        window.location.reload();
    }

    return (
        <div className='navbar'>
            <Link to='/'><div className='logo'>
                <img src={assets.restaurant_logo} alt="logo" />
                <p>A Hundred Tastes</p>
            </div></Link>
            <ul className='navbar-menu'>
                <Link to='/' className={menu === "Home" ? "active" : "inactive"}>Home</Link>
                <Link to='/aboutUs' className={menu === "About Us" ? "active" : "inactive"}>About Us</Link>
                <Link to='/menu' className={menu === "Menu" ? "active" : "inactive"}>Menu</Link>
            </ul>
            <div className="navbar-right">
                <div className="navbar-basket-icon">
                    <Link to='/cart'><img src={assets.basket_icon} alt="" /></Link>
                    <div className={getCartTotalAmount() ? "dot" : ""}></div>
                </div>
                {!token 
                    ?   <Link to='/signin' ><button>Sign In</button></Link>
                    :   <div className='navbar-profile'>
                            <img src={assets.profile_icon} alt="" />
                            <ul className='navbar-profile-dropdown'>
                                <Link to='/orders'><p>Orders</p></Link>
                                <hr />
                                <Link to='/account'><p>Account</p></Link>
                                <hr />
                                <Link to='/' onClick={onSignOutClickHandler} className='signout'><p>Sign Out</p></Link>
                            </ul>
                        </div>
                }
                
            </div>
        </div>
    )
}


export default Navbar