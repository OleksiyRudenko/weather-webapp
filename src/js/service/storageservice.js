/** Class representing storage service.
 * Uses https://github.com/jakearchibald/idb -- https://www.npmjs.com/package/idb
 */
class StorageService {
  /**
   * Create storage service.
   * @constructor
   * @param {object} appConfig - application config
   */
  constructor(appConfig) {
    this._appConfig = appConfig;
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
    return this._dbPromise.then(db => {
      const tx = db.transaction(storeName, 'readwrite');
      const store = tx.objectStore(storeName);
      return Promise.all(recordSet.map(item => {
          return store.put(item);
        }) // map
      ).catch(e => {
        tx.abort();
        console.log(e);
      }).then(() => {
        console.log('Added ' + recordSet.length + ' items to ' + storeName);
      });
    });
  }

}