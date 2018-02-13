import AppServiceComponent from "../framework/appservicecomponent.js";
/** Class representing favourite cities service. */
export default class FavCityService extends AppServiceComponent {
  /**
   * Create favourite cities service.
   * @constructor
   */
  constructor() {
    super();
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
    this.dependencies.Services.StorageService.put(this._storeName,item);
  }

  /**
   * Get {limit} last favourite cities items
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
}
