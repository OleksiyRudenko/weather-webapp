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
    this._elControls =  elementIdsToHtmlElements(config, elementConfigKey);
  }

  /**
   * Attach click handlers to HTML elements
   */
  attachClickHandlers() {
    // attachOnClickEvent(this._unitSwitchEl, this.onClick, this);
  }

  /**
   * Search button click handler
   * @param {object} e - click event
   */
  actionSearch(e) {

  }
}