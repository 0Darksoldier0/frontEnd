import React from 'react'
import './AboutUsC.css'
import aboutUs1 from '../../assets/aboutUs1.png'
import aboutUs2 from '../../assets/aboutUs2.png'
import {assets} from '../../assets/assets'

const AboutUsC = () => {
    return (
        <div className='aboutus'>

            <div className='aboutus-top'>
                <img src={aboutUs1} alt="" />
                <div className='right-section'>
                    <h1>We provide healthy food for your family</h1>
                    <p className='p1'>Our story began with a vision to create a unique dining experience that mergers fine dining, exceptional service and a vibrant ambiance</p>
                    <p className='p2'>At place, we believe that dining is not just about food, but also about the overall experience. Our staff, reowned ofr their warmth and dedication</p>
                </div>
            </div>

            <div className="aboutus-middle">
                <div className='middle-subsection'>
                    <img src={assets.multi_cuisine} alt="icon" />
                    <div className='right-section'>
                        <h3>Multi Cuisine</h3>
                        <p>In the new era of technology we look in the future with certainty life</p>
                    </div>
                </div>
                <div className='middle-subsection'>
                    <img src={assets.easy_order} alt="icon" />
                    <div className='right-section'>
                        <h3>Easy To Order</h3>
                        <p>In the new era of technology we look in the future with certainty life</p>
                    </div>
                </div>
                <div className='middle-subsection'>
                    <img src={assets.fast_delivery} alt="icon" />
                    <div className='right-section'>
                        <h3>Fast Delivery</h3>
                        <p>In the new era of technology we look in the future with certainty life</p>
                    </div>
                </div>
            </div>

            <div className="aboutus-bottom">
                <div className='left-section'>
                    <h1>A little information for our valuable guests</h1>
                    <p className='text'>At place, we believe that dining is not just about food, but also about the overall experience. Our staff, reowned ofr their warmth and dedication</p>
                    <div className='stats'>
                        <div className='stats-cell'>
                            <h2>3</h2>
                            <p>locations</p>
                        </div>
                        <div className='stats-cell'>
                            <h2>1995</h2>
                            <p>Founded</p>
                        </div>
                        <div className='stats-cell'>
                            <h2>65+</h2>
                            <p>Staff Members</p>
                        </div>
                        <div className='stats-cell'>
                            <h2>95%</h2>
                            <p>Satisfied Customers</p>
                        </div>
                    </div>
                </div>
                <img src={aboutUs2} alt="" />
            </div>
        </div>
    )
}
import './AboutUsC.css'

export default AboutUsC
