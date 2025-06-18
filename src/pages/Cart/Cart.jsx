import React, { useContext } from 'react'
import './Cart.css'
import { StoreContext } from '../../context/StoreContext'
import { assets } from '../../assets/assets';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { BACKEND_URL } from '../../../config/constants';

const Cart = () => {

    const token = localStorage.getItem('token');
    const { food_list, cartItems, addToCart, removeFromCart, getCartTotalAmount, loadCartData, fetchFoodList } = useContext(StoreContext);
    const navigate = useNavigate();

    const processToCheckOutHandler = async () => {
        if (getCartTotalAmount() > 0) {
            const currentCartItemsSnapshot = JSON.parse(JSON.stringify(cartItems));

            const updatedCartData = await loadCartData(token);
            await fetchFoodList();

            const areCartsEqual = JSON.stringify(currentCartItemsSnapshot) === JSON.stringify(updatedCartData);
            if (!areCartsEqual) {
                toast.error("Some items have became unavailable")
                return;
            }
            navigate('/placeOrder');
        }
        else {
            toast.error('No Items In Cart');
        }
    }

    return (
        <div className='cart'>
            <div className="cart-items">
                <div className="cart-items-title">
                    <p className='empty'></p>
                    <p>Name</p>
                    <p>Price</p>
                    <p>Quantity</p>
                    <p>Total</p>
                </div>
                <br />
                <hr />
                {food_list.map((item, index) => {
                    if (cartItems[item.product_id] > 0) {
                        return (
                            <div key={index}>
                                <div className='cart-items-title cart-items-item'>
                                    <img className='food' src={`${BACKEND_URL}` + "/images/" + item.image} alt="" />
                                    <p>{item.product_name}</p>
                                    <p>{item.price}</p>
                                    <div id='food-item-counter' >
                                        <img onClick={() => removeFromCart(item.product_id)} src={assets.remove_icon_red} alt="" />
                                        <p>{cartItems[item.product_id]}</p>
                                        <img onClick={() => addToCart(item.product_id)} src={assets.add_icon_green} alt="" />
                                    </div>
                                    <p>{item.price * cartItems[item.product_id]} vnd</p>
                                </div>
                                <hr />
                            </div>
                        )
                    }
                })}
            </div>
            <div className="cart-bottom">
                <div className='cart-total'>

                    <div className="cart-total-detals">
                        <b>Total</b>
                        <b>{getCartTotalAmount()} vnd</b>
                    </div>
                    <button onClick={() => token ? processToCheckOutHandler() : toast.error("Please sign in")}>PROCEED TO CHECKOUT</button>
                </div>
            </div>
        </div>
    )
}

export default Cart
