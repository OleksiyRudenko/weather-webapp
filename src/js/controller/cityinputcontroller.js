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

  run() {
    super.run();
    // this.debugThisClassName('run');
    this.attachClickHandlers();
  }

  /**
   * Attach click handlers to HTML elements
   */
  attachClickHandlers() {
    this.attachOnClickHandler(this.uiElements.searchAction, this.actionSearch);
    this.uiElements.textInput.onkeydown = this.onUserCharInput.bind(this);
    this.uiElements.textInput.onkeyup = this.onUserCharInput.bind(this); // onkeydown/keypress caused missing last key pressed
    this.uiElements.textInput.onfocus = this.onUserInputFocus.bind(this);
    this.uiElements.textInput.onblur = this.onUserInputBlur.bind(this);
  }

  /**
   * Search button click handler
   * @param {object} event - click event
   */
  actionSearch(event) {
    const apiQueryClass = ['current', 'forecast5'];
    if (this.uiElements.textInput.value.length < this._settings.minChar) return;
    // predict user input content type if [\d.,\w] only then geo coords
    const userInput = this.uiElements.textInput.value;
    const userInputType = /^[\-\d\s,.]+$/.test(userInput) ? 'latlon' : 'cityname';
    console.log('Search by ' + userInputType);
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
        this.dependencies.UiControllers.UrlController.updateUrl(encodeURIComponent(value));

        // manage favourites
      }
    });
  }

  /**
   * Focus user input
   */
  focus() {
    this.uiElements.textInput.focus();
    if (!this.uiElements.textInput.value.length)
      this.dependencies.UiControllers.SearchHistoryController.show();
  }

  /**
   * Set user input value, position caret, invoke search|history
   * @param {string} value
   * @param {number|null|-1} caretPosition; -1 => value.length
   * @param {boolean} doSearch
   */
  setValue(value, caretPosition=null, doSearch=true) {
    console.log('cityInput: "' + value + '"(' + value.length + '), caret:' + caretPosition + '; doSearch:' + doSearch);
    if (value.length) {
      this.uiElements.textInput.value = value;
      if (value.length >= this._settings.minChar) {
        this.uiElements.searchAction.classList.remove('btn-inactive');
        if (doSearch) {
          this.uiElements.textInput.blur();
          this.uiElements.searchAction.click();
        } else if (caretPosition !== null) {
          if (caretPosition === -1) caretPosition = value.length;
          helper.setCaretPosition(this.uiElements.textInput, caretPosition);
        }
      } else {
        this.uiElements.searchAction.classList.add('btn-inactive');
      }
    } else {
      this.uiElements.textInput.value = '';
      this.uiElements.searchAction.classList.add('btn-inactive');
      this.dependencies.UiControllers.SearchHistoryController.show();
    }
  }

  /**
   * Validates user input, activates and deactivates search button
   * @param {object} e - keydown event
   */
  onUserCharInput(e) {
    const target = this.uiElements.textInput;
    // see https://stackoverflow.com/questions/2353550/how-to-capture-a-backspace-on-the-onkeydown-event for keys/codes details
    const keyCode = e.keyCode;
    const key = e.key;
    const code = e.code;
    const eventType = e.type; // keyup, keydown
    let caretPosition = helper.getCaretPosition(target);
    // console.log(e);

    // DEBUG: console.log('>"'+target.value.replace(/\s/g,'*')+'" caret@' + caretPosition);
    // remove letters if input value starts with [\-.\d] as an indication of geocoords input
    if (target.value.length > 0 && /^[\-\d.,]/.test(target.value)) {
      target.value = target.value.replace(/[^\-\d.,\s]/g,'');
    }

    // skip initial spaces and every second space
    /*if (['Space', 'Backspace', 'Delete'].includes(key)) {
      target.value = helper.sanitizeWhitespaces(target.value);
    } */

    target.value = helper.sanitizeWhitespaces(target.value);

    caretPosition = helper.getCaretPosition(target);
    // DEBUG: console.log('<"'+target.value.replace(/\s/g,'*')+'" caret@' + caretPosition);

    if (target.value.length >= this._settings.minChar) {
      this.uiElements.searchAction.classList.remove('btn-inactive');
      if (eventType === 'keyup' && key === 'Enter') {
        this.uiElements.textInput.blur();
        this.uiElements.searchAction.click();
      }
    } else {
      this.uiElements.searchAction.classList.add('btn-inactive');
    }
    console.log(eventType + '>' + key + ':' + code + ':' + keyCode);
    if (eventType === 'keyup' && target.value.length === 0 && key !== 'Escape') {
      this.onUserInputFocus({
        target: this.uiElements.textInput,
      });
    } else {
      // hide history
      this.dependencies.UiControllers.SearchHistoryController.hide();
    }
    // hide history on escape key
    if (eventType === 'keyup' && key === 'Escape') {
      console.log('HIDE');
      this.dependencies.UiControllers.SearchHistoryController.hide();
    }
  }

  /**
   * Sanitize user input
   * @param {object} e - keydown event
   */
  onUserInputBlur(e) {
    const target = this.uiElements.textInput;
    target.value = helper.sanitizeWhitespaces(target.value, true);
    console.log('Blurring out');
    setTimeout(this.dependencies.UiControllers.SearchHistoryController
      .hide.bind(this.dependencies.UiControllers.SearchHistoryController), 200);
  }

  /**
   * Called when user focuses on input field and/or input field is empty
   * @param {Event} e
   */
  onUserInputFocus(e) {
    console.log(e);
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
    console.log(result);
    return result;
  }

  /**
   * Provides action targets
   * @returns {Object} { textInputElement:, actionSearchElement: }
   */
  /* TODO: remove this method
  getTargets() {
    return {
      textInputElement: this.uiElements.textInput,
      actionSearchElement: this.uiElements.searchAction,
    };

  } */
}
