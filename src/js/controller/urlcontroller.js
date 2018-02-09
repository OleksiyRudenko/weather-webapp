import AppControllerComponent from './../framework/appcontrollercomponent.js';

/** Class representing url controller. */
export default class UrlController extends AppControllerComponent {
  /**
   * Create url controller.
   * @constructor
   */
  constructor(appConfig) {
    super();
    this.config = {
      baseUrl: 'baseUrl',
    };
    this._appConfig = appConfig;
    this._cityInputController = null;
  }

  /**
   * Binds city input controller
   * @param {CityInputController} cityInputController
   */
  bindCityInputController(cityInputController) {
    this._cityInputController = cityInputController;
  }

  /**
   * Updates URL
   * @param {string} cityName
   */
  updateUrl(cityName) {
    // TODO: CityInputController calls this method too early
    history.pushState({}, document.title, this.config.baseUrl + '?q=' + cityName );
  }

  /**
   * Extract city name from url
   */
  getCityName() {
    const url = new URL(window.location.href);
    const cityName = url.searchParams.get('q');
    console.log('Q=' + cityName);
    return cityName;
  }

  run() {
    const cityName = this.getCityName();
    if (this.dependencies.CityInputController && cityName) {
      this.dependencies.CityInputController.setValue(cityName);
    }
  }
}
