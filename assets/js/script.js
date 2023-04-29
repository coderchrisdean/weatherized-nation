

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

function renderPage() {
  let lastCity = searchHistory[searchHistory.length - 1];
  if (lastCity) {
    getWeather(lastCity);
  }
}
function renderCityButtons() {
  let cityButtonsContainer = document.getElementById("cityButtons"); // query selector for city buttons container
  let searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || []; // get cities from local storage or set to empty array
  let startIndex = Math.max(searchHistory.length - 10, 0); // get the start index for rendering buttons

  // iterate over city list and create buttons for each city, starting from the startIndex
  for (let i = startIndex; i < searchHistory.length; i++) {
    let newCityButton = document.createElement("button");
    // set button id and class
    newCityButton.id = `city-button-${i}`;
    newCityButton.classList.add("btn", "btn-secondary", "w-100");
    // set button text and placeholder
    newCityButton.innerText = searchHistory[i];
    newCityButton.placeholder = searchHistory[i];
    // append button to city buttons container
    cityButtonsContainer.appendChild(newCityButton);
  }
}


// function to get weather data and store in local storage
function getWeather(cityName) {
  const apiKey = "9b3091bef0cfab7117aa718a68431472";
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then((response) => response.json())
    .then(({ city, list }) => {
      const weatherData = []; // create an empty array to store weather data

      for (let i = 0; i < list.length; i+= 8) {
       
        const weather = list[i];
        const date = unixToDate(weather.dt);
        const dayOfWeek = getDayOfWeek(weather.dt);
        const temp = weather.main.temp;
        const humidity = weather.main.humidity;
        const speed = weather.wind.speed;
        const mainWeather = document.getElementById("main-weather");
        const mainWeatherHTML = `
          <br>
          <div class="container text-center">
          <h2 class="card-title"><div class="container text-center">${city.name}</div>
          <h4 class="card-subtitle mb-2">${dayOfWeek}</h4>
          <h4 class="card-subtitle mb-2">${date}</h4>
          <p class="card-text">${tempIcon} Temperature: ${temp}°C</p>
          <p class="card-text">${humidityIcon} Humidity: ${humidity}%</p>
          <p class="card-text">${windIcon} Wind Speed: ${speed} m/s</p>
          </div>
          </div>`;
        mainWeather.innerHTML = mainWeatherHTML;
        const weatherObject = {
          city: city.name,
          day: dayOfWeek,
          date: date,
          temp: temp,
          humidity: humidity,
          speed: speed,
          html: mainWeatherHTML,
        };
        
        weatherData.push(weatherObject); // add the weather object to the array
      }

      renderCards(weatherData);
    })
    .catch((error) => console.error(`Error getting weather data: ${error}`));
}

function renderCards(data) {
  // create an array to store weather data for each day
  var newDataObject = [];
  // iterate through the data.list array and populate the new array
  for (let i = 0; i < data.length; i++) {
    var dayData = data.list[i]; //api returns data every 3 hours, so we need to get every 8th item
    let date = unixToDate(dayData.dt);
    let day = getDayOfWeek(dayData.dt);
    let temp = dayData.main.temp; //get temperature
    let humidity = dayData.main.humidity; //get humidity
    let speed = dayData.wind.speed; //get wind speed

    newDataObject.push({
      city: data.city.name, //city name
      date, //date in MM/DD using helper file
      day,
      temp,
      humidity,
      speed,
      html: `
      <div class="col-2">
        <div class="card">
          <div class="card-body" id="weather-${i+1}"></div>
          <div class="card-title">${day}</div>
          <div class="card-subtitle mb-2">${date}</div>
          <div class="card-text">${tempIcon} Temperature: ${temp}°C</div>
          <div class="card-text">${humidityIcon} Humidity: ${humidity}%</div>
          <div class="card-text">${windIcon} Wind Speed: ${speed} m/s</div>
        </div>
      </div>`, // html to render
    });
    console.log(newDataObject);
    var forecastCards = document.getElementById(`weather-${i + 1}`); // div that contains the forecast for the day
    forecastCards.innerHTML = newDataObject[i].html; // render html
    console.log(forecastCards);
    //set local storage
    localStorage.setItem("forecast", JSON.stringify(newDataObject.map(({ city, date, day, temp, humidity, speed, html }) => ({ city, date, day, temp, humidity, speed, html }))));
  }
}

function unixToDate(unix) {
  const date = new Date(unix * 1000);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${month}/${day}/${year}`;
}

function getDayOfWeek(unixTime) {
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const date = new Date(unixTime * 1000);
  return days[date.getDay()];
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
searchButton.addEventListener("click", function () {
  var cityName = citySearch.value.trim(); // get city name from input field
  // check if city name is valid
  if (!cityName) {
  alert("Please enter a valid city name"); // if city name is not valid, return nothing
  return; // if city name is valid,
  }
  getWeather(cityName);
  // clear input field
  citySearch.value = "";
  // add city to search history
  searchHistory.push(cityName);
  // save search history to local storage
  localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
});

