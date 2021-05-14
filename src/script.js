//Current date//

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
let hour = now.getHours();
let mins = now.getMinutes();
if (mins < 10) {
  mins = `0${mins}`;
}

formattedDate.innerHTML = `${day}, ${month} ${currentDate}   ${hour}:${mins}`;

//Search City//

function showTemperature(response) {
  console.log(response);

  let temperature = Math.round(response.data.main.temp);
  console.log(temperature);
  let temperatureElement = document.querySelector(".mainTemp");
  temperatureElement.innerHTML = `${temperature}`;
  let descriptionElement = document.querySelector("#weather-description");
  descriptionElement.innerHTML = response.data.weather[0].description;
  let humidity = response.data.main.humidity;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = `Humidity: ${humidity}%`;
  let wind = response.data.wind.speed;
  wind = Math.round(wind);
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = `Wind Speed: ${wind}mph`;
}

function citySearch(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  let currentCity = document.querySelector(".city");
  cityInput = cityInput.value;
  let apiKey = "ec9e75b17376fa49b77d7bbec7d4c57f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&units=metric&appid=${apiKey}`;
  currentCity.innerHTML = cityInput;
  axios.get(`${apiUrl}`).then(showTemperature);
}

function searchLocation(position) {
  let apiKey = "ec9e75b17376fa49b77d7bbec7d4c57f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=${apiKey}`;
  console.log(apiUrl);
  axios.get(`${apiUrl}`).then(showTemperature);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let searchNow = document.querySelector("#city-search");
searchNow.addEventListener("submit", citySearch);

let currentLocationButton = document.querySelector("#currentLocation");
currentLocationButton.addEventListener("click", getCurrentLocation);
