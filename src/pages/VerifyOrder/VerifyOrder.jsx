import React, { useEffect } from 'react'
import './VerifyOrder.css'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { BACKEND_URL } from '../../../config/constants'
import axios from 'axios'
import {toast} from 'react-toastify'

const VerifyOrder = () => {

    const [searchParams, setSearchParams] = useSearchParams();
    const payment_token = searchParams.get("payment_token");
    const order_id = searchParams.get("order_id");
    const navigate = useNavigate();

    const verifyOrderPayment = async () => {
        try {
            const response = await axios.post(`${BACKEND_URL}/api/order/verifyOrder`, { payment_token, order_id });
            if (response.data.success) {
                toast.success("Payment Completed"); 
                setTimeout(() => {
                    navigate("/orders");
                    window.location.reload();
                }, 3000)
            }
            else {
                toast.error("Payment Failed");
                setTimeout(() => {
                    navigate("/");
                    window.location.reload();
                }, 3000)
            }
        }
        catch (error) {
            console.log(error);
        }

    }

    useEffect(() => {
        verifyOrderPayment();
    }, [])

    return (
        <div className='verify'>
            <div className="spinner">

            </div>
        </div>
    )
}

export default VerifyOrder
