// Base URL and API Key for OpenWeatherMap
const API_KEY = "your_api_key_here"; // Replace with your API key from OpenWeatherMap
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

// Function to fetch weather data
async function fetchWeather(city) {
  try {
    const response = await fetch(`${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`);
    if (!response.ok) throw new Error("City not found");
    const data = await response.json();
    displayWeather(data);
  } catch (error) {
    alert(error.message);
  }
}

// Function to display weather data
function displayWeather(data) {
  const weatherInfo = document.getElementById("weather-info");
  weatherInfo.innerHTML = `
    <p class="text-lg font-bold">Location: ${data.name}, ${data.sys.country}</p>
    <p class="text-lg">Temperature: ${data.main.temp}°C</p>
    <p class="text-lg">Weather: ${data.weather[0].description}</p>
  `;
}

// Add event listener to the button
document.getElementById("search-btn").addEventListener("click", () => {
  const city = document.getElementById("city").value.trim();
  if (city) {
    fetchWeather(city);
  } else {
    alert("Please enter a city name");
  }
});
