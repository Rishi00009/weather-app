import { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap for styling

export default function App() {
  // State to store city input
  const [city, setCity] = useState("");
  // State to store weather data
  const [weather, setWeather] = useState(null);
  // State to manage dark mode, initialized from localStorage
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  // API key stored in environment variables
  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

  // Effect to handle dark mode theme persistence
  useEffect(() => {
    document.body.classList.toggle("bg-dark", darkMode);
    document.body.classList.toggle("text-white", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  // Function to fetch weather data by city name
  const fetchWeatherByCity = async () => {
    if (!city) return; // Prevent API call if input is empty
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      setWeather(response.data); // Store API response in state
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  // Function to fetch weather data using user's geolocation
  const fetchWeatherByLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords; // Extract latitude & longitude
        try {
          const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
          );
          setWeather(response.data); // Store API response in state
        } catch (error) {
          console.error("Error fetching location-based weather:", error);
        }
      });
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  return (
    <div className={`container mt-5 ${darkMode ? "bg-dark text-white" : "bg-light text-dark"}`}>
      {/* Header with dark mode toggle */}
      <div className="d-flex justify-content-between align-items-center">
        <h1 className="fw-bold">Weather App 🌦️</h1>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="btn btn-outline-secondary"
        >
          {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>

      {/* Input for city name & buttons for fetching weather */}
      <div className="card mt-4 p-4 shadow-lg">
        <input
          type="text"
          placeholder="Enter city..."
          className="form-control mb-3"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <div className="d-grid gap-2">
          <button onClick={fetchWeatherByCity} className="btn btn-primary">
            Get Weather
          </button>
          <button onClick={fetchWeatherByLocation} className="btn btn-success">
            Use Current Location 📍
          </button>
        </div>
      </div>

      {/* Display weather details if available */}
      {weather && (
        <div className="card mt-4 p-4 shadow-lg">
          <h2 className="fw-bold">{weather.name}, {weather.sys.country}</h2>
          <div className="d-flex align-items-center mt-3">
            {/* Weather Icon */}
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
              alt="Weather Icon"
              className="me-3"
            />
            <div>
              {/* Temperature and Weather Condition */}
              <p className="display-4 fw-bold">{weather.main.temp}°C</p>
              <p className="text-capitalize">{weather.weather[0].description}</p>
            </div>
          </div>

          {/* Additional Weather Details */}
          <div className="row mt-3">
            <div className="col-md-6">
              <div className="card p-3">
                🌡️ Feels Like: <strong>{weather.main.feels_like}°C</strong>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card p-3">
                💨 Wind: <strong>{weather.wind.speed} m/s</strong>
              </div>
            </div>
            <div className="col-md-6 mt-3">
              <div className="card p-3">
                💧 Humidity: <strong>{weather.main.humidity}%</strong>
              </div>
            </div>
            <div className="col-md-6 mt-3">
              <div className="card p-3">
                🌅 Sunrise: <strong>{new Date(weather.sys.sunrise * 1000).toLocaleTimeString()}</strong>
              </div>
            </div>
            <div className="col-md-6 mt-3">
              <div className="card p-3">
                🌇 Sunset: <strong>{new Date(weather.sys.sunset * 1000).toLocaleTimeString()}</strong>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
