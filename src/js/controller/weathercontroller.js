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
      data = this.extractWeatherDataCurrent(data);
      this._element.today.innerHTML = 'TODAY: <pre>' + JSON.stringify(data, null, 2) + '</pre>';
    }).catch(error => {
      elProgressSpinner.classList.remove('loader-visible');
      this._element.today.innerText = 'Today: ' + error;
    });
  }

  /**
   * Extracts required data from API call response
   * @param {Object} src - API fetch data
   */
  extractWeatherDataCurrent(src) {
    return {
      dt: src.dt,
      geocity: src.name,
      geocountry: src.sys.country,
      geolat: src.coord.lat,
      geolon: src.coord.lon,
      descr: src.weather.main,
      descrDetails: src.weather.description,
      descrIcon: src.weather.icon,
      temp: src.main.temp,
      pressure: src.main.pressure,
      humidity: src.main.humidity,
      windSpeed: src.wind.speed,
      windAzimuth: src.wind.deg,
      clouds: src.clouds.all,
    };
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