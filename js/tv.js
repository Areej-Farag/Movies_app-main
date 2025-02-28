const apiKey = "210b492d626133d52f8b057ceedfc6b4";
const lang = document.getElementById("lang");
const genresURL = `https://api.themoviedb.org/3/genre/tv/list?api_key=${apiKey}&language=en-US`;
let apiUrl = `https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=${lang.value}&page=1&sort_by=popularity.desc&api_key=${apiKey}`;
let movieContainer = document.getElementById("Movies-list");
const searchBar = document.getElementById("search-input");
const searchBarBtn = document.getElementById("searchBarBtn");
const generslist = document.getElementById("geners-list");
const SortSelect = document.getElementById("SortSelect");
const searchFilter = document.getElementById("searchFilter");
//search handler
async function searchAll(searchTerm) {
  const url = `https://api.themoviedb.org/3/search/tv?api_key=${apiKey}&language=en-US&query=${searchTerm}&page=1&include_adult=false`;
  const data = await fetchData(url);
  const dataArr = data.results;
  dataArr.map((movie) => drawMovies(movie));
}
searchBarBtn?.addEventListener("click", () => {
  movieContainer.innerHTML = "";
  searchAll(searchBar.value);
});
//language handling
lang.addEventListener("change", () => {
  if (lang.value === "en-US") {
    language = "en-US";
    apiUrl = `https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=${lang.value}&page=1&sort_by=popularity.desc&api_key=${apiKey}`;
  } else {
    language = "ar";
    apiUrl = `https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=${lang.value}&page=1&sort_by=popularity.desc&api_key=${apiKey}`;
  }
  movieContainer.innerHTML = "";
  fetchData(apiUrl, options).then((movies) => {
    drawMovies(movies);
  });
});
//Filtering handler
function SelectSearch() {
  let sortVal = SortSelect.value;
  let discoverMoviesURL = `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&sort_by=${sortVal}`;
  let checkedGenres = Array.from(
    document.querySelectorAll('input[type="checkbox"]:checked')
  ).map((genre) => genre.value);
  if (checkedGenres) {
    checkedGenres = checkedGenres.join(",");
    discoverMoviesURL = `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&sort_by=${sortVal}&with_genres=${checkedGenres}`;
  }
  fetchData(discoverMoviesURL).then((movies) => {
    movieContainer.innerHTML = "";
    let movieArr = movies.results;
    console.log(movieArr);

    movieArr.map((movie) => drawMovies(movie));
  });
}
searchFilter.addEventListener("click", SelectSearch);

//fetch data
async function fetchData(URL) {
  const response = await fetch(URL);
  const data = await response.json();
  if (!data) {
    console.log("error");
  }
  return data;
}
//fetch Tv Showes and draw them
fetchData(apiUrl).then((TV) => {
  let TVArr = TV.results;
  TVArr.map((tvShow) => {
    drawMovies(tvShow);
  });
});
//fethcing geners and drawing them for sorting
fetchData(genresURL).then((geners) => drawGeners(geners.genres));
//drawing geners  for sorting
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
//drawing movies
function drawMovies(movie) {
  if (movie.overview.length > 200) {
    movie.overview = movie.overview.slice(0, 100) + "...";
  }
  const movieCard = document.createElement("a");
  movieCard.setAttribute("class", "movie-card");
  movieCard.setAttribute("href", `tvdetails.html?id=${movie.id}`);
  movieCard.classList.add("movie-card");
  movieCard.innerHTML = `
        <span class="movie-rate">${+movie.vote_average.toFixed(1) * 10}%</span>

        <div class="image">
            <img src="https://image.tmdb.org/t/p/w500/${
              movie.poster_path
            }" alt="${movie.title}">
          </div>
          <div class="movie-info">
            <h3>${movie.name || movie.original_name}</h3>
          
        </div>
        <div class="overview">
            <p>${movie.first_air_date || "Not Available"}</p>
        </div>
        </div>
        `;
  movieContainer?.appendChild(movieCard);
}
//Check if the user is logged in
if (localStorage.getItem("email") && localStorage.getItem("password")) {
  let Fchar = localStorage.getItem("name").split(" ")[0].charAt(0);
  let Schar = localStorage.getItem("name").split(" ")[1].charAt(0);
  document.getElementById("signin").innerHTML = `${Fchar}${Schar}`;
  document.getElementById("signin").setAttribute("class", "borderdPerson");
}
