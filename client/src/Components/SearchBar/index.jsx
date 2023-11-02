import React, {useState, useEffect, useRef} from 'react';
import { useNavigate } from 'react-router-dom';



import './style.css';



function SearchBar(callback){
    const [cityName, setCityName] = useState(undefined);

    const [error, setError] = useState(false);
    const navigate = useNavigate();



    async function handleSubmit(event){
        event.preventDefault();

        if(cityName != null && cityName != "") {
            fetch("/weather-by-name", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    location: cityName
                })
            })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    setError(true)
                    return "Something Went Wrong";
                }
            })
            .then((data) => {
                if (Object.keys(data).length !== 0) {
                    setError(false)
                    navigate("/weather-result", { state: { weatherData: data } });
                } else {
                    setError("Cant Retrieve weather data")
                }
            })
            .catch(error => {
                setError(true);
                setError("Error fetching weather");
            });

        } else {
            setError("Please Enter a City or Country Name");
            setTimeout(() => {
                setError(false);
            }, 3000);
        }
    }


    return(
        <>
            <div className="form-holder">
                <form id="location-form" onSubmit={handleSubmit}>
                    <input 
                        onChange={(event) => {
                            setCityName(event.target.value);
                        }} 
                        type="text" 
                        name="cityName" 
                        id="cityName"
                        value={cityName}
                        placeholder="Search for a Place"
                    />
                    <button type="submit" name="submitWeatherResponse">Search</button>
                    {error && <p className="error">{error}</p>}
                </form>
            </div>
            <div id="modal"></div>
        </>
    )
}



export default SearchBar;