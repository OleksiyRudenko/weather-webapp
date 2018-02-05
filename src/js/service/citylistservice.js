/** Class representing city list service. */
export default class CityListService {
  /**
   * Create city list service.
   * @constructor
   * @param {object} appConfig - application config
   * @param {object} storageService - storage service
   */
  constructor(appConfig, storageService) {
    this._storeName = 'cities';
    this._appConfig = appConfig;
    this._storageService = storageService;
    // this._cityList = []; // id: , name: 'cityname, country'

    this.updateStorage();
  }

  /**
   * Update idb storage if required
   */
  updateStorage() {
    this._storageService.storeCount(this._storeName).then(count => {
      if (!count) {
        this.loadSource().then(cityList => {
          console.log(cityList.length + ' entries in the city list.');
          cityList = cityList.slice(0, 1234);
          this._storageService.put(this._storeName, cityList).then(()=>{
            console.log('idb.cities updated.');
          });
        });
      }
      console.log('CityListService.updateStorage(cities).count==' + count);
    });
  }

  /**
   * Import data (cities list) from external resource and customize it as appropriate
   */
  loadSource() {
    return fetch(this._appConfig.baseUrl + this._appConfig.cityList, {method: 'get'})
      .then(response => {
        if (response.ok)
         return response.json();
        throw new Error('Network response was not ok.');
      })
      .then(data => {
        let list = data.map(entry =>
          ({id: entry.id, name:entry.name + ', ' + entry.country, nameUC: (entry.name + ', ' + entry.country).toUpperCase()})
        ).filter(el => /^[^\d\W]/.test(el.name));
        return list.sort((a,b) => a.nameUC < b.nameUC ? -1 : 1 );
      })
      .catch(error => {
        console.error(error);
      });
  }
}

export { CityListService };
