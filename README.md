# Weatherizer

## Description

Weatherizer is a the week-six assignment for UC Berkeley Coding Bootcamp. The Weatherizer weather dashboard that allows you to search for a city and get a 5-day weather forecast.  It will save your most recent search for easy access the next time you launch the app.  The Weatherizer uses the OpenWeather API to retrieve weather data.  It also uses `localStorage` to store persistent data.

<!-- <h2>GitHub Repository</h2><hr>
URL: <a href="https://github.com/coderchrisdean/weatherizer/">https://github.com/coderchrisdean/weatherizer/</a>
<h2>Link to Deployed Application</h2>
URL: <a href="https://coderchrisdean.github.io/weatherizer/">https://coderchrisdean.github.io/weatherizer/</a> -->

## Table of Contents
 * [Description](#description)
 * [Usage](#usage)
 * [License](#license)
 * [Screenshot](#screenshot)
 * [About](#about)
 * [GitHub Repository](#github-repository)
 * [Link to Deployed Application](#link-to-deployed-application)

## Usage

To view the weather forecast for a specific city, navigate to the deployed application and enter the name of the city in the search bar. The weather dashboard will display the current weather conditions and a 5-day forecast for the city. The city name will also be added to the search history. If you want to view the weather conditions for a previously searched city, simply click on the city name in the search history, and the dashboard will update to show the current weather and 5-day forecast for that city.

## License

None

## Screenshot

![Weatherizer Screenshot](./assets/images/weatherizer-screenshot.pngweatherizer-screenshot.png)

## About

This project was created by Christopher Dean.  I can be reached at coderchrisdean@gmail.com

## GitHub Repository

https://github.com/coderchrisdean/weatherized-nation

## Link to Deployed Application

https://coderchrisdean.github.io/weatherized-nation/


<!-- **Hint**: Using the 5 Day Weather Forecast API, you'll notice that you will need to pass in coordinates instead of just a city name. Using the OpenWeatherMap APIs, how could we retrieve geographical coordinates given a city name? -->

<!-- You will use `localStorage` to store any persistent data. For more information on how to work with the OpenWeather API, refer to the [Full-Stack Blog on how to use API keys](https://coding-boot-camp.github.io/full-stack/apis/how-to-use-api-keys). -->

## User Story

```
AS A traveler
I WANT to see the weather outlook for multiple cities
SO THAT I can plan a trip accordingly
```

## Acceptance Criteria

```
GIVEN a weather dashboard with form inputs
WHEN I search for a city
THEN I am presented with current and future conditions for that city and that city is added to the search history
WHEN I view current weather conditions for that city
THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the wind speed
WHEN I view future weather conditions for that city
THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
WHEN I click on a city in the search history
THEN I am again presented with current and future conditions for that city
```

![The weather app includes a search option, a list of cities, and a five-day forecast and current weather conditions for Atlanta.](./assets/06-server-side-apis-homework-demo.png)

## Grading Requirements

This Challenge is graded based on the following criteria: 
### Technical Acceptance Criteria: 40%

* Satisfies all of the above acceptance criteria plus the following:

    * Uses the OpenWeather API to retrieve weather data.

    * Uses `localStorage` to store persistent data.

### Deployment: 32%

* Application deployed at live URL.

* Application loads with no errors.

* Application GitHub URL submitted.

* GitHub repository that contains application code.

### Application Quality: 15%

* Application user experience is intuitive and easy to navigate.

* Application user interface style is clean and polished.

* Application resembles the mock-up functionality provided in the Challenge instructions.

### Repository Quality: 13%

* Repository has a unique name.

* Repository follows best practices for file structure and naming conventions.

* Repository follows best practices for class/id naming conventions, indentation, quality comments, etc.

* Repository contains multiple descriptive commit messages.

* Repository contains quality readme file with description, screenshot, and link to deployed application.
