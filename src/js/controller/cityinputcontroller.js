/** Class representing city input controller. */
class CityInputController {
  /**
   * Create city input controller.
   * @constructor
   * @param {object} appConfig - city list service
   * @param {object} services - app services register
   */
  constructor(appConfig, services) {
    const config = appConfig.search;
    const elementConfigKey = ['gps', 'favNo', 'favYes', 'favDropDown', 'textInput', 'searchAction'];
    this._elContainer = document.getElementById(config.container);
    this._elControls = elementConfigKey.reduce((accumulator, key) => {
      accumulator[key] = document.getElementById(config[key]);
      return accumulator;
    },{});
    console.log(this._elControls);
  }
}