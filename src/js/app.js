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

const urlController = new UrlController(appConfig);
const weatherController = new WeatherController(appConfig, Services.SettingsService, Services.WeatherService);
const searchHistoryController = new SearchHistoryController(appConfig, Services.CityHistoryService);
const cityInputController = new CityInputController(appConfig, Services, weatherController, searchHistoryController, urlController);

const Controllers = {
  UnitSwitchController: new UnitSwitchController(appConfig, cityInputController, Services.SettingsService),
  CityInputController: cityInputController,
  ProgressController: progressController,
  WeatherController: weatherController,
  SearchHistoryController: searchHistoryController,
  UrlController: urlController,
};

Controllers.SearchHistoryController.bindCityInputController(Controllers.CityInputController);
urlController.bindCityInputController(cityInputController);
// urlController.getCityName();

urlController.makeInitialSearch();

console.log('App ready');
