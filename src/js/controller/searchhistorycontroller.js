import AppUiControllerComponent from "../framework/appuicontrollercomponent.js";
import CityHistoryService from "../service/cityhistoryservice.js";
import CityInputController from "./cityinputcontroller.js";

/** Class representing search history service. */
export default class SearchHistoryController extends AppUiControllerComponent {
  /**
   * Create city browse history controller.
   * @constructor
   */
  constructor() {
    super();
    this.config = {};
    this.dependencies = {
      Services: {
        CityHistoryService: 'CityHistoryService',
      },
      UiControllers: {
        CityInputController: 'CityInputController',
      },
    };
    this._isActive = false;
  }

  /* === Public methods === */

  /**
   * Component initial activities
   */
  run() {
    super.run();
    // this.debugThisClassName('run');
    this.attachOnClickHandler(this.uiElements.container, this.onClick);
  }

  /**
   * Shows search history list
   */
  show() {
    this.dependencies.Services.CityHistoryService.getItems().then(list => {
      // show history
      this.uiElements.container.innerHTML = list.map((value, index) =>
        '<div id="city-list-element-' + index + '" class="city-list-element">' + value + '</div>'
      ).join('');
      this.uiElements.container.classList.add('city-container-visible');
      this._isActive = true;
    });
  }

  /**
   * Hides search history list
   */
  hide() {
    this._isActive = false;
    this.uiElements.container.classList.remove('city-container-visible');
  }

  /* === Private methods : MAIN JOBS === */

  /**
   * Handles item click
   * @param {Event} e
   */
  onClick(e) {
    const target = e.target;
    const cityName = e.target.textContent;
    /* console.log('Clicked on ' + cityName);
    console.log(e); */

    // Hide list
    this._isActive = false;
    this.uiElements.container.classList.remove('city-container-visible');

    this.dependencies.UiControllers.CityInputController.setValue(cityName);
  }
}
