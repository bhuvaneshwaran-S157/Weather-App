const apiKey = "59f0817a27150d83ac3f57d1d7e4c2b5";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const rimg = document.querySelector(".weather-icon");
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");

async function checkWeather(city) {
    if (!city) {
        alert("Please enter a city name.");
        return;
    }

    try {
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
        
        if (!response.ok) {
            throw new Error("City not found");
        }

        const data = await response.json();

        console.log(data);

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

        // Update weather icon based on the weather condition
        if (data.weather[0].main === "Clouds") {
            rimg.src = "images/clouds.png";
        } else if (data.weather[0].main === "Clear") {
            rimg.src = "images/clear.png";
        } else if (data.weather[0].main === "Drizzle") {
            rimg.src = "images/drizzle.png";
        } else if (data.weather[0].main === "Rain") {
            rimg.src = "images/rain.png";
        } else if (data.weather[0].main === "Mist") {
            rimg.src = "images/mist.png";
        } else if (data.weather[0].main === "Snow") {
            rimg.src = "images/snow.png";
        } else {
            rimg.src = "images/default.png"; // Default image for unhandled weather conditions
        }
    } catch (error) {
        console.error(error);
        alert("Could not fetch weather data. Please check the city name and try again.");
    }
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value.trim());
});
