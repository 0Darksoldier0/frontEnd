import React, { useContext, useEffect, useState } from 'react'
import './SignIn.css'
import { useNavigate, Link } from 'react-router-dom';
import { BACKEND_URL } from '../../../config/constants'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'
import { toast } from 'react-toastify';

const SignIn = () => {

    const { token, setToken, loadCartData, fetchUserData, fetchUserOrders } = useContext(StoreContext);

    const navigate = useNavigate();

    const [data, setData] = useState({
        username: "",
        password: ""
    })

    const onChangeHandler = (event) => {
        const { name, value } = event.target;

        if (name === "username" || name == "password") {
            const cleanedValue = value.replace(/\s/g, '');
            setData(prevData => ({ ...prevData, [name]: cleanedValue }));
        }
        else {
            setData(data => ({ ...data, [name]: value }));
        }

    }

    const onSignIn = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(`${BACKEND_URL}/api/user/signIn`, data);

            if (response.status === 200) {
                setToken(response.data.token);
                localStorage.setItem("token", response.data.token);
                setData({
                    username: "",
                    password: ""
                });
                loadCartData(response.data.token);
                fetchUserData(response.data.token);
                fetchUserOrders(response.data.token);
                
                navigate('/');
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

    const onCLickCancelHandler = () => {
        navigate('/');
    };

    useEffect(() => {
        if (token) {
            navigate('/')
        }
    }, [token])

    return (
        <form className='sign-in' onSubmit={onSignIn}>
            <div className='signin'>
                <h1>Sign In</h1>
                <input name='username' onChange={onChangeHandler} value={data.username} type="text" placeholder='Username' required />
                <input name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder='Password' required />
                <div className='buttons'>
                    <button className='signin-btn' type='submit'>Sign In</button>
                    <button className='cancel-btn' onClick={onCLickCancelHandler} type='button'>Cancel</button>
                </div>
                <Link to='/signup'><p>Create an account</p></Link>
            </div>
        </form>

    )
}

export default SignIn
