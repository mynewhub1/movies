//opening the data base
import { openDB } from 'idb';

const indexedDB =
  window.indexedDB ||
  window.mozIndexedDB ||
  window.webkitIndexedDB ||
  window.msIndexedDB ||
  window.shimIndexedDB;

if (!indexedDB) {
  console.log("IndexedDB could not be found in this browser.");
}
const request = indexedDB.open("MovieStoreDB", 1);

request.onerror = function (event) {
  console.error("An error occurred with IndexedDB");
  console.error(event);
};
request.onupgradeneeded = function () {
  //1
  const db = request.result;

  //2
  const store = db.createObjectStore("MoviesToStore", { keyPath: "movies" }, { autoIncrement: true });
// let movie = document.querySelector(movie-display)
// console.log(movie)
  //3
  // store.createIndex("comment", ["comments"], { unique: false });

  // 4

};

// // export const database = openDB('movieStore', 1, {
  
// //   upgrade(db) {
   
// //    const storeName = db.createObjectStore('moviesToStore');
 

// //    const tx = db.transaction('keyval', 'readwrite');
// //    const store = tx.objectStore('keyval');
// //    const val = (await store.get('movie-display'));

// // console.log(val)




// //   //  store.put('state', 'key')
   
// //   //  const tx = db.transaction(moviesToStore, 'readwrite')
// //   //  const dbstore = await tx.objectStore(moviesToStore) 

// //   //   const val = 'this is movie'
// //   //   const key = 'this is MOVIE'
// //   //   const value = await dbstore.put(val, key)
// //   //   await tx.done

// //   },
// // });