/** Class representing search history service. */
class SearchHistoryController {
  /**
   * Create city browse history controller.
   * @constructor
   * @param {object} appConfig - application config
   * @param {object} cityHistoryService - city history service
   */
  constructor(appConfig, cityHistoryService) {
    this._config = appConfig.historyView;
    this._cityHistoryService = cityHistoryService;
    this._elContainer = document.getElementById(this._config.container);
    this._isActive = false;
  }

  /**
   * Shows search history list
   */
  show() {
    this._cityHistoryService.getItems().then(list => {
      // show history
      this._elContainer.innerHTML = '<div class="city-list-element">'
        + list.join('</div><div class="city-list-element">')
        + '</div>';
      this._elContainer.classList.add('city-container-visible');
      this._isActive = true;
    });
  }

  /**
   * Hides search history list
   */
  hide() {
    this._isActive = false;
    this._elContainer.classList.remove('city-container-visible');
  }

}