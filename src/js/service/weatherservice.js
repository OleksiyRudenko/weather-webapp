/** Class representing weather service. */
class WeatherService {
  /**
   * Create weather service.
   * @constructor
   * @param {object} appConfig - application config
   */
  constructor(appConfig, storageService) {
    this._config = appConfig.api;
  }

  /**
   * Queries external api endpoint
   * @param {string} queryClass (current|forecast)
   * @param {string} endPoint {cityname|latlon)
   * @param {object} queryData - query parameters
   * @returns {Promise<Response>}
   */
  apiRequest(queryClass, endPoint, queryData) {
    let query = this._config.apiUrl + this._config.apiEndpoint[queryClass][endPoint].path + '?';
    // add query data
    const paramSet = Object.keys(queryData).map(param => param + '=' + queryData[param]);
    query += paramSet.join('&');

    // add api key
    query += '&' + this._config.apiParamName + '=' + this._config.apiKey;

    console.log('Weather service "' + query + '" from:');
    console.log(queryData);

    return fetch(query, {method: 'get'})
      .then(response => {
        if (response.ok)
          return response.json();
        throw new Error('WeatherService: Network response was not ok:' + response.status);
      })
      .then(data => {
        return data;
      })
      .catch(error => {
        console.error(error);
      });
  }
}