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
    console.log('Instantiated CityHistoryService');
  }
}