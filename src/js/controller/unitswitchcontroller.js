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
    this.render();
  }

  /**
   * Render UI
   */
  render() {
    this._settingsService.settingsPromise.then( value => {
      const unit = this._settingsService.units;
      const unitElementsList = this._unitSwitchEl.children;
      let unit0 = unitElementsList[0], unit1 = unitElementsList[1];
      if (unit === 'imperial') {
        [unit1, unit0] = [unit0, unit1];
      }
      /* console.log(unit);
      console.log(unit0);
      console.log(unit1); */
      unit0.classList.add('active');
      unit1.classList.remove('active');
    });
  }

  /**
   * click handler
   * @param {object} e - click event
   */
  onClick(e) {
    this._settingsService.switchUnits();
    const unitElementsList = this._unitSwitchEl.children;
    for (let el of unitElementsList) {
      el.classList.toggle('active');
    }
  }
}