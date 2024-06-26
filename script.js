import * as helper from "./helper.js";

const cityName = document.querySelector(".location__cityName");
const searchBox = document.querySelector(".location__input");
const searchBtn = document.querySelector(".location__btnSearch");
const forecast = document.querySelector(".forecast");
const forecastBtnContainer = document.querySelector(".forecast__btn-container");
const forecastContent = document.querySelectorAll(".forecast__content");
const forecastContent1 = document.querySelector(".forecast__content--1");
const forecastContentTenDays = document.querySelector(
  ".forecast__content-tenDays"
);
const error = document.querySelector(".error");
const btns = document.querySelectorAll(".btn");

forecastBtnContainer.addEventListener("click", function (e) {
  const target = e.target.closest(".btn");
  if (!target) return;

  btns.forEach((b) => b.classList.remove("btn--active"));
  target.classList.add("btn--active");

  forecastContent.forEach((c) =>
    c.classList.remove("forecast__content--active")
  );

  document
    .querySelector(`.forecast__content--${target.dataset.tab}`)
    .classList.add("forecast__content--active");
});

const renderError = function (message) {
  error.textContent = message;
  forecast.style.display = "none";
  forecastBtnContainer.style.display = "none";
  cityName.style.display = "none";
};

const handleSearch = () => {
  if (!/^[a-zA-Z\s]+$/.test(searchBox.value)) {
    renderError("Invalid city name. Please enter letters only.");
  } else {
    forecast.style.display = "block";
    renderWeather(searchBox.value);
    searchBox.value = "";
  }
};

searchBtn.addEventListener("click", handleSearch);

document.addEventListener("keydown", function (e) {
  if (e.key === "Enter") handleSearch();
});

const formatDate = function (inputDate) {
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [
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

  const dateObj = new Date(inputDate);
  const day = dayNames[dateObj.getDay()];
  const month = months[dateObj.getMonth()];
  const date = dateObj.getDate();

  return `${day} ${month} ${date}`;
};

const renderWeather = async function (city) {
  try {
    error.textContent = "";
    helper.renderSpinner(forecastContent1);
    const res = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=us&key=Z8AW25C8UNGXCU4SYU7ZP678B`
    );
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);

    let getCityName = data.resolvedAddress;
    cityName.textContent = `${getCityName.split(",")[0]}`;

    const daysArray = data.days.slice(0, 10);
    let markupTenDays = "";

    const markupToday = `
    <div class="forecast__content-today">
      <div class="forecast__feelslike">
        <img class="icon forecast__feelslike-icon" src="./svg/${
          data.days[0].icon
        }.svg" alt="icon" />
        <p class="forecast__feelslike-degNow">${helper.convertToCelsius(
          data.days[0].feelslike
        )}  &deg;</p>
        <p class="forecast__feelslike-conditions">${data.days[0].conditions}</p>
        <span class="forecast__feelslike-feelslikemax">H: ${helper.convertToCelsius(
          data.days[0].feelslikemax
        )} &deg;</span> 
        <span class="forecast__feelslike-feelslikemin">L: ${helper.convertToCelsius(
          data.days[0].feelslikemin
        )} &deg;</span>
      </div>
      <div class="forecast__sunrise">
        <img class="icon" src="./svg/sunrise.svg" alt="sunrise icon" />
        <p>Sunrise</p>
        <span>${helper.timeCut(data.days[0].sunrise)}</span>
      </div>
      <div class="forecast__sunset">
        <img class="icon" src="./svg/sunset.svg" alt="sunset icon" />
        <p>Sunset</p>
        <span>${helper.timeCut(data.days[0].sunset)}</span>
      </div>

      <div class="forecast__wind">
        <img class="icon" src="./svg/wind1.svg" alt="wind icon" />
        <p>Wind</p>
        <span>${helper.convertToKmH(data.days[0].windspeed)} km/h</span>
      </div>

      <div class="forecast__humidity">
        <img class="icon" src="./svg/humidity.svg" alt="humidity icon" />
        <p>Humidity</p>
        <span>${data.days[0].humidity}</span>
      </div>
      <div class="forecast__pressure">
        <img class="icon" src="./svg/pressure.svg" alt="pressure icon" />
        <p>Pressure</p>
        <span>${data.days[0].pressure}</span>
        </div>
    </div>`;

    for (const day of daysArray) {
      markupTenDays += `
      <div class="forecast__content-tenDays-day">
        <div class="forecast__content-tenDays-icon">
          <img class="icon" src="./svg/${day.icon}.svg" alt="icon" />
        </div>
        <div class="forecast__content-tenDays-date">
          <span class="content-tenDays-day">${formatDate(day.datetime)}</span>
        </div>
        <div class="forecast__content-tenDays-temp">
          <span class="content-tenDays-tempmax">${helper.convertToCelsius(
            day.tempmax
          )} &deg;</span><span> &frasl; </span>
          <span class="content-tenDays-tempmin">${helper.convertToCelsius(
            day.tempmin
          )} &deg;</span>
        </div>
    </div>
      `;
    }
    forecastContent1.innerHTML = markupToday;
    forecastContentTenDays.innerHTML = markupTenDays;
    cityName.style.display = "block";
    forecastBtnContainer.style.display = "flex";
    console.log(data);
  } catch (err) {
    renderError("We can not find the city. Please try again");
  }
};
