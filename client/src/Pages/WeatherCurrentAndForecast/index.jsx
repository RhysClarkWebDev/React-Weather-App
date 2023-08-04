import React, {useState, useEffect} from 'react';
import { useLocation } from 'react-router-dom';
import {Helmet} from 'react-helmet';
import './style.css';

import SearchBar from '@/Components/SearchBar';
import WeatherForecastResult from '@/Components/WeatherForecastResult';

function WeatherCurrentAndForecast(){


    const location = useLocation();
    
    const [weatherData, setWeatherData] = useState(undefined);
    const [forecastData, setForecastData] = useState(undefined);
    const [weatherLocation, setWeatherLocation] = useState(undefined);
    const [weather, setWeather] = useState(undefined);
    const [weatherDescription, setWeatherDescription] = useState(undefined);
    const [temperature, setTemperature] = useState(undefined);
    const [feelsLikeTemp, setFeelsLikeTemp] = useState(undefined);
    const [wind, setWind] = useState(undefined);
    const [humidity, setHumidity] = useState(undefined);
    const [pressure, setPressure] = useState(undefined);
    const [icon, setIcon] = useState(undefined);

    useEffect(() => {
        setWeatherData(location.state);
    });

    useEffect(() => {
        // Destructure the weatherData object and set the state values
        if (weatherData && weatherData.weatherData) {
            console.log(weatherData.weatherData);
            const { main, weather, wind, name } = weatherData.weatherData.currentWeather;
    
            setForecastData(weatherData.weatherData.forecastWeather);
            setWeather(weather[0].main);
            setWeatherDescription(weather[0].description);
            setTemperature(Math.round(main.temp));
            setFeelsLikeTemp(main.feels_like);
            setWind(wind.speed);
            setHumidity(main.humidity);
            setPressure(main.pressure);
            setWeatherLocation(name);

            
            const weatherIcon = weather[0].icon;
        
            switch (weatherIcon) {
                case "01d":
                case "01n":
                setIcon("Sunny.gif");
                break;
        
                case "02d":
                case "02n":
                setIcon("PartlyCloudy.gif");
                break;
        
                case "03d":
                case "03n":
                case "04d":
                case "04n":
                setIcon("Cloudy.gif");
                break;
        
                case "09d":
                case "09n":
                case "10d":
                case "10n":
                setIcon("Raining.gif");
                break;
        
                case "11d":
                case "11n":
                setIcon("Lightning.gif");
                break;
        
                case "13d":
                case "13n":
                setIcon("Snow.gif");
                break;
        
                case "50d":
                case "50n":
                setIcon("Windy.gif");
                break;
        
                default:
                setIcon("Sunny.gif");
            }
        }
    }, [weatherData])


    

    


    let iconUrl = "public/images/";


    if (weatherData){
        return(
            <>
            <Helmet>
                <title>{weatherLocation} Weather</title>
            </Helmet>
            <SearchBar/>
            <div className="weather-background">
                <img src="public/images/homePageClouds.jpg" alt=""/>
            </div>
            <div className="weather-data">
                <h1>{weatherLocation}</h1>
    
                <div className="weather-card">
                    <div className="current-weather">
                        <div>
                            <div className="weather-main">
                                <p>{weather}</p>
                            </div>
                            <div className="weather-description text-flex">
                                <p>{weatherDescription}</p>
                            </div>
                        </div>
                        <img src={iconUrl + icon} alt="" />
                    </div>
    
                    <div className="weather-result">
                        <div className="weather-result-left">
                            <p className="temperature temp-now">{temperature}</p>
                        </div>
    
                        <div className="weather-result-right">
                            <div className="weather-info">
                                <div>
                                    <p>Details</p>
                                </div>
    
                                <div className="feels-like-temp text-flex">
                                    <p>Feels Like:&nbsp;</p>
                                    <p className="temperature result">{feelsLikeTemp}</p>
                                </div>
    
                                <div>
                                    <p>Wind:</p>
                                    <p className="result">{wind + "m/s"}</p>
                                </div>
    
                                <div>
                                    <p>Humidity:</p>
                                    <p className="result">{humidity + "%"}</p>
                                </div>
    
                                <div>
                                    <p>Pressure:</p>
                                    <p className="result">{pressure + "hPa"}</p>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
    
            </div>
            {forecastData && <WeatherForecastResult forecastWeather={forecastData}/>}
            
            </>
        )
    }
    
}

export default WeatherCurrentAndForecast;