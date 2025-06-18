import React from 'react'
import './Orders.css'
import { useContext } from 'react'
import { StoreContext } from '../../context/StoreContext'
import { assets } from '../../assets/assets'
import { useState } from 'react'
import OrderDetailsPopup from '../../components/OrderDetailsPopup/OrderDetailsPopup'

const Orders = () => {

    const { token, orderData } = useContext(StoreContext);
    const [showOrderDetailsPopup, setShowOrderDetailsPopup] = useState(false);
    const [currentOrder, setCurrentOrder] = useState(null);

    const onOrderIdClickHandler = (order) => {
        setCurrentOrder({ ...order });
        setShowOrderDetailsPopup(true);
    };

    const closePopupHandler = () => {
        setCurrentOrder(null);
        setShowOrderDetailsPopup(false);
    };

    return (
        <div className='orders'>
            <h1>My Orders</h1>
            <h2>Waiting to be delivered</h2>
            <div className='titles'>
                <p className='empty1'></p>
                <p>OrderID</p>
                <p>Order Date</p>
                <p>Order Status</p>
            </div>
            <div className='order-incomplete-complete'>
                {orderData.map((order, index) => {
                    if (order.status !== "delivered") {
                        return (
                            <div key={index} className='titles orders-order'>
                                <img src={assets.parcel_icon} alt="" />
                                <p onClick={() => onOrderIdClickHandler(order)} className='order-id'>{order.order_id}</p>
                                <p>{order.order_date.replace('T', ' ').replace('.000Z', '')}</p>
                                <p>{order.status}</p>
                            </div>
                        )
                    }
                })}
            </div>
            <h2>Completed Orders</h2>
            <div className='order-incomplete-complete'>
                
                {orderData.map((order, index) => {
                    if (order.status === "delivered") {
                        return (
                            <div key={index} className='titles orders-order'>
                                <img src={assets.parcel_icon} alt="" />
                                <p onClick={() => onOrderIdClickHandler(order)} className='order-id'>{order.order_id}</p>
                                <p>{order.order_date.replace('T', ' ').replace('.000Z', '')}</p>
                                <p>{order.status}</p>
                            </div>
                        )
                    }
                })}
            </div>
            {showOrderDetailsPopup && currentOrder && (
                <OrderDetailsPopup
                    order={currentOrder}
                    onClose={closePopupHandler}
                    token={token}
                />
            )}
        </div>
    )
}

export default Orders
