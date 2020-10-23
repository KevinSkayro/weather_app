const api = {
  key: "249e0914f0284c25bda121440200410",
  base: "http://api.weatherapi.com/v1",
};
//Selectors topbar
const sectionOne = document.querySelector(".section_one");
const sectionTwo = document.querySelector(".section_two");
const sectionThree = document.querySelector(".section_three");
const mainCanvas = document.querySelectorAll(".main");
const burgerMenu = document.querySelector(".burger_menu");
const userInput = document.querySelector(".user_input");
const searchBtn = document.querySelector(".search_btn");
const selectDay = document.querySelectorAll(".option");
const today = document.querySelector(".today");
const tomorrow = document.querySelector(".tomorrow");
const threeDays = document.querySelector(".three_days");

//Selectors option one
let date = document.querySelector(".date");
let time = document.querySelector(".time");
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

//Selectors option two
let dateTwo = document.querySelector(".date2");
const maxNminTempTwo = document.querySelector(".highLowTwo");
const averageTempTwo = document.querySelector(".average_temp");
const weatherConditionTwo = document.querySelector(".weather_state_two");
const windTwo = document.querySelector(".wind_two");
const windBarTwo = document.querySelector(".bar_wind_two");
const rainTwo = document.querySelector(".rain_two");
const rainBarTwo = document.querySelector(".bar_rain_two");
const humidityTwo = document.querySelector(".humidity_two");
const humidityBarTwo = document.querySelector(".bar_humidity_two");

