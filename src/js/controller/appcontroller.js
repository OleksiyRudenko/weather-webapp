import AppControllerComponent from './../framework/appcontrollercomponent.js';
import {traverseObjectAndChange} from "../helper.js";
import UnitSwitchController from "./unitswitchcontroller";
import {Services, Controllers} from "./../app.js"; // temporary migrational

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
    this.createComponents();
    this.findUiElements();
    this.feedUiElementsToUiControllers();
    this.bindDependencies();
  }

  /**
   * Creates required app components
   */
  createComponents() {
    this.setDependencies({
      Services: {},
      Controllers: {},
      UiControllers: {
        UnitSwitchController: new UnitSwitchController(),
      },
    });
  }

  /**
   * Interbinds components as dependencies
   */
  bindDependencies() {
    // TODO: take component.dependencies => traverse(replace with with reference from AppController.dependencies)
    this.dependencies.UiControllers.UnitSwitchController.setDependencies({
      SettingsService: Services.SettingsService,            // temporary -- external reference
      CityInputController: Controllers.CityInputController, // temporary -- external reference
    });
  }

  /**
   * Feeds each UI Controller required elements
   */
  feedUiElementsToUiControllers() {
    this.debugThisClassName('feedUiElementsToUiControllers');
    console.log(this.dependencies);
    Object.keys(this.dependencies.UiControllers).forEach((uiControllerName, idx) => {
      this.dependencies.UiControllers[uiControllerName].setUiElements(this.config.uiElements[uiControllerName]);
    });
  }

  /**
   * Launches components
   */
  run() {
    // launch Services
    Object.keys(this.dependencies.Services).forEach((key, idx) => {
      this.dependencies.Services[key].run();
    });
    // launch functional Controllers
    // launch UI Controllers
    Object.keys(this.dependencies.Controllers).forEach((key, idx) => {
      this.dependencies.Controllers[key].run();
    });
    // launch UI Controllers
    Object.keys(this.dependencies.UiControllers).forEach((key, idx) => {
      this.dependencies.UiControllers[key].run();
    });
  }

  /**
   * Finds required UI elements and updates config accordingly
   */
  findUiElements() {
    this.config.uiElements = traverseObjectAndChange(this.config.uiElements, value => document.getElementById(value));
  }
}

