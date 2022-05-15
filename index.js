function displayWeather(response) {
  console.log(response.data);
  let iconElement = document.querySelector("#icon");
  document.querySelector("#locationHeader").innerHTML = response.data.name;
  document.querySelector("#currentTemp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#windspeed").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/10d@2x.png`
  );
}
function searchCity(city) {
  let apiKey = "4de5d6165fffbb5d356ef70ff72b3431";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}
function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#searchInput").value;
  searchCity(city);
}
let citySearchEngine = document.querySelector("#searchEngine");
citySearchEngine.addEventListener("submit", handleSubmit);

searchCity("New York");

// Current Location
function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "4de5d6165fffbb5d356ef70ff72b3431";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentTemperature = document.querySelector("button");
currentTemperature.addEventListener("click", getCurrentLocation);

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

//function showCelsius(event) {
//  event.preventDefault();
//  let celsius = document.querySelector("#currentTemp");
//  celsius.innerHTML = 3;
//}
//let displayCelsius = document.querySelector("#celsius");
//displayCelsius.addEventListener("click", showCelsius);

//Change to Fahrenheit
//function showFahrenheit(event) {
//// event.preventDefault();
//let fahrenheit = document.querySelector("#currentTemp");
// fahrenheit.innerHTML = 37;
//}
//let displayFahrenheit = document.querySelector("#fahrenheit");
//displayFahrenheit.addEventListener("click", showFahrenheit);