//Selectors option three
const sec1Day1 = document.querySelector(".sec1_day1");
const sec2Day1 = document.querySelector(".sec2_day1");
const sec3Day1 = document.querySelector(".sec3_day1");
const sec1Day2 = document.querySelector(".sec1_day2");
const sec2Day2 = document.querySelector(".sec2_day2");
const sec3Day2 = document.querySelector(".sec3_day2");
const sec1Day3 = document.querySelector(".sec1_day3");
const sec2Day3 = document.querySelector(".sec2_day3");
const sec3Day3 = document.querySelector(".sec3_day3");
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
(function getIp() {
  const successCallback = (position) => {
    updateSearch(`${position.coords.latitude}, ${position.coords.longitude}`);
  };
  const errorCallback = (error) => {
    console.error(error);
    feelsLikeTemp.innerHTML = "User denied location";
  };
  navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
})();
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
  //section one
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
  weatherCondition.innerHTML = `${weather.current.condition.text} <img src="${weather.forecast.forecastday[0].day.condition.icon}" />`;
  wind.innerHTML = `${Math.round(weather.current.wind_mph)}`;
  windBar.style.width = wind.innerText + "px";
  rain.innerHTML = `${Math.round(
    weather.forecast.forecastday[0].day.daily_chance_of_rain
  )}`;
  rainBar.style.width = rain.innerText + "px";
  humidity.innerHTML = `${Math.round(weather.current.humidity)}`;
  humidityBar.style.width = humidity.innerText + "px";

  let now = new Date();

  date.innerText = dateBuilder(now);

  if (now.getMinutes() <= 9) {
    time.innerText = ` ${now.getHours()}:0${now.getMinutes()}`;
  } else {
    time.innerText = ` ${now.getHours()}:${now.getMinutes()}`;
  }

  //section two "tomorrow"
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
    "Sunday",
    "Monday",
  ];

  let date2 = weather.forecast.forecastday[1].date;
  let tomorrow = date2.split("-");

  let day = days[now.getDay() + 1];
  let datet = tomorrow[2];
  let month = months[tomorrow[1] - 1];
  let year = tomorrow[0];
  dateTwo.innerText = `${month} ${day} ${datet} ${year}`;
  maxNminTempTwo.innerHTML = `Day ${Math.round(
    weather.forecast.forecastday[1].day.maxtemp_f
  )}<span>&deg;F</span>/Night ${Math.round(
    weather.forecast.forecastday[1].day.mintemp_f
  )}<span>&deg;F</span>`;
  averageTempTwo.innerHTML = `${Math.round(
    weather.forecast.forecastday[1].day.avgtemp_f
  )}<span>&deg;F</span>`;
  weatherConditionTwo.innerHTML = `${weather.forecast.forecastday[1].day.condition.text}<img src="${weather.forecast.forecastday[1].day.condition.icon}" />`;
  windTwo.innerHTML = `${Math.round(
    weather.forecast.forecastday[1].day.maxwind_mph
  )}`;
  windBarTwo.style.width = windTwo.innerText + "px";
  rainTwo.innerHTML = `${Math.round(
    weather.forecast.forecastday[1].day.daily_chance_of_rain
  )}`;
  rainBarTwo.style.width = rainTwo.innerText + "px";
  humidityTwo.innerHTML = `${Math.round(
    weather.forecast.forecastday[1].day.avghumidity
  )}`;
  humidityBarTwo.style.width = humidityTwo.innerText + "px";

  //section 3
  sec1Day1.innerHTML = `<span>Today</span> <span>${weather.current.condition.text} </span>`;
  sec3Day1.innerHTML = `<img src="${
    weather.forecast.forecastday[0].day.condition.icon
  }" /><div><span>${Math.round(
    weather.forecast.forecastday[0].day.maxtemp_f
  )}&deg;</span><span>${Math.round(
    weather.forecast.forecastday[0].day.mintemp_f
  )}&deg;</span></div>`;

  sec1Day2.innerHTML = `<span>${day} ${month} ${datet}</span> <span>${weather.current.condition.text} </span>`;
  sec3Day2.innerHTML = `<img src="${
    weather.forecast.forecastday[1].day.condition.icon
  }" /><div><span>${Math.round(
    weather.forecast.forecastday[1].day.maxtemp_f
  )}&deg;</span><span>${Math.round(
    weather.forecast.forecastday[1].day.mintemp_f
  )}&deg;</span></div>`;

  let date3 = weather.forecast.forecastday[2].date;
  let thridday = date3.split("-");

  let day3 = days[now.getDay() + 2];
  console.log(day);
  let datethird = thridday[2];
  let month3 = months[thridday[1] - 1];

  sec1Day3.innerHTML = `<span>${day3} ${month3} ${datethird}</span> <span>${weather.current.condition.text} </span>`;
  sec3Day3.innerHTML = `<img src="${
    weather.forecast.forecastday[2].day.condition.icon
  }" /><div><span>${Math.round(
    weather.forecast.forecastday[2].day.maxtemp_f
  )}&deg;</span><span>${Math.round(
    weather.forecast.forecastday[2].day.mintemp_f
  )}&deg;</span></div>`;

  //background change
  const codeOne = weather.current.condition.code;
  const codeTwo = weather.forecast.forecastday[1].day.condition.code;

  switch (codeOne) {
    case 1000:
      sectionOne.style.background =
        "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('IMG/sunny.jpg') no-repeat fixed center";
      break;
    case 1006:
      sectionOne.style.background =
        "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('IMG/cloud.jpg') no-repeat fixed center";
      break;
    case 1009:
      sectionOne.style.background =
        "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('IMG/overcast.jpg') no-repeat fixed center";
      break;
    case 1030:
      sectionOne.style.background =
        "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('IMG/mist.jpg') no-repeat fixed center";
      break;
    case 1063:
      sectionOne.style.background =
        "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('IMG/patchy_rain.jpg') no-repeat fixed center";
      break;
    case 1066:
      sectionOne.style.background =
        "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('IMG/snow.jpg') no-repeat fixed center";
      break;
    case 1069:
      sectionOne.style.background =
        "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('IMG/snow.jpg') no-repeat fixed center";
      break;
    case 1087:
      sectionOne.style.background =
        "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('IMG/thunder.jpg') no-repeat fixed center";
      break;
    case 1114:
      sectionOne.style.background =
        "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('IMG/blowing_snow.jpg') no-repeat fixed center";
      break;
    case 1117:
      sectionOne.style.background =
        "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('IMG/blizzard.jpg') no-repeat fixed center";
      break;
    case 1035:
      sectionOne.style.background =
        "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('IMG/mist.jpg') no-repeat fixed center";
      break;
    case 1147:
      sectionOne.style.background =
        "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('IMG/mist.jpg') no-repeat fixed center";
      break;
    case 1150:
      sectionOne.style.background =
        "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('IMG/patchy_rain.jpg') no-repeat fixed center";
      break;
    case 1153:
      sectionOne.style.background =
        "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('IMG/patchy_rain.jpg') no-repeat fixed center";
      break;
    case 1168:
      sectionOne.style.background =
        "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('IMG/rain.jpg') no-repeat fixed center";
      break;
    case 1171:
      sectionOne.style.background =
        "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('IMG/rain.jpg') no-repeat fixed center";
      break;
    case 1180:
      sectionOne.style.background =
        "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('IMG/patchy_rain.jpg') no-repeat fixed center";
      break;
    case 1183:
      sectionOne.style.background =
        "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('IMG/patchy_rain.jpg') no-repeat fixed center";
      break;
    case 1086:
      sectionOne.style.background =
        "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('IMG/heavy_rain.jpg') no-repeat fixed center";
      break;
    case 1189:
      sectionOne.style.background =
        "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('IMG/heavy_rain.jpg') no-repeat fixed center";
      break;
    case 1192:
      sectionOne.style.background =
        "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('IMG/heavy_rain.jpg') no-repeat fixed center";
      break;
    case 1195:
      sectionOne.style.background =
        "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('IMG/heavy_rain.jpg') no-repeat fixed center";
      break;
    case 1198:
      sectionOne.style.background =
        "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('IMG/patchy_rain.jpg') no-repeat fixed center";
      break;
    case 1201:
      sectionOne.style.background =
        "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('IMG/heavy_rain.jpg') no-repeat fixed center";
      break;
    case 1204:
      sectionOne.style.background =
        "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('IMG/patchy_rain.jpg') no-repeat fixed center";
      break;
    case 1207:
      sectionOne.style.background =
        "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('IMG/rain.jpg') no-repeat fixed center";
      break;
    case 1210:
      sectionOne.style.background =
        "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('IMG/patchy_snow.jpg') no-repeat fixed center";
      break;
    case 1213:
      sectionOne.style.background =
        "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('IMG/patchy_snow.jpg') no-repeat fixed center";
      break;
    case 1216:
      sectionOne.style.background =
        "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('IMG/patchy_snow.jpg') no-repeat fixed center";
      break;
    case 1219:
      sectionOne.style.background =
        "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('IMG/snow2.jpg') no-repeat fixed center";
      break;
    case 1222:
      sectionOne.style.background =
        "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('IMG/patchy_snow.jpg') no-repeat fixed center";
      break;
    case 1225:
      sectionOne.style.background =
        "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('IMG/blowing_snow.jpg') no-repeat fixed center";
      break;
    case 1237:
      sectionOne.style.background =
        "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('IMG/snow.jpg') no-repeat fixed center";
      break;
    case 1240:
      sectionOne.style.background =
        "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('IMG/patchy_rain.jpg') no-repeat fixed center";
      break;
    case 1243:
      sectionOne.style.background =
        "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('IMG/patchy_rain.jpg') no-repeat fixed center";
      break;
    case 1246:
      sectionOne.style.background =
        "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('IMG/heavy_rain.jpg') no-repeat fixed center";
      break;
    case 1249:
      sectionOne.style.background =
        "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('IMG/patchy_rain.jpg') no-repeat fixed center";
      break;
    case 1252:
      sectionOne.style.background =
        "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('IMG/rain.jpg') no-repeat fixed center";
      break;
    case 1255:
      sectionOne.style.background =
        "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('IMG/patchy_snow.jpg') no-repeat fixed center";
      break;
    case 1258:
      sectionOne.style.background =
        "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('IMG/snow.jpg') no-repeat fixed center";
      break;
    case 1261:
      sectionOne.style.background =
        "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('IMG/snow.jpg') no-repeat fixed center";
      break;
    case 1264:
      sectionOne.style.background =
        "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('IMG/snow2.jpg') no-repeat fixed center";
      break;
    case 1273:
      sectionOne.style.background =
        "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('IMG/thunder.jpg') no-repeat fixed center";
      break;
    case 1276:
      sectionOne.style.background =
        "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('IMG/thunder.jpg') no-repeat fixed center";
      break;
    case 1279:
      sectionOne.style.background =
        "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('IMG/thunder.jpg') no-repeat fixed center";
      break;
    case 1282:
      sectionOne.style.background =
        "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('IMG/thunder.jpg') no-repeat fixed center";
      break;
    default:
      sectionOne.style.background =
        "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('IMG/wind.jpg') no-repeat fixed center";
  }

  switch (codeTwo) {
    case 1000:
      sectionTwo.style.background =
        "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('IMG/sunny.jpg') no-repeat fixed center";
      break;
    case 1006:
      sectionTwo.style.background =
        "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('IMG/cloud.jpg') no-repeat fixed center";
      break;
    case 1009:
      sectionTwo.style.background =
        "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('IMG/overcast.jpg') no-repeat fixed center";
      break;
    case 1030:
      sectionTwo.style.background =
        "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('IMG/mist.jpg') no-repeat fixed center";
      break;
    case 1063:
      sectionTwo.style.background =
        "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('IMG/patchy_rain.jpg') no-repeat fixed center";
      break;
    case 1066:
      sectionTwo.style.background =
        "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('IMG/snow.jpg') no-repeat fixed center";
      break;
    case 1069:
      sectionTwo.style.background =
        "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('IMG/snow.jpg') no-repeat fixed center";
      break;
    case 1087:
      sectionTwo.style.background =
        "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('IMG/thunder.jpg') no-repeat fixed center";
      break;
    case 1114:
      sectionTwo.style.background =
        "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('IMG/blowing_snow.jpg') no-repeat fixed center";
      break;
    case 1117:
      sectionTwo.style.background =
        "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('IMG/blizzard.jpg') no-repeat fixed center";
      break;
    case 1035:
      sectionTwo.style.background =
        "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('IMG/mist.jpg') no-repeat fixed center";
      break;
    case 1147:
      sectionTwo.style.background =
        "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('IMG/mist.jpg') no-repeat fixed center";
      break;
    case 1150:
      sectionTwo.style.background =
        "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('IMG/patchy_rain.jpg') no-repeat fixed center";
      break;
    case 1153:
      sectionTwo.style.background =
        "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('IMG/patchy_rain.jpg') no-repeat fixed center";
      break;
    case 1168:
      sectionTwo.style.background =
        "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('IMG/rain.jpg') no-repeat fixed center";
      break;
    case 1171:
      sectionOne.style.background =
        "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('IMG/rain.jpg') no-repeat fixed center";
      break;
    case 1180:
      sectionTwo.style.background =
        "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('IMG/patchy_rain.jpg') no-repeat fixed center";
      break;
    case 1183:
      sectionTwo.style.background =
        "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('IMG/patchy_rain.jpg') no-repeat fixed center";
      break;
    case 1086:
      sectionOne.style.background =
        "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('IMG/heavy_rain.jpg') no-repeat fixed center";
      break;
    case 1189:
      sectionTwo.style.background =
        "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('IMG/heavy_rain.jpg') no-repeat fixed center";
      break;
    case 1192:
      sectionTwo.style.background =
        "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('IMG/heavy_rain.jpg') no-repeat fixed center";
      break;
    case 1195:
      sectionTwo.style.background =
        "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('IMG/heavy_rain.jpg') no-repeat fixed center";
      break;
    case 1198:
      sectionTwo.style.background =
        "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('IMG/patchy_rain.jpg') no-repeat fixed center";
      break;
    case 1201:
      sectionTwo.style.background =
        "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('IMG/heavy_rain.jpg') no-repeat fixed center";
      break;
    case 1204:
      sectionTwo.style.background =
        "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('IMG/patchy_rain.jpg') no-repeat fixed center";
      break;
    case 1207:
      sectionTwo.style.background =
        "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('IMG/rain.jpg') no-repeat fixed center";
      break;
    case 1210:
      sectionTwo.style.background =
        "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('IMG/patchy_snow.jpg') no-repeat fixed center";
      break;
    case 1213:
      sectionTwo.style.background =
        "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('IMG/patchy_snow.jpg') no-repeat fixed center";
      break;
    case 1216:
      sectionTwo.style.background =
        "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('IMG/patchy_snow.jpg') no-repeat fixed center";
      break;
    case 1219:
      sectionTwo.style.background =
        "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('IMG/snow2.jpg') no-repeat fixed center";
      break;
    case 1222:
      sectionTwo.style.background =
        "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('IMG/patchy_snow.jpg') no-repeat fixed center";
      break;
    case 1225:
      sectionTwo.style.background =
        "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('IMG/blowing_snow.jpg') no-repeat fixed center";
      break;
    case 1237:
      sectionTwo.style.background =
        "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('IMG/snow.jpg') no-repeat fixed center";
      break;
    case 1240:
      sectionTwo.style.background =
        "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('IMG/patchy_rain.jpg') no-repeat fixed center";
      break;
    case 1243:
      sectionTwo.style.background =
        "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('IMG/patchy_rain.jpg') no-repeat fixed center";
      break;
    case 1246:
      sectionTwo.style.background =
        "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('IMG/heavy_rain.jpg') no-repeat fixed center";
      break;
    case 1249:
      sectionTwo.style.background =
        "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('IMG/patchy_rain.jpg') no-repeat fixed center";
      break;
    case 1252:
      sectionTwo.style.background =
        "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('IMG/rain.jpg') no-repeat fixed center";
      break;
    case 1255:
      sectionTwo.style.background =
        "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('IMG/patchy_snow.jpg') no-repeat fixed center";
      break;
    case 1258:
      sectionTwo.style.background =
        "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('IMG/snow.jpg') no-repeat fixed center";
      break;
    case 1261:
      sectionTwo.style.background =
        "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('IMG/snow.jpg') no-repeat fixed center";
      break;
    case 1264:
      sectionTwo.style.background =
        "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('IMG/snow2.jpg') no-repeat fixed center";
      break;
    case 1273:
      sectionTwo.style.background =
        "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('IMG/thunder.jpg') no-repeat fixed center";
      break;
    case 1276:
      sectionTwo.style.background =
        "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('IMG/thunder.jpg') no-repeat fixed center";
      break;
    case 1279:
      sectionTwo.style.background =
        "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('IMG/thunder.jpg') no-repeat fixed center";
      break;
    case 1282:
      sectionTwo.style.background =
        "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('IMG/thunder.jpg') no-repeat fixed center";
      break;
    default:
      sectionTwo.style.background =
        "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('IMG/wind.jpg') no-repeat fixed center";
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
    if (
      selectDay[i].classList.contains("active") &&
      mainCanvas[i].classList.contains("active")
    ) {
      selectDay[i].classList.remove("active");
      mainCanvas[i].classList.remove("active");
    }
  }
}
function openToday() {
  daySelection();
  today.classList.add("active");
  sectionOne.classList.add("active");
}
function openTomorrow() {
  daySelection();
  tomorrow.classList.add("active");
  sectionTwo.classList.add("active");
}
function openThreeDays() {
  daySelection();
  threeDays.classList.add("active");
  sectionThree.classList.add("active");
}
