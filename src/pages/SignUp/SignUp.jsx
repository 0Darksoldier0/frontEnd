import React, { useContext, useEffect, useState } from 'react'
import './SignUp.css'
import { NavLink, useNavigate } from 'react-router-dom'
import { BACKEND_URL } from '../../../config/constants'
import { toast } from 'react-toastify'
import axios from 'axios'
import { StoreContext } from '../../context/StoreContext'

const SignUp = () => {

    const { token } = useContext(StoreContext);

    const navigate = useNavigate();

    const [data, setData] = useState({
        username: "",
        first_name: "",
        last_name: "",
        phone_number: "",
        password: "",
        retype_password: ""
    })


    const onChangeHandler = (event) => {
        const { name, value } = event.target;

        if (name === "phone_number") {
            if (/^\d*\.?\d*$/.test(value)) {
                setData(data => ({ ...data, [name]: value }));
            }
        }
        else if (name === "username" || name == "password") {
            const cleanedValue = value.replace(/\s/g, '');
            setData(data => ({ ...data, [name]: cleanedValue }));
        }
        else {
            setData(data => ({ ...data, [name]: value }));
        }
    }

    const onSignUp = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post(`${BACKEND_URL}/api/user/signUp`, data);

            if (response.status === 200) {
                setData({
                    username: "",
                    first_name: "",
                    last_name: "",
                    phone_number: "",
                    password: "",
                    retype_password: ""
                });
                toast.success("Account created")
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
        if (token) {
            navigate('/')
        }
    }, [token])

    // useEffect(() => {
    //     console.log(data)
    // }, [data])

    return (
        <div className='signup-container'>
            <form className='signup' onSubmit={onSignUp}>
                <h1>Sign Up</h1>
                <div className='multi-field-group'>
                    <div className="field-group">
                        <p>First Name</p>
                        <input name='first_name' onChange={onChangeHandler} value={data.first_name} type="text" required />
                    </div>
                    <div className="field-group">
                        <p>Last Name</p>
                        <input name='last_name' onChange={onChangeHandler} value={data.last_name} type="text" required />
                    </div>
                </div>

                <div className="field-group">
                    <p>Username</p>
                    <input name='username' onChange={onChangeHandler} value={data.username} type="text" required />
                </div>
                <div className="field-group">
                    <p>Phone number &#40;*not required&#41;</p>
                    <input name='phone_number' onChange={onChangeHandler} value={data.phone_number} type="text" />
                </div >
                <div className='multi-field-group'>
                    <div className="field-group">
                        <p>Password</p>
                        <input name='password' onChange={onChangeHandler} value={data.password} type="password" required />
                    </div>
                    <div className="field-group">
                        <p>Re-type Password</p>
                        <input name='retype_password' onChange={onChangeHandler} value={data.retype_password} type="password" required />
                    </div>
                </div>

                <div className="signup-buttons">
                    <button className='signup-btn btns' type='submit'>Sign Up</button>
                    <NavLink to={'/'}><button className='cancel-btn btns' type='button'>Cancel</button></NavLink>
                </div>
                <NavLink to='/signIn'><p className='have-account'>Already have an account?</p></NavLink>
            </form>
        </div>
    )
}


export default SignUp
