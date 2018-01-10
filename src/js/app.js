/* import SettingsService from './SettingsService';
import FavCityService from './FavCityService';
import CityHistoryService from './CityHistoryService';
import WeatherService from './WeatherService';
import StorageService from './StorageService'; */

const progressController = new ProgressController(appConfig);
const storageService = new StorageService(appConfig, progressController);

const Services = {
  SettingsService: new SettingsService(appConfig, storageService),
  CityListService: new CityListService(appConfig, storageService),
  FavCityService: new FavCityService(appConfig, storageService),
  CityHistoryService: new CityHistoryService(appConfig, storageService),
  WeatherService: new WeatherService(appConfig, storageService),
  StorageService: storageService,
};

const weatherController = new WeatherController(appConfig, Services.SettingsService, Services.WeatherService);
const searchHistoryController = new SearchHistoryController(appConfig, Services.CityHistoryService);

const Controllers = {
  UnitSwitchController: new UnitSwitchController(Services.SettingsService, 'unit-switch'),
  CityInputController: new CityInputController(appConfig, Services, weatherController, searchHistoryController),
  ProgressController: progressController,
  WeatherController: weatherController,
  SearchHistoryController: searchHistoryController,
};

Controllers.SearchHistoryController.setTargets(Controllers.CityInputController.getTargets());

console.log('App ready');
