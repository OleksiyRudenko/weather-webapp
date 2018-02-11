# Application Architecture


<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**

- [Intro](#intro)
- [Framework](#framework)
- [Bootstrapping](#bootstrapping)
- [Specialized App Components](#specialized-app-components)
  - [Services](#services)
  - [UI Controllers](#ui-controllers)
  - [Functional Controllers](#functional-controllers)
- [Former architecture docs](#former-architecture-docs)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Intro

App comprises:
- View
- UI Controllers
- Functional Controllers
- Services
- Proprietary Data Providers

View Elements are managed by UI Controllers only.
Functional Controllers are app component bootstrappers and
activity medias.
Controllers may interact with other Controllers and Services.
Services respond to data requests from Controllers and other Services
and store data supplied by Controllers.
Services employ Data Providers and external services
like `IndexedDB`, `localStorage`, foreign resources
over API, static and/or non-persistent sources.

[_-- TOC --_](#table-of-contents)

## Framework

`AppComponent` is an abstract class featuring properties and methods
common for all components (Services, Controllers)

`AppServiceComponent` is an abstract class featuring properties
and methods common for all Services.

`AppControllerComponent` is an abstract class featuring properties
and methods common for all Controllers (Functional or general use
controllers and their derivatives).

`AppUiControllerComponent` is an abstract class featuring properties
and methods specific to Controllers managing View elements.

[_-- TOC --_](#table-of-contents)

## Bootstrapping

`AppController` is a Functional Controller that bootstraps the App:
 - consumes global configuration object
 - creates required components
 - supplies components with configuration and dependencies
 - supplies UI Controllers with immediate references to View elements

[_-- TOC --_](#table-of-contents)

## Specialized App Components

### Services

 * `CityHistoryService` - gets item to store, returns list of searched cities
 * `CityListService` - supplies city names for autocomplete
 * `FavCityService` - gets item to store, returns list of favourite cities
 * `SettingsService` - gets and returns app settings (e.g. Units) per browser
 * `StorageService` - interface to browser's `IndexedDB`
 * `WeatherService` - serves requests for weather forecasts;
   fetches results from foreign data provider over API

[_-- TOC --_](#table-of-contents)

### UI Controllers

 * `CityInputController` - manages user input, launches search
 * `MoodController` - updates mood media based on weather conditions
 * `ProgressController` - updates progress on data load
 * `SearchHistoryController` - manages search history view
 * `UnitSwitchController` - manages units switch
 * `WeatherController` - displays weather

[_-- TOC --_](#table-of-contents)

### Functional Controllers

 * `UrlController` - manages URL requests and browser history

[_-- TOC --_](#table-of-contents)

## Former architecture docs

![Weather App Architecture diagram](weather-app-architecture.png)

**Diagram legend**

 * Green box - browser feature
 * Blue box - App Controller
 * Magenta box - App Service
 * Grey box - Incomplete App Controller / Service
 * Yellow box - external service

> NB! Architecture description below doesn't reflect latest updates.

 * `View` - represented with HTML and CSS
 * `AppController` - main app controller
   - bootstraps the app
   - supplies `View` with variable data
   - reports errors via `View`
     - offline, cached data supplied
     - offline, no data available
   - reacts on user actions
     - choose city
     - add favourite city
     - change units
   - inquires `WeatherService` using user input and settings
   - dismisses inquiry result when new inquiry arrives from user
 * `SettingsService` - keeps user settings
 * `FavCityService` - keeps user's favourite cities list
 * `CityHistoryService` - keeps search history (list of cities)
   - cities are ranked by:
     - date (latest on top)
     - number of queries
   - supplies last 20 cities max
   - stores 100 cities max
   - removes cities ranked 20+ searched earlier than a month ago
     for the last time
 * `WeatherService` - supplies weather data
   - inquires `External Data Provider` over API
   - caches weather data employing `StorageService`
   - once a day purges cached data older than 3 days
   - when app is online and idle updates data for favourite cities
   - only caches external inquiry when new inquiry from
     `AppController` arrives
   - cached record: datetime, city, units, forecast depth
 * `External Data Provider` - [Open Weather Map](https://openweathermap.org/api)

[_-- TOC --_](#table-of-contents)
