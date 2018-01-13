# Weather Web App

Basic [weather web app](https://oleksiyrudenko.github.io/weather-webapp/) employing public API.

Developed as a part of 
[Task 10 of Kottans FrontEnd Course](https://github.com/kottans/frontend/blob/master/test10.md)

![Weather App UI - Search History](weather-app-ui-searchhistory.png)

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
## Table of Contents

- [Features](#features)
- [App Architecture](#app-architecture)
- [Known Issues](#known-issues)
- [Deployment](#deployment)
- [Time Track](#time-track)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

### Features

 * Search by City name
 * Search by geo coordinates
 * Current weather and 5 days forecast
 * 20 latest cities searched are available in history track
   (stored per browser)
 * Switch between imperial and metric units
   (stored per browser)
 * [Open Weather Map](https://openweathermap.org/api) is a weather
   data source

### App Architecture

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

[TOC :arrow_double_up: ](#table-of-contents)

### Known Issues

 - [ ] Styling is poor
 - [ ] Forecast data removal is done not via style management
 - [ ] Current location not detected
 - [ ] Pre-loaded city list is not used
 - [ ] Favourites management is not implemented
 - [ ] Favourites drop-down is not implemented
 - [ ] Search by geo coordinates is not validated
 - [ ] Search errors are technical in style
 - [ ] Units switch doesn't update current data

[TOC :arrow_double_up: ](#table-of-contents)

### Deployment

**Deploy to github pages, `src/` only**

1. `git subtree split --prefix src -b gh-pages` - create a subtree
2. `git push -f origin gh-pages:gh-pages` - push forcely
3. `git branch -D gh-pages` - remove local branch

[TOC :arrow_double_up: ](#table-of-contents)

### Time Track

 * `TOTAL= 27h45`
 * `171222 00h10` - setup
 * `171222 00h20` - initial research
 * `171223 01h35` - app architecture design
 * `171224 03h20` - view
 * `171224 01h50` - unit switch controller and settings service
 * `171224 00h20` - storage service
 * `171224 05h00` - city list feature
 * `180102 00h45` - research on `webpack`
 * `180103 01h40` - storage.put progress controller
 * `180103 03h55` - feature:search _(UI management took 2hrs of efforts)_
 * `180104 06h10` - feature:weather
 * `180110 02h40` - feature:history

[TOC :arrow_double_up: ](#table-of-contents)