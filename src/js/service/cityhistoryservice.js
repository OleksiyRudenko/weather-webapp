/** Class representing city browse history service. */
class CityHistoryService {
  /**
   * Create city browse history service.
   * @constructor
   * @param {object} appConfig - application config
   * @param {object} storageService - storage service
   */
  constructor(appConfig, storageService) {
    this._appConfig = appConfig;
    this._storageService = storageService;
    this._storeName = 'cityhistory';
    console.log('Instantiated CityHistoryService');
  }

  /**
   * Add search item to the storage
   * @param {Object} item {name:cityname}
   */
  addEntry(item) {
    // update item content
    item.lastQueried = + new Date();
    // store item
    this._storageService.put(this._storeName,item).then(() => {
      console.log('Search item added. {' + item.name + ', ' + item.lastQueried + '}');
    });
  }
}