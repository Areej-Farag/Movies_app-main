const apiKey = "210b492d626133d52f8b057ceedfc6b4";
let language;
const lang = document.getElementById("lang");
const MoviesGenersURL = `https://api.themoviedb.org/3/genre/movie/list?language=${lang.value}&api_key=${apiKey}`;
const SeriesGenersURL = `https://api.themoviedb.org/3/genre/tv/list?language=${lang.value}&api_key=${apiKey}`;
const Cast = document.getElementById("cast-list");
const movieContainer = document.getElementById("movies-details");
let elementId = window.location.search.split("=")[1];
let MovieDetailsURl = `https://api.themoviedb.org/3/movie/${elementId}/credits?api_key=${apiKey}`;
let movieIDURL = `https://api.themoviedb.org/3/movie/${elementId}?language=${lang.value}&api_key=${apiKey}`;
const videosURL = `https://api.themoviedb.org/3/movie/${elementId}/videos?api_key=${apiKey}`;
//language handling
lang.addEventListener("change", () => {
  if (lang.value === "en-US") {
    language = "en-US";
    MovieDetailsURl = `https://api.themoviedb.org/3/movie/${elementId}/credits?language=${language}&api_key=${apiKey}`;
    movieIDURL = `https://api.themoviedb.org/3/movie/${elementId}?language=${language}&api_key=${apiKey}`;
  } else {
    language = "ar-EG";
    MovieDetailsURl = `https://api.themoviedb.org/3/movie/${elementId}/credits?language=${language}&api_key=${apiKey}`;
    movieIDURL = `https://api.themoviedb.org/3/movie/${elementId}?language=${language}&api_key=${apiKey}`;
  }
  movieContainer.innerHTML = "";
  fetchData(movieIDURL).then((movies) => {
    drawFullMovie(movies);
  });
});
//fetch data
async function fetchData(URL) {
  const response = await fetch(URL);
  const data = await response.json();
  if (data) {
    return data;
  }
}
//fetch movie and display it
fetchData(movieIDURL).then((movies) => {
  drawFullMovie(movies);
});
//fetch trailer
fetchData(videosURL).then((video) => {
  if (video.results.length > 0) {
    let VideoLink = `https://www.youtube.com/watch?v=${video.results[0].key}`;
    document.getElementById("trailerFrame").src = VideoLink.replace(
      "watch?v=",
      "embed/"
    );
    document.getElementById("trailer").addEventListener("click", () => {
      console.log("clicked");

      document.getElementById("trailerContainer")?.classList.remove("hidden");
    });
    document.getElementById("close").addEventListener("click", () => {
      document.getElementById("trailerContainer")?.classList.add("hidden");
    });
  } else {
    alert("No trailer available");
  }
});
//fetch cast and drawing them
fetchData(MovieDetailsURl)
  .then((cast) => cast.cast)
  .then((castMembers) => {
    drawCast(castMembers);
  });
//draw full movie
function drawFullMovie(item) {
  let runtimeHR = parseInt(+item.runtime / 60);
  let runtimeMin = Number(item.runtime % 60);
  movieContainer.innerHTML = `
                 <div class="itemContainer">
                            <div class="itemImg">
                            <img src="https://image.tmdb.org/t/p/w500/${
                              item.poster_path
                            }" alt="${item.title}">
                            </div>
                            <div class="itemInfo">
                            <h3 class="title">${item.title || item.name}</h3>
                            <div class="info-container">
                            
                            <p class="air">${
                              item.first_air_date || item.release_date
                            }</p>
                            <ul class="genres" id="genres"></ul>
                            <p class="runtime">${runtimeHR}Hr ${runtimeMin}M</p>
                            </div>
                            </div>
                            <div class="itemicons">
                            <div class="rate-container" >
                                <span class="rate">${
                                  item.vote_average.toFixed(1) * 10
                                }%</span>
                                <span>User Score</span>
                            </div>
                                 <div class ="icons">
                                <i class="fa-solid fa-list"></i>
                                <i class="fa-solid fa-heart"></i>
                                <i class="fa-solid fa-bookmark"></i>
                                <span ><i class="fa-solid fa-play"></i> <button class="watch-trailer" id="trailer"> Watch Trailer</button></span>
                            </div> 
                            </div>
                            <div class="itemOverView">
                            <h3>Overview</h3>
                            <p>${
                              item.overview ||
                              "We don't have an overview translated in English. Help us expand our database by adding one."
                            }</p>
                            </div>
                        </div> 
                        <div class= "trailerContainer hidden" id="trailerContainer">
                        <div class="trailer">
                        <button id="close"><i class="fa-solid fa-xmark"></i></button>
                        <iframe id="trailerFrame" width="560" height="315" frameborder="0" allowfullscreen></iframe>
                        </div>
                        </div>
                </div> 
        `;

  const geners = document.getElementById("genres");
  item.genres.map((genre) => {
    const genreCard = document.createElement("li");
    genreCard.innerHTML = `${genre.name} ,`;
    geners.appendChild(genreCard);
  });
  movieContainer.style.backgroundImage = `url(https://image.tmdb.org/t/p/w500/${item.poster_path})`;
  movieContainer.style.backgroundSize = "cover";
}
//draw cast
async function drawCast(items) {
  items?.map((item) => {
    const actorCard = document.createElement("a");
    actorCard.setAttribute("class", "actorCard");
    actorCard.setAttribute("href", `peopleinfo.html?id=${item.id}`);
    actorCard.classList.add("actorCard");
    actorCard.innerHTML = `
        <img src="https://image.tmdb.org/t/p/w500/${
          item.profile_path || item.backdrop_path
        }" alt="" />
        <p class="actorName">${item.name || item.title}</p>
        <p class="actorRole">${item.character || ""}</p>
        `;
    Cast?.appendChild(actorCard);
  });
}
//Check if the user is logged in
if (localStorage.getItem("email") && localStorage.getItem("password")) {
  let Fchar = localStorage.getItem("name").split(" ")[0].charAt(0);
  let Schar = localStorage.getItem("name").split(" ")[1].charAt(0);
  document.getElementById("signin").innerHTML = `${Fchar}${Schar}`;
  document.getElementById("signin").setAttribute("class", "borderdPerson");
}
