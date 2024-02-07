export const convertToCelsius = function (deg) {
  return Math.trunc((deg - 32) * (5 / 9));
};

export const convertToKmH = function (mph) {
  return Math.trunc(mph * 1, 609344);
};

export const timeCut = function (time) {
  return time.slice(0, 5);
};

export const renderSpinner = function (parentEl) {
  const markup = `
      <div class="spinner">
        <img src="./svg/spinner.svg" alt="spinner icon" />
      </div>`;
  parentEl.innerHTML = markup;
};
