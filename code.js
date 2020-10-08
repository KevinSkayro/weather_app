const api = {
  key: "249e0914f0284c25bda121440200410",
  base: "http://api.weatherapi.com/v1",
};
//Selectors
const burgerMenu = document.querySelector(".burger_menu");
const userInput = document.querySelector(".user_input");
const searchBtn = document.querySelector(".search_btn");
const today = document.querySelector(".today");
const tomorrow = document.querySelector(".tomorrow");
const threeDays = document.querySelector(".three_days");
const actualTemp = document.querySelector(".actual_temp");
const feelsLikeTemp = document.querySelector(".feels_like_temp");
const weatherCondition = document.querySelector(".weather_state");
const wind = document.querySelector(".wind");
const windBar = document.querySelector(".bar_wind");
const rain = document.querySelector(".rain");
const rainBar = document.querySelector(".bar_rain");
const humidity = document.querySelector(".humidity");
const humidityBar = document.querySelector(".bar_humidity");
//Event listeners

searchBtn.addEventListener("click", getQuery);
//Functions
function getQuery(e) {
  e.preventDefault();
  updateSearch(userInput.value);
}

function updateSearch(query) {
  fetch(`${api.base}/current.json?key=${api.key}&q=${query}`)
    .then((weather) => {
      return weather.json();
    })
    .then(displayWeather);
}

function displayWeather(weather) {
  console.log(weather);
  actualTemp.innerHTML = `${weather.current.temp_f}<span>&deg;F</span>`;
  feelsLikeTemp.innerHTML = `Feels like ${weather.current.feelslike_f}<span>&deg;F</span>`;
  weatherCondition.innerHTML = `${weather.current.condition.text}`;
  wind.innerHTML = `${weather.current.wind_mph}`;
  windBar.style.width = wind.innerText + "px";
  rain.innerHTML = `${weather.current.precip_in}`;
  rainBar.style.width = wind.innerText + "px";
  humidity.innerHTML = `${weather.current.humidity}`;
  humidityBar.style.width = humidity.innerText + "px";
}
