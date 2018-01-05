# Weather Web App

Basic weather web app employing public API.

Developed as a part of 
[Task 10 of Kottans FrontEnd Course](https://github.com/kottans/frontend/blob/master/test10.md)

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
## Table of Contents

- [App Architecture](#app-architecture)
- [Time Track](#time-track)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

### App Architecture

![Weather App Architecture diagram](weather-app-architecture.png)

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

### Time Track

 * `TOTAL= 19h45`
 * `171222 00h10` - setup
 * `171222 00h20` - initial research
 * `171223 01h35` - app architecture design
 * `171224 03h20` - view
 * `171224 01h30` - unit switch controller and settings service
 * `171224 00h20` - storage service
 * `171224 05h00` - city list feature
 * `180102 00h45` - research on `webpack`
 * `180103 01h40` - storage.put progress controller
 * `180103 03h15` - feature:search _(UI management took 2hrs of efforts)_
 * `180104 01h50` - feature:weather

[TOC :arrow_double_up: ](#table-of-contents)