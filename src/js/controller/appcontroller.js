import AppUiControllerComponent from './../framework/appuicontrollercomponent.js';

/**
 * Class representing main app controller.
 * Bootstraps application using global app config
 */
export default class AppController extends AppUiControllerComponent {
  /**
   * AppController constructor
   * @param {Object} config - global config for components
   */
  constructor(config) {
    super();
    this.setConfig(config);
    this.createComponents();
    this.findUiElements();
  }

  /**
   * Creates required app components
   */
  createComponents() {
    this.setDependencies({
      Controllers: {},
      Services: {},
    });
    this.setUiElements({
    });
  }

  /**
   * Finds required UI elements
   */
  findUiElements() {
    this.setUiElements({
      UiElements: {},
    });
  }
}

