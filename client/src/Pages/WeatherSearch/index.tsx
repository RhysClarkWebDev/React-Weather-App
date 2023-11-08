import React from 'react'
import { Helmet } from 'react-helmet'
import useFetchWeather from '@/Helpers/LocationCallbacks'
import SearchBar from '@/Components/SearchBar'


import HomePageClouds from '@/Images/homePageClouds.jpg'

import './style.css'


function WeatherSearch (): React.ReactElement {
    useFetchWeather()

    return (
        <>
            <Helmet>
                <title>Weather Forecast</title>
            </Helmet>
            <div className="weather-search">
                <div className="weather-background">
                    <img src={HomePageClouds} alt=""/>
                </div>
                <div className="form-position">
                    <h1>Find a Forecast</h1>
                    <SearchBar/>
                </div>
            </div>
        </>

    )
}

export default WeatherSearch
