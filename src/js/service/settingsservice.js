/** Class representing user settings service. */
class SettingsService {
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
  }

  get units() { return this._settings.Units; }
  setImperial() { this._settings.Units = 'imperial'; }
  setMetric() { this._settings.Units = 'metric'; }

  switchUnits() {
    this._settings.Units = (this._settings.Units === 'metric') ? 'imperial' : 'metric';
  }

  /**
   * Update settings in storage
   */
  updateStorage() {
    const data = {
      option: 'Units',
      value: this._settings.Units,
    };
    this._storageService.put(this._storeName,data).then(()=>{
      console.log('Settings store updated')
    });
  }

  /**
   * Load settings from store
   */
  loadSettings() {
    // this._storageService.getAll();
  }
}