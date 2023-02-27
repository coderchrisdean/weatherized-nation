//icons
var tempIcon = "🌡️";
var humidityIcon = "💧";
var windIcon = "💨";
var uvIcon = "☀️";

// global variables
var searchButton = document.getElementById("search"); // search button
var searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || []; // add city to search history
var citySearch = document.querySelector("#city"); // get city from input field

// call function to render city buttons
renderCityButtons();

// add event listener to search button
searchButton.addEventListener("click", function () {
  var cityName = citySearch.value.trim(); // get city name from input field
  // check if city name is valid
  if (!cityName) return; // if city name is not valid, return nothing
  getWeather(cityName);
  // clear input field
  citySearch.value = "";
  // add city to search history
  searchHistory.push(cityName);
  // save search history to local storage
  localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
});

function renderCityButtons() {
  let cityButtonsContainer = document.getElementById("cityButtons"); // query selector for city buttons container
  let cityList = JSON.parse(localStorage.getItem("cities")) || []; // get cities from local storage or set to empty array
  // iterate over city list and create buttons for each city
  for (var i = 0; i < cityList.length; i++) {
    let newCityButton = document.createElement("button");
    // set button id and class
    newCityButton.id = `city-button-${i}`;
    newCityButton.classList.add("btn", "btn-secondary", "w-100");
    // set button text and placeholder
    newCityButton.innerText = cityList[i];
    newCityButton.placeholder = cityList[i];
    // append button to city buttons container
    cityButtonsContainer.appendChild(newCityButton);
  }
}



// function to get weather data and store in local storage
function getWeather(cityName) {
  //variables for weather
  const apiKey = "9b3091bef0cfab7117aa718a68431472"; // updated 02/26/23
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=metric`; // url to get weather data
  fetch(url)
    .then((response) => response.json())
    .then(({ city, list }) => {

      console.log(`Weather data for ${cityName} has been stored in local storage.`);
      // Render the current weather in the "main-weather" section
      var currentWeather = list[0]; // get current weather data
      var currentWeatherObject = {
        city: city.name,
        date: currentWeather.dt_txt,
        temp: currentWeather.main.temp,
        humidity: currentWeather.main.humidity,
        speed: currentWeather.wind.speed,
      };
      console.log(currentWeatherObject);
      const mainWeather = document.getElementById("main-weather");
      const mainWeatherHtml = `
        <div class="card-title">${city.name}</div>
        <div class="card-subtitle mb-2"></div>
        <div class="card-text">${tempIcon} Temperature: ${temp}°C</div>
        <div class="card-text">${humidityIcon} Humidity: ${humidity}%</div>
        <div class="card-text">${uvIcon} Wind Speed: ${speed} m/s</div>
      `;
      mainWeather.innerHTML = mainWeatherHtml;
      renderCards({ city, list }); // pass data to renderCards function
    })
    .catch((error) => console.error(`Error getting weather data: ${error}`));
}


function renderCards(data) {
  // create an array to store weather data for each day
var newDataObject = [];
// iterate through the data.list array and populate the new array
for (var i = 0; i < 5; i++) {
  var dayData = data.list[i * 8]; //api returns data every 3 hours, so we need to get every 8th item
  //convert unix time to date
  var unix = require("./helper/unixToMMDD.js");
  var date = unix.unixToMMDD(dayData.dt);
  var day = unix.getDayOfWeek(dayData.dt);

  newDataObject.push({
    c: [data.city.name, `<div class="card-title">${this.c}</div>`], //city name
    date: [date, `<div class="card-subtitle mb-2">${this.date}</div>`], //date in MM/DD using helper file
    day: [day, `<div class="card-subtitle mb-2">${this.day}</div>`], //day of the week using helper file
    t: [dayData.main.temp,`<div class="card-text:nth-child(1)">${tempIcon} Temperature: ${this.t}°C</div>`],
    h: [dayData.main.humidity,`<div class="card-text:nth-child(2)">${humidityIcon} Humidity: ${this.h}%</div>`],
    w: [dayData.wind.speed,`<div class="card-text:nth-child(3)">${uvIcon} Wind Speed: ${this.w} m/s</div>`],
  });
  //set local storage
  return newDataObject;
}
console.log(newDataObject);

  // Render the 5-day forecast in the "forecast" section
  
  for (var i = 0; i < 5; i++) {
    var forecastSection = document.getElementById(`weather-${i + 1}`); // div that contains the forecast for the day
    var forecastHtml = `${newDataObject[i].date[1]}${newDataObject[i].day[1]}${newDataObject[i].t[1]}${newDataObject[i].h[1]}${newDataObject[i].w[1]}`; // html to render
    forecastSection.innerHTML = forecastHtml; // render html
    console.log(forecastHtml) //check work
    //set local Storage
    localStorage.setItem('forecast', JSON.stringify(forecastHtml));
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

//renderCityButtons
renderCityButtons();
