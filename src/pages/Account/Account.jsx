import React, { useContext, useEffect, useState } from 'react'
import './Account.css'
import { StoreContext } from '../../context/StoreContext'
import { BACKEND_URL } from '../../../config/constants'
import axios from 'axios'
import { toast } from 'react-toastify'

const Account = () => {

    const { token, userData, fetchUserData } = useContext(StoreContext);

    const [firstnameData, setFirstnameData] = useState({
        first_name: "",
    })

    const [lastnameData, setLastnameData] = useState({
        last_name: "",
    })

    const [passwordData, setPasswordData] = useState({
        old_password: "",
        new_password: "",
        retype_new_password: "",
    })

    const onChangeHandler = (event) => {
        const { name, value } = event.target;

        if (name === "first_name") {
            setFirstnameData(prevData => ({ ...prevData, [name]: value }));
        }
        else if (name === "last_name") {
            setLastnameData(prevData => ({ ...prevData, [name]: value }));
        }
        else if (name === "old_password" || name === "new_password" || name === "retype_new_password") {
            const cleanedValue = value.replace(/\s/g, '');
            setPasswordData(prevData => ({ ...prevData, [name]: cleanedValue }));
        }
    }


    const onFirstnameSaveClickHandler = async (event) => {
        event.preventDefault();

        if (firstnameData.first_name.trim() === "") {
            toast.error("Please enter valid data")
            return;
        }

        try {
            const response = await axios.post(`${BACKEND_URL}/api/user/updatefirstname`, firstnameData, { headers: { token } });
            if (response.status === 200) {
                await fetchUserData(token);
                setFirstnameData({
                    first_name: ""
                });
                toast.success("First name updated");
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

    const onLastnameSaveClickHandler = async (event) => {
        event.preventDefault();

        if (lastnameData.last_name.trim() === "") {
            toast.error("Please enter valid data")
            return;
        }

        try {
            const response = await axios.post(`${BACKEND_URL}/api/user/updatelastname`, lastnameData, { headers: { token } });
            if (response.status === 200) {
                await fetchUserData(token);
                setLastnameData({
                    last_name: ""
                });
                toast.success("Last name updated");
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

    const onPasswordSaveClickHandler = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post(`${BACKEND_URL}/api/user/updatepassword`, passwordData, { headers: { token } });
            if (response.status === 200) {
                setPasswordData({
                    old_password: "",
                    new_password: "",
                    retype_new_password: "",
                });
                toast.success("Password updated");
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


    return (
        <div className='account-container'>
            <div className='account' >
                <h1>Account</h1>
                <div className='groups'>
                    <h3>Username</h3>
                    <div className='sub-group'>
                        <p className='p'>{userData.username}</p>
                    </div>

                </div>

                <form className='groups' onSubmit={onFirstnameSaveClickHandler}>
                    <h3>First Name</h3>
                    <div className='sub-group'>
                        <p>{userData.first_name}</p>
                        <input name='first_name' onChange={onChangeHandler} value={firstnameData.first_name} type="text" required />
                        <button className='save-btn' type='submit'>Save</button>
                    </div>
                </form>

                <form className='groups' onSubmit={onLastnameSaveClickHandler}>
                    <h3>Last Name</h3>
                    <div className='sub-group'>
                        <p>{userData.last_name}</p>
                        <input name='last_name' onChange={onChangeHandler} value={lastnameData.last_name} type="text" required />
                        <button className='save-btn' type='submit'>Save</button>
                    </div>
                </form>
                <br /><br />
                <form className='groups' onSubmit={onPasswordSaveClickHandler}>
                    <h3>Password</h3>
                    <div className='sub-group'>
                        <div className='password-sub-group'>
                            <div>
                                <p>Old password</p>
                                <input name='old_password' onChange={onChangeHandler} value={passwordData.old_password} type="password" required />
                            </div>
                            <div>
                                <p>New password</p>
                                <input name='new_password' onChange={onChangeHandler} value={passwordData.new_password} type="password" required />
                            </div>
                            <div>
                                <p>Re-enter new password</p>
                                <input name='retype_new_password' onChange={onChangeHandler} value={passwordData.retype_new_password} type="password" required />
                            </div>

                        </div>
                        <button className='save-btn' type='submit'>Save</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Account
