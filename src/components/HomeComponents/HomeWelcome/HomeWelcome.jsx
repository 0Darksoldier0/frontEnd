import React from 'react'
import './HomeWelcome.css'
import Home1 from '../../../assets/Home1.png'

const HomeWelcome = () => {
    return (
        <div className='home-welcome'>
            <img src={Home1} alt="" />
            <h1>A Hundred Tastes at the tips of your finger</h1>
        </div>
    )
}

export default HomeWelcome
