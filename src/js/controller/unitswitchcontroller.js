/** Class representing unit switch controller. */
class UnitSwitchController {
  /**
   * Create unit switch controller.
   * @constructor
   * @param {object} settingsService - settings service
   * @param {string} unitSwitchElId - unit switch element id
   */
  constructor(settingsService, unitSwitchElId) {
    this._settingsService = settingsService;
    this._unitSwitchEl = document.getElementById(unitSwitchElId);
    this._unitSwitchEl.onclick = this.onClick.bind(this);
    this._unitSwitchEl.ontouchstart = this.onClick.bind(this);
  }

  /**
   * click handler
   * @param {object} e - click event
   */
  onClick(e) {
    this._settingsService.switchUnits();
    const list = this._unitSwitchEl.children;
    for (let el of list) {
      el.classList.toggle('active');
    }
  }
}