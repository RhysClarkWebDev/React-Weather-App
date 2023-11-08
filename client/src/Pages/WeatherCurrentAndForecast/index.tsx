import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Helmet } from 'react-helmet'

import SearchBar from '@/Components/SearchBar'
import WeatherForecastResult from '@/Components/WeatherForecastResult'
import HomePageClouds from '@/Images/homePageClouds.jpg'

// GIFS
import Sunny from '@/Images/Sunny.gif'
import PartlyCloudy from '@/Images/PartlyCloudy.gif'
import Cloudy from '@/Images/Cloudy.gif'
import Raining from '@/Images/Raining.gif'
import Lightning from '@/Images/Lightning.gif'
import Snow from '@/Images/Snow.gif'
import Windy from '@/Images/Windy.gif'


import './style.css'


interface WeatherDataTypes {
    weatherData: {
        currentWeather: {
            main: {
                feels_like: number
                temp: number
                humidity: number
                pressure: number
            }
            weather: Array<{
                main: string
                name: string
                description: string
                icon: string
            }>
            wind: {
                speed: number
            }
            name: string
        }


        forecastWeather: object
    }
}

function WeatherCurrentAndForecast (): React.ReactElement {
    const location = useLocation()

    const [weatherData, setWeatherData] = useState<WeatherDataTypes | null>(null)
    const [forecastData, setForecastData] = useState<object | null>()
    const [weatherLocation, setWeatherLocation] = useState<string | null>()
    const [weather, setWeather] = useState<string | null>()
    const [weatherDescription, setWeatherDescription] = useState<string | null>()
    const [temperature, setTemperature] = useState<number | null>()
    const [feelsLikeTemp, setFeelsLikeTemp] = useState<number | null>()
    const [wind, setWind] = useState<number | null>()
    const [humidity, setHumidity] = useState<number | null>()
    const [pressure, setPressure] = useState<number | null>()
    const [icon, setIcon] = useState<string | null>()

    useEffect(() => {
        setWeatherData(location.state)
    })

    useEffect(() => {
        // Destructure the weatherData object and set the state values
        if (weatherData !== null) {
            const { main, weather, wind, name } = weatherData?.weatherData?.currentWeather

            setForecastData(weatherData.weatherData.forecastWeather)
            setWeather(weather[0].main)
            setWeatherDescription(weather[0].description)
            setTemperature(Math.round(main.temp))
            setFeelsLikeTemp(main.feels_like)
            setWind(wind.speed)
            setHumidity(main.humidity)
            setPressure(main.pressure)
            setWeatherLocation(name)


            const weatherIcon = weather[0].icon

            switch (weatherIcon) {
                case '01d':
                case '01n':
                    setIcon(Sunny)
                    break

                case '02d':
                case '02n':
                    setIcon(PartlyCloudy)
                    break

                case '03d':
                case '03n':
                case '04d':
                case '04n':
                    setIcon(Cloudy)
                    break

                case '09d':
                case '09n':
                case '10d':
                case '10n':
                    setIcon(Raining)
                    break

                case '11d':
                case '11n':
                    setIcon(Lightning)
                    break

                case '13d':
                case '13n':
                    setIcon(Snow)
                    break

                case '50d':
                case '50n':
                    setIcon(Windy)
                    break

                default:
                    setIcon(Sunny)
            }
        }
    }, [weatherData])




    const iconUrl = 'public/images/'


    if (weatherData !== undefined) {
        return (
            <>
                <Helmet>
                    <title>{`${weatherLocation} Weather`}</title>
                </Helmet>
                <SearchBar/>
                <div className="weather-background">
                    <img src={HomePageClouds} alt=""/>
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
                                        <p className="result">{wind + 'm/s'}</p>
                                    </div>

                                    <div>
                                        <p>Humidity:</p>
                                        <p className="result">{humidity + '%'}</p>
                                    </div>

                                    <div>
                                        <p>Pressure:</p>
                                        <p className="result">{pressure + 'hPa'}</p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
                {forecastData !== null && <WeatherForecastResult forecastWeather={forecastData}/>}

            </>
        )
    }

    return <></>
}

export default WeatherCurrentAndForecast
