/** Class representing city list service. */
class CityListService {
  /**
   * Create city list service.
   * @constructor
   * @param {object} appConfig - application config
   */
  constructor(appConfig) {
    this._appConfig = appConfig;
    this._cityList = []; // id: , name: 'cityname, country'

    this.loadSource();
  }

  loadSource() {
    fetch(window.location.protocol + "//" + window.location.host + "/" + this._appConfig.cityList, {method: 'get'})
      .then(response => {
        if (response.ok)
         return response.json();
        throw new Error('Network response was not ok.');
      })
      .then(data => {
        data.map(entry => {
          this._cityList.push({id: entry.id, name:entry.name + ', ' + entry.country});
        });
      })
      .catch(error => {
        console.error(error);
      });
  }
}