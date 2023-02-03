import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import styles from './style.css';

function WeatherForecastDay(props){
    let list = props.list;
    const [isActive, setIsActive] = useState(false);

    function toggleForecast(){
        setIsActive(current => !current);
    }
    function getDay(day){
        let d = new Date(day);
        day = d.getDay();

        switch (day) {
            case 0:
              day = "Sunday";
              break;
            case 1:
              day = "Monday";
              break;
            case 2:
              day = "Tuesday";
              break;
            case 3:
              day = "Wednesday";
              break;
            case 4:
              day = "Thursday";
              break;
            case 5:
              day = "Friday";
              break;
            case 6:
              day = "Saturday";
              break;
        
          }
        return day;
    }

    function getIcon(icon){
        let iconUrl = "/weather/images/";
        switch (icon){

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

        return iconUrl + icon;
    }

    return (
        <div onClick={toggleForecast} className={isActive ? "show accordian" : "accordian"} >
                        <div className="accordian-top">
                            <div className="daily-left">
                                <img src={getIcon(list[0].weather[0].icon)}/>
                                <h3 class="margin-l-30">{getDay(list[0].dt_txt.split(" ")[0])}</h3>
                            </div>
                            <div className="daily-right">
                                <p>{list[0].weather[0].description}</p>
                                <div class="margin-l-30 daily-temps">
                                    <p className="temperature">{list[0].main.temp_min}</p>
                                    <p>/</p>
                                    <p className="temperature">{list[0].main.temp_max}</p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="accordian-bottom">
                        {list.map((item)=> {
                            return (
                                <div className="three-hourly-forecast">
                                    <p className="forecast-time">{item.dt_txt.split(" ")[1].slice(0, -3)}</p>
                                    <img src={getIcon(item.weather[0].icon)} alt="" />
                                    <p>{item.weather[0].main}</p>
                                    <div className="forecast-temps">
                                        <p className="temperature">{item.main.temp_min + "/" + item.main.temp_max}</p>
                                    </div>
                                </div>
                            )
                        })}
                        </div>
                    </div>
    )
}

export default WeatherForecastDay;