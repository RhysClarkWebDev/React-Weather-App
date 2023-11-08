import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'



import './style.css'



function SearchBar (): React.ReactElement {
    const [cityName, setCityName] = useState<string>()

    const [error, setError] = useState('')
    const navigate = useNavigate()



    async function handleSubmit (event: React.FormEvent): Promise<void> {
        event.preventDefault()

        if (cityName != null && cityName !== '') {
            fetch('/api/weather-by-name', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    location: cityName
                })
            })
                .then(async (response) => {
                    if (response.ok) {
                        return await response.json()
                    } else {
                        setError('Something Went Wrong')
                        return 'Something Went Wrong'
                    }
                })
                .then((data) => {
                    if (Object.keys(data).length !== 0) {
                        setError('')
                        navigate('/weather-result', { state: { weatherData: data } })
                    } else {
                        setError('Cant Retrieve weather data')
                    }
                })
                .catch(() => {
                    setError('Error fetching weather data')
                    setError('Error fetching weather')
                })
        } else {
            setError('Please Enter a City or Country Name')
            setTimeout(() => {
                setError('')
            }, 3000)
        }
    }


    return (
        <>
            <div className="form-holder">
                <form id="location-form" onSubmit={(event) => { void handleSubmit(event) }}>
                    <input
                        onChange={(event) => {
                            setCityName(event.target.value)
                        }}
                        type="text"
                        name="cityName"
                        id="cityName"
                        value={cityName}
                        placeholder="Search for a Place"
                    />
                    <button type="submit" name="submitWeatherResponse">Search</button>
                    {error !== '' && <p className="error">{error}</p>}
                </form>
            </div>
            <div id="modal"></div>
        </>
    )
}



export default SearchBar
