// declare variables


var weatherWebsiteApi = "https://api.openweathermap.org/data/2.5/forecast";
var latQuery = "?lat=";
var lonQuery = "&lon=";




const city = document.querySelector.getElementById('search-text');



var latLon = function getLatLng(city) {
   
    const API_KEY = "{d8b2e3b11771f6cb21a582b88a348dd7}"; //lat long
    const weatherWebsiteApiLatLong = "https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid=" +API_KEY;
   
    fetch(weatherWebsiteApiLatLong + "?q=$" + city + "&limit=1&" + API_KEY)
      .then(response => response.json()) 
      .then(data => {
        // Get the latitude and longitude from the data
        var lat = data.lat;
        var lng = data.lng;
        var storeData = localStorage.setItem(lat, lng);

        // log to console
        // store on local storage
        storeData
        console.log("Latitude: "+lat+", Longitude: "+lng)
      });
  }

// write getWeatherData function
function getWeatherData(city) {
    const weatherApi = `https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}`;
    const API_KEY = "8700f3d575db3325626f3d7216e3bb38"; //getweather
  
    // fetch API to send a GET request to the API
    fetch(weatherWebsiteApi + "?q=$"+ city + "&"+API_KEY)
      .then(response => response.json()) // parse response as JSON
      .then(data => {
        
        var storeData = localStorage.setItem(data);
        // store on local storage
        storeData
        console.log(data);
      });
  }
  
// add event listener to listen for button clicks
document.addEventListener('click', console.log("Test:" + city))