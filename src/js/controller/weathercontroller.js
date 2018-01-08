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
      temp: Math.round(src.main.temp),
      pressure: Math.round(src.main.pressure),
      humidity: src.main.humidity,
      windSpeed: Math.round(src.wind.speed),
      windAzimuth: Math.round(src.wind.deg),
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
      data = this.extractWeatherDataForecast(data);
      this._element.forecast.innerHTML = 'Forecast: <pre>' + JSON.stringify(data, null, 2) + '</pre>';
    }).catch(error => {
      elProgressSpinner.classList.remove('loader-visible');
      this._element.forecast.innerText = 'Forecast: ' + error;
    });
  }

  /**
   * Extracts required weather data from API call response (forecast). 5 days at 12:00 and 18:00 only
   * @param {Object} src - API fetch data
   */
  extractWeatherDataForecast(src) {
    let result = {
      // dt: src.dt,
      geocity: src.city.name,
      geocountry: src.city.country,
      geolat: src.city.coord.lat,
      geolon: src.city.coord.lon,
    };

    let weatherList = src.list.filter(item => {
      const time = item.dt_txt.substring(11,13);
      console.log('Time: ' + time);
      return (time === '18' || time === '12');

    });
    weatherList.sort((a,b) => a.dt - b.dt);
    result.weatherSchedule = weatherList.map(item => ({
      dtDate: item.dt_txt.substring(5,7) + '/' + item.dt_txt.substring(8,10),
      dtHours: item.dt_txt.substring(11,13),
      descr: item.weather[0].main,
      descrDetails: item.weather[0].description,
      descrIcon: item.weather[0].icon,
      temp: Math.round(item.main.temp),
      pressure: Math.round(item.main.pressure),
      humidity: item.main.humidity,
      windSpeed: Math.round(item.wind.speed),
      windAzimuth: Math.round(item.wind.deg),
      clouds: item.clouds.all,
    }));

    return result;
  }
}