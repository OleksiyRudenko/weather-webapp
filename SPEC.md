# App Specifications

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [User Stories and Required Features](#user-stories-and-required-features)
  - [User Stories and Notes on Required Features](#user-stories-and-notes-on-required-features)
  - [Key Features](#key-features)
- [App Components](#app-components)
  - [`AppController`](#appcontroller)
  - [`UI Controllers`](#ui-controllers)
  - [`Services`](#services)
  - [`helpers`](#helpers)
  - [`External Data Providers`](#external-data-providers)
  - [`Native Services`](#native-services)
- [View Design](#view-design)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## User Stories and Required Features

### User Stories and Notes on Required Features

As a user, I would like...

| to (action) | in order to (desired outcome) | notes on required features |
| ------ | --------------- | -------------------------- |
| enter city name or geocoords | see current weather and 5-10 days forecast | weather API |
| choose units imperial or metric | see temperature, wind speed etc. as I am accustomed to | refresh weather data on unit switch |
| have my units choice remembered | avoid switching every time from same device and browser | browser's storage |
| have a list of favoirite cities | switch between favourite cities fast | browser's storage; add/remove fav city |
| have a list of recently viewed cities | switch between recently viewed cities | browser's storage; save valid city names only |
| see current city or latitude and longitude in the link in the address bar of the browser | bookmark the url, navigate through browser history | URL API; History API |
| see weather for the city in URL, last search, current location, default - whichever is available first | see not blank page | |
| click 'current location' | see weather from my current location | GPS/Location API |
| have clickable city name suggestions while typing | search for existent city and avoid mis-search for homonym cities from different countries/states | pre-loaded city list with country codes; autocompletion |
| see fancy icons for forecast and design | be visually pleased | improved CSS, colour scheme, animations |
| have geo coordinates fixed when typed incorrectly | get sensible results | |
| [NTH] have geo coordinates autoadjusted to the nearest  supported | see weather instead of no data warning | pre-loaded list |
| get warned when search query reverts no result | make sure the app works | no data per query; data provider is down or quota exceeded; no connectivity |
| [NTH] get historical weather data from last searches (no older than 3 days) when data provider is unreachable | have outdated info rather than no data | browser's storage |
| [NTH] when data source is not available see in history list only those entries where weather data is max 3 days old | avoid browsing cities where no cached data available | |

[_TOC_ :arrow_double_up: ](#table-of-contents)

### Key Features


[_TOC_ :arrow_double_up: ](#table-of-contents)

## App Components

App components are:
 * `AppController` - app bootstrapper
 * `Native Services` - browser native data stores
   (`LocalStorage`, `IndexedDB`) available via `Services`
 * `helpers` - helper functions and 3rd party libraries
 * `Services` - app data stores
 * `UI Controllers` - app user interaction and feedback
 * `External Data Providers` - external data sources
   available via `Services`

[_TOC_ :arrow_double_up: ](#table-of-contents)

### `AppController`

 * owns global `app config`
 * creates required `Services`
 * supplies `Services` with settings and dependecies
   (from among other `Services`)
 * creates required `UI Controllers`
 * supplies `UI Controllers` with settings and dependencies
   (from among `Services` and other `UI Controllers`)

[_TOC_ :arrow_double_up: ](#table-of-contents)

### `UI Controllers`

An `UI Controller`
 * controls UI elements
 * receives User activities
 * inquires a `Service` for data
 * can be called by a `Service` or another `Controller`
 * stores data via `Service`
 * serves data to UI elements

App UI Controllers:
 * `UnitSwitchController`
 * `CityInputController`
 * `SearchHistoryController`
 * `FavouriteCityController`
 * `UrlController`
 * `WeatherController`
 * `ProgressController`

[_TOC_ :arrow_double_up: ](#table-of-contents)

### `Services`

 * `StorageService` employs `idb` lib to cache data
 * `WeatherService`
 * `SettingsService`
 * `CityListService`
 * `CityHistoryService`
 * `FavCityService`
 * `WeatherIconService`

[_TOC_ :arrow_double_up: ](#table-of-contents)

### `helpers`

 * a set of custom global functions
 * [`idb`](https://github.com/jakearchibald/idb) - a layer
   to communicate with browser's `IndexedDB`; used by `StorageService`

[_TOC_ :arrow_double_up: ](#table-of-contents)

### `External Data Providers`

 * Weather data source: [Open Weather Map](https://openweathermap.org/api);
   addressed to by `WeatherService`

### `Native Services`

 * Browser's `IndexedDB` used to cache app data by `StorageService`
   via `idb`

[_TOC_ :arrow_double_up: ](#table-of-contents)

## View Design

Inspirations
 * [darksky](https://darksky.net/forecast/50.4501,30.5241/us12/en)
 * [Yahoo Weather](https://www.yahoo.com/news/weather)

[_TOC_ :arrow_double_up: ](#table-of-contents)
