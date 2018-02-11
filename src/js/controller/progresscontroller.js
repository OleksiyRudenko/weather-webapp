import AppUiControllerComponent from "../framework/appuicontrollercomponent.js";
/** Class representing progress feedback controller. */
export default class ProgressController extends AppUiControllerComponent {
  /**
   * Create progress feedback controller.
   * @constructor
   */
  constructor() {
    super();
    this.config = {};
    this.dependencies = {};
    this._count = 0;
    this._total = 0;
  }

  /* === Public methods === */

  /**
   * Show container with initial message
   * @param {string} action
   * @param {string} unit - measuring unit, e.g. '%', ' pcs', ''
   * @param {number} total - max value; if ==0 then not shown
   */
  show(action, unit, total) {
    action && (this.uiElements.action.innerText=action + ': ');
    this._count = 0;
    this.uiElements.count.innerText = '0';
    this.uiElements.countUnit.innerText = unit;
    this._total = total;
    total && (this.uiElements.ofConjunction.innerText=' of ')
    && (this.uiElements.total.innerText=total)
    && (this.uiElements.totalUnit.innerText=unit);
    this.uiElements.container.classList.add('display-block');
  }

  /**
   * Hide container
   * @param {number} delay ms
   */
  hide(delay) {
    setTimeout(() => {
      this.uiElements.container.classList.remove('display-block');
    }, delay);
  }

  /* === Private methods : SECONDARY === */

  /**
   * Set counter
   * @param {number} count - new value for counter; must be in [0..total], otherwise assigned with total
   */
  setCount(count) {
    this._count = (count < 0 || count > this._total) ? this._total : count;
    this.uiElements.count.innerText = this._count;
  }

  /**
   * Increase counter
   * @param {number} increment
   */
  addCount(increment) {
    this._count += increment;
    if (this._total && this._count > this._total) this._count = this._total;
    this.uiElements.count.innerText = this._count;
  }
}
