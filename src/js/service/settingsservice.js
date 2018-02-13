import AppServiceComponent from "../framework/appservicecomponent.js";
import StorageService from "./storageservice.js";
/** Class representing user settings service. */
export default class SettingsService extends AppServiceComponent {
  /**
   * Create settings service.
   * @constructor
   */
  constructor() {
    super();
    this.dependencies = {
      Services: {
        StorageService: 'StorageService',
      },
    };
    this._storeName = 'settings';
    this._settings = {
      Units: 'imperial',
    };
    this._units = {
      windSpeed: {
        metric: 'm/s',
        imperial: 'mph',
      }
    };
  }

  /* === Public methods === */

  /**
   * Component initial activities
   */
  run() {
    super.run();
    // this.debugThisClassName('run');
    this.settingsPromise = this.loadSettings();
  }

  get units() { return this._settings.Units; }
  setImperial() { this._settings.Units = 'imperial'; }
  setMetric() { this._settings.Units = 'metric'; }
  get windSpeedUnits() { return this._units.windSpeed[this._settings.Units]; }

  /**
   * Switches between units
   */
  switchUnits() {
    this._settings.Units = (this._settings.Units === 'metric') ? 'imperial' : 'metric';
    this.updateStorage();
  }

  /* === Private methods : SECONDARY === */

  /**
   * Update settings in storage
   */
  updateStorage() {
    const data = {
      option: 'Units',
      value: this._settings.Units,
    };
    this.dependencies.Services.StorageService.put(this._storeName,data).then(() => {
      console.log('Settings store updated');
    });
  }

  /**
   * Load settings from store
   */
  loadSettings() {
    this.dependencies.Services.StorageService.storeCount(this._storeName).then(count => {
      if (!count) {
        this.updateStorage();
      }
    });
    return this.dependencies.Services.StorageService.getAll(this._storeName).then(items => {
      items.forEach(e => this._settings[e.option]=e.value);
      return new Promise((resolve, reject) => resolve(this._settings));
    });
  }
}
