import * as helper from './../helper.js';
import AppUiControllerComponent from "../framework/appuicontrollercomponent.js";
import SettingsService from "../service/settingsservice.js";
import WeatherService from "../service/weatherservice.js";
import MoodController from "./moodcontroller.js";
import GuideController from "./guidecontroller.js";
import FavCityController from "./favcitycontroller.js";
/** Class representing weather view controller. */
export default class WeatherController extends AppUiControllerComponent {
  /**
   * Create weather controller.
   * @constructor
   */
  constructor() {
    super();
    this.config = {
      icons: 'icons',
    };
    this.dependencies = {
      Services: {
        SettingsService: 'SettingsService',
        WeatherService: 'WeatherService',
      },
      UiControllers: {
        MoodController: 'MoodController',
        GuideController: 'GuideController',
        FavCityController: 'FavCityController',
      },
    };
    this._elWeatherToday = null;
  }

  /* === Public methods === */

  /**
   * Renders current weather data view
   * @param {Promise} weatherData
   * @param {boolean} updateCityName - whether city name update expected
   * returns {Promise|null} - updated city name if required
   */
  renderToday(weatherData, updateCityName) {
    const idPrefix = 'wt-';
    // console.log(elProgressSpinner);
    this.exposeElement('today', 'Spinner');
    // elProgressSpinner.classList.add('loader-visible');
    return weatherData.then(data => {
      // console.log(data);
      data = this.extractWeatherDataCurrent(data);
      // enrich data
      data.windSpeedUnits = this.dependencies.Services.SettingsService.windSpeedUnits;
      data.date = new Date(data.dt * 1000);
      data.cityFull = data.geocity + ',' + data.geocountry;
      data.geoFull = data.geolon + ',' + data.geolat;

      // create references to today weather HTML elements if not yet
      if (!this._elWeatherToday) {
        this._elWeatherToday = helper.objectKeysToHtmlElements(data, idPrefix);
      }

      // console.log(this._elWeatherToday);
      // this.debugThisClassName('renderToday');
      // console.log(data);
      data.descrIcon = '<i class="wi ' + this.getWeatherConditionsIcon(data.verbose.tod, data.verbose.conditions) + '"></i>';
      data.pressure = Math.round(data.pressure / 1013.25 * 100) / 100;

      // put data across HTML elements
      // this.debugThisClassName('renderToday');
      // console.log(data);
      Object.keys(data).forEach(key => {
        if (key in this._elWeatherToday) {
          this._elWeatherToday[key].innerHTML = data[key];
        }
      });

      this.dependencies.UiControllers.FavCityController.checkCityIsFav(data.cityFull);

      this.exposeElement('today', 'Main');

      // document.getElementById('weather-today-debug').innerHTML = 'TODAY: <pre>' + JSON.stringify(data, null, 2) + '</pre>';

      // update mood
      this.dependencies.UiControllers.MoodController.renderMood(data.date, data.geolat, data.verbose);
      this.dependencies.UiControllers.GuideController.playNextTip();

      // update city name if required
      return updateCityName ? data.geocity + ',' + data.geocountry : null;
    }).catch(error => {
      this.exposeElement('today', 'Error');
      this.uiElements.todayError.innerText = 'No weather data for given location or inexistent location (error code: '+ error + ')';
      throw error;
    });
  }

  /**
   * Renders weather forecast data view
   * @param {Promise} weatherData
   */
  renderForecast(weatherData) {
    this.exposeElement('forecast', 'Spinner');
    this.uiElements.forecastMain.innerHTML = '';
    weatherData.then(data => {
      data = this.extractWeatherDataForecast(data);
      // this.debugThisClassName('renderForecast');
      // console.log(data);
      const forecastItems = data.weatherSchedule.map(item => '<div class="wf-item ' +
          this.getShadeOfTheTime(item.dtHours) + '">' +
          '<div class="wf-icon"><i class="wi ' + this.getWeatherConditionsIcon(item.verbose.tod, item.verbose.conditions) + '"></i></div>' +
          '<div class="wf-descr">' + item.descr + '</div>' +
          '<div class="wf-temp">' + item.temp + '&deg;</div>' +
          '<div class="wf-time">' + item.dtHours + ':00</div>' +
          '<div class="wf-date">' + item.dtDate + '</div>' +
          '</div>'
      );

      this.uiElements.forecastMain.innerHTML = forecastItems.join('');
      this.exposeElement('forecast', 'Main');

      // this.uiElements.forecastDebug.innerHTML = 'Forecast: <pre>' + JSON.stringify(data, null, 2) + '</pre>';
    }).catch(error => {
      this.exposeElement('forecast', 'Error');
      this.uiElements.forecastError.innerText = 'No forecast data for given location or inexistent location (error code: '+ error + ')';
    });
  }

