import AppControllerComponent from './appcontrollercomponent.js';

/**
 * Class representing application UI controller component.
 * Adds default UI elements collection.
 * Extended by App UI Controllers.
 */
export default class AppUiControllerComponent extends AppControllerComponent {
  /**
   * AppUiControllerComponent constructor
   */
  constructor() {
    super();
    this.uiElements = {};
  }

  getUiElements() {
    return this.uiElements;
  }

  setUiElements(uiElements) {
    this.uiElements = uiElements;
  }

  /**
   * Attaches touch and mouse click handler to an element
   * @param {HTMLElement} htmlElement
   * @param {callback} eventHandler
   */
  attachOnClickHandler(htmlElement, eventHandler) {
    htmlElement.onclick = eventHandler.bind(this);
    htmlElement.ontouchstart = eventHandler.bind(this);
  }
}
