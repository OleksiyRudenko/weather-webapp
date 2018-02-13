import AppServiceComponent from "../framework/appservicecomponent.js";
import StorageService from "./storageservice.js";
/** Class representing city browse history service. */
export default class CityHistoryService extends AppServiceComponent {
  /**
   * Create city browse history service.
   * @constructor
   */
  constructor() {
    super();
    this.config = {
      historyInitialSet: 'historyInitialSet',
    };
    this.dependencies = {
      Services: {
        StorageService: 'StorageService',
      }
    };
    this._storeName = 'cityhistory';
  }

  /* === Public methods === */

  /**
   * Run, Forrest, run!
   */
  run() {
    super.run();
    // this.debugThisClassName('run');
    this.updateStorage();
  }

  /**
   * Add search item to the storage
   * @param {Object} item {name:cityname}
   */
  addEntry(item) {
    // update item content
    item.lastQueried = + new Date();
    item.nameUC = item.name.toUpperCase();
    // store item
    this.dependencies.Services.StorageService.put(this._storeName,item); /*.then(() => {
      console.log('Search item added. {' + item.name + ', ' + item.lastQueried + '}');
    }); */
  }

  /**
   * Get {limit} last history items
   * @param {number} limit=20 - Search limit
   * @returns {Promise} Ordered list of citynames
   */
  getItems(limit=20) {
    return this.dependencies.Services.StorageService.getAll(this._storeName).then(items => {
      items.sort((a,b) => b.lastQueried - a.lastQueried);
      items = items.slice(0,limit).map(item => item.name);
      items.sort();
      return items;
    });
  }

  /* === Private methods : SECONDARY === */

  /**
   * Update storage if required
   */
  updateStorage() {
    this.dependencies.Services.StorageService.storeCount(this._storeName).then(count => {
      if (!count) {
        this.dependencies.Services.StorageService.put(this._storeName, this.config.historyInitialSet); /*.then(()=>{
          console.log('History initialized.');
        }); */
      }
      // console.log('CityListService.updateStorage(cities).count==' + count);
    });
  }
}
