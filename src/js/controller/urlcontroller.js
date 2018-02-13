import AppControllerComponent from './../framework/appcontrollercomponent.js';
import CityInputController from "./cityinputcontroller.js";

/** Class representing url controller. */
export default class UrlController extends AppControllerComponent {
  /**
   * Create url controller.
   * @constructor
   */
  constructor() {
    super();
    this.config = {
      baseUrl: 'baseUrl',
    };
    this.dependencies = {
      CityInputController: 'CityInputController',
    };
  }

  /* === Public methods === */

  /**
   * Component initial activities
   */
  run() {
    super.run();
    // this.debugThisClassName('run');
    const cityName = this.getCityName();
    window.addEventListener('popstate', this.onHistoryNavigation.bind(this), true);
    if (this.dependencies.CityInputController && cityName) {
      this.dependencies.CityInputController.setValue(cityName, null, false);
      this.dependencies.CityInputController.actionSearch();
    }
  }

  /**
   * Updates URL
   * @param {string} cityName
   */
  updateUrl(cityName, caller) {
    this.debugThisClassName('updateUrl('+cityName+') from '+caller);
    const targetUrl = this.config.baseUrl + '?q=' + cityName;
    console.log(window.location + ' -- ' + targetUrl);
    if (window.location !== targetUrl)
      history.pushState({}, document.title + ': ' + cityName, targetUrl);
  }

  /* === Private methods : SECONDARY === */

  onHistoryNavigation(e) {
    // if (e.state) {
      const cityName = this.getCityName();
      this.debugThisClassName('onHistoryNavigation');
      console.log(e.state);
      if (this.dependencies.CityInputController && cityName) {
        this.dependencies.CityInputController.setValue(cityName, null, false);
        this.dependencies.CityInputController.actionSearch('no-url-update');
      }
    // }
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

}
