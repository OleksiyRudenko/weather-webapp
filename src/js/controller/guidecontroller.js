import AppUiControllerComponent from "../framework/appuicontrollercomponent.js";

/**
 * Class representing user guide controller
 */
export default class GuideController extends AppUiControllerComponent {
  /**
   * @constructor
   */
  constructor() {
    super();
    this.config = {
      guide: 'guide',
    };
    this.playedTips = {};
  }

  /* === Public methods === */

  /**
   * Component initial activities
   */
  run() {
    super.run();
    // this.debugThisClassName('run');
    // console.log(this.config);

    this.initializePlayList();
    // bind tips
    Object.keys(this.uiElements).forEach((uiElementIdx) => {
      tippy(this.uiElements[uiElementIdx], this.config.guide.tipOptions)
    });
    window.setTimeout(() => {this.playTip('userInput')}, this.config.guide.onloadDelay);
  }

  /**
   * Plays a tip
   * @param {string} elementName
   */
  playTip(elementName) {
    this.debugThisClassName('renderTip()');
    const element = this.uiElements[elementName];
    if (element) {
      this.playedTips[elementName] = true;
      // console.log(this.playedTips);
      element._tippy.show();
      window.setTimeout(() => {element._tippy.hide()}, this.config.guide.exposureDuration);
    }
  }

  /**
   * Plays next unplayed tip from the play list if any
   */
  playNextTip() {
    const nextTipElementName = this.config.guide.playOrder.find(el => {
      return !this.playedTips[el];
    });
    // console.log(nextTipElementName);
    nextTipElementName && this.playTip(nextTipElementName);
  }

  /* === Private methods : SECONDARY === */

  /**
   * Initializes play list - neither tip's been played yet
   */
  initializePlayList() {
    this.config.guide.playOrder.forEach(el => {this.playedTips[el] = false});
  }

}
