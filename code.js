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
//Event listeners

searchBtn.addEventListener("click", getQuery);
userInput.addEventListener("", getQuery);
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
}
