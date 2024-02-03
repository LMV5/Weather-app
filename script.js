const forecast = document.querySelector(".forecast");
const forecastBtnContainer = document.querySelector(".forecast__btn-container");
const btns = document.querySelectorAll(".btn");
const forecastCont = document.querySelectorAll(".forecast__cont");
const forecastContent = document.querySelectorAll(".forecast__content");
const forecastContent1 = document.querySelectorAll(".forecast__content--1");

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

// const renderSpinner = function (parentEl) {
//   const markup = `
//     <div class="spinner">
//       <img src="./svg/spinner.svg" alt="spinner icon" />
//     </div>`;
//   parentEl.insertAdjacentHTML("afterbegin", markup);
// };
// renderSpinner(forecast);

const showWeather = async function (country) {
  try {
    const res = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${country}?unitGroup=us&key=Z8AW25C8UNGXCU4SYU7ZP678B`
    );
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);

    const markup = `
    <div class="forecast__content-today">
            <div class="forecast__feelslike">
            <img class="icon" src="./svg/${data.days[0].icon}.svg" alt="" />
              <p>Feels like</p>
              <span>${data.days[0].feelslike}</span>
            </div>
            <div class="forecast__sunrise">
            <img class="icon" src="./svg/sunrise.svg" alt="" />
              <p>Sunrise</p>
              <span>${data.days[0].sunrise}</span>
            </div>
            <div class="forecast__sunset">
            <img class="icon" src="./svg/sunset.svg" alt="" />
              <p>Sunset</p>
              <span>${data.days[0].sunset}</span>
            </div>
            <div class="forecast__wind">
            <img class="icon" src="./svg/wind1.svg" alt="" />
              <p>Wind</p>
              <span>${data.days[0].windspeed}</span>
            </div>
            <div class="forecast__humidity">
            <img class="icon" src="./svg/humidity.svg" alt="" />
              <p>Humidity</p>
              <span>${data.days[0].humidity}</span>
            </div>
            <div class="forecast__pressure">
            <img class="icon" src="./svg/pressure.svg" alt="" />
              <p>Pressure</p>
              <span>${data.days[0].pressure}</span>
            </div>

            </div>
          </div>`;
    forecast.insertAdjacentHTML("beforeend", markup);
    console.log(data);
    console.log(data.days[0].icon);
  } catch (err) {
    console.log(err);
  }
};

showWeather("Ljubljana");
