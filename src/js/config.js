const appConfig = {
  baseUrl: window.location.protocol + "//" + window.location.host
    + window.location.pathname.split('/').slice(0,-1).join('/') + '/',
  api: {
    apiEndpoint: {},
    apiKey: '0f034f0e9216aaa8ed94c3d87af01e18',
    apiParamName: 'APPID',
  },
  cityList: 'assets/city.list.json',
  storage: {
    dbName: 'weatherapp',
    storeNames: ['settings', 'cities', 'favcity', 'cityhistory', 'weather'],
  },
};