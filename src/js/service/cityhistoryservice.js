/** Class representing city browse history service. */
export default class CityHistoryService {
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
    this.updateStorage();
  }

  /**
   * Update storage if required
   */
  updateStorage() {
    this._storageService.storeCount(this._storeName).then(count => {
      if (!count) {
        this._storageService.put(this._storeName, this._appConfig.historyInitialSet).then(()=>{
          console.log('History initialized.');
        });
      }
      console.log('CityListService.updateStorage(cities).count==' + count);
    });
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

  /**
   * Get {limit} last history items
   * @param {number} limit=20 - Search limit
   * @returns {Promise} Ordered list of citynames
   */
  getItems(limit=20) {
    return this._storageService.getAll(this._storeName).then(items => {
      items.sort((a,b) => b.lastQueried - a.lastQueried);
      items = items.slice(0,limit).map(item => item.name);
      items.sort();
      return items;
    });
  }
}
