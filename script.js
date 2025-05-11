// API key for OpenWeatherMap service to authenticate API requests
const apiKey = "ffe21dad6b15ac743cccb15b9c2037bd";

// Base URL for fetching weather data in metric units (Celsius)
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

// Selects the input field where the user will enter the city name
const searchBox = document.querySelector(".search input");

// Selects the button that the user clicks to search for the weather
const searchBtn = document.querySelector(".search button");

// Selects the element where the weather icon will be displayed
const WeatherIcon = document.querySelector(".weather-icon");

// Asynchronous function to fetch and display the weather data for a given city
async function checkWeather(cityName) {
    // Fetch weather data from OpenWeatherMap API by appending the city name and API key to the URL
    const response = await fetch(apiUrl + cityName + `&appid=${apiKey}`);

    // Check if the city was not found (status code 404)
    if (response.status == 404) {
        // Display the error message and hide the weather display section
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    } else {
        // Parse the API response into JSON format
        var data = await response.json();

        // Log the entire weather data to the console for debugging
        console.log(data);

        // Display the city name returned from the API
        document.querySelector(".city").innerHTML = data.name;

        // Display the temperature in Celsius, rounded to the nearest whole number
        document.querySelector(".temp").innerHTML =
            Math.round(data.main.temp) + "°C";

        // Display the humidity percentage
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";

        // Display the wind speed in kilometers per hour
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/hr";

        // Update the weather icon based on the current weather condition
        if (data.weather[0].main == "Clouds") {
            WeatherIcon.src = "Images/clouds.png";
        } else if (data.weather[0].main == "Clear") {
            WeatherIcon.src = "Images/clear.png";
        } else if (data.weather[0].main == "Drizzle") {
            WeatherIcon.src = "Images/drizzle.png";
        } else if (data.weather[0].main == "Mist") {
            WeatherIcon.src = "Images/mist.png";
        } else if (data.weather[0].main == "Rain") {
            WeatherIcon.src = "Images/rain.png";
        } else if (data.weather[0].main == "Snow") {
            WeatherIcon.src = "Images/snow.png";
        }

        // Display the weather section and hide the error message
        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
    }
}

// Add a click event listener to the search button
searchBtn.addEventListener("click", () => {
    // Calls the checkWeather function with the city name entered by the user
    checkWeather(searchBox.value);
});
