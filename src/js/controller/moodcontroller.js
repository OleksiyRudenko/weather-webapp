import AppUiControllerComponent from "../framework/appuicontrollercomponent.js";

/**
 * Class that control app general media
 */
export default class MoodController extends AppUiControllerComponent {
  constructor() {
    super();
    this.config = {
      mood: 'mood',
    };
    this.dependencies = {};
  }

  run() {
    this.debugThisClassName('run');
  }

  renderMood(date, geolat, verboseConditions) {
    this.debugThisClassName('renderMood');
    console.log(this.uiElements);
    console.log(date);
    console.log(verboseConditions);
    const season = this.getSeason(date, geolat);
    const img = this.getMoodImage(verboseConditions.conditions, verboseConditions.tod, season);
    console.log(img);
    this.uiElements.container.style.backgroundImage = "url('" + img + "')";
  }

  getMoodImage(conditions, tod, season) {
    if (conditions === 'unknown') conditions = 'clearSky';
    return this.config.mood.imagery[conditions][tod][season];
  }

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
}
