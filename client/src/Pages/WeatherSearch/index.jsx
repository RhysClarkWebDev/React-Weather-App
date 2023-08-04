import React, { useEffect } from 'react';
import {Helmet} from 'react-helmet';

import useFetchWeather from "@/Helpers/LocationCallbacks";
import SearchBar from '@/Components/SearchBar';

import './style.css';




function WeatherSearch(){

    useFetchWeather();

    return (
      <>
        <Helmet>
          <title>Weather Forecast</title>
        </Helmet>
        <div className="weather-search">
          <div className="weather-background">
            <img src="public/images/homePageClouds.jpg" alt=""/>
          </div>
          <div className="form-position">
              <h1>Find a Forecast</h1>
              <SearchBar/>
          </div>
        </div>
      </>
    
    )
}

export default WeatherSearch;