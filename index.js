//Current date
let now = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let h3 = document.querySelector("#date");
h3.innerHTML = `${day} ${hour}:${minutes}`;

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  //let days = ["Thu", "Fri", "Sat", "Sun"];

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
              <div class="col-4">
                <div class="weather-forecast-date"><em>${formatDay(
                  forecastDay.dt
                )}</em></div>
              </div>
              <div class="col-4"><span> <img src="http://openweathermap.org/img/wn/${
                forecastDay.weather[0].icon
              }@2x.png" width="42"/></span></div>
              <div class="col-4 weather-forecast-temperature">
                <span class="max-temp">${Math.round(
                  forecastDay.temp.max
                )}°</span>/<span class="min-temp"
                  >${Math.round(forecastDay.temp.min)}°</span>
              </div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForcast(coordinates) {
  let apiKey = "4de5d6165fffbb5d356ef70ff72b3431";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;

  axios.get(apiUrl).then(displayForecast);
}

function displayWeather(response) {
  let iconElement = document.querySelector("#icon");

  console.log(response.data.wind);

  celsiusTemperature = response.data.main.temp;

  document.querySelector("#locationHeader").innerHTML = response.data.name;
  document.querySelector("#currentTemp").innerHTML =
    Math.round(celsiusTemperature);
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;

  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  document.querySelector("#temp-max").innerHTML = Math.round(
    response.data.main.temp_max
  );
  document.querySelector("#temp-min").innerHTML = Math.round(
    response.data.main.temp_min
  );

  getForcast(response.data.coord);
}
function searchCity(city) {
  let apiKey = "4de5d6165fffbb5d356ef70ff72b3431";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayWeather);
}
function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#searchInput").value;
  searchCity(city);
}
let citySearchEngine = document.querySelector("#searchEngine");
citySearchEngine.addEventListener("submit", handleSubmit);

// Current Location
function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "4de5d6165fffbb5d356ef70ff72b3431";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentTemperature = document.querySelector("button");
currentTemperature.addEventListener("click", getCurrentLocation);

//Change to Fahrenheit

searchCity("New York");
