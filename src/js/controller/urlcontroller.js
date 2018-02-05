/** Class representing url controller. */
class UrlController {
  /**
   * Create url controller.
   * @constructor
   */
  constructor(appConfig) {
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
    history.pushState({}, document.title, this._appConfig.baseUrl + '?q=' + cityName );
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

  makeInitialSearch() {
    const cityName = this.getCityName();
    if (this._cityInputController && cityName) {
      this._cityInputController.setValue(cityName);
    }
  }
}

export { UrlController };
