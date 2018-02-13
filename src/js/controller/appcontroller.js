import AppControllerComponent from './../framework/appcontrollercomponent.js';
import {traverseObjectAndChange} from "../helper.js";
import UnitSwitchController from "./unitswitchcontroller.js";
import UrlController from "./urlcontroller.js";
import ProgressController from "./progresscontroller.js";
import CityInputController from "./cityinputcontroller.js";
import SearchHistoryController from "./searchhistorycontroller.js";
import WeatherController from "./weathercontroller.js";
import CityHistoryService from "../service/cityhistoryservice.js";
import CityListService from "../service/citylistservice.js";
import FavCityService from "../service/favcityservice.js";
import SettingsService from "../service/settingsservice.js";
import StorageService from "../service/storageservice.js";
import WeatherService from "../service/weatherservice.js";
import MoodController from "./moodcontroller.js";
import GuideController from "./guidecontroller.js";
import FavCityController from "./favcitycontroller.js";

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
    this.feedConfigToComponents();
    this.findUiElements();
    this.feedUiElementsToUiControllers();
    this.bindDependencies();
  }

  /* === Public methods === */

  /**
   * Launches root components
   */
  runRoot() {
    super.runRoot();
    // launch Services
    Object.keys(this.dependencies.Services).forEach((key, idx) => {
      this.dependencies.Services[key].runRoot();
    });
    // launch functional Controllers
    // launch UI Controllers
    Object.keys(this.dependencies.Controllers).forEach((key, idx) => {
      this.dependencies.Controllers[key].runRoot();
    });
    // launch UI Controllers
    Object.keys(this.dependencies.UiControllers).forEach((key, idx) => {
      this.dependencies.UiControllers[key].runRoot();
    });

    this.run();
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

  /* === Private methods === */

  /**
   * Creates required app components
   */
  createComponents() {
    this.setDependencies({
      Services: {
        CityHistoryService: new CityHistoryService(),
        CityListService: new CityListService(),
        FavCityService: new FavCityService(),
        SettingsService: new SettingsService(),
        StorageService: new StorageService(),
        WeatherService: new WeatherService(),
      },
      Controllers: {
        UrlController: new UrlController(),
      },
      UiControllers: {
        UnitSwitchController: new UnitSwitchController(),
        ProgressController: new ProgressController(),
        CityInputController: new CityInputController(),
        SearchHistoryController: new SearchHistoryController(),
        WeatherController: new WeatherController(),
        MoodController: new MoodController(),
        GuideController: new GuideController(),
        FavCityController: new FavCityController(),
      },
    });
  }

  /**
   * Feeds entries required by each component from config.config
   */
  feedConfigToComponents() {
    traverseObjectAndChange(this.dependencies, component => {
      component.config = traverseObjectAndChange(component.config, entry => this.config.config[entry]);
    });
  }

  /**
   * Finds required UI elements and updates config accordingly
   */
  findUiElements() {
    this.config.uiElements = traverseObjectAndChange(this.config.uiElements, value => document.getElementById(value));
  }

  /**
   * Feeds each UI Controller required elements
   */
  feedUiElementsToUiControllers() {
    Object.keys(this.dependencies.UiControllers).forEach((uiControllerName, idx) => {
      this.dependencies.UiControllers[uiControllerName].setUiElements(this.config.uiElements[uiControllerName]);
    });
  }

  /**
   * Interbinds components as dependencies
   */
  bindDependencies() {
    // flatten the tree
    let dependenciesList = Object.assign({},
      this.dependencies.Services, this.dependencies.Controllers, this.dependencies.UiControllers);
    // bind
    traverseObjectAndChange(this.dependencies, component => {
      component.dependencies = traverseObjectAndChange(component.dependencies, entry => dependenciesList[entry]);
    });
  }
}

