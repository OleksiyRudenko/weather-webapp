/** Class representing unit switch controller. */
class CityInputController {
  /**
   * Create city input controller.
   * @constructor
   * @param {object} appConfig - application config
   */
  constructor(cityListService, cityInputElId) {
    this._cityListService = cityListService;
    this._cityInputElId = document.getElementById(cityInputElId);
  }
}