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
    this.debugThisClassName('constructor');
  }

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

    console.log('Weather service "' + query + '" from:');
    console.log(queryData);

    return fetch(query, {method: 'get'})
      .then(response => {
        if (response.ok)
          return response.json();
        throw response.status;
      })
      .then(data => {
        return data;
      })
      .catch(error => {
        console.error(error);
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
        console.error(error);
        throw error;
      });
  }

  /**
   * Build url to reach icon
   * @param {string} iconId
   * @returns {string} url
   */
  apiIconUrl(iconId) {
    return this.config.api.iconUrl + iconId + this.config.api.iconExt;
  }
}
