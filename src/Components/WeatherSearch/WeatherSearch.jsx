import React from 'react';
import ReactDOM from 'react-dom';
import SearchBar from '/src/Components/SearchBar/searchBar.jsx';

// import camberFont from '/public/weather/fonts/Camber.otf';
import styles from './style.css';



import img1 from '/public/weather/images/homePageClouds.jpg';
import img2 from '/public/weather/images/Cloudy.gif';
import img3 from '/public/weather/images/Hail.gif';
import img4 from '/public/weather/images/Lightning.gif';
import img5 from '/public/weather/images/PartlyCloudy.gif';
import img6 from '/public/weather/images/Raining.gif';
import img7 from '/public/weather/images/Snow.gif';
import img8 from '/public/weather/images/Storm.gif';
import img10 from '/public/weather/images/Sunny.gif';
import img11 from '/public/weather/images/Windy.gif';
import img12 from '/public/weather/images/Snowwithrain.gif';


function WeatherSearch(){
    return (
    <div class="weather-search">
      <div class="weather-background">
        <img src="weather/images/homePageClouds.jpg" alt=""/>
      </div>
      <div class="form-position">
          <h1>Find a Forecast</h1>
          <SearchBar/>
      </div>
    </div>
    )
}

export default WeatherSearch;