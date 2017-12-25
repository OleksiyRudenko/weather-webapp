/* import SettingsService from './SettingsService';
import FavCityService from './FavCityService';
import CityHistoryService from './CityHistoryService';
import WeatherService from './WeatherService';
import StorageService from './StorageService'; */

let Service = {
  SettingsService: new SettingsService(appConfig),
  FavCityService: new FavCityService(appConfig),
  CityHistoryService: new CityHistoryService(appConfig),
  WeatherService: new WeatherService(appConfig),
  StorageService: new StorageService(appConfig),
};

console.log('App ready');
