import AppControllerComponent from './../framework/appcontrollercomponent.js';
import {traverseObject} from "../helper.js";

/**
 * Class representing main app controller.
 * Bootstraps application using global app config
 */
export default class AppController extends AppControllerComponent {
  /**
   * AppController constructor
   * @param {Object} config - global config for components
   */
  constructor(config) {
    super();
    this.setConfig(config);
    this.findUiElements();
    this.createComponents();
  }

  /**
   * Creates required app components
   */
  createComponents() {
    this.setDependencies({
      Controllers: {},
      Services: {},
    });
  }

  /**
   * Finds required UI elements and updates config accordingly
   */
  findUiElements() {
    this.config.uiElements = traverseObject(this.config.uiElements, value => document.getElementById(value));
  }
}

