/** Class representing unit switch controller. */
class UnitSwitchController {
  /**
   * Create weather service.
   * @constructor
   * @param {object} appConfig - application config
   */
  constructor(settingsService, unitSwitchElId) {
    this._settingsService = settingsService;
    this._unitSwitchEl = document.getElementById(unitSwitchElId);
  }
}