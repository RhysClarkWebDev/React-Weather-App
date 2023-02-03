import React from 'react';
import ReactDOM from 'react-dom';

import WeatherSearch from '/src/Components/WeatherSearch/WeatherSearch.jsx';
import CurrentForecastResult from '/src/Components/CurrentForecastResult/CurrentForecastResult.jsx';
import ErrorModal from '/src/Components/ErrorModal/ErrorModal.jsx';




//Initial Screen Loading
let root = document.getElementById("root");
ReactDOM.render(<WeatherSearch/>, root)




//For using the users location
const successCallback = (position) => {
  let longitude = parseFloat(position.coords.longitude).toFixed(2);
  let latitude = parseFloat(position.coords.latitude).toFixed(2);
  console.log(longitude)

  let request = new XMLHttpRequest();
  const formData = new FormData;

  formData.append("longitude", longitude);
  formData.append("latitude", latitude);
  request.open("POST", "/weatherLocationAuto", true);
  request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  request.send(new URLSearchParams(formData));

  //WHEN SERVER SENDS RESPONSE

  request.onload = ()=>{
    let weatherData = request.responseText;
    weatherData = JSON.parse(weatherData);

    checkData(weatherData);
  }
};

const errorCallback = (error) => {
  console.log(error);
};

let userPos = navigator.geolocation.getCurrentPosition(successCallback, errorCallback);








//For submitting location in the form
function searchSetup(){
  let locationForm = document.getElementById("location-form");
  let cityName = document.getElementById("cityName");
  let error = document.querySelector(".error");

  locationForm.addEventListener("submit", function(event) {
    event.preventDefault(); 
    if(cityName.value != null && cityName.value != "") {
     
     let request = new XMLHttpRequest();
 
     const formData = new FormData();
     formData.append('location', cityName.value);
 
     request.open("post", "/weatherApp", true);
     request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
     request.send(new URLSearchParams(formData));
 
     request.onload = function(){
        let weatherData = request.responseText;
        if(weatherData != "Error"){
          weatherData = JSON.parse(weatherData);
        } else {

        }
        checkData(weatherData);
     }
    }else{

     error.textContent = "Please enter a city name";
     setTimeout(function(){
      error.textContent = "";
     }, 3000)
    }
 })
}
searchSetup();



function checkData(weatherData){
  console.log(weatherData)
  if (weatherData != "Error"){
    loadForecast(weatherData);
  } else {
    let error = "Something went wrong, please try again.";
    let modal = document.getElementById('modal');
    ReactDOM.render(<ErrorModal error={error}/>, modal);
    cityName.value = "";
  }
}



function loadForecast(weatherData){
  ReactDOM.unmountComponentAtNode(root);
  ReactDOM.render(<CurrentForecastResult weatherData={weatherData}/>, root);
  searchSetup();
}