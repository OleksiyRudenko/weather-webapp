# App Specifications

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [App Specifications](#app-specifications)
  - [User Stories and Required Features](#user-stories-and-required-features)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## User Stories and Required Features

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

[TOC :arrow_double_up: ](#table-of-contents)

