import * as idb from './../lib/idb-2.0.4/idb';
/** Class representing storage service.
 * Uses https://github.com/jakearchibald/idb -- https://www.npmjs.com/package/idb
 */
export default class StorageService {
  /**
   * Create storage service.
   * @constructor
   * @param {object} appConfig - application config
   * @param {object} progressController - progress message controller
   */
  constructor(appConfig, progressController) {
    this._appConfig = appConfig;
    this._progressController = progressController;
    this._dbPromise = this.dbOpen(this._appConfig.storage.dbVersion);
    this.logSummary();
  }

  /**
   * Create IDB open promise that creates required stores as per dbVersion
   * @param {number} dbVersion - current db version
   * @returns {Promise<Cache>|IDBOpenDBRequest}
   */
  dbOpen(dbVersion) {
    return idb.open(this._appConfig.storage.dbName, dbVersion, upgradeDb => {
      const storeVersionedList = this._appConfig.storage.store; // store list
      for (let i=0; i <= upgradeDb.oldVersion; i++) {
        storeVersionedList[i].forEach(storeEntry => {
          let store = upgradeDb.createObjectStore(storeEntry.storeName, storeEntry.storeOptions);
          if (!!storeEntry.index) { // any indices? .index = [ indexSpec,... ]; indexSpec = [indexName, indexKeyName_optional]
            storeEntry.index.forEach(index => {
              store.createIndex(index[0], index[index.length-1]);
            });
          }
        });
      }
    });
  }

  /**
   * Returns number of objects in a store
   * @param {string} storeName
   * @returns {Promise<T>}
   */
  storeCount(storeName) {
    return this._dbPromise.then(db => {
      const tx = db.transaction(storeName, 'readonly');
      const store = tx.objectStore(storeName);
      return store.count();
    }).catch(e => e);
  }

  /**
   * Logs database summary
   */
  logSummary() {
    const storeList = [].concat.apply([], this._appConfig.storage.store).map(e => e.storeName);
    storeList.forEach(storeName => {
      this.storeCount(storeName).then(v => {
        console.log(storeName + '.length == ' + v);
      }).catch(e => {
        console.log(e);
      });
    });
  }

  /**
   * Insert/update store
   * @param {string} storeName
   * @param {array|object} recordSet - is either an object to store or array of objects to store
   */
  put(storeName, recordSet) {
    // put single object into an array
    if (!Array.isArray(recordSet)) {
      recordSet = [recordSet];
    }
    const recordSetLength = recordSet.length;
    const showProgress = (recordSetLength > 20);
    let increment = (recordSetLength <= 100) ? 10 : (recordSetLength <= 1000) ? 20 : 100;
    if (showProgress) this._progressController.show('Adding records to ' + storeName, '', recordSetLength);
    return this._dbPromise.then(db => {
      const tx = db.transaction(storeName, 'readwrite');
      const store = tx.objectStore(storeName);
      return Promise.all(recordSet.map((item, index) => {
          if (!(index%increment)) {
            this._progressController.addCount(increment);
            console.log('Adding another ' + increment);
          }
          return store.put(item);
        }) // map
      ).catch(e => {
        this._progressController.hide(100);
        tx.abort();
        console.log(e);
      }).then(() => {
        this._progressController.setCount(recordSetLength);
        this._progressController.hide(2500);
        console.log('Added ' + recordSet.length + ' items to ' + storeName);
      });
    });
  }

  /**
   * Get all records from store or optionally from store index optionally filtering by index key field value
   * @param {string} storeName
   * @param {string} indexName
   * @param {string|number} keyValue
   * @returns {Promise<T>}
   */
  getAll(storeName, indexName, keyValue) {
    return this._dbPromise.then(db => {
      const tx = db.transaction(storeName, 'readonly');
      const store = tx.objectStore(storeName);
      let queryTarget = store;
      if (indexName) {
        queryTarget = store.index(indexName);
      }
      return queryTarget.getAll(keyValue);
    });
  }

}

export { StorageService };
