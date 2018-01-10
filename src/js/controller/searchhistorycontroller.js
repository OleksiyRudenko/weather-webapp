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
  }

  /**
   * Shows search history list
   */
  show() {
    this._cityHistoryService.getItems().then(list => {
      // show history
      console.log(list);
    });
  }

  /**
   * Hides search history list
   */
  hide() {

  }

}