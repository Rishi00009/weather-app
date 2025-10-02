import { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Paper,
  Stack,
  Card,
  CardContent,
  CardActions,
} from "@mui/material";

export default function WeatherApp() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

  useEffect(() => {
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const fetchWeatherByCity = async () => {
    if (!city) return;
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      const data = await response.json();
      setWeather(data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchWeatherByLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (pos) => {
        const { latitude, longitude } = pos.coords;
        try {
          const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
          );
          const data = await response.json();
          setWeather(data);
        } catch (err) {
          console.error(err);
        }
      });
    } else {
      alert("Geolocation not supported");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        py: 5,
        px: 2,
        background: darkMode
          ? "linear-gradient(135deg, #1C1C1E, #2C2C2E)"
          : "linear-gradient(135deg, #E0E0FF, #FFFFFF)",
        color: darkMode ? "#fff" : "#000",
      }}
    >
      <Container maxWidth="sm">
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 4,
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            Weather App 🌦️
          </Typography>
          <Button
            variant="outlined"
            onClick={() => setDarkMode(!darkMode)}
            sx={{ borderRadius: 3 }}
          >
            {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </Button>
        </Box>

        {/* Input Form */}
        <Paper
          elevation={8}
          sx={{
            p: 3,
            mb: 4,
            borderRadius: 4,
            background: darkMode
              ? "linear-gradient(145deg, #2C2C2E, #1C1C1E)"
              : "linear-gradient(145deg, #FFFFFF, #E0E0FF)",
          }}
        >
          <Stack spacing={2}>
            <TextField
              variant="outlined"
              label="Enter city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              sx={{
                input: { color: darkMode ? "#fff" : "#000" },
                "& label": { color: darkMode ? "#fff" : "#555" },
              }}
            />
            <Stack direction="row" spacing={2} justifyContent="center">
              <Button
                variant="contained"
                onClick={fetchWeatherByCity}
                sx={{ borderRadius: 3 }}
              >
                Get Weather
              </Button>
              <Button
                variant="contained"
                color="success"
                onClick={fetchWeatherByLocation}
                sx={{ borderRadius: 3 }}
              >
                Use Current Location 📍
              </Button>
            </Stack>
          </Stack>
        </Paper>

        {/* Weather Display */}
        {weather && (
          <Paper
            elevation={12}
            sx={{
              p: 4,
              borderRadius: 4,
              background: darkMode
                ? "linear-gradient(145deg, #2C2C2E, #1C1C1E)"
                : "linear-gradient(145deg, #FFFFFF, #E0E0FF)",
            }}
          >
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
              {weather.name}, {weather.sys.country}
            </Typography>
            <Stack
              direction="row"
              spacing={3}
              alignItems="center"
              sx={{ mb: 3 }}
            >
              <img
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
                alt="icon"
                style={{ width: 100, height: 100 }}
              />
              <Box>
                <Typography variant="h3" sx={{ fontWeight: 700 }}>
                  {weather.main.temp}°C
                </Typography>
                <Typography sx={{ textTransform: "capitalize" }}>
                  {weather.weather[0].description}
                </Typography>
              </Box>
            </Stack>

            {/* Details Cards */}
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              flexWrap="wrap"
            >
              <Card
                sx={{
                  p: 2,
                  flex: "1 1 45%",
                  mb: 2,
                  borderRadius: 3,
                  background: darkMode
                    ? "#3A3A3C"
                    : "#F0F0FF",
                  textAlign: "center",
                  fontWeight: 600,
                }}
              >
                🌡️ Feels Like: {weather.main.feels_like}°C
              </Card>
              <Card
                sx={{
                  p: 2,
                  flex: "1 1 45%",
                  mb: 2,
                  borderRadius: 3,
                  background: darkMode
                    ? "#3A3A3C"
                    : "#F0F0FF",
                  textAlign: "center",
                  fontWeight: 600,
                }}
              >
                💨 Wind: {weather.wind.speed} m/s
              </Card>
              <Card
                sx={{
                  p: 2,
                  flex: "1 1 45%",
                  mb: 2,
                  borderRadius: 3,
                  background: darkMode
                    ? "#3A3A3C"
                    : "#F0F0FF",
                  textAlign: "center",
                  fontWeight: 600,
                }}
              >
                💧 Humidity: {weather.main.humidity}%
              </Card>
              <Card
                sx={{
                  p: 2,
                  flex: "1 1 45%",
                  mb: 2,
                  borderRadius: 3,
                  background: darkMode
                    ? "#3A3A3C"
                    : "#F0F0FF",
                  textAlign: "center",
                  fontWeight: 600,
                }}
              >
                🌅 Sunrise:{" "}
                {new Date(weather.sys.sunrise * 1000).toLocaleTimeString()}
              </Card>
              <Card
                sx={{
                  p: 2,
                  flex: "1 1 45%",
                  mb: 2,
                  borderRadius: 3,
                  background: darkMode
                    ? "#3A3A3C"
                    : "#F0F0FF",
                  textAlign: "center",
                  fontWeight: 600,
                }}
              >
                🌇 Sunset:{" "}
                {new Date(weather.sys.sunset * 1000).toLocaleTimeString()}
              </Card>
            </Stack>
          </Paper>
        )}
      </Container>
    </Box>
  );
}
