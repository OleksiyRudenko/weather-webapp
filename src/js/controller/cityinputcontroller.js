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

    // class settings
    this._settings = {
      minChar: 3,
    };

    // chores
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
    this._elControls.textInput.onblur = this.onUserInputBlur.bind(this);
  }

  /**
   * Search button click handler
   * @param {object} e - click event
   */
  actionSearch(e) {
    if (this._elControls.textInput.value.length < this._settings.minChar) return;

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
    let caretPosition = getCaretPosition(target);

    console.log('>"'+target.value.replace(/\s/g,'*')+'" caret@' + caretPosition);
    // skip initial spaces and every second space
    if (['Space', 'Backspace', 'Delete'].includes(code)) {
      target.value = sanitizeWhitespaces(target.value);
    }
    target.value = sanitizeWhitespaces(target.value);

    caretPosition = getCaretPosition(target);
    console.log('<"'+target.value.replace(/\s/g,'*')+'" caret@' + caretPosition);

    if (target.value.length >= this._settings.minChar) {
      this._elControls.searchAction.classList.remove('btn-inactive');
    } else {
      this._elControls.searchAction.classList.add('btn-inactive');
    }
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