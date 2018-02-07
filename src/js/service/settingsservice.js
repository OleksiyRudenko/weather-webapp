/** Class representing user settings service. */
export default class SettingsService {
  /**
   * Create settings service.
   * @constructor
   * @param {object} appConfig - application config
   * @param {object} storageService - storage service
   */
  constructor(appConfig, storageService) {
    this._storeName = 'settings';
    this._appConfig = appConfig;
    this._storageService = storageService;
    this._settings = {
      Units: 'metric',
    };
    this._units = {
      windSpeed: {
        metric: 'm/s',
        imperial: 'mph',
      }
    };
    this.settingsPromise = this.loadSettings();
  }

  get units() { return this._settings.Units; }
  setImperial() { this._settings.Units = 'imperial'; }
  setMetric() { this._settings.Units = 'metric'; }
  get windSpeedUnits() { return this._units.windSpeed[this._settings.Units]; }

  switchUnits() {
    this._settings.Units = (this._settings.Units === 'metric') ? 'imperial' : 'metric';
    this.updateStorage();
  }

  /**
   * Update settings in storage
   */
  updateStorage() {
    const data = {
      option: 'Units',
      value: this._settings.Units,
    };
    this._storageService.put(this._storeName,data).then(() => {
      console.log('Settings store updated');
    });
  }

  /**
   * Load settings from store
   */
  loadSettings() {
    this._storageService.storeCount(this._storeName).then(count => {
      if (!count) {
        this.updateStorage();
      }
    });
    return this._storageService.getAll(this._storeName).then(items => {
      items.forEach(e => this._settings[e.option]=e.value);
      return new Promise((resolve, reject) => resolve(this._settings));
    });
  }
}
