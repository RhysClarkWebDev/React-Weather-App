import React, {useState, useEffect} from 'react';
import './style.css';

import WeatherForecastDay from '@/Components/WeatherForecastDay';


function WeatherForecastResult(forecastData){
    const [weatherList, setWeatherList] = useState(undefined);

    useEffect(() => {
        if(forecastData){
            setWeatherList(forecastData.forecastWeather.list);
        };
    }, [forecastData])


    let dates = [];
    let dateData = [];

    // Get the dates for the weather and save to an array
    weatherList && weatherList.forEach((forecast)=>{
        let date = forecast.dt_txt.split(" ")[0];
        if (!dates.includes(date)){
            dates.push(date);
        } else {

        }
          
    });


    // Use the dates we have just gotten to break down the response array into days 
    for (let i = 0; i < dates.length; i++){     
        let dailyWeather = [];
        weatherList.forEach((forecast)=>{   
            let date = forecast.dt_txt;
            if (date.includes(dates[i])){
 
                dailyWeather.push(forecast);               
            } else{
            }

        })
        dateData.push(dailyWeather);
    }

    if(weatherList) {
        return (
            <div className="weather-forecast">
                <h2>Daily Weather</h2>
    
                {dateData.map((list, index)=>{
                    return (
                        <WeatherForecastDay key={index} list={list}/>
                    )            
                })}
            </div>
        )
    }
    
}



export default WeatherForecastResult;