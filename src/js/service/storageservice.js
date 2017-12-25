/** Class representing storage service.
 * Uses https://github.com/jakearchibald/idb -- https://www.npmjs.com/package/idb
 */
class StorageService {
  /**
   * Create storage service.
   * @constructor
   * @param {object} appConfig - application config
   */
  constructor(appConfig) {
    this._appConfig = appConfig;
  }
}