  /* === Private methods : SECONDARY === */

  /**
   * Extracts required data from API call response
   * @param {Object} src - API fetch data
   */
  extractWeatherDataCurrent(src) {
    // console.log('<img src="' + this.dependencies.Services.WeatherService.apiIconUrl(src.weather[0].icon) + '" />');
    // console.log('Wind azimuth: ' + src.wind.deg);
    return {
      dt: src.dt,
      geocity: src.name,
      geocountry: src.sys.country,
      geolat: src.coord.lat,
      geolon: src.coord.lon,
      descr: src.weather[0].main,
      descrDetails: src.weather[0].description,
      descrIcon: '<img src="' + this.dependencies.Services.WeatherService.apiIconUrl(src.weather[0].icon) + '" />',
      verbose: src.weather[0].verbose,
      temp: Math.round(src.main.temp),
      pressure: Math.round(src.main.pressure),
      humidity: src.main.humidity,
      windSpeed: Math.round(src.wind.speed),
      windAzimuth: this.degree2arrow('deg' in src.wind ? Math.round(src.wind.deg) : null),
      clouds: src.clouds.all,
    };
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
      // console.log('Time: ' + time);
      return (time === '03' || time === '09' || time === '15' || time === '21');

    });
    weatherList.sort((a,b) => a.dt - b.dt);
    result.weatherSchedule = weatherList.map(item => ({
      dtDate: item.dt_txt.substring(8,10) + '/' + item.dt_txt.substring(5,7),
      dtHours: item.dt_txt.substring(11,13),
      descr: item.weather[0].main,
      descrDetails: item.weather[0].description,
      descrIcon: '<img src="' + this.dependencies.Services.WeatherService.apiIconUrl(item.weather[0].icon) + '" />',
      verbose: item.weather[0].verbose,
      temp: Math.round(item.main.temp),
      pressure: Math.round(item.main.pressure),
      humidity: item.main.humidity,
      windSpeed: Math.round(item.wind.speed),
      windAzimuth: this.degree2arrow('deg' in item.wind ? Math.round(item.wind.deg) : null),
      clouds: item.clouds.all,
    }));

    return result;
  }

  /**
   * Converts degree [0, 360] to the relevant HTML entity
   * @param degree
   */
  degree2arrow(degree) {
    if (degree === null) return '';
    degree = degree % 360;
    const presets = {
      0: 'uarr',
      22: 'nearr',
      67: 'rarr',
      112: 'searr',
      157: 'darr',
      202: 'swarr',
      247: 'larr',
      292: 'nwarr',
      337: 'uarr',
    };
    // console.log('Degree: ' + degree);
    return '&'
      + Object.keys(presets).reduce((acc, degKey) => {
        return (degree >= degKey) ? presets[degKey] : acc;
      }, '')
      + ';';
  }

  /**
   * Exposes one of elements from a set
   * @param {string} set - {today|forecast}
   * @param {string} exposedElementName - {Main|Debug|Error|Spinner|none}
   */
  exposeElement(set, exposedElementName) {
    const elNames = ['Main', 'Debug', 'Error', 'Spinner'];
    exposedElementName = exposedElementName.charAt(0).toUpperCase() + exposedElementName.slice(1);
    // console.log('====== Exposing ' + set + exposedElementName);
    // console.log(this.uiElement);
    elNames.forEach(elname => {
      const el = this.uiElements[set + elname];
      if (elname === exposedElementName) {
        // console.log('Exposing ' + set + elname);
        el.classList.add('weather-visible');
      }
      else {
        // console.log('Hiding ' + set + elname);
        el.classList.remove('weather-visible');
      }
    });
  }

  /**
   * Picks weather icon based on time of the day and conditions
   * @param {string} tod = day|night
   * @param {string} verboseConditions = clearSky|rain|snow|...
   * @returns {string}
   */
  getWeatherConditionsIcon(tod, verboseConditions) {
    if (!tod)
      tod = 'day';
    if (verboseConditions === 'unknown' || Math.floor(Math.random() * 41) > 39) {
      verboseConditions = 'alien';
    }
    return this.config.icons[tod][verboseConditions];
  }

  /**
   * Return shade of time of the day based on hours
   * @param hours
   * @returns {string}
   */
  getShadeOfTheTime(hours) {
    return (hours < '01') ? 'wf-dark' :
      (hours < '04') ? 'wf-darkest' :
        (hours < '07') ? 'wf-dark' :
          (hours < '10') ? 'wf-neutral' :
            (hours < '13') ? 'wf-light' :
              (hours < '16') ? 'wf-lightest' :
                (hours < '19') ? 'wf-light' :
                  (hours < '22') ? 'wf-neutral' :
                    'wf-dark';
  }
}
