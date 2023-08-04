import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const useFetchWeather = () => {
  const navigate = useNavigate();

  const successCallback = async (position) => {
    let longitude = parseFloat(position.coords.longitude).toFixed(2);
    let latitude = parseFloat(position.coords.latitude).toFixed(2);

    try {
      const response = await fetch("/weather-by-location", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          longitude: longitude,
          latitude: latitude
        })
      });

      if (response.ok) {
        console.log(response);
        const data = await response.json();
        navigate("/weather-result", { state: { weatherData: data } });
      } else {
        throw new Error("Something Went Wrong");
      }
    } catch (error) {
      let errorMessage = "Something went wrong, please try again.";
      // Handle the error here, show a modal, set an error state, etc.
      console.error(errorMessage, error);
    }
  };

  const errorCallback = (error) => {
    console.error(error);
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
  }, []);
};

export default useFetchWeather;
