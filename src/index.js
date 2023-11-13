function refreshWeather(response) {
  let temperatureElement = document.querySelector("#current-temperature");
  let currentTemperature = response.data.temperature.current;
  let cityElement = document.querySelector("#current-city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind-speed");
  let currentTimeElement = document.querySelector("#current-time");
  let date = new Date(response.data.time * 1000);
  let iconElement = document.querySelector("#icon");

  temperatureElement.innerHTML = `${Math.round(currentTemperature)}°C`;
  cityElement.innerHTML = response.data.city;
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windSpeedElement.innerHTML = `${response.data.wind.speed}km/h`;
  currentTimeElement.innerHTML = formatDate(date);
  iconElement.innerHTML = `<img
      src="${response.data.condition.icon_url}"
      class="current-icon"
    />`;
}

function formatDate(date) {
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let weekDay = weekDays[date.getDay()];
  let month = months[date.getMonth()];
  let day = date.getDate();
  let year = date.getFullYear();
  return `${weekDay}, ${day} ${month} ${year} | ${hours}:${minutes}`;
}

function searchCity(city) {
  let apiKey = "aof4801f27bc8e543a47a5fc535tf9b8";
  let apiURL = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiURL).then(refreshWeather);
}

function handleSearchInput(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");
  searchCity(searchInput.value);
}

function displayForecast() {
  let days = ["Tue", "Wed", "Thu", "Fri", "Sat"];
  let forecastHtml = "";

  days.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      `
        <div class="weather-forecast-day">
              <div class="week-day">${day}</div>
              <div class="weather-forecast-icon">
                <img
                  src="https://shecodes-assets.s3.amazonaws.com/api/weather/icons/rain-night.png"
                  class="forecast-icon"
                />
              </div>
              <div class="weather-forecast-temperature">
                <span class="weather-forecast-temperature-max">20°</span>
                <span class="weather-forecast-temperature-min">10°</span>
              </div>
            </div>
  `;
  });
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchInput);

searchCity("Guimarães");
displayForecast();
