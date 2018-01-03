/** Class representing city input controller. */
class CityInputController {
  /**
   * Create city input controller.
   * @constructor
   * @param {object} appConfig - city list service
   * @param {object} services - app services register
   */
  constructor(appConfig, services) {
    const config = appConfig.search;
    const elementConfigKey = ['gps', 'favNo', 'favYes', 'favDropDown', 'textInput', 'searchAction'];
    this._elContainer = document.getElementById(config.container);
    this._elControls =  elementIdsToHtmlElements(config, elementConfigKey);
    this.attachClickHandlers();
  }

  /**
   * Attach click handlers to HTML elements
   */
  attachClickHandlers() {
    attachOnClickEvent(this._elControls.searchAction, this.actionSearch, this);
    this._elControls.textInput.onkeyup = this.onUserCharInput.bind(this); // onkeydown/keypress caused missing last key pressed
    this._elControls.textInput.onblur = this.onUserInputBlur.bind(this);
  }

  /**
   * Search button click handler
   * @param {object} e - click event
   */
  actionSearch(e) {
    if (this._elControls.textInput.value.length >=3) {

    }
  }

  /**
   * Validates user input, activates and deactivates search button
   * @param {object} e - keydown event
   */
  onUserCharInput(e) {
    const target = this._elControls.textInput;
    const keyCode = e.keyCode;
    const key = e.key;
    const code = e.code;
    let caretPosition = getCaretPosition(target);

    console.log('>"'+target.value.replace(/\s/g,'*')+'" caret@' + caretPosition);
    // skip initial spaces and every second space
    if (['Space', 'Backspace', 'Delete'].includes(code)) {
      target.value = sanitizeWhitespaces(target.value);
    }
    target.value = sanitizeWhitespaces(target.value);

    caretPosition = getCaretPosition(target);
    console.log('<"'+target.value.replace(/\s/g,'*')+'" caret@' + caretPosition);
  }

  /**
   * Sanitize user input
   * @param {object} e - keydown event
   */
  onUserInputBlur(e) {
    const target = this._elControls.textInput;
    target.value = sanitizeWhitespaces(target.value, true);

  }
}