/** Class representing city input controller. */
class CityInputController {
  /**
   * Create city input controller.
   * @constructor
   * @param {object} appConfig - city list service
   * @param {object} services - app services register
   * @param {WeatherController} weatherController - weather controller
   * @param {SearchHistoryController} searchHistoryController
   */
  constructor(appConfig, services, weatherController, searchHistoryController) {
    const config = appConfig.search;
    const elementConfigKey = ['gps', 'favNo', 'favYes', 'favDropDown', 'textInput', 'searchAction'];

    this._services = services;
    this._weatherController = weatherController;
    this._searchHistoryController = searchHistoryController;

    // class settings
    this._settings = {
      minChar: 3,
    };

    // html elements
    this._elContainer = document.getElementById(config.container);
    this._elControls =  elementIdsToHtmlElements(config, elementConfigKey);

    // chores
    this.attachClickHandlers();
  }

  /**
   * Attach click handlers to HTML elements
   */
  attachClickHandlers() {
    attachOnClickEvent(this._elControls.searchAction, this.actionSearch, this);
    this._elControls.textInput.onkeydown = this.onUserCharInput.bind(this);
    this._elControls.textInput.onkeyup = this.onUserCharInput.bind(this); // onkeydown/keypress caused missing last key pressed
    this._elControls.textInput.onfocus = this.onUserInputFocus.bind(this);
    this._elControls.textInput.onblur = this.onUserInputBlur.bind(this);
  }

  /**
   * Search button click handler
   * @param {object} e - click event
   */
  actionSearch(e) {
    const apiQueryClass = ['current', 'forecast5'];
    if (this._elControls.textInput.value.length < this._settings.minChar) return;
    // predict user input content type if [\d.,\w] only then geo coords
    const userInput = this._elControls.textInput.value;
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
    queryData.units = this._services.SettingsService.units;
    // render forecast
    const cityNameUpdate = this.renderForecasts(
      this._services.WeatherService.apiRequest(apiQueryClass[0], userInputType, queryData),
      this._services.WeatherService.apiRequest(apiQueryClass[1], userInputType, queryData),
      (userInputType === 'cityname') ? true : false
    );
    cityNameUpdate.then(value => {
      if (value) {
        // update user input field
        this._elControls.textInput.value = value;
        // update search history
        this._services.CityHistoryService.addEntry({
          name: value,
        });

        // manage favourites
      }
    });
  }

  /**
   * Validates user input, activates and deactivates search button
   * @param {object} e - keydown event
   */
  onUserCharInput(e) {
    const target = this._elControls.textInput;
    // see https://stackoverflow.com/questions/2353550/how-to-capture-a-backspace-on-the-onkeydown-event for keys/codes details
    const keyCode = e.keyCode;
    const key = e.key;
    const code = e.code;
    const eventType = e.type; // keyup, keydown
    let caretPosition = getCaretPosition(target);
    // console.log(e);

    // DEBUG: console.log('>"'+target.value.replace(/\s/g,'*')+'" caret@' + caretPosition);
    // remove letters if input value starts with [\-.\d] as an indication of geocoords input
    if (target.value.length > 0 && /^[\-\d.,]/.test(target.value)) {
      target.value = target.value.replace(/[^\-\d.,\s]/g,'');
    }

    // skip initial spaces and every second space
    /*if (['Space', 'Backspace', 'Delete'].includes(key)) {
      target.value = sanitizeWhitespaces(target.value);
    } */

    target.value = sanitizeWhitespaces(target.value);

    caretPosition = getCaretPosition(target);
    // DEBUG: console.log('<"'+target.value.replace(/\s/g,'*')+'" caret@' + caretPosition);

    if (target.value.length >= this._settings.minChar) {
      this._elControls.searchAction.classList.remove('btn-inactive');
      if (eventType === 'keyup' && key === 'Enter') {
        this._elControls.textInput.blur();
        this._elControls.searchAction.click();
      }
    } else {
      this._elControls.searchAction.classList.add('btn-inactive');
    }
    console.log(eventType + '>' + key + ':' + code + ':' + keyCode);
    if (eventType === 'keyup' && target.value.length === 0 && key !== 'Escape') {
      this.onUserInputFocus({
        target: this._elControls.textInput,
      });
    } else {
      // hide history
      this._searchHistoryController.hide();
    }
    // hide history on escape key
    if (eventType === 'keyup' && key === 'Escape') {
      console.log('HIDE');
      this._searchHistoryController.hide();
    }
  }

  /**
   * Sanitize user input
   * @param {object} e - keydown event
   */
  onUserInputBlur(e) {
    const target = this._elControls.textInput;
    target.value = sanitizeWhitespaces(target.value, true);
    console.log('Blurring out');
    setTimeout(this._searchHistoryController.hide.bind(this._searchHistoryController), 100);
  }

  /**
   * Called when user focuses on input field and/or input field is empty
   * @param {Event} e
   */
  onUserInputFocus(e) {
    console.log(e);
    if (e.target.value.length === 0)
      this._searchHistoryController.show();
  }

  /**
   * Renders forecasts to UI via WeatherController
   * @param {Promise} current json
   * @param {Promise} forecast json
   * @param {boolean} updateCityName - whether city name update expected
   * returns {Promise|null} - updated city name if required
   */
  renderForecasts(current, forecast, updateCityName) {
    this._weatherController.renderForecast(forecast);
    const result = this._weatherController.renderToday(current, updateCityName);
    console.log(result);
    return result;
  }

  /**
   * Provides action targets
   * @returns {Object} { textInputElement:, actionSearchElement: }
   */
  getTargets() {
    return {
      textInputElement: this._elControls.textInput,
      actionSearchElement: this._elControls.searchAction,
    };

  }
}