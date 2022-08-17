import { openDB } from "idb";
export const database = openDB("movieStore", 2, {
  upgrade(db) {
    db.createObjectStore("MoviesToStore", {
      keyPath: "id",
      autoIncrement: true,
    });
  },
});

//function
// a function is const myfunc = () => {

//}
// method
// a method is myMethod() {
// console.log("");

//}

