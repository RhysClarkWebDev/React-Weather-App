const express = require('express');
const https = require('node:https');
const path = require("path");
const app = express();
const port = 3002;
const bodyParser = require("body-parser");
require("dotenv").config({path: './.env'});

//Set the front end path
const frontEnd = path.join(__dirname, '..', 'client', 'dist');

app.use(express.static(frontEnd));
app.use(bodyParser.json());



app.get('/*', function(req, res){
  res.sendFile(frontEnd + "/index.html");
})



//By giving Location automatic Input
app.post('/weather-by-location', function (req, res) {
  let longitude = req.body.longitude;
  let latitude = req.body.latitude;
  let authKey = process.env.WEATHER_API_KEY;


  function currentWeather (){
    let currentWeatherUrl = "https://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&appid=" + authKey + "&units=metric";
    return new Promise((resolve, reject) =>{
      https.get(currentWeatherUrl, (response) => {
        response.on("data", (data) => {
          const currentWeatherData = JSON.parse(data);
          console.log(currentWeatherData)
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
        let data = ''; // Initialize data as an empty string
  
        response.on("data", (chunk) => {
          data += chunk; // Append the received chunks to data
        });
  
        response.on("end", () => {
          if (response.statusCode <= 300) {
            try {
              const forecastWeatherData = JSON.parse(data); // Parse the complete JSON data
              let allWeatherData = {
                "currentWeather": currentWeatherData,
                "forecastWeather": forecastWeatherData
              };
              resolve(allWeatherData);
            } catch (error) {
              reject(new Error("Failed to parse JSON data"));
            }
          } else {
            reject(new Error("Forecast data not found"));
          }
        });
  
        response.on("error", (error) => {
          reject(new Error("Failed to fetch forecast data"));
        });
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
app.post('/weather-by-name', function(req, res){
  let location = req.body.location;
  let authKey = process.env.WEATHER_API_KEY;

  function currentWeather (){
    let currentWeatherUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + location + "&appid=" + authKey + "&units=metric";
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

  function weatherForecast(currentWeatherData) {
    let forecastWeatherUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + location + "&appid=" + authKey + "&units=metric";
    return new Promise((resolve, reject) => {
      https.get(forecastWeatherUrl, (response) => {
        let data = ''; // Initialize data as an empty string
  
        response.on("data", (chunk) => {
          data += chunk; // Append the received chunks to data
        });
  
        response.on("end", () => {
          if (response.statusCode <= 300) {
            try {
              const forecastWeatherData = JSON.parse(data); // Parse the complete JSON data
              let allWeatherData = {
                "currentWeather": currentWeatherData,
                "forecastWeather": forecastWeatherData
              };
              resolve(allWeatherData);
            } catch (error) {
              reject(new Error("Failed to parse JSON data"));
            }
          } else {
            reject(new Error("Forecast data not found"));
          }
        });
  
        response.on("error", (error) => {
          reject(new Error("Failed to fetch forecast data"));
        });
      });
    });
  }

  function showWeather(allWeatherData){
    res.send(allWeatherData);
  }

  function weatherError(error){
    res.send({message: error});
  }


  currentWeather().then((currentWeatherData)=>{
    weatherForecast(currentWeatherData)
    .then((allWeatherData)=>{
      showWeather(allWeatherData);
    });
  }).catch(error => weatherError(error));

});








app.listen(port, () => {
  console.log("Server is working on port: " + port);
})
