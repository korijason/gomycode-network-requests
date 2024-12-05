// Base URL and API Key for OpenWeatherMap
const API_KEY = "c3781be60a8c451d8d9b5979d99975f8";  // Replace with your actual OpenWeatherMap API key
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

// Function to fetch weather data from OpenWeather API
async function fetchWeather(city) {
  try {
    // Construct the API request URL using the provided city name
    const response = await fetch(`${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`);
    
    // Check if the response is okay (status 200-299)
    if (!response.ok) throw new Error("City not found or invalid API key");
    
    // Parse the JSON response
    const data = await response.json();
    
    // Pass the fetched data to displayWeather function
    displayWeather(data);
    
  } catch (error) {
    // Handle errors gracefully (e.g., invalid city name or API issues)
    alert(`Error: ${error.message}`);
  }
}

// Function to display weather data on the page
function displayWeather(data) {
  // Get the element where weather info will be displayed
  const weatherInfo = document.getElementById("weather-info");
  
  // Clear any previous weather data
  weatherInfo.innerHTML = `
    <p class="text-lg font-bold">Location: ${data.name}, ${data.sys.country}</p>
    <p class="text-lg">Temperature: ${data.main.temp}°C</p>
    <p class="text-lg">Weather: ${data.weather[0].description}</p>
    <p class="text-lg">Humidity: ${data.main.humidity}%</p>
    <p class="text-lg">Wind Speed: ${data.wind.speed} m/s</p>
  `;
}

// Event listener for the "Search Weather" button
document.getElementById("search-btn").addEventListener("click", () => {
  // Get the city name entered by the user
  const city = document.getElementById("city").value.trim();
  
  // Check if the city input is not empty
  if (city) {
    // Fetch and display weather data for the entered city
    fetchWeather(city);
    // Clear the input field after fetching weather data
    document.getElementById("city").value = "";
  } else {
    // Alert user to enter a valid city name
    alert("Please enter a city name.");
  }
});
