const apiKey = "210b492d626133d52f8b057ceedfc6b4";
let language;
const main = document.getElementById("main");
const lang = document.getElementById("lang");
let apiUrl = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=${lang.value}&page=1&sort_by=popularity.desc&api_key=${apiKey}`;
const genresURL = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`;
let movieContainer = document.getElementById("Movies-list");
const searchBar = document.getElementById("search-input");
const searchMain = document.getElementById("search-input-main");
const searchBarBtn = document.getElementById("searchBarBtn");
const searchMainBtn = document.getElementById("searchMainBtn");
const generslist = document.getElementById("geners-list");
const SortSelect = document.getElementById("SortSelect");
const searchFilter = document.getElementById("searchFilter");
//search by title handler
async function searchTitle(searchTerm) {
  const url = `https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&language=en-US&query=${searchTerm}&page=1&include_adult=false`;
  const data = await fetchData(url);
  data.map((result) => {
    if (result.media_type === "movie") {
      drawMovies(result);
    } else if (result.media_type === "tv") {
      drawMovies(result);
    } else if (result.media_type === "person") {
      drawActor(result);
    }
  });
}
//navBar search
searchBarBtn?.addEventListener("click", () => {
  movieContainer.innerHTML = "";
  searchTitle(searchBar.value);
});
//main search
searchMainBtn?.addEventListener("click", () => {
  movieContainer.innerHTML = "";
  searchTitle(searchMain.value);
});
//language handling
lang.addEventListener("change", () => {
  if (lang.value === "en-US") {
    language = "en-US";
    apiUrl = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=${lang.value}&page=1&sort_by=popularity.desc&api_key=${apiKey}`;
  } else {
    language = "ar";
    apiUrl = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=${lang.value}&page=1&sort_by=popularity.desc&api_key=${apiKey}`;
  }
  movieContainer.innerHTML = "";
  fetchData(apiUrl).then((movies) => {
    drawMovies(movies);
  });
});
//draw Geners
function drawGeners(geners) {
  geners.map((geners) => {
    const genersDiv = document.createElement("div");
    genersDiv.setAttribute("class", "genersDiv");
    const generslabel = document.createElement("label");
    generslabel.setAttribute("class", "genersLabel");
    generslabel.setAttribute("for", `${geners.id}`);
    const generItem = document.createElement("input");
    generItem.setAttribute("class", "genersItem");
    generItem.setAttribute("type", "checkbox");
    generItem.setAttribute("value", `${geners.id}`);
    generItem.classList.add("genersItem");
    genersDiv.innerHTML = `
        <p>${geners.name}</p>
        `;
    genersDiv.appendChild(generItem);
    genersDiv.appendChild(generslabel);
    generslist?.appendChild(genersDiv);
  });
}
fetchData(genresURL).then((geners) => drawGeners(geners.genres));
//filtered search
function SelectSearch() {
  let sortVal = SortSelect.value;
  let discoverMoviesURL = `https://api.themoviedb.org/3/discover/movie?api_key=210b492d626133d52f8b057ceedfc6b4&sort_by=${sortVal}`;
  let checkedGenres = Array.from(
    document.querySelectorAll('input[type="checkbox"]:checked')
  ).map((genre) => genre.value);
  if (checkedGenres) {
    checkedGenres = checkedGenres.join(",");
    discoverMoviesURL = `https://api.themoviedb.org/3/discover/movie?api_key=210b492d626133d52f8b057ceedfc6b4&sort_by=${sortVal}&with_genres=${checkedGenres}`;
  }
  fetchData(discoverMoviesURL).then((movies) => {
    movieContainer.innerHTML = "";
    let movieArr = movies.results;
    movieArr.map((movie) => drawMovies(movie));
  });
}
searchFilter.addEventListener("click", SelectSearch);

//fetch data
async function fetchData(url) {
  const response = await fetch(url);
  const data = await response.json();
  if (!data) {
    console.log("error");
  }
  Movies = data.results;
  return data;
}
fetchData(apiUrl)
  .then((data) => data.results)
  .then((movies) => {
    movies.map((movie) => {
      drawMovies(movie);
    });

    Movies = movies;
  });
  
//draw movies
function drawMovies(movie) {
  if (movie.overview?.length > 200) {
    movie.overview = movie.overview.slice(0, 100) + "...";
  }
  const movieCard = document.createElement("a");
  movieCard.setAttribute("class", "movie-card");
  movieCard.setAttribute("href", `movieDetails.html?id=${movie.id}`);
  movieCard.classList.add("movie-card");
  // movieCard.classList.add("col");
  movieCard.innerHTML = `
        <span class="movie-rate">${+movie.vote_average?.toFixed(1) * 10}%</span>
        <div class="image">
            <img src="https://image.tmdb.org/t/p/w500/${
              movie.poster_path || movie.profile_path
            }" alt="${movie.title}">
          </div>
          <div class="movie-info">
            <h3>${movie.title || movie.name}</h3>
          
        <div class="overview">   
           <p>${
             movie.release_date ||
             movie.first_air_date ||
             movie.birthday ||
             "Not Available"
           }</p>
        </div>
        </div>
        `;
  movieContainer?.appendChild(movieCard);
}
//checking for accounts to display the profile icon
if (localStorage.getItem("email") && localStorage.getItem("password")) {
  let Fchar = localStorage.getItem("name").split(" ")[0].charAt(0);
  let Schar = localStorage.getItem("name").split(" ")[1].charAt(0);
  document.getElementById("signin").innerHTML = `${Fchar}${Schar}`;
  document.getElementById("signin").setAttribute("class", "borderdPerson");
}
