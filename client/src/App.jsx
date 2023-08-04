import React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

import WeatherSearch from '@/Pages/WeatherSearch';
import WeatherCurrentAndForecast from "@/Pages/WeatherCurrentAndForecast";

//PAGES


function App() {
    return (
        <Router>
            <Routes>

                <Route path="/" element={<WeatherSearch/>}/>
                <Route path="/weather-result" element={<WeatherCurrentAndForecast/>}/>

            </Routes>
        </Router>
    )
}


export default App;