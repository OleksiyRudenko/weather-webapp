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
    this._unitSwitchEl.onclick = this.onClick.bind(this);
    this._unitSwitchEl.ontouchstart = this.onClick.bind(this);
  }

  onClick(e) {
    this._settingsService.switchUnits();
    const list = this._unitSwitchEl.children;
    for (let el of list) {
      el.classList.toggle('active');
    }
  }
}