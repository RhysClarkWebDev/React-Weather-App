const express = require('express');
const https = require('node:https');
const app = express();
const port = 3002;
const bodyParser = require("body-parser");
require("dotenv").config({path: './.env'});

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));




app.get('/', (req, res) => {
  res.sendFile(__dirname + "/index.html");
});



//By giving Location automatic Input
app.post('/weatherLocationAuto', function (req, res) {
  let longitude = req.body.longitude;
  let latitude = req.body.latitude;
  let authKey = process.env.WEATHER_API_KEY;

  console.log(process.env);

  function currentWeather (){
    let currentWeatherUrl = "https://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&appid=" + authKey + "&units=metric";
    return new Promise((resolve, reject) =>{
      https.get(currentWeatherUrl, (response) => {
        response.on("data", (data) => {
          const currentWeatherData = JSON.parse(data);      
          if (currentWeatherData.cod <= 300){
            resolve(currentWeatherData);
          } else {
            reject();
          }
        })
      });
    })
  };

  function weatherForecast(currentWeatherData){
    let forecastWeatherUrl = "https://api.openweathermap.org/data/2.5/forecast?lat=" + latitude + "&lon=" + longitude + "&appid=" + authKey + "&units=metric";
    return new Promise((resolve, reject) => {
      https.get(forecastWeatherUrl, (response) => {
        response.on("data", (data) => {
          const forecastWeatherData = JSON.parse(data);  
          if (forecastWeatherData.cod <= 300){

            let allWeatherData = {
              "currentWeather": currentWeatherData,
              "forecastWeather": forecastWeatherData
            };
            console.log(allWeatherData.currentWeather);
            resolve(allWeatherData);
          } else {
            reject();
          }
        })
      });
    })
  };

  function showWeather(allWeatherData){
    res.send(allWeatherData);
  }

  function weatherError(){
    res.send("Error");
  }


  currentWeather().then((currentWeatherData)=>{
    weatherForecast(currentWeatherData)
    .then((allWeatherData)=>{
      showWeather(allWeatherData);
    });
  }).catch(weatherError);
});





//By giving town name manually
app.post('/weatherApp', function(req, res){
  let location = req.body.location;
  let authKey = process.env.WEATHER_API_KEY;

  console.log(process.env);
  
  

  function currentWeather (){
    let currentWeatherUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + location + "&appid=" + authKey + "&units=metric";
    return new Promise((resolve, reject) =>{
      https.get(currentWeatherUrl, (response) => {
        response.on("data", (data) => {
          const currentWeatherData = JSON.parse(data);      
          if (currentWeatherData.cod <= 300){
            resolve(currentWeatherData);
          } else {
            console.log(currentWeatherData);
            reject();
          }
        })
      });
    })
  };

  function weatherForecast(currentWeatherData){
    let forecastWeatherUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + location + "&appid=" + authKey + "&units=metric";
    return new Promise((resolve, reject) => {
      https.get(forecastWeatherUrl, (response) => {
        response.on("data", (data) => {
          const forecastWeatherData = JSON.parse(data);  
          if (forecastWeatherData.cod <= 300){

            let allWeatherData = {
              "currentWeather": currentWeatherData,
              "forecastWeather": forecastWeatherData
            };
            console.log(allWeatherData.currentWeather);
            resolve(allWeatherData);
          } else {
            reject();
          }
        })
      });
    })
  };

  function showWeather(allWeatherData){
    res.send(allWeatherData);
  }

  function weatherError(){
    res.send("Error");
  }


  currentWeather().then((currentWeatherData)=>{
    weatherForecast(currentWeatherData)
    .then((allWeatherData)=>{
      showWeather(allWeatherData);
    });
  }).catch(weatherError);

});








app.listen(port, () => {
  console.log("Server is working on port: " + port);
})
