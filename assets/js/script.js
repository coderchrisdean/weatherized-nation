// function to get weather data and store in local storage
function getWeather(cityName) {
  //variables for weather
  var apiKey = "9b3091bef0cfab7117aa718a68431472"; // updated 02/26/23

  var url = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=metric`; // url to get weather data
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      // store the weather data to local storage
      localStorage.setItem(cityName, JSON.stringify(data));
      console.log(
        "Weather data for " + cityName + " has been stored in local storage."
      );
      // Render the current weather in the "main-weather" section
      var currentWeather = data.list[0];
      var mainWeather = document.getElementById("main-weather");
      mainWeather.querySelector(".card-title").innerText = data.city.name;
      mainWeather.querySelector(".card-subtitle.mb-2").innerText =
        currentWeather.dt_txt;
      mainWeather.querySelector(".card-text:nth-child(1)").innerText =
        tempIcon + " Temperature: " + currentWeather.main.temp + "°C";
      mainWeather.querySelector(".card-text:nth-child(2)").innerText =
        humidityIcon + " Humidity: " + currentWeather.main.humidity + "%";
      mainWeather.querySelector(".card-text:nth-child(3)").innerText =
        uvIcon + " Wind Speed: " + currentWeather.wind.speed + " m/s";
      renderCards(data);
    })
    .catch((error) => console.error("Error getting weather data: " + error));
}

function renderCards(data) {
  // Render the 5-day forecast in the "forecast" section
  for (var i = 0; i < 5; i++) {
    var forecastWeather = data.list[i * 8]; //api returns data every 3 hours, so we need to get every 8th item
    var forecastSection = document.getElementById(`weather-${i + 1}`); // div that contains the forecast for the day
    forecastSection.querySelector(".card-title").innerText = data.city.name;
    forecastSection.querySelector(".card-subtitle.mb-2").innerText =
      forecastWeather.dt_txt;
    forecastSection.querySelector(".card-text:nth-child(1)").innerText =
      tempIcon + " Temperature: " + forecastWeather.main.temp + "°C";
    forecastSection.querySelector(".card-text:nth-child(2)").innerText =
      humidityIcon + " Humidity: " + forecastWeather.main.humidity + "%";
    forecastSection.querySelector(".card-text:nth-child(3)").innerText =
      uvIcon + " Wind Speed: " + forecastWeather.wind.speed + " m/s";
  }
}

// function to handle search button click event
function searchButtonClick(event) {
  event.preventDefault();
  // get city name from input field
  var cityName = citySearch.value.trim();
  // check if city name is valid
  if (!cityName) return; // if city name is not valid, return nothing
  // if city name is valid, get weather data for city
  getWeather(cityName);
  // clear input field
  citySearch.value = "";
  // add city to search history
  searchHistory.push(cityName);
  // save search history to local storage
  localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
}

// add event listener to search button
searchButton.addEventListener("click", searchButtonClick);

//renderCityButtons
renderCityButtons();
