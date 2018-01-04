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
    weatherData.then(data => {
      this._element.today.innerHTML = 'TODAY: <pre>' + JSON.stringify(data, null, 2) + '</pre>';
    }).catch(error => {
      this._element.today.innerText = 'Today: ' + error;
    });
  }

  /**
   * Renders weather forecast data view
   * @param {Promise} weatherData
   */
  renderForecast(weatherData) {
    weatherData.then(data => {
      this._element.forecast.innerHTML = 'Forecast: <pre>' + JSON.stringify(data, null, 2) + '</pre>';
    }).catch(error => {
      this._element.forecast.innerText = 'Forecast: ' + error;
    });
  }
}