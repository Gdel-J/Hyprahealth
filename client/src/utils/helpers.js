/**
 * Pluralizes a given word based on the count.
 *
 * @param {string} name - The word to be pluralized.
 * @param {number} count - The count based on which the word will be pluralized.
 * @returns {string} - The pluralized word.
 */
export function pluralize(name, count) {
    return count === 1 ? name : name + 's';
  }
  
  /**
   * A utility function to interact with IndexedDB using Promises.
   *
   * @param {string} storeName - The name of the IndexedDB store.
   * @param {string} method - The type of operation ('put', 'get', 'delete').
   * @param {object} object - The object to be stored/queried in IndexedDB.
   * @returns {Promise} - A promise that resolves with the result of the operation.
   */
  export function idbPromise(storeName, method, object) {
    return new Promise((resolve, reject) => {
      const request = window.indexedDB.open('shop-shop', 1); // Open a new connection to IndexedDB with version 1.
      let db, tx, store;
  
      // Triggered when a new database is being created or the version changes.
      request.onupgradeneeded = function(e) {
        const db = request.result;
  
        // Create object stores for 'products', 'categories', and 'cart' with 'item' as the key.
        db.createObjectStore('products', { keyPath: 'item' });
        db.createObjectStore('categories', { keyPath: 'item' });
        db.createObjectStore('cart', { keyPath: 'item' });
      };
  
      // Handle any errors that occur with our request.
      request.onerror = function(e) {
        console.error('There was an error opening the IndexedDB:', e);
      };
  
      // Handle successful request.
      request.onsuccess = function(e) {
        db = request.result;
        tx = db.transaction(storeName, 'readwrite');
        store = tx.objectStore(storeName);
  
        db.onerror = function(e) {
          console.error('Database error:', e.target.errorCode);
        };
  
        // Perform different operations based on the method provided.
        switch (method) {
          case 'put':
            store.put(object);
            resolve(object);
            break;
          case 'get':
            const all = store.getAll();
            all.onsuccess = function() {
              resolve(all.result);
            };
            break;
          case 'delete':
            store.delete(object.item);
            break;
          default:
            console.error('No valid method provided for IndexedDB operation.');
            break;
        }
  
        // Close the database connection when the transaction is complete.
        tx.oncomplete = function() {
          db.close();
        };
      };
    });
  }
  