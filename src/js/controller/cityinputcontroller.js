import * as helper from './../helper.js';
import AppUiControllerComponent from "../framework/appuicontrollercomponent.js";
import SearchHistoryController from "./searchhistorycontroller.js";
import UrlController from "./urlcontroller.js";
/** Class representing city input controller. */
export default class CityInputController extends AppUiControllerComponent {
  /**
   * Create city input controller.
   * @constructor
   */
  constructor() {
    super();
    this.config = {};
    this.dependencies = {
      Services: {
        CityHistoryService: 'CityHistoryService',
        SettingsService: 'SettingsService',
        WeatherService: 'WeatherService',
      },
      UiControllers: {
        WeatherController: 'WeatherController',
        SearchHistoryController: 'SearchHistoryController',
        UrlController: 'UrlController',
      }
    };

    // class settings
    this._settings = {
      minChar: 3,
    };
  }

  /* === Public methods === */

  /**
   * Component initial activities
   */
  run() {
    super.run();
    // this.debugThisClassName('run');
    this.attachClickHandlers();
  }

  /* === Private methods : MAIN JOBS === */

  /**
   * Attach click handlers to HTML elements
   */
  attachClickHandlers() {
    this.attachOnClickHandler(this.uiElements.searchAction, this.actionSearch);
    this.uiElements.textInput.addEventListener('input', this.onUserCharInput.bind(this));
    this.uiElements.textInput.addEventListener('keydown', this.onUserSpecialKey.bind(this));
    this.uiElements.textInput.addEventListener('focus', this.onUserInputFocus.bind(this));
    this.uiElements.textInput.addEventListener('blur', this.onUserInputBlur.bind(this));
    this.attachOnClickHandler(this.uiElements.textInput, this.onUserInputClick);
  }

  /**
   * Search button click handler
   * @param {object} event - click event
   */
  actionSearch(event) {
    if (typeof event === 'object') {
      event.preventDefault();
    }
    // event.preventDefault();
    const apiQueryClass = ['current', 'forecast5'];
    if (this.uiElements.textInput.value.length < this._settings.minChar) return;
    // predict user input content type if [\d.,\w] only then geo coords
    const userInput = this.uiElements.textInput.value;
    const userInputType = /^[\-\d\s,.]+$/.test(userInput) ? 'latlon' : 'cityname';
    // console.log('Search by ' + userInputType);
    let queryData = {};
    switch (userInputType) {
      case 'cityname':
        queryData = {
          q: userInput,
          // type: 'like',
        };
        break;
      case 'latlon':
        const coordComponents = userInput.split(/[\s,]/);
        queryData = {
          lon: coordComponents[0],
          lat: coordComponents[coordComponents.length-1],
        };
        break;
    }
    // add units explicitly
    queryData.units = this.dependencies.Services.SettingsService.units;
    // render forecast
    const cityNameUpdate = this.renderForecasts(
      this.dependencies.Services.WeatherService.apiRequest(apiQueryClass[0], userInputType, queryData),
      this.dependencies.Services.WeatherService.apiRequest(apiQueryClass[1], userInputType, queryData),
      (userInputType === 'cityname') ? true : false
    );
    cityNameUpdate.then(value => {
      if (value) {
        // update user input field
        this.uiElements.textInput.value = value;
        // update search history
        this.dependencies.Services.CityHistoryService.addEntry({
          name: value,
        });
        // update url
        if (event !== 'no-url-update')
          this.dependencies.UiControllers.UrlController.updateUrl(encodeURIComponent(value), 'actionSearch');

        // manage favourites
      }
    });
  }

  /* === Private methods : SECONDARY === */

  /**
   * Focus user input
   */
  focus() {
    this.uiElements.textInput.focus();
    /* if (!this.uiElements.textInput.value.length) {
      this.dependencies.UiControllers.SearchHistoryController.show();
    } */
  }

  /**
   * Select all text
   */
  onUserInputClick() {
    this.uiElements.textInput.select();
  }

  /**
   * Set user input value, position caret, invoke search|history
   * @param {string} value
   * @param {number|null|-1} caretPosition; -1 => value.length
   * @param {boolean} doSearch
   */
  setValue(value, caretPosition=null, doSearch=true) {
    // this.debugThisClassName('setValue');
    // console.log('cityInput: "' + value + '"(' + value.length + '), caret:' + caretPosition + '; doSearch:' + doSearch);
    if (value.length) {
      this.uiElements.textInput.value = value;
      if (value.length >= this._settings.minChar) {
        this.uiElements.searchAction.disabled = false;
        if (doSearch) {
          this.uiElements.textInput.blur();
          this.uiElements.searchAction.click();
        } else if (caretPosition !== null) {
          if (caretPosition === -1) caretPosition = value.length;
          helper.setCaretPosition(this.uiElements.textInput, caretPosition);
        }
      } else {
        this.uiElements.searchAction.disabled = true;
      }
    } else {
      this.uiElements.textInput.value = '';
      this.uiElements.searchAction.disabled = true;
      this.dependencies.UiControllers.SearchHistoryController.show();
    }
  }

  /**
   * Validates user input, activates and deactivates search button
   * @param {object} e - input event
   */
  onUserCharInput(e) {
    const target = this.uiElements.textInput;
    // remove letters if input value starts with [\-.\d] as an indication of geocoords input
    if (target.value.length > 0 && /^[\-\d.,]/.test(target.value)) {
      target.value = target.value.replace(/[^\-\d.,\s]/g,'');
    }
    target.value = helper.sanitizeWhitespaces(target.value);
    this.uiElements.searchAction.disabled = (target.value.length < this._settings.minChar) ? true : false;
    if (target.value.length === 0) {
      this.dependencies.UiControllers.SearchHistoryController.show();
    } else {
      this.dependencies.UiControllers.SearchHistoryController.hide();
    }
  }

  /**
   * Processes non-alphanumeric key presses
   * @param {Event} e - keydown event
   */
  onUserSpecialKey(e) {
    switch (e.keyCode) {
      case 13:
        this.uiElements.textInput.blur();
        this.uiElements.searchAction.click();
        break;
      case 27:
        this.dependencies.UiControllers.SearchHistoryController.hide();
        break;
      case 40:
        // this.debugThisClassName('onUserSpecialKey');
        this.dependencies.UiControllers.SearchHistoryController.show().then(() =>
          this.dependencies.UiControllers.SearchHistoryController.focus());
        break;
    }
  }

  /**
   * Sanitize user input and hide lists on blur
   * @param {Event} e - blur event
   */
  onUserInputBlur(e) {
    const target = this.uiElements.textInput;
    target.value = helper.sanitizeWhitespaces(target.value, true);
    // console.log('Blurring out');
    /* setTimeout(this.dependencies.UiControllers.SearchHistoryController
      .hide.bind(this.dependencies.UiControllers.SearchHistoryController), 200); */
  }

  /**
   * Called when user focuses on input field and/or input field is empty
   * @param {Event} e
   */
  onUserInputFocus(e) {
    // console.log(e);
    if (e.target.value.length === 0)
      this.dependencies.UiControllers.SearchHistoryController.show();
  }

  /**
   * Renders forecasts to UI via WeatherController
   * @param {Promise} current json
   * @param {Promise} forecast json
   * @param {boolean} updateCityName - whether city name update expected
   * returns {Promise|null} - updated city name if required
   */
  renderForecasts(current, forecast, updateCityName) {
    this.dependencies.UiControllers.WeatherController.renderForecast(forecast);
    const result = this.dependencies.UiControllers.WeatherController.renderToday(current, updateCityName);
    // console.log(result);
    return result;
  }
}
