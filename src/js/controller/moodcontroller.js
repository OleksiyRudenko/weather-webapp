import AppUiControllerComponent from "../framework/appuicontrollercomponent.js";
import {imagery} from "../../assets/mood/imagery.js";

/**
 * Class that control app general media
 */
export default class MoodController extends AppUiControllerComponent {
  constructor() {
    super();
    this.config = {};
    this.dependencies = {};
  }

  run() {
    this.debugThisClassName('run');
    console.log(imagery);
  }
}
