import AppUiControllerComponent from "../framework/appuicontrollercomponent.js";

/**
 * Class that controls app general media
 */
export default class MoodController extends AppUiControllerComponent {
  /**
   * Create mood controller.
   * @constructor
   */
  constructor() {
    super();
    this.config = {
      mood: 'mood',
    };
    this.dependencies = {};
  }

  /* === Public methods === */

  /**
   * Component initial activities
   */
  run() {
    this.renderMood();
  }

  /* === Public methods === */

  /**
   *
   * @param {Date} date
   * @param {number} geolat
   * @param {Object} verboseConditions { tod: day|night, conditions: clearSky|rain|... }
   */
  renderMood(date, geolat, verboseConditions) {
    if (!date) date = new Date();
    if (!geolat) geolat = 50;
    if (!verboseConditions) verboseConditions = {tod: 0, conditions: 0};
    const season = this.getSeason(date, geolat);
    const img = this.getMoodImage(verboseConditions.conditions, verboseConditions.tod, season);
    this.uiElements.container.style.backgroundImage = "url('" + img + "')";
  }

  /* === Private methods : SECONDARY === */

  /**
   * Gets season hemisphere- and longitude-wise
   * @param {Date} date
   * @param {number} geolat
   * @returns {string} spring|summer|autumn|winter
   */
  getSeason(date, geolat) {
    const month = date.getMonth() + 1;
    let season = month < 4 ? 'winter'
      : month < 6 ? 'spring'
        : month < 9 ? 'summer'
          : month < 12 ? 'autumn'
            : 'winter';
    // invert season for Southern hemisphere
    if (geolat < 0) {
      season = season === 'winter' ? 'summer' : season === 'summer' ? 'winter' : season;
    }
    if (geolat > 65 || geolat < -60) season = 'winter';
    if (geolat <=30 && geolat >-30) season = 'summer';
    return season;
  }

  /**
   *
   * @param {string} conditions clearSky|rain|snow|...
   * @param {string} tod time of day == day|night
   * @param {string} season
   * @returns {string} mood image url
   */
  getMoodImage(conditions, tod, season) {
    if (!conditions) return this.config.mood.seasons[season];
    if (conditions === 'unknown') conditions = 'clearSky';
    return this.config.mood.imagery[conditions][tod][season];
  }
}
