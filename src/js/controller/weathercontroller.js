/** Class representing weather view controller. */
class WeatherController {
  /**
   * Create weather controller.
   * @constructor
   * @param {object} appConfig - city list service
   */
  constructor(appConfig) {
    const config = appConfig.weatherView;

    this._element = elementIdsToHtmlElements(config);
  }

  /**
   * Renders current weather data view
   * @param {Promise} weatherData
   */
  renderToday(weatherData) {
    const elProgressSpinner = document.querySelector('.loader-small');
    // console.log(elProgressSpinner);
    elProgressSpinner.classList.add('loader-visible');
    weatherData.then(data => {
      elProgressSpinner.classList.remove('loader-visible');
      this._element.today.innerHTML = 'TODAY: <pre>' + JSON.stringify(data, null, 2) + '</pre>';
    }).catch(error => {
      elProgressSpinner.classList.remove('loader-visible');
      this._element.today.innerText = 'Today: ' + error;
    });
  }

  /**
   * Renders weather forecast data view
   * @param {Promise} weatherData
   */
  renderForecast(weatherData) {
    const elProgressSpinner = document.querySelector('.loader-big');
    elProgressSpinner.classList.add('loader-visible');
    weatherData.then(data => {
      elProgressSpinner.classList.remove('loader-visible');
      this._element.forecast.innerHTML = 'Forecast: <pre>' + JSON.stringify(data, null, 2) + '</pre>';
    }).catch(error => {
      elProgressSpinner.classList.remove('loader-visible');
      this._element.forecast.innerText = 'Forecast: ' + error;
    });
  }
}