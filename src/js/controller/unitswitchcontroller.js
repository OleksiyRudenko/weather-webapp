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

  /**
   * Runs main job
   */
  run() {
    this.attachOnClickHandler(this.uiElements.container, this.onClick);
    this.render();
  }

  /**
   * Render UI
   */
  render() {
    this.dependencies.SettingsService.settingsPromise.then( value => {
      const unit = this.dependencies.SettingsService.units;
      const unitElementsList = this.uiElements.container.children;
      let unit0 = unitElementsList[0], unit1 = unitElementsList[1];
      if (unit === 'imperial') {
        [unit1, unit0] = [unit0, unit1];
      }
      unit0.classList.add('active');
      unit1.classList.remove('active');
    });
  }

  /**
   * click handler
   * @param {object} e - click event
   */
  onClick(e) {
    this.dependencies.SettingsService.switchUnits();
    const unitElementsList = this.uiElements.container.children;
    for (let el of unitElementsList) {
      el.classList.toggle('active');
    }
    this.dependencies.CityInputController.actionSearch();
    this.dependencies.CityInputController.focus();
  }
}
