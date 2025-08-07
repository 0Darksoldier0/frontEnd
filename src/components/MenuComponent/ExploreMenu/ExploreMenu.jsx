import React, { useState } from 'react'
import './ExploreMenu.css'

const ExploreMenu = ({category, setCategory}) => {
    
    return (
        <div className='explore-menu' id='explore-menu'>
            <h1>Our Menu</h1>
            <p className='text'>We consider all the drivers of change gives you the components you need to change to create a truly happens</p>
            <div className="explore-menu-list">
                <button onClick={() => setCategory("All")} className={category==="All" ? "active" : "inactive"}>All</button>
                <button onClick={() => setCategory("South Korean")} className={category==="South Korean" ? "active" : "inactive"}>South Korean</button>
                <button onClick={() => setCategory("Japanese")} className={category==="Japanese" ? "active" : "inactive"}>Japanese</button>
                <button onClick={() => setCategory("Chinese")} className={category==="Chinese" ? "active" : "inactive"}>Chinese</button>
                <button onClick={() => setCategory("Italian")} className={category==="Italian" ? "active" : "inactive"}>Italian</button>
                <button onClick={() => setCategory("Vietnamese")} className={category==="Vietnamese" ? "active" : "inactive"}>Vietnamese</button>
                <button onClick={() => setCategory("Drink")} className={category==="Drink" ? "active" : "inactive"}>Drink</button>
                <button onClick={() => setCategory("Snack")} className={category==="Snack" ? "active" : "inactive"}>Snack</button>
                <button onClick={() => setCategory("The Usual")} className={category==="The Usual" ? "active" : "inactive"}>The Usual</button>
            </div>
        </div>
    )
}

export default ExploreMenu
