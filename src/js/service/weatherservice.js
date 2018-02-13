import AppServiceComponent from "../framework/appservicecomponent.js";
/** Class representing weather service. */
export default class WeatherService extends AppServiceComponent {
  /**
   * Create weather service.
   * @constructor
   */
  constructor() {
    super();
    this.config = {
      api: 'api',
    };
  }

  /* === Public methods === */

  /**
   * Queries external api endpoint
   * @param {string} queryClass (current|forecast)
   * @param {string} endPoint {cityname|latlon)
   * @param {object} queryData - query parameters
   * @returns {Promise<Response>}
   */
  apiRequest(queryClass, endPoint, queryData) {
    let query = this.config.api.apiUrl + this.config.api.apiEndpoint[queryClass][endPoint].path + '?';
    // add query data
    const paramSet = Object.keys(queryData).map(param => param + '=' + queryData[param]);
    query += paramSet.join('&');

    // add api key
    query += '&' + this.config.api.apiParamName + '=' + this.config.api.apiKey;

    /* this.debugThisClassName('apiRequest');
    console.log(query);
    console.log(queryData); */

    return fetch(query, {method: 'get'})
      .then(response => {
        if (response.ok)
          return response.json();
        throw response.status;
      })
      .then(data => {
        // verbalize icon
        // this.debugThisClassName('apiRequest ' + queryClass);
        switch (queryClass) {
          case 'current':
            data.weather[0].verbose = this.decomposeIconId(data.weather[0].icon);
            break;
          case 'forecast5':
            data.list.forEach((entry, idx) => {
              data.list[idx].weather[0].verbose = this.decomposeIconId(data.list[idx].weather[0].icon);
            });
            break;
        }
        // console.log(data);
        return data;
      })
      .catch(error => {
        // console.error(error);
        throw error;
      });
  }

  /**
   * Returns promise to provide an icon
   * @param {string} iconId
   * @returns {Promise<Response>} image url to use as a value for image.src
   */
  apiRequestIcon(iconId) {
    let query = this.apiIconUrl(iconId);
    return fetch(query, {method: 'get'})
      .then(response => {
        if (response.ok)
          return response.blob();
        throw response.status;
      })
      .then(blob => {
        return URL.createObjectURL(blob);
      })
      .catch(error => {
        // console.error(error);
        throw error;
      });
  }

  /* === Private methods : SECONDARY === */

  /**
   * Build url to reach icon
   * @param {string} iconId
   * @returns {string} url
   */
  apiIconUrl(iconId) {
    return this.config.api.iconUrl + iconId + this.config.api.iconExt;
  }

  /**
   * Verbalizes iconId code
   * @param {string} iconId
   * returns {Object} { tod: day|night, conditions: ... }
   */
  decomposeIconId(iconId) {
    return {
      tod: iconId.substr(2) === 'd' ? 'day' : 'night',
      conditions: this.verbalizeConditionsCode(iconId.substr(0,2)),
    };
  }

  /**
   * Verbalizes 2-digit conditions code
   * @param {string} conditionsCode
   * @returns {string}
   * http://erikflowers.github.io/weather-icons/
   * http://www.alessioatzeni.com/meteocons/
   */
  verbalizeConditionsCode(conditionsCode) {
    switch (conditionsCode) {
      case '01': return 'clearSky';
      case '02': return 'fewClouds';
      case '03': return 'scatteredClouds';
      case '04': return 'brokenClouds';
      case '09': return 'showerRain';
      case '10': return 'rain';
      case '11': return 'thunderStorm';
      case '13': return 'snow';
      case '50': return 'mist';
      default: return 'unknown';
    }
  }
}
