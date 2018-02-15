import AppControllerComponent from './appcontrollercomponent.js';

/**
 * Class representing application UI controller component.
 * Adds default UI elements collection.
 * Extended by App UI Controllers.
 */
export default class AppUiControllerComponent extends AppControllerComponent {
  /**
   * AppUiControllerComponent constructor
   * @constructor
   */
  constructor() {
    super();
    this.uiElements = {}; // populated by AppController from global config.uiElements.<ComponentName> referring to HTMLElements
  }

  /* === Private methods : SECONDARY === */

  /**
   * Returns references to HTMLElements
   * @returns {object}
   */
  getUiElements() {
    return this.uiElements;
  }

  /**
   * Sets references to HTMLElements
   * @returns {object}
   */
  setUiElements(uiElements) {
    this.uiElements = uiElements;
  }

  /**
   * Attaches touch and mouse click handler to an element
   * @param {HTMLElement} htmlElement
   * @param {callback} eventHandler
   */
  attachOnClickHandler(htmlElement, eventHandler) {
    htmlElement.addEventListener('click', eventHandler.bind(this));
    htmlElement.addEventListener('touchstart', eventHandler.bind(this));
  }
}
