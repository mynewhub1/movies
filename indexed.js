import { openDB } from "idb";
const apiKey = import.meta.env.VITE_API_KEY;

export const database = openDB("MovieStore", 2, {
  upgrade(db) {
    db.createObjectStore("moviesToStore", {
      keyPath: "id",

      autoIncrement: true,
    });

    db.createObjectStore("FavmoviesToStore", {
      keyPath: "fav",

      autoIncrement: true,
    });
  },
});

// import { openDB } from 'idb';
// const apiKey = import.meta.env.VITE_API_KEY;

// export const database =  openDB('MovieStore', 2, {
//     upgrade(db) {
//      db.createObjectStore('moviesToStore',    {keyPath:"id",

//        autoIncrement: true });

//        db.createObjectStore('FavmoviesToStore',    {keyPath:"fav",

//        autoIncrement: true });

//     },
//   });

// import { openDB } from "idb";
// export const database = openDB("movieStore", 2, {
//   upgrade(db) {
//     db.createObjectStore("MoviesToStore", {
//       keyPath: "id",
//       autoIncrement: true,
//     });
//   },
// });

//function
// a function is const myfunc = () => {

//}
// method
// a method is myMethod() {
// console.log("");

//}

// //opening the data base
// import { openDB } from 'idb';

// export const database = openDB('movieStore', 2, {

// upgrade(db) {
// db.createObjectStore("MoviesToStore", { keyPath: "id" }, { autoIncrement: true });
//  },
//  });

// //function
// // a function is const myfunc = () => {

// //}
// // method
// // a method is myMethod() {
// // console.log("");

// //}
