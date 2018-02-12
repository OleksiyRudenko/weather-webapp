import AppUiControllerComponent from './../framework/appuicontrollercomponent.js';
import SettingsService from './../service/settingsservice.js';

/** Class representing unit switch controller. */
export default class UnitSwitchController extends AppUiControllerComponent {
  /**
   * Create unit switch controller.
   * @constructor
   */
  constructor() {
    super();
    this.config = {};
    this.dependencies = {
      Services: {
        SettingsService: 'SettingsService',
      },
      UiControllers: {
        CityInputController: 'CityInputController',
      }
    };
  }

  /* === Public methods === */

  /**
   * Component initial activities
   */
  run() {
    super.run();
    // this.debugThisClassName('run');
    this.attachOnClickHandler(this.uiElements.container, this.onClick);
    this.render();
  }

  /* === Private methods : MAIN JOBS === */

  /**
   * click handler
   * @param {object} e - click event
   */
  onClick(e) {
    this.dependencies.Services.SettingsService.switchUnits();
    const unitElementsList = this.uiElements.container.children;
    for (let el of unitElementsList) {
      el.classList.toggle('unit-active');
    }
    this.dependencies.UiControllers.CityInputController.actionSearch();
    this.dependencies.UiControllers.CityInputController.focus();
  }

  /**
   * Render UI
   */
  render() {
    this.dependencies.Services.SettingsService.settingsPromise.then( value => {
      const unit = this.dependencies.Services.SettingsService.units;
      const unitElementsList = this.uiElements.container.children;
      let unit0 = unitElementsList[0], unit1 = unitElementsList[1];
      if (unit === 'imperial') {
        [unit1, unit0] = [unit0, unit1];
      }
      unit0.classList.add('unit-active');
      unit1.classList.remove('unit-active');
    });
  }

  /* === Private methods : SECONDARY === */

}
