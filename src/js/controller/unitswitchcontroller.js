import * as helper from './../helper.js';

/** Class representing unit switch controller. */
export default class UnitSwitchController {
  /**
   * Create unit switch controller.
   * @constructor
   * @param {object} appConfig - city list service
   * @param {CityInputController} cityInputController
   * @param {SettingsService} settingsService - settings service
   */
  constructor(appConfig, cityInputController, settingsService) {
    this._config = appConfig.unitSwitch;
    this._cityInputController = cityInputController;
    this._settingsService = settingsService;
    this._unitSwitchEl = document.getElementById(this._config.container);
    helper.attachOnClickEvent(this._unitSwitchEl, this.onClick, this);
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
    this._cityInputController.actionSearch();
    this._cityInputController.focus();
  }
}
