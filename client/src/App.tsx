import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import WeatherSearch from '@/Pages/WeatherSearch'
import WeatherCurrentAndForecast from '@/Pages/WeatherCurrentAndForecast'




function App (): React.ReactElement {
    return (
        <Router>
            <Routes>

                <Route path="/" element={<WeatherSearch/>}/>
                <Route path="/weather-result" element={<WeatherCurrentAndForecast/>}/>

            </Routes>
        </Router>
    )
}


export default App
