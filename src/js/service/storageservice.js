import * as idb from '../../../node_modules/idb/lib/node.js';
import AppServiceComponent from "../framework/appservicecomponent.js";
import ProgressController from "../controller/progresscontroller.js"; // causes non-critical error when built

/** Class representing storage service.
 * Uses https://github.com/jakearchibald/idb -- https://www.npmjs.com/package/idb
 */
export default class StorageService extends AppServiceComponent {
  /**
   * Create storage service.
   * @constructor
   */
  constructor() {
    super();
    this.config = {
      storage: 'storage',
    };
    this.dependencies = {
      UiControllers: {
        ProgressController: 'ProgressController',
      },
    };
  }

  /* === Public methods === */

  runRoot() {
    super.runRoot();
    this._dbPromise = this.dbOpen(this.config.storage.dbVersion);
    this.logSummary();
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
    if (showProgress) this.dependencies.UiControllers.ProgressController.show('Adding records to ' + storeName, '', recordSetLength);
    return this._dbPromise.then(db => {
      const tx = db.transaction(storeName, 'readwrite');
      const store = tx.objectStore(storeName);
      return Promise.all(recordSet.map((item, index) => {
          if (!(index%increment)) {
            this.dependencies.UiControllers.ProgressController.addCount(increment);
            // console.log('Adding another ' + increment);
          }
          return store.put(item);
        }) // map
      ).catch(e => {
        this.dependencies.UiControllers.ProgressController.hide(100);
        tx.abort();
        console.log(e);
      }).then(() => {
        this.dependencies.UiControllers.ProgressController.setCount(recordSetLength);
        this.dependencies.UiControllers.ProgressController.hide(2500);
        // console.log('Added ' + recordSet.length + ' items to ' + storeName);
      });
    });
  }

  /**
   * Delete from store
   * @param {string} storeName
   * @param {string} keyValue - is either an object to store or array of objects to store
   */
  delete(storeName, keyValue) {
    return this._dbPromise.then(db => {
      const tx = db.transaction(storeName, 'readwrite');
      const store = tx.objectStore(storeName);
      return store.delete(keyValue);
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

  /**
   * Get all records from store or optionally from store index optionally filtering by index key field value
   * @param {string} storeName
   * @param {string} indexName
   * @param {string|number} keyValue
   * @returns {Promise<T>}
   */
  get(storeName, indexName, keyValue) {
    return this._dbPromise.then(db => {
      const tx = db.transaction(storeName, 'readonly');
      const store = tx.objectStore(storeName);
      let queryTarget = store;
      if (indexName) {
        queryTarget = store.index(indexName);
      }
      return queryTarget.get(keyValue);
    });
  }

  /* === Private methods : SECONDARY === */

  /**
   * Create IDB open promise that creates required stores as per dbVersion
   * @param {number} dbVersion - current db version
   * @returns {Promise<Cache>|IDBOpenDBRequest}
   */
  dbOpen(dbVersion) {
    return idb.open(this.config.storage.dbName, dbVersion, upgradeDb => {
      const storeVersionedList = this.config.storage.store; // store list
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
    const storeList = [].concat.apply([], this.config.storage.store).map(e => e.storeName);
    storeList.forEach(storeName => {
      this.storeCount(storeName).then(v => {
        console.log(storeName + '.length == ' + v);
      }).catch(e => {
        console.log(e);
      });
    });
  }
}
