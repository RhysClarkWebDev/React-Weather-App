import React, { useState, useEffect } from 'react'
import WeatherForecastDay from '@/Components/WeatherForecastDay'


import './style.css'


export interface ForecastDataTypes {
    forecastWeather: {
        list: WeatherListTypes[]
    }
}

interface WeatherListTypes {
    dt_txt: string
}

function WeatherForecastResult (forecastData: ForecastDataTypes): React.ReactElement {
    const [weatherList, setWeatherList] = useState<WeatherListTypes[] | undefined>()

    useEffect(() => {
        if (forecastData !== null) {
            setWeatherList(forecastData.forecastWeather?.list)
        };
    }, [forecastData])


    const dates: string[] = []
    const dateData: object[] = []

    // Get the dates for the weather and save to an array
    Array.isArray(weatherList) && weatherList?.forEach((list) => {
        const date: string = list.dt_txt.split(' ')[0]
        if (!dates.includes(date)) {
            dates.push(date)
        }
    })


    // Use the dates we have just gotten to break down the response array into days
    for (let i = 0; i < dates.length; i++) {
        const dailyWeather: object[] = []
        Array.isArray(weatherList) && weatherList.forEach((list) => {
            const date = list.dt_txt
            if (date.includes(dates[i])) {
                dailyWeather.push(list)
            }
        })
        dateData.push(dailyWeather)
    }

    if (weatherList !== null) {
        return (
            <div className="weather-forecast">
                <h2>Daily Weather</h2>

                {dateData.map((list, index) => {
                    return (
                        <WeatherForecastDay key={index} list={list}/>
                    )
                })}
            </div>
        )
    }

    return <></>
}



export default WeatherForecastResult
