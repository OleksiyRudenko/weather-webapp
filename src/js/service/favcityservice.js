import AppServiceComponent from "../framework/appservicecomponent.js";
import StorageService from "./storageservice.js";
/** Class representing favourite cities service. */
export default class FavCityService extends AppServiceComponent {
  /**
   * Create favourite cities service.
   * @constructor
   */
  constructor() {
    super();
    this.dependencies = {
      Services: {
        StorageService: 'StorageService',
      },
    };
    this._storeName = 'favcity';
  }

  /* === Public methods === */

  /**
   * Component initial activities
   */
  run() {
    super.run();
  }

  /* === Private methods : SECONDARY === */

  /**
   * Add favourite city item to the storage
   * @param {Object} item {name:cityname}
   */
  addEntry(item) {
    // update item content
    item.nameUC = item.name.toUpperCase();
    // store item
    return this.dependencies.Services.StorageService.put(this._storeName,item);
  }

  /**
   * Remove favourite city item from the storage
   * @param {string} cityNameFull
   */
  deleteEntry(cityNameFull) {
    return this.dependencies.Services.StorageService.delete(this._storeName, cityNameFull);
  }

  /**
   * Get {limit} favourite cities items
   * @param {number} limit=20 - Search limit
   * @returns {Promise} Ordered list of citynames
   */
  getItems(limit=20) {
    return this.dependencies.Services.StorageService.getAll(this._storeName).then(items => {
      items.sort((a,b) => b.nameUC > a.nameUC);
      items = items.slice(0,limit).map(item => item.name);
      items.sort();
      return items;
    });
  }

  /**
   * Get (find) favourite cities items
   * @param {string} keyValue - Search value
   * @returns {Promise} result if found
   */
  getItem(keyValue) {
    return this.dependencies.Services.StorageService.get(this._storeName,'',keyValue);
  }
}
