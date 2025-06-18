import React from 'react'
import './Footer.css'
import footer1 from '../../assets/footer1.png'
import footer2 from '../../assets/footer2.png'
import footer3 from '../../assets/footer3.png'
import footer4 from '../../assets/footer4.png'
import { assets } from '../../assets/assets'

const Footer = () => {
    return (
        <div className='footer'>
            <div className='footer-main'>

                <div className='footer-left'>
                    <div className='logo'>
                        <img src={assets.restaurant_logo} alt="hundredtaste logo" />
                        <h2>A Hundred Tastes</h2>
                    </div>
                    <p>In the new era of technology we look in the future with certainty and pride to our company</p>
                    <div>
                        <img src={assets.facebook_icon1} alt="facebook-logo" />
                        <img src={assets.instagram_icon1} alt="instagram logo" />
                        <img src={assets.twitter_icon1} alt="twitter logo" />
                    </div>

                </div>

                <div className="footer-middle">
                    <h2>Contact</h2>
                    <div>
                        <img className='phone-logo' src={assets.phone_logo} alt="phone logo" />
                        <p>0123-456-789</p>
                    </div>
                    <div>
                        <img className='mail-logo' src={assets.mail_logo} alt="email logo" />
                        <p>ahundredtastes@gmail.com</p>
                    </div>
                    <div>
                        <img className='location-logo' src={assets.location_logo} alt="address logo" />
                        <p>hundred taste address</p>
                    </div>
                </div>

                <div className="footer-right">
                    <h2>Follow us on Instagram</h2>
                    <img src={footer1} alt="" />
                    <img src={footer2} alt="" />
                    <br />
                    <img src={footer3} alt="" />
                    <img src={footer4} alt="" />
                </div>
            </div>
            <p className='copyright'>Copyright &copy; 2023 Hastag Developer. All Rights Reserved</p>
        </div>
    )
}

export default Footer
