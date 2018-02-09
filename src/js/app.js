import { appConfig } from "./config.js";
import StorageService from "./service/storageservice.js";
import SettingsService from "./service/settingsservice.js";
import CityListService from "./service/citylistservice.js";
import CityHistoryService from "./service/cityhistoryservice.js";
import FavCityService from "./service/favcityservice.js";
import WeatherService from "./service/weatherservice.js";
import ProgressController from "./controller/progresscontroller.js";
import SearchHistoryController from "./controller/searchhistorycontroller.js";
import WeatherController from "./controller/weathercontroller.js";
import CityInputController from "./controller/cityinputcontroller.js";
import AppController from "./controller/appcontroller.js";

const progressController = new ProgressController(appConfig);
const storageService = new StorageService(appConfig, progressController);

export const Services = {
  SettingsService: new SettingsService(appConfig, storageService),
  CityListService: new CityListService(appConfig, storageService),
  FavCityService: new FavCityService(appConfig, storageService),
  CityHistoryService: new CityHistoryService(appConfig, storageService),
  WeatherService: new WeatherService(appConfig, storageService),
  StorageService: storageService,
};

const weatherController = new WeatherController(appConfig, Services.SettingsService, Services.WeatherService);
const searchHistoryController = new SearchHistoryController(appConfig, Services.CityHistoryService);

export const Controllers = {
  ProgressController: progressController,
  WeatherController: weatherController,
  SearchHistoryController: searchHistoryController,
};

const app = new AppController(appConfig);

const cityInputController = new CityInputController(appConfig, Services, weatherController, searchHistoryController, app.dependencies.Controllers.UrlController);
Controllers.CityInputController = cityInputController;
Controllers.SearchHistoryController.bindCityInputController(Controllers.CityInputController);

app.run();
console.log('App ready');
