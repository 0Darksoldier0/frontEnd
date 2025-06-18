import React from 'react'
import './Home.css'
import HomeOverview from '../../components/HomeComponents/HomeOverview/HomeOverview'
import HomeWelcome from '../../components/HomeComponents/HomeWelcome/HomeWelcome'

const Home = ({setMenu}) => {
    return (
        <div>
            <HomeWelcome />
            <HomeOverview setMenu={setMenu}/>
        </div>
    )
}

export default Home

