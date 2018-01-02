/** Class representing progress feedback controller. */
class ProgressController {
  /**
   * Create progress feedback controller.
   * @constructor
   * @param {object} appConfig - application config
   */
  constructor(appConfig) {
    const config = appConfig.notification.progress;
    this._elContainer = document.getElementById(config.container);
    this._elMessage = {
      action: document.getElementById(config.action),
      count: document.getElementById(config.count),
      countUnit: document.getElementById(config.countUnit),
      ofConjunction: document.getElementById(config.ofConjunction),
      total: document.getElementById(config.total),
      totalUnit: document.getElementById(config.totalUnit),
    };
    this._count = 0;
    this._total = 0;
  }

  /**
   * Show container with initial message
   * @param {string} action
   * @param {string} unit - measuring unit, e.g. '%', ' pcs', ''
   * @param {number} total - max value; if ==0 then not shown
   */
  show(action, unit, total) {
    action && (this._elMessage.action.innerText=action + ': ');
    this._count = 0;
    this._elMessage.count.innerText = '0';
    this._elMessage.countUnit.innerText = unit;
    this._total = total;
    total && (this._elMessage.ofConjunction.innerText=' of ')
    && (this._elMessage.total.innerText=total)
    && (this._elMessage.totalUnit.innerText=unit);
    this._elContainer.classList.add('display-block');
  }

  /**
   * Increase counter
   * @param {number} increment
   */
  addCount(increment) {
    this._count += increment;
    if (this._total && this._count > this._total) this._count = this._total;
    this._elMessage.count.innerText = this._count;
  }

  /**
   * Set counter
   * @param {number} count - new value for counter; must be in [0..total], otherwise assigned with total
   */
  setCount(count) {
    this._count = (count < 0 || count > this._total) ? this._total : count;
    this._elMessage.count.innerText = this._count;
  }

  /**
   * Hide container
   * @param {number} delay ms
   */
  hide(delay) {
    setTimeout(() => {
      this._elContainer.classList.remove('display-block');
    }, delay);
  }
}