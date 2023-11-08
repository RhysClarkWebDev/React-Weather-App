import React, { useState } from 'react'

// GIFS
import Sunny from '@/Images/Sunny.gif'
import PartlyCloudy from '@/Images/PartlyCloudy.gif'
import Cloudy from '@/Images/Cloudy.gif'
import Raining from '@/Images/Raining.gif'
import Lightning from '@/Images/Lightning.gif'
import Snow from '@/Images/Snow.gif'
import Windy from '@/Images/Windy.gif'


import './style.css'

export interface ListTypes {
    list: Array<{
        dt_txt: string
        weather: Array<{
            icon: string
            description: string
            main: string
        }>
        main: {
            temp_min: number
            temp_max: number
        }
    }>
}

function WeatherForecastDay ({ list }: ListTypes): React.ReactElement {
    const [isActive, setIsActive] = useState(false)

    function toggleForecast (): void {
        setIsActive(current => !current)
    }
    function getDay (day: number | string): string {
        const d = new Date(day)

        day = d.getDay()

        let dayName = ''

        switch (day) {
            case 0:
                dayName = 'Sunday'
                break
            case 1:
                dayName = 'Monday'
                break
            case 2:
                dayName = 'Tuesday'
                break
            case 3:
                dayName = 'Wednesday'
                break
            case 4:
                dayName = 'Thursday'
                break
            case 5:
                dayName = 'Friday'
                break
            case 6:
                dayName = 'Saturday'
                break
        }
        return dayName
    }

    function getIcon (icon: string): string {
        switch (icon) {
            case '01d':
            case '01n':
                icon = Sunny
                break

            case '02d':
            case '02n':
                icon = PartlyCloudy
                break


            case '03d':
            case '03n':
                icon = Cloudy
                break

            case '04d':
            case '04n':
                icon = Cloudy
                break


            case '09d':
            case '09n':
                icon = Raining
                break

            case '10d':
            case '10n':
                icon = Raining
                break

            case '11d':
            case '11n':
                icon = Lightning
                break

            case '13d':
            case '13n':
                icon = Snow
                break

            case '50d':
            case '50n':
                icon = Windy
                break


            default:
                icon = 'Sunny.gif'
        }

        return icon
    }

    return (
        <div onClick={toggleForecast} className={isActive ? 'show accordian' : 'accordian'} >
            <div className="accordian-top">
                <div className="daily-left">
                    <img src={getIcon(list[0].weather[0].icon)}/>
                    <h3 className="margin-l-30">{getDay(list[0].dt_txt.split(' ')[0])}</h3>
                </div>
                <div className="daily-right">
                    <p>{list[0].weather[0].description}</p>
                    <div className="margin-l-30 daily-temps">
                        <p className="temperature">{list[0].main.temp_min}</p>
                        <p>/</p>
                        <p className="temperature">{list[0].main.temp_max}</p>
                    </div>
                </div>
            </div>

            <div className="accordian-bottom">
                {list.map((item, index) => {
                    return (
                        <div key={index} className="three-hourly-forecast">
                            <p className="forecast-time">{item.dt_txt.split(' ')[1].slice(0, -3)}</p>
                            <img src={getIcon(item.weather[0].icon)} alt="" />
                            <p>{item.weather[0].main}</p>
                            <div className="forecast-temps">
                                <p className="temperature">{item.main.temp_min + '/' + item.main.temp_max}</p>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default WeatherForecastDay
