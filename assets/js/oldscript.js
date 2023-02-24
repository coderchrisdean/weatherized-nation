// declare variables

//  api_key:  bd0386f2c4d5d21c6568628bb9a748f7
//  url: https://openweathermap.org/forecast5

//    <<< Weather Information >>>
//       Fetch from API to retrieve information
//         City
//         Date & Time
//         Icon/Emoji for Weather Visual
//         Temp
//         Humidity
//         Wind Speed
//      5-Day Forecast
//         Date
//         Icon
//         Temperature
//         Wind Speed
//         Humidity
//      Recent Search History
//          Include City Name in Buttons

//--------------- variables ---------------
// variables
var apiKey = "d8b2e3b11771f6cb21a582b88a348dd7";
var cityToSearch = "Waterloo";
var inputField = document.getElementById('search');
var recentCities;
var locationCoords;

// Initializes page
var initializePage = function () {
if (localStorage.getItem('recentSearches') == null) {
recentCities = [];
localStorage.setItem('recentSearches', JSON.stringify(recentCities));
}
displayRecentSearches();

for (let i = 1; i < 6; i++) {
    let recentCityButton = document.getElementById('pop-' + i);
    recentCityButton.addEventListener('click', function () {
        cityToSearch = recentCityButton.innerText;
        console.log(cityToSearch);
        getWeather();
    })
}

document.getElementById('submit-city').addEventListener('click', function () {
    cityToSearch = inputField.value;
    console.log(cityToSearch);
    getWeather();
    addCityToRecent(cityToSearch);
    displayRecentSearches();
})

inputField.addEventListener("keydown", function () {
    if (event.key === 'Enter') {
        cityToSearch = inputField.value;
        console.log(cityToSearch);
        getWeather();
        addCityToRecent(cityToSearch);
        displayRecentSearches();
    }
});

getWeather();
}

function getWeather(calllback) {
// Fetch request for CURRENT WEATHER
fetch('https://api.openweathermap.org/data/2.5/weather?q=' + cityToSearch + '&appid=569731c1a4f5965656b996cf8ec76ae7&units=metric')
.then(function (response) {
return response.json();
})
.then(function (data) {
// Fetch UV index
fetch('https://api.openweathermap.org/data/2.5/uvi?lat=' + data.coord.lat + '&lon=' + data.coord.lon + '&appid=569731c1a4f5965656b996cf8ec76ae7')
.then(function (response) {
return response.json();
})
.then(function (uvdata) {
let currentUV = document.getElementById('current-uv');
currentUV.innerText = uvdata.value;
if (uvdata.value <= 3) {
currentUV.style.backgroundColor = "lightgreen";
} else if (uvdata.value <= 6) {
currentUV.style.backgroundColor = "orange";
} else {
currentUV.style.backgroundColor = "red";
}
return;
})
.catch(function (error) {
console.log('Request failed', error)
});
let today = new Date();
let date = (today.getMonth() + 1) + '-' + today.getDate() + '-' + today.getFullYear();
let weather = data.weather[0].description;
document.getElementById('city-name').innerText = data.