import './style.css'


import "./indexed";

class Store {
  constructor(init) {
    const self = this;
    // store is context
    this.subscribers = [];

    // database.then(async (db) => {
    //   this.db = db;
    //   let movie = await db.get("moviesToStore", "movie");

    //   if (movie) {
    //     for(const [key,value] of Object.entries(movie))
    //     this.set(key,value);
    //   }
    // });

    this.state = new Proxy(init, {
      async set(state, key, value) {
        state[key] = value;
        // w.e parent node innerHTML is null
        console.log(self.subscribers);
        // if (self.db) {
        //   await self.db.put("moviesToStore", state.movieStore, "movie");
        // }
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
    c
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
  postMovie (context){
    this.set("movieStore", context)
  }


//   favMovies(){
//     let favMovie = []
//     let favButton = document.getElementById("favbutton");
//     console.log(favButton)
    
//   }
}
const store = new Store({ movies: [] });
const favstore = new Store({ favMovies: [] });
const commentStore = new Store({movieStore: 0})
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

  connectedCallback() {
    // will be claaed fist time DOM is loaded
    this.innerHTML = `
    <p> title:  ${this.title} </p>
    <p> year: ${this.year} </p> 
    <p> plot: ${this.plot} </p>
    `

  }
}
// name.email,comment are properties of JS
//

window.customElements.define("movie-display", Movie);

document.addEventListener("DOMContentLoaded", () => {
  const btn = document.querySelector("#button");
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    
    let movieDisplay = document.createElement("movie-display");
    const title = document.querySelector("#title").value;
    console.log(title);
    const year = document.querySelector("#year").value;
    console.log(year);
    const plot = document.querySelector("#plot").value;
    console.log(plot);
    
    const apiKey = "896bcbd1";
    const url = `https://www.omdbapi.com/?t=${title}&y=${year}&plot=${plot}&apikey=${apiKey}`;
    console.log(url);
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        console.log(data.Title);
        console.log(data.Poster);
      //   const movieTemplate = `
      
      //   <h2>${data.Title}</h2>
      //   <p>${data.Year}</p>
      //   <img src="${data.Poster}">
      //   <p>${data.Plot}</p>
       
       
      // `;

        // let result = document.createTextNode(movieTemplate);

        // console.log(result);
        // document.body.appendChild(result);
      let dataTitle = data.Title;
      let titleP = document.createTextNode(dataTitle)
      console.log(titleP)
          movieDisplay.appendChild(titleP)
          let dataYear = data.Year;
          let yearP = document.createTextNode(dataYear)
          movieDisplay.appendChild(yearP)
          let dataPlot = data.Plot;
          let plotP = document.createTextNode(dataPlot)
          movieDisplay.appendChild(plotP)
          let dataPoster = document.createElement('img')
          dataPoster.setAttribute("src", `${data.Poster}` )
          movieDisplay.appendChild(dataPoster)
          
    
          
          
          
          
          
          
          
          let favLabel = document.createElement('label')
          favLabel.setAttribute("for", "favs")
          favLabel.setAttribute("id", "favslab")
          favLabel.textContent = 'favorite this movie'
          movieDisplay.appendChild(favLabel)
          
          let favsToggle = document.createElement("input")
          favsToggle.setAttribute("type", "checkbox")
          favsToggle.setAttribute("id", "favs")
          movieDisplay.appendChild(favsToggle)


          


        favsToggle.addEventListener("change", (e) => {
          if (e.target.checked){
            console.log('its clicked bruh')
            let favMovies = []; 
            favMovies.push(movieDisplay)
            console.log(favMovies)
          let favMovieDisplay = document.createElement('div')
          // let favTtitle = document.createElement('h1')
          // favTitle.textContent = 'favorite movies'
          // favMovieDisplay.appendChild(favTitle)
          let favTitle = document.createTextNode(dataTitle)
          console.log(favTitle)
          favMovieDisplay.appendChild(favTitle)

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
             
          }else {
            console.log('not checked bruh')
          }
        })
        
    
     

          
        
        let notes = document.createElement('textarea')
        notes.setAttribute("rows", "5")
        notes.setAttribute("cols", "20")
        notes.setAttribute("id", "note")
        movieDisplay.appendChild(notes)
        let notesbtn = document.createElement("button")
          notesbtn.textContent = 'Add notes'
          movieDisplay.appendChild(notesbtn)
          notesbtn.addEventListener("click", (e) => {
           let notesVal = document.getElementById("note").value;
           let res = document.createTextNode(notesVal)
           let resdisplay = document.createElement('div')
          resdisplay.appendChild(res)
          movieDisplay.appendChild(resdisplay)
         })







        document.body.appendChild(movieDisplay);
      });
    store.addMovie(store.state, movieDisplay);
  });
});







// notes = display ?? blocked or none 

//  to get it to show when the person clicked 

// 