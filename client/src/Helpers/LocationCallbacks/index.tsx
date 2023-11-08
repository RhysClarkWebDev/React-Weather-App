import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const useFetchWeather = (): void => {
    const navigate = useNavigate()

    const successCallback = (position: GeolocationPosition): void => {
        const longitude = position.coords.longitude.toFixed(2).toString()
        const latitude = position.coords.latitude.toFixed(2).toString()

        fetch('api/weather-by-location', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                longitude,
                latitude
            })
        })
            .then(async (response) => {
                if (response.ok) {
                    return await response.json()
                } else {
                    throw new Error('Something Went Wrong')
                }
            })
            .then((data) => {
                console.log(data)
                navigate('/weather-result', { state: { weatherData: data } })
            })
            .catch((error) => {
                const errorMessage = 'Something went wrong, please try again.'

                console.error(errorMessage, error)
            })
    }

    const errorCallback = (error: GeolocationPositionError): void => {
        console.error(`Geolocation error: ${error.message}`)
    }

    useEffect(() => {
        let isMounted = true

        navigator.geolocation.getCurrentPosition(
            (position) => {
                if (isMounted) {
                    successCallback(position)
                }
            },
            (error) => {
                if (isMounted) {
                    errorCallback(error)
                }
            }
        )

        return () => {
            isMounted = false
        }
    }, [])
}

export default useFetchWeather
