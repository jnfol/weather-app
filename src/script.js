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
  celciusTemperature = response.data.main.temp;
}

function citySearch(city) {
  let apiKey = "ec9e75b17376fa49b77d7bbec7d4c57f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showWeather);
}

function handleSearch(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  citySearch(city);
}

function searchLocation(position) {
  let apiKey = "ec9e75b17376fa49b77d7bbec7d4c57f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function displayForecast() {
  let forecastElement = document.querySelector(".forecast");

  let forecastHTML = `<div class="row">`;
  let days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
    <div class="col">
      <p class="weekday">
        ${day} <br />
        <span class="forecast-image">🌧 </span>
        <br />
        <span class="weektemp-max">47° <span class="weektemp">|</span><span class="weektemp-min"> 22°</span>
      </p>
    </div>
`;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

let searchNow = document.querySelector("#city-search");
searchNow.addEventListener("submit", handleSearch);

let currentLocationButton = document.querySelector("#currentLocation");
currentLocationButton.addEventListener("click", getCurrentLocation);

function showFahrenheit(event) {
  event.preventDefault();
  celciusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celciusTemperature * 9) / 5 + 32;
  document.querySelector(".mainTemp").innerHTML = Math.round(
    fahrenheitTemperature
  );
}

function showCelcius(event) {
  event.preventDefault();
  fahrenheitLink.classList.remove("active");
  celciusLink.classList.add("active");
  document.querySelector(".mainTemp").innerHTML =
    Math.round(celciusTemperature);
}

let celciusTemperature = null;

let fahrenheitLink = document.querySelector("#F");
fahrenheitLink.addEventListener("click", showFahrenheit);

let celciusLink = document.querySelector("#C");
celciusLink.addEventListener("click", showCelcius);

citySearch("Denver");

displayForecast();
