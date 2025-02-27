const apiKey = "1d6f069235ee2ec50c1a4d2102a76a02";
// let language;
const main = document.getElementById("main");
const lang = document.getElementById("lang");
let apiUrl = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=${lang.value}&page=1&sort_by=popularity.desc&api_key=${apiKey}`;
let movieContainer = document.getElementById("Movies-list");
const searchBar = document.getElementById("search-input");
const searchMain = document.getElementById("search-input-main");
const searchBarBtn = document.getElementById("searchBarBtn");
const searchMainBtn = document.getElementById("searchMainBtn");
async function searchAll(searchTerm) {
  const url = `https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&language=en-US&query=${searchTerm}&page=1&include_adult=false`;
  const data = await fetchMovies(url);
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

searchBarBtn?.addEventListener("click", () => {
  movieContainer.innerHTML = "";
  searchAll(searchBar.value);
});
searchMainBtn?.addEventListener("click", () => {
  movieContainer.innerHTML = "";
  searchAll(searchMain.value);
});

lang.addEventListener("change", () => {
  if (lang.value === "en-US") {
    language = "en-US";
    apiUrl = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=${lang.value}&page=1&sort_by=popularity.desc&api_key=${apiKey}`;
  } else {
    language = "ar";
    apiUrl = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=${lang.value}&page=1&sort_by=popularity.desc&api_key=${apiKey}`;
  }
  movieContainer.innerHTML = "";
  fetchMovies(apiUrl).then((movies) => {
    drawMovies(movies);
  });
});

async function fetchMovies(url) {
  const response = await fetch(url);
  const data = await response.json();
  if (!data.results) {
    console.log("error");
  }
  Movies = data.results;
  return data.results;
}

let Movies;
fetchMovies(apiUrl).then((movies) => {
  movies.map((movie) => {
    drawMovies(movie);
  });

  Movies = movies;
});

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
             movie.release_date || movie.first_air_date || movie.birthday
           }</p>
        </div>
        </div>
        `;
  movieContainer?.appendChild(movieCard);
}

function drawActor(item) {
  const personeCard = document.createElement("a");
  personeCard.setAttribute("class", "person_card");
  personeCard.setAttribute("href", `page2.html?id=${item.id}`);
  personeCard.classList.add("person_card");
  personeCard.innerHTML = `
      <div class="image">
          <img src="https://image.tmdb.org/t/p/w500/${
            item.profile_path
          }" alt="${item.title}">
        </div>
        <div class="movie-info actor-name">
          <h3 class="actor-name">${item.name} </h3>
          <span >Actor</span>
      </div>
      
      <div class="overview">
          <h3>Known For</h3>
          ${item.known_for[0].title || item.known_for[0].name}  , ${
    item.known_for[1].title || item.known_for[1].name
  }  , ${item.known_for[2].title || item.known_for[2].name} 
      </div>
      </div>
      `;
  movieContainer?.appendChild(personeCard);
}
if(localStorage.getItem('email') && localStorage.getItem('password')) {
  let Fchar =localStorage.getItem('name').split(' ')[0].charAt(0);
  let Schar =localStorage.getItem('name').split(' ')[1].charAt(0);
  document.getElementById('signin').innerHTML=`${Fchar}${Schar}`;
  document.getElementById('signin').setAttribute("class",'borderdPerson');

}
