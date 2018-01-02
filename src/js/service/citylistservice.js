/** Class representing city list service. */
class CityListService {
  /**
   * Create city list service.
   * @constructor
   * @param {object} appConfig - application config
   * @param {object} storageService - storage service
   */
  constructor(appConfig, storageService) {
    this._appConfig = appConfig;
    this._storageService = storageService;
    this._cityList = []; // id: , name: 'cityname, country'

    this.loadSource();
  }

  loadSource() {
    fetch(this._appConfig.baseUrl + this._appConfig.cityList, {method: 'get'})
      .then(response => {
        if (response.ok)
         return response.json();
        throw new Error('Network response was not ok.');
      })
      .then(data => {
        let list = data.map(entry =>
          ({id: entry.id, name:entry.name + ', ' + entry.country, nameUC: (entry.name + ', ' + entry.country).toUpperCase()})
        ).filter(el => /^[^\d\W]/.test(el.name));
        this._cityList = list.sort((a,b) => a.nameUC < b.nameUC ? -1 : 1 );
      })
      .catch(error => {
        console.error(error);
      });
  }
}