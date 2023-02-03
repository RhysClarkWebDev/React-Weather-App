import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import styles from './style.css';

import WeatherForecastDay from '/src/Components/WeatherForecastDay/WeatherForecastDay.jsx';

function WeatherForecastResult(props){
    let forecastData = props.forecastWeather;
    
    let weatherList = forecastData.list;

    let dates = [];
    let dateData = [];

    // Get the dates for the weather and save to an array
    weatherList.forEach((forecast)=>{
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


    console.log(dateData);



    return (
        <div class="weather-forecast">
            <h2>Daily Weather</h2>

            {dateData.map((list)=>{
                return (
                    <WeatherForecastDay list={list}/>
                )
                
            })}
        </div>
    )
}



export default WeatherForecastResult;