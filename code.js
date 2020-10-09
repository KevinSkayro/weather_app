const api = {
  key: "249e0914f0284c25bda121440200410",
  base: "http://api.weatherapi.com/v1",
};
//Selectors
let date = document.querySelector(".date");
let time = document.querySelector(".time");
const burgerMenu = document.querySelector(".burger_menu");
const userInput = document.querySelector(".user_input");
const searchBtn = document.querySelector(".search_btn");
const selectDay = document.querySelectorAll(".option");
const today = document.querySelector(".today");
const tomorrow = document.querySelector(".tomorrow");
const threeDays = document.querySelector(".three_days");
const maxNminTemp = document.querySelector(".highLow");
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
today.addEventListener("click", openToday);
tomorrow.addEventListener("click", openTomorrow);
threeDays.addEventListener("click", openThreeDays);
//Functions
function getQuery(e) {
  e.preventDefault();
  updateSearch(userInput.value);
}

function updateSearch(query) {
  fetch(`${api.base}/forecast.json?key=${api.key}&q=${query}&days=3`)
    .then((weather) => {
      return weather.json();
    })
    .then(displayWeather)
    .catch(() => {
      date.innerText = "";
      time.innerText = "";
      maxNminTemp.innerHTML = "";
      actualTemp.innerHTML = "Not Found";
      feelsLikeTemp.innerHTML = "Try again with a different input";
      weatherCondition.innerHTML = "";
      wind.innerHTML = "0";
      rain.innerHTML = "0";
      humidity.innerHTML = "0";
      windBar.style.width = wind.innerText + "px";
      rainBar.style.width = wind.innerText + "px";
      humidityBar.style.width = humidity.innerText + "px";
    });
}

function displayWeather(weather) {
  console.log(weather);
  maxNminTemp.innerHTML = `Day ${Math.round(
    weather.forecast.forecastday[0].day.maxtemp_f
  )}<span>&deg;F</span>/Night ${Math.round(
    weather.forecast.forecastday[0].day.mintemp_f
  )}<span>&deg;F</span>`;
  userInput.value = `${weather.location.name}, ${weather.location.region}`;
  actualTemp.innerHTML = `${Math.round(
    weather.current.temp_f
  )}<span>&deg;F</span>`;
  feelsLikeTemp.innerHTML = `Feels like ${Math.round(
    weather.current.feelslike_f
  )}<span>&deg;F</span>`;
  weatherCondition.innerHTML = `${weather.current.condition.text}`;
  wind.innerHTML = `${Math.round(weather.current.wind_mph)}`;
  windBar.style.width = wind.innerText + "px";
  rain.innerHTML = `${Math.round(weather.current.precip_in)}`;
  rainBar.style.width = wind.innerText + "px";
  humidity.innerHTML = `${Math.round(weather.current.humidity)}`;
  humidityBar.style.width = humidity.innerText + "px";

  let now = new Date();

  date.innerText = dateBuilder(now);
  if (now.getMinutes() <= 9) {
    time.innerText = ` ${now.getHours()}:0${now.getMinutes()}`;
  } else {
    time.innerText = ` ${now.getHours()}:${now.getMinutes()}`;
  }
}

function dateBuilder(dt) {
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
    "Dicember",
  ];
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[dt.getDay()];
  let date = dt.getDate();
  let month = months[dt.getMonth()];
  let year = dt.getFullYear();

  return `${month} ${day} ${date} ${year},`;
}
function daySelection() {
  for (let i = 0; i < selectDay.length; i++) {
    if (selectDay[i].classList.contains("active")) {
      selectDay[i].classList.remove("active");
    }
  }
}
function openToday() {
  daySelection();
  today.classList.add("active");
}
function openTomorrow() {
  daySelection();
  tomorrow.classList.add("active");
}
function openThreeDays() {
  daySelection();
  threeDays.classList.add("active");
}
