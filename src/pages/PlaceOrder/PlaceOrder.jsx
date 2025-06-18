import React, { useState, useContext } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext'
import { BACKEND_URL } from '../../../config/constants'
import axios from 'axios'
import { toast } from 'react-toastify';
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import validator from 'validator'

const PlaceOrder = () => {

    const navigate = useNavigate();

    const { getCartTotalAmount, token, food_list, cartItems } = useContext(StoreContext);
    const deliveryFee = 35000;

    const [shippingData, setShippingData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        street: "",
        ward: "",
        district: "",
        city: "",
        phone_number: ""
    })

    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        if (name === "phone_number") {
            if (/^\d*\.?\d*$/.test(value)) {
                setShippingData(data => ({ ...data, [name]: value }));
            }
        }
        else {
            setShippingData(data => ({ ...data, [name]: value }));
        }

    }

    const onProcessToPaymentClickHandler = async (event) => {
        event.preventDefault();

        if (shippingData.firstName.trim() === "" || shippingData.lastName.trim() === "" ||
            shippingData.street.trim() === "" || shippingData.ward.trim() === "" ||
            shippingData.district.trim() === "" || shippingData.city.trim() === "") {
            toast.error("Please enter valid shipping data")
            return;
        }
        if (!validator.isMobilePhone(shippingData.phone_number, 'vi-VN')) {
            toast.error("Invalid phone number")
            return;
        }

        let orderItems = [];
        food_list.map((item) => {
            if (cartItems[String(item.product_id)] > 0) {
                let itemInfo = item;
                itemInfo["quantity"] = cartItems[String(item.product_id)];
                orderItems.push(itemInfo);
            }
        })

        // console.log(orderItems);

        // let orderData = {
        //     shipping_details: shippingData,
        //     items: orderItems,
        //     amount: getCartTotalAmount() + deliveryFee
        // }

        const shippingDetails_JSON = JSON.stringify(shippingData);
        console.log(shippingDetails_JSON);
        try {
            let response = await axios.post(`${BACKEND_URL}/api/order/place`, { cartItems: orderItems, shipping_details: shippingDetails_JSON }, { headers: { token } })
            if (response.status === 200) {
                const { session_url } = response.data;
                window.location.replace(session_url)
            }
        }
        catch (error) {
            if (error.response) {
                toast.error(error.response.data.message);
            }
            else {
                toast.error("Server error, please try again later");
            }
        }
    }

    useEffect(() => {
        if (getCartTotalAmount() === 0) {
            navigate('/menu')
        }
    })

    return (
        <form className='place-order' onSubmit={onProcessToPaymentClickHandler}>
            <div className="place-order-left">
                <p className='title'>Delivery Information</p>
                <div className='multi-fields'>
                    <input name='firstName' onChange={onChangeHandler} value={shippingData.firstName} type="text" placeholder='First name' required />
                    <input name='lastName' onChange={onChangeHandler} value={shippingData.lastName} type="text" placeholder='Last name' required />
                </div>
                <input name='email' onChange={onChangeHandler} value={shippingData.email} type="email" placeholder='Email address' />
                <div className='multi-fields'>
                    <input name='street' onChange={onChangeHandler} value={shippingData.street} type="text" placeholder='House no. Street' required />
                    <input name='ward' onChange={onChangeHandler} value={shippingData.ward} type="text" placeholder='Ward' required />
                </div>
                <div className='multi-fields'>
                    <input name='district' onChange={onChangeHandler} value={shippingData.district} type="text" placeholder='District' required />
                    <input name='city' onChange={onChangeHandler} value={shippingData.city} type="text" placeholder='City' required />
                </div>
                <input name='phone_number' onChange={onChangeHandler} value={shippingData.phone_number} type="text" placeholder='Phone number' required />
            </div>
            <div className="place-order-right">
                <div className='cart-total'>
                    <h2>Cart Totals</h2>
                    <div>
                        <div className="cart-total-detals">
                            <p>Subtotal</p>
                            <p>${getCartTotalAmount()}</p>
                        </div>
                        <hr />
                        <div className="cart-total-detals">
                            <p>Delivery Fee</p>
                            <p>{getCartTotalAmount() ? deliveryFee : 0}</p>
                        </div>
                        <hr />
                        <div className="cart-total-detals">
                            <b>Total</b>
                            <b>${getCartTotalAmount() ? getCartTotalAmount() + deliveryFee : 0}</b>
                        </div>
                    </div>
                    <button type='submit'>PROCEED TO PAYMENT</button>
                </div>
            </div>
        </form>
    )
}


export default PlaceOrder