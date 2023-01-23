// variables
var apiKey = "d8b2e3b11771f6cb21a582b88a348dd7";
var citySearch = document.getElementById("city-search");
var url = "https://api.openweathermap.org/data/2.5/forecast?q=";

// function to get weather data
function getWeather() {
  var city = citySearch.value;
  fetch(`${url}${city}&appid=${apiKey}&units=metric`)
    .then(response => response.json())
    .then(data => {
      // extract relevant data from response
      var cityName = data.city.name;
      var currentDate = new Date(data.list[0].dt * 1000).toDateString();
      var currentIcon = data.list[0].weather[0].icon;
      var currentTemp = data.list[0].main.temp;
      var currentHumidity = data.list[0].main.humidity;
      var currentWindSpeed = data.list[0].wind.speed;

      // dynamically build current weather section
      var currentWeather = `
        <div id="current-weather">
          <h2>Current Weather in ${cityName}</h2>
          <div class="date-time">
            <p>${currentDate}</p>
          </div>
          <div class="weather-conditions">
         <img src="http://openweathermap.org/img/wn/${currentIcon}@2x.png" id="current-weather-icon">
            <p>Temperature: ${currentTemp}&#8451;</p>
            <p>Humidity: ${currentHumidity}%</p>
            <p>Wind Speed: ${currentWindSpeed} m/s</p>
          </div>
        </div>
      `;
      // add current weather section to HTML
      document.querySelector("#current-weather-container").innerHTML = currentWeather;

      // build 5-day forecast section
      var forecastWeather = `<h2>5-Day Forecast</h2><ul class="forecast-five-day">`;
      for (var i = 0; i < data.list.length; i++) {
        var forecastDate = new Date(data.list[i].dt * 1000).toDateString();
        var forecastIcon = data.list[i].weather[0].icon;
        var forecastTemp = data.list[i].main.temp;
        var forecastHumidity = data.list[i].main.humidity;
        var forecastWindSpeed = data.list[i].wind.speed;
        forecastWeather += `
          <li>
            <p>${forecastDate}</p>
            <img src="http://openweathermap.org/img/wn/${forecastIcon}@2x.png" id="forecast-weather-icon">

            <p>Temperature: ${forecastTemp}&#8451;</p>
            <p>Humidity: ${forecastHumidity}%</p>
            <p>Wind Speed: ${forecastWindSpeed} m/s</p>
          </li>
        `;
      }
      forecastWeather += `</ul>`;
      // add 5-day forecast section to HTML
      document.querySelector("#forecast-container").innerHTML = forecastWeather;

      // add city to search history
      var searchHistory = localStorage.getItem("searchHistory") || "[]";
      searchHistory = JSON.parse(searchHistory);
      if (!searchHistory.includes(cityName)) {
        searchHistory.push(cityName);
        localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
      }
      // build search history section
      var searchHistoryHTML = `<h2>Search History</h2><div class="search-history">`;
      for (var i = 0; i < searchHistory.length; i++) {
        searchHistoryHTML += `
          <button class="searched-city-btn" onclick="getWeather('${searchHistory[i]}')">
            ${searchHistory[i]}
          </button>
        `;
      }
      searchHistoryHTML += `</div>`;
      // add search history section to HTML
      document.querySelector("#search-history-container").innerHTML = searchHistoryHTML;

    })
    .catch(error => {
      console.log(error);
      alert("City not found. Please try again.");
    });
}

// add event listener to search button
document.querySelector("#search-button").addEventListener("click", getWeather);