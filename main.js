import './style.css'
import {database} from "./indexed";

class Store {
  constructor(init) {
    const self = this;
    // store is context
    this.subscribers = [];

    database.then(async (db) => {
      this.db = db;
      let movie = await db.get("moviesToStore", "movie");

      if (movie) {
        for(const [key,value] of Object.entries(movie))
        this.set(key,value);
      }
    });

    this.state = new Proxy(init, {
      async set(state, key, value) {
        state[key] = value;
        // w.e parent node innerHTML is null
        console.log(self.subscribers);
        if (self.db) {
          await self.db.put("moviesToStore", value[value.length-1]);  
        }
        self.subscribers.forEach((subscriber) => subscriber(state));

        console.log("this is the set method");

        // return true;
      },
    });
  }
  subscribe(cb) {
    if (typeof cb !== "function") {
      throw new Error("You must subscribe with a function");
    }
    console.log(this.subscribers);
    this.subscribers.push(cb);

    // console.log('we have subscribed')
  }
  addMovie(state, value) {
    let newState = state.movies.push(value);
    
    // returns length of array
    console.log(value);
    console.log(newState);
    
    
    console.log(this.state.movies);
    
    this.state = Object.assign(this.state, state);

    console.log(this.state);
  }
  getAllMovies() {
    return this.state.movies;
  }
  addFavMovie(state, value) {
    let newFavState = state.favMovies.push(value);
    
    // returns length of array
    console.log(value);
    console.log(newFavState);
    
    
    console.log(this.state.favMovies);
   
    this.state = Object.assign(this.state, state);

    console.log(this.state);
  }
  getAllFavMovies() {
    return this.state.favMovies;
  }
  



}
const store = new Store({ movies: [] });
const favstore = new Store({ favMovies: [] });

console.log(store);
console.log(favstore)
// create new store and want to sub to store
// sub to store anytime state changes subscriber is going to call method (adding comment)
store.subscribe((state) => {
  console.log(state);
  let movieState = state.movies;
  let favMovieState = state.favMovies;
  console.log(favMovieState)
  movieState.forEach((subMovies) => document.body.appendChild(subMovies));
  favMovieState.forEach((subFavMovies) => document.body.appendChild(subFavMovies));
});

class Movie extends HTMLElement {
  constructor() {
    super();
    this.title = "";
    this.year = "";
    this.plot = "";

    // to init the proper
    // used open string later will be changed
  }
  static get observedAttributes() {
    return ["title", "year", "plot"];
  }
  attributeChangedCallback(attributeName, oldValue, newValue) {
    if (oldValue === newValue) return;
    this[attributeName] = newValue;
    // updating the empty string with the new value;
    // using [] because dont quite know the atrr === this.name , this.email etc
  }

  
}
// name.email,comment are properties of JS
//

window.customElements.define("movie-display", Movie);

document.addEventListener("DOMContentLoaded", () => {
  async function moviesList() {
    const apiKey = "896bcbd1";
    const url = await fetch(`https://www.omdbapi.com/?t=${title}&y=${year}&plot=${plot}&apikey=${apiKey}`);       console.log(url);
    const data = await url.json()
    data = data.Search
    let maincontainer = document.getElementById("movie")
    let movieObject = { Title: data.Title, year: data.Year, Plot: data.Plot, Poster: data.Poster }
    let title = document.createElement("p")
    title.textContent = `${movieObject.Title}`
    let year = document.createElement("p")
    year.textContent = `${movieObject.Year}`
    let plot = document.createElement("p")
    plot.textContent = `${movieObject.Plot}`
    let poster = document.createElement("img")
    poster.src = `${movieObject.Poster}`


    maincontainer.appendChild(title)
    maincontainer.appendChild(year)
    maincontainer.appendChild(plot)
    maincontainer.appendChild(poster)

    let favLabel = document.createElement('label')
    favLabel.setAttribute("for", "favs")
    favLabel.setAttribute("id", "favslab")
    favLabel.textContent = 'favorite this movie'
    maincontainer.appendChild(favLabel)
    let favsToggle = document.createElement("input")
    favsToggle.setAttribute("type", "checkbox")
    favsToggle.setAttribute("id", "favs")
    maincontainer.appendChild(favsToggle)



    favsToggle.addEventListener("change", (e) => {
      if (e.target.checked) {
        console.log('its clicked bruh')
        let favMovies = [];
        favMovies.push(movieDisplay)
        console.log(favMovies)
        let favMovieDisplay = document.createElement('div')
        let favYear = document.createTextNode(dataYear)
        favMovieDisplay.appendChild(favYear)
        let favPlot = document.createTextNode(dataPlot)
        favMovieDisplay.appendChild(favPlot)
        let favposter = document.createElement('img')
        favposter.setAttribute("src", `${data.Poster}`)
        favMovieDisplay.appendChild(favposter)
        document.body.appendChild(favMovieDisplay)
        console.log(favMovieDisplay)
        favstore.addFavMovie(favstore.state, favMovieDisplay);
        console.log(favstore.state)
      } else {
        console.log('not checked bruh')
      }
    })


    let notes = document.createElement('textarea')
    notes.setAttribute("rows", "5")
    notes.setAttribute("cols", "20")
    notes.setAttribute("id", "note")
    maincontainer.appendChild(notes)
    let notesbtn = document.createElement("button")
    notesbtn.textContent = 'Add notes'
    maincontainer.appendChild(notesbtn)
    notesbtn.addEventListener("click", (e) => {
      let notesVal = document.getElementById("note").value;
      let res = document.createTextNode(notesVal)
      let resdisplay = document.createElement('div')
      resdisplay.appendChild(res)
      maincontainer.appendChild(resdisplay)
    })






    document.body.appendChild(maincontainer);
    store.addMovie(store.state, maincontainer);



  }

});
let button = document.createElement('button')
button.addEventListener("click", (e) => {
  movieTitle() 
})        
