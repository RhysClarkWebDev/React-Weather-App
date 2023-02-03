import React from 'react';
import ReactDOM from 'react-dom';
import styles from './style.css';

import SearchBar from '/src/Components/SearchBar/searchBar.jsx';
import WeatherForecastResult from '/src/Components/WeatherForecastResult/WeatherForecastResult.jsx';

function CurrentForecastResult(props){
    let weatherData = props.weatherData.currentWeather;
    let forecastWeather = props.weatherData.forecastWeather;
    console.log(weatherData);
    let location = weatherData.name;
    let weather = weatherData.weather[0].main;
    let weatherDescription = weatherData.weather[0].description;
    let temperature = Math.round(weatherData.main.temp);
    let feelsLikeTemp = weatherData.main.feels_like;
    let wind = weatherData.wind.speed;
    let humidity = weatherData.main.humidity;
    let pressure = weatherData.main.pressure;
    

    let icon;
    let iconUrl = "/weather/images/";
    switch (weatherData.weather[0].icon){

        case "01d":
        case "01n":
            icon = "Sunny.gif";
            break;

        case "02d":
        case "02n":
            icon = "PartlyCloudy.gif";
            break;

        
        case "03d":
        case "03n":
            icon = "Cloudy.gif";
            break;
        
        case "04d":
        case "04n":
            icon = "Cloudy.gif";
            break;


        case "09d":
        case "09n":
            icon = "Raining.gif";
            break;

        case "10d":
        case "10n":
            icon = "Raining.gif";
            break;

        case "11d":
        case "11n":
            icon = "Lightning.gif";
            break;

        case "13d":
        case "13n":
            icon = "Snow.gif";
            break;
        
        case "50d":
        case "50n":
            icon = "Windy.gif";
            break;


        default:
            icon = "Sunny.gif";
    }




    return(
        <>
        <SearchBar/>
        <div class="weather-background">
            <img src="weather/images/homePageClouds.jpg" alt=""/>
        </div>
        <div class="weather-data">
            <h1>{location}</h1>

            <div class="weather-card">
                <div class="current-weather">
                    <div>
                        <div class="weather-main">
                            <p>{weather}</p>
                        </div>
                        <div class="weather-description text-flex">
                            <p>{weatherDescription}</p>
                        </div>
                    </div>
                    <img src={iconUrl + icon} alt="" />
                </div>

                <div class="weather-result">
                    <div class="weather-result-left">
                        <p class="temperature temp-now">{temperature}</p>
                    </div>

                    <div class="weather-result-right">
                        <div class="weather-info">
                            <div>
                                <p>Details</p>
                            </div>

                            <div class="feels-like-temp text-flex">
                                <p>Feels Like:&nbsp;</p>
                                <p class="temperature result">{feelsLikeTemp}</p>
                            </div>

                            <div>
                                <p>Wind:</p>
                                <p class="result">{wind + "m/s"}</p>
                            </div>

                            <div>
                                <p>Humidity:</p>
                                <p class="result">{humidity + "%"}</p>
                            </div>

                            <div>
                                <p>Pressure:</p>
                                <p class="result">{pressure + "hPa"}</p>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>

        </div>
        <WeatherForecastResult forecastWeather={forecastWeather}/>
        
        </>
    )
}

export default CurrentForecastResult;