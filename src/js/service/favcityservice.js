/** Class representing favourite cities service. */
export default class FavCityService {
  /**
   * Create favourite cities service.
   * @constructor
   * @param {object} appConfig - application config
   * @param {object} storageService - storage service
   */
  constructor(appConfig, storageService) {
    this._appConfig = appConfig;
    this._storageService = storageService;
  }
}
