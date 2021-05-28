let now = new Date();
let formattedDate = document.querySelector("#current-date");
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let day = days[now.getDay()];
let month = months[now.getMonth()];
let currentDate = now.getDate();

formattedDate.innerHTML = `${day}, ${month} ${currentDate}`;

let formattedTime = document.querySelector("#current-time");
let hour = now.getHours();
let mins = now.getMinutes();
if (mins < 10) {
  mins = `0${mins}`;
}

formattedTime.innerHTML = `${hour}:${mins}`;

function formatForecastDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Fri", "Sat", "Sun"];

  return days[day];
}

function getForecast(coordinates) {
  let apiKey = "ec9e75b17376fa49b77d7bbec7d4c57f";
  let apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
  axios.get(apiURL).then(displayForecast);
}

function showWeather(response) {
  console.log(response);
  document.querySelector(".city").innerHTML = response.data.name;
  document.querySelector(".mainTemp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#weather-description").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document
    .querySelector("#icon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  document
    .querySelector("#icon")
    .setAttribute("alt", response.data.weather[0].description);
  fahrenheitTemperature = response.data.main.temp;

  getForecast(response.data.coord);
}

function citySearch(city) {
  let apiKey = "ec9e75b17376fa49b77d7bbec7d4c57f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(showWeather);
}

function handleSearch(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  citySearch(city);
}

function searchLocation(position) {
  let apiKey = "ec9e75b17376fa49b77d7bbec7d4c57f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(showWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector(".forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
    <div class="col">
      <p class="weekday">
        ${formatForecastDay(forecastDay.dt)} <br />
        <img src=  "http://openweathermap.org/img/wn/${
          forecastDay.weather[0].icon
        }@2x.png"
        alt = ""
        width = 50px;
        </img>
        <br />
        <span class="weektemp-max">${Math.round(
          forecastDay.temp.max
        )}° <span class="weektemp">|</span><span class="weektemp-min"> ${Math.round(
          forecastDay.temp.min
        )}°</span>
      </p>
    </div>
`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function showCelcius(event) {
  event.preventDefault();
  fahrenheitLink.classList.remove("active");
  celciusLink.classList.add("active");
  let celciusTemperature = (fahrenheitTemperature - 32) * 0.5555555556;
  document.querySelector(".mainTemp").innerHTML =
    Math.round(celciusTemperature);
}

function showFahrenheit(event) {
  event.preventDefault();
  celciusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  document.querySelector(".mainTemp").innerHTML = Math.round(
    fahrenheitTemperature
  );
}

let fahrenheitTemperature = null;

let celciusLink = document.querySelector("#C");
celciusLink.addEventListener("click", showCelcius);

let fahrenheitLink = document.querySelector("#F");
fahrenheitLink.addEventListener("click", showFahrenheit);

let searchNow = document.querySelector("#city-search");
searchNow.addEventListener("submit", handleSearch);

let currentLocationButton = document.querySelector("#currentLocation");
currentLocationButton.addEventListener("click", getCurrentLocation);

citySearch("Denver");
