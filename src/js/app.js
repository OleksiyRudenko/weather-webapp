/* import SettingsService from './SettingsService';
import FavCityService from './FavCityService';
import CityHistoryService from './CityHistoryService';
import WeatherService from './WeatherService';
import StorageService from './StorageService'; */

let Services = {
  SettingsService: new SettingsService(appConfig),
  FavCityService: new FavCityService(appConfig),
  CityHistoryService: new CityHistoryService(appConfig),
  WeatherService: new WeatherService(appConfig),
  StorageService: new StorageService(appConfig),
};

let Controllers = {
  UnitSwitchController: new UnitSwitchController(Services.SettingsService, 'unit-switch'),
};

console.log('App ready');
