/** Class representing city input controller. */
class CityInputController {
  /**
   * Create city input controller.
   * @constructor
   * @param {object} cityListService - city list service
   * @param {string} cityInputElId - city/geolocation search text input element id
   */
  constructor(cityListService, cityInputElId) {
    this._cityListService = cityListService;
    this._cityInputElId = document.getElementById(cityInputElId);
  }
}