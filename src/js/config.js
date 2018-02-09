// import citylist from './../assets/city.list.json';
/**
 * App configuration
 * @type {Object}
 */
export const appConfig = {
  baseUrl: window.location.protocol + "//" + window.location.host
    + window.location.pathname.split('/').slice(0,-1).join('/') + '/',
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
  notification: {
    progress: {
      container: 'progress-notification',
      action: 'progress-action',
      count: 'progress-count',
      countUnit: 'progress-count-unit',
      ofConjunction: 'progress-of',
      total: 'progress-total',
      totalUnit: 'progress-total-unit',
    }
  },
  unitSwitch: {
    container: 'unit-switch',
  },
  search: {
    container: 'search-bar',
    gps: 'gps',
    favNo: 'favourite-no',
    favYes: 'favourite-yes',
    favDropDown: 'favourite-dropdown',
    textInput: 'search-input',
    searchAction: 'search-action',
  },
  weatherView: {
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
  historyView: {
    container: 'history-container',
  },
  historyInitialSet: [
    { name: 'Kyiv,UA',   lastQueried: + new Date(), },
    { name: 'London,UK', lastQueried: + new Date(), },
    { name: 'Odessa,UA', lastQueried: + new Date(), },
    { name: 'Odessa,US', lastQueried: + new Date(), },
  ],
  cityList: 'assets/city.list.json', // 'assets/city.list.json', | citylist from import
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
          storeOptions: {keyPath: 'id'},
          fields: ['id', 'name', 'nameUC'], // city name, city name uppercase
          index: [['nameUC']],
        },
        {
          storeName: 'cityhistory',
          storeOptions: {keyPath: 'name'},
          fields: ['name', 'lastQueried'], // city name, last queried
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

  // next iteration
  uiElements: {
    UnitSwitchController: {
      container: 'unit-switch',
    },
  },

};
