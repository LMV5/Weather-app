const container = document.querySelector(".container");
const location = document.querySelector(".location");
const cityName = document.querySelector(".location__cityName");
const forecast = document.querySelector(".forecast");
const error = document.querySelector(".error");
const forecastBtnContainer = document.querySelector(".forecast__btn-container");
const btns = document.querySelectorAll(".btn");
const btn2 = document.querySelector(".btn--2");
const spinner = document.querySelectorAll(".spinner");

const forecastContent = document.querySelectorAll(".forecast__content");
const forecastContent1 = document.querySelector(".forecast__content--1");
const forecastContent2 = document.querySelector(".forecast__content--2");
const contentActive = document.querySelector(".forecast__content--active");

const searchBox = document.querySelector(".location__input");
const searchBtn = document.querySelector(".location__btnSearch");
const feelslikemax = document.querySelector(".feelslikemax");
const feelslikemin = document.querySelector(".feelslikemin");

const convertToCelsuis = function (deg) {
  return Math.trunc((deg - 32) * (5 / 9));
};

const convertToKmH = function (mph) {
  return Math.trunc(mph * 1, 609344);
};

const timeCut = function (time) {
  return time.slice(0, 5);
};

const renderSpinner = function (parentEl) {
  const markup = `
    <div class="spinner">
      <img src="./svg/spinner.svg" alt="spinner icon" />
    </div>`;
  //   parentEl.insertAdjacentHTML("beforeend", markup);
  parentEl.innerHTML = markup;
};

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

// const renderWeatherToday = async function (city) {
//   try {
//     renderSpinner(forecastContent1);
//     const res = await fetch(
//       `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=us&key=Z8AW25C8UNGXCU4SYU7ZP678B`
//     );
//     const data = await res.json();

//     if (!res.ok) throw new Error(`${data.message} (${res.status})`);

//     cityName.textContent = `${data.address}`;

//     const markup = `
//     <div class="forecast__content-today">
//             <div class="forecast__feelslike">
//               <img class="icon" src="./svg/${
//                 data.days[0].icon
//               }.svg" alt="icon" />
//                 <p>Feels like</p>
//                 <span>${convertToCelsuis(
//                   data.days[0].feelslike
//                 )}</span><span> &deg;</span>

//     <span class="feelslikemax">H: ${convertToCelsuis(
//       data.days[0].feelslikemax
//     )} &deg;</span>
//     <span class="feelslikemin">L: ${convertToCelsuis(
//       data.days[0].feelslikemin
//     )} &deg;</span>

// </div>
// <div class="forecast__sunrise">
// <img class="icon" src="./svg/sunrise.svg" alt="sunrise icon" />
//   <p>Sunrise</p>
//   <span>${timeCut(data.days[0].sunrise)}</span>
// </div>
// <div class="forecast__sunset">
// <img class="icon" src="./svg/sunset.svg" alt="sunset icon" />
//   <p>Sunset</p>
//   <span>${timeCut(data.days[0].sunset)}</span>
//  </div>
//  <div class="forecast__wind">
//  <img class="icon" src="./svg/wind1.svg" alt="wind icon" />
//    <p>Wind</p>
//    <span>${convertToKmH(data.days[0].windspeed)}</span> km/h<span></span>
//    </div>
//    <div class="forecast__humidity">
//    <img class="icon" src="./svg/humidity.svg" alt="humidity icon" />
//      <p>Humidity</p>
//      <span>${data.days[0].humidity}</span>
//    </div>
//    <div class="forecast__pressure">
//    <img class="icon" src="./svg/pressure.svg" alt="pressure icon" />
//      <p>Pressure</p>
//      <span>${data.days[0].pressure}</span>
//    </div>

//    </div>
//  </div>`;

//     console.log(data);
//     forecastContent1.innerHTML = markup;
//     forecastBtnContainer.style.display = "flex";
//   } catch (err) {
//     error.style.display = "block";
//     forecast.style.display = "none";
//     forecastBtnContainer.style.display = "none";
//     cityName.style.display = "none";
//   }
// };

// searchBtn.addEventListener("click", function () {
//   forecast.style.display = "block";
//   renderWeatherToday(searchBox.value);
//   renderWeatherToday("Moscow");
//   searchBox.value = "";
// });

// document.addEventListener("keydown", function (e) {
//   if (searchBox.value || e.key === "Enter") {
//     renderWeatherToday(searchBox.value);
//   }
// });

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
// console.log(formatDate("2024-05-11"));

const showWeatherTenDays = async function (city) {
  try {
    const res = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=us&key=Z8AW25C8UNGXCU4SYU7ZP678B`
    );
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);

    const daysArray = data.days.slice(0, 10);
    console.log(daysArray);

    let markup = "";

    for (const day of daysArray) {
      markup += `
        <div class="forecast__content-tenDays">
          <div class="forecast__content-tenDays-icon">
            <img class="icon" src="./svg/${day.icon}.svg" alt="icon" />
          </div>
          <div class="forecast__content-tenDays-date">
            <span class="content-tenDays-day">${formatDate(day.datetime)}</span>
          </div>
            <div class="forecast__content-tenDays-temp">
              <span class="content-tenDays-tempmax">${convertToCelsuis(
                day.tempmax
              )}  &deg;</span>
              <span class="content-tenDays-tempmin">${convertToCelsuis(
                day.tempmin
              )}  &deg;</span>
          </div>
        </div>
      `;
      console.log(day.datetime);
      forecastContent1.innerHTML = markup;
    }
  } catch (err) {
    console.log(err);
  }
};
showWeatherTenDays("Berlin");

searchBtn.addEventListener("click", function () {
  forecast.style.display = "block";
  showWeatherTenDays(searchBox.value);
  searchBox.value = "";
});

///////////////////////////////////////////////////
