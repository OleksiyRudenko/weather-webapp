// import citylist from './../assets/city.list.json';
import {moodImagery} from "./assets.js";
/**
 * App configuration
 * @type {Object}
 */
export const appConfig = {
  // next iteration
  config: {
    baseUrl: window.location.protocol + "//" + window.location.host
      + window.location.pathname.split('/').slice(0,-1).join('/') + '/',
    cityList: 'assets/city.list.json', // 'assets/city.list.json', | citylist from import
    historyInitialSet: [
      { name: 'Kyiv,UA',   nameUC: 'KYIV,UA',   lastQueried: + new Date(), },
      { name: 'London,UK', nameUC: 'LONDON,UK', lastQueried: + new Date(), },
      { name: 'Odessa,UA', nameUC: 'ODESSA,UA', lastQueried: + new Date(), },
      { name: 'Odessa,US', nameUC: 'ODESSA,US', lastQueried: + new Date(), },
    ],
    api: {
      apiUrl : 'https://api.openweathermap.org/data/2.5/',
      apiEndpoint : {
        current: {
          cityname : { path: 'weather', params: ['q'] }, // ?q={city name},{country code}
          latlon : { path: 'weather', params: ['lat', 'lon'] }, //?lat={lat}&lon={lon}
        },
        forecast5 : {
          cityname : { path: 'forecast', params: ['q'] }, // ?q={city name},{country code}
          latlon : { path: 'weather', params: ['lat', 'lon'] }, //?lat={lat}&lon={lon}
        },
      },
      apiKey: '0f034f0e9216aaa8ed94c3d87af01e18',
      apiParamName: 'APPID',
      iconUrl: 'https://openweathermap.org/img/w/',
      iconExt: '.png',
    },
    storage: {
      dbName: 'weatherapp-rdnk',
      dbVersion: 1,
      store: [
        // [0]: upgrade to v.1
        [
          {
            storeName: 'settings',
            storeOptions: {keyPath: 'option'},
            fields: ['option', 'value'], // option = {Units|...}; Units={metric|imperial}
          },
          {
            storeName: 'cities',
            storeOptions: {keyPath: 'id'},
            fields: ['id', 'name', 'nameUC'], // city name, city name uppercase
            index: [['nameUC']], // indices; when single literal then index name == index key name
          },
          {
            storeName: 'favcity',
            storeOptions: {keyPath: 'name'},
            fields: ['name', 'nameUC'], // city name, city name uppercase
            index: [['nameUC']],
          },
          {
            storeName: 'cityhistory',
            storeOptions: {keyPath: 'name'},
            fields: ['name', 'nameUC', 'lastQueried'], // city name, city name uppercase, last queried
            index: [['nameUC']],
          },
        ],
        // [1]: upgrade to v.2
        [
          {
            storeName: 'weather',
          },
        ],
      ], // store
    }, // storage
    icons: {
      day: {
        brokenClouds: 'wi-day-cloudy',
        clearSky: 'wi-day-sunny',
        fewClouds: 'wi-day-cloudy',
        mist: 'wi-day-fog',
        rain: 'wi-day-rain',
        scatteredClouds: 'wi-day-cloudy-high',
        showerRain: 'wi-day-showers',
        snow: 'wi-day-snow-wind',
        thunderStorm: 'wi-day-thunderstorm',
        alien: 'wi-alien',
      },
      night: {
        brokenClouds: 'wi-night-cloudy',
        clearSky: 'wi-night-clear',
        fewClouds: 'wi-night-cloudy',
        mist: 'wi-night-fog',
        rain: 'wi-night-alt-rain',
        scatteredClouds: 'wi-night-alt-cloudy-high',
        showerRain: 'wi-night-alt-showers',
        snow: 'wi-night-alt-snow-wind',
        thunderStorm: 'wi-night-alt-thunderstorm',
        alien: 'wi-alien',
      },
    },
    mood: {
      seasons: {
        spring: moodImagery.sSG,
        summer: moodImagery.sSU,
        autumn: moodImagery.sAT,
        winter: moodImagery.sWT,
      },
      imagery: {
        brokenClouds: {
          day: {
            autumn: moodImagery.wBCdA1,
            spring: moodImagery.wBCdS1, // subst
            summer: moodImagery.wBCdS1,
            winter: moodImagery.wBCdA1, // subst
          },
          night: {
            autumn: moodImagery.wBCnS1, // subst
            spring: moodImagery.wBCnS1, // subst
            summer: moodImagery.wBCnS1,
            winter: moodImagery.wBCnS1, // subst
          },
        },
        clearSky: {
          day: {
            autumn: moodImagery.wCSdA1,
            spring: moodImagery.wCSdS1, // subst
            summer: moodImagery.wCSdS1,
            winter: moodImagery.wCSdW1,
          },
          night: {
            autumn: moodImagery.wCSnA1,
            spring: moodImagery.wCSnS1, // subst
            summer: moodImagery.wCSnS1,
            winter: moodImagery.wCSnW1,
          },
        },
        mist: {
          day: {
            autumn: moodImagery.wMdA1,
            spring: moodImagery.wMdA1, // subst
            summer: moodImagery.wMdA1, // subst
            winter: moodImagery.wMdW1,
          },
          night: {
            autumn: moodImagery.wMnS1, // subst
            spring: moodImagery.wMnS1, // subst
            summer: moodImagery.wMnS1,
            winter: moodImagery.wMnW1,
          },
        },
        rain: {
          day: {
            autumn: moodImagery.wRdA1,
            spring: moodImagery.wRdSG1,
            summer: moodImagery.wRdS1,
            winter: moodImagery.wRdW1,
          },
          night: {
            autumn: moodImagery.wRnS1, // subst
            spring: moodImagery.wRnS1, // subst
            summer: moodImagery.wRnS1,
            winter: moodImagery.wRnS1, // subst
          },
        },
        fewClouds: {
          day: {
            autumn: moodImagery.wSCdS1, // subst
            spring: moodImagery.wSCdS1, // subst
            summer: moodImagery.wSCdS1, // subst
            winter: moodImagery.wSCdW1, // subst
          },
          night: {
            autumn: moodImagery.wBCnS1, // subst
            spring: moodImagery.wBCnS1, // subst
            summer: moodImagery.wBCnS1, // subst
            winter: moodImagery.wBCnS1, // subst
          },
        },
        scatteredClouds: {
          day: {
            autumn: moodImagery.wSCdS1, // subst
            spring: moodImagery.wSCdS1, // subst
            summer: moodImagery.wSCdS1,
            winter: moodImagery.wSCdW1,
          },
          night: {
            autumn: moodImagery.wBCnS1, // subst
            spring: moodImagery.wBCnS1, // subst
            summer: moodImagery.wBCnS1, // subst
            winter: moodImagery.wBCnS1, // subst
          },
        },
        showerRain: {
          day: {
            autumn: moodImagery.wSRdS1, // subst
            spring: moodImagery.wSRdS1, // subst
            summer: moodImagery.wSRdS1,
            winter: moodImagery.wRdW1,
          },
          night: {
            autumn: moodImagery.wRnS1, // subst
            spring: moodImagery.wRnS1, // subst
            summer: moodImagery.wRnS1, // subst
            winter: moodImagery.wRnS1, // subst
          },
        },
        snow: {
          day: {
            autumn: moodImagery.wSdA1,
            spring: moodImagery.wSdA1, // subst
            summer: moodImagery.wSdA1, // subst
            winter: moodImagery.wSdW1,
          },
          night: {
            autumn: moodImagery.wSnW1, // subst
            spring: moodImagery.wSnW1, // subst
            summer: moodImagery.wSnW1, // subst
            winter: moodImagery.wSnW1,
          },
        },
        thunderStorm: {
          day: {
            autumn: moodImagery.wTSdS1, // subst
            spring: moodImagery.wTSdS1, // subst
            summer: moodImagery.wTSdS1,
            winter: moodImagery.wTSdW1,
          },
          night: {
            autumn: moodImagery.wTSnS1, // subst
            spring: moodImagery.wTSnS1, // subst
            summer: moodImagery.wTSnS1,
            winter: moodImagery.wTSnS1, // subst
          },
        },
      } // imagery
    }, // mood
    guide: {
      playOrder: ['userInput', 'unitSwitch', 'manageFavourite'],
      tipOptions: {
        placement: 'bottom',
        // arrowTransform: 'scale(2.0)',
        animation: 'shift-toward',
        inertia: true,
        duration: 300,
        arrow: true,
        delay: [200, 1000],
        size: 'large',
        theme: 'outstanding',
        createPopperInstanceOnInit: true,
      },
      onloadDelay: 1500,
      exposureDuration: 2500,
    },
  },
  uiElements: {
    UnitSwitchController: {
      container: 'unit-switch',
    },
    ProgressController: {
      container: 'progress-notification',
      action: 'progress-action',
      count: 'progress-count',
      countUnit: 'progress-count-unit',
      ofConjunction: 'progress-of',
      total: 'progress-total',
      totalUnit: 'progress-total-unit',
    },
    CityInputController: {
      container: 'search-bar',
      gps: 'gps',
      favNo: 'favourite-no',
      favYes: 'favourite-yes',
      favDropDown: 'favourite-dropdown',
      textInput: 'search-input',
      searchAction: 'search-action',
    },
    SearchHistoryController: {
      container: 'history-container',
      textInput: 'search-input',
    },
    WeatherController: {
      container: 'weather-container',
      todayMain: 'weather-today-main',
      todayDebug: 'weather-today-debug',
      todayError: 'weather-today-error',
      todaySpinner: 'weather-today-spinner',
      forecastMain: 'weather-forecast-main',
      forecastDebug: 'weather-forecast-debug',
      forecastError: 'weather-forecast-error',
      forecastSpinner: 'weather-forecast-spinner',
    },
    MoodController: {
      container: 'body',
    },
    GuideController: {
      userInput: 'search-input',
      unitSwitch: 'unit-switch',
      manageFavourite: 'favourite-no',
    },
    FavCityController: {
      addFavCity: 'favourite-no',
      removeFavCity: 'favourite-yes',
      cityFullName: 'wt-cityFull',
    }
  },

};
