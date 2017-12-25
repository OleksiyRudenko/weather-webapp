/* import SettingsService from './SettingsService';
import FavCityService from './FavCityService';
import CityHistoryService from './CityHistoryService';
import WeatherService from './WeatherService';
import StorageService from './StorageService'; */

let Services = {
  SettingsService: new SettingsService(appConfig),
  CityListService: new CityListService(appConfig),
  FavCityService: new FavCityService(appConfig),
  CityHistoryService: new CityHistoryService(appConfig),
  WeatherService: new WeatherService(appConfig),
  StorageService: new StorageService(appConfig),
};

let Controllers = {
  UnitSwitchController: new UnitSwitchController(Services.SettingsService, 'unit-switch'),
  CityInputController: new CityInputController(Services.CityListService, 'search-input'),
};

console.log('App ready');
