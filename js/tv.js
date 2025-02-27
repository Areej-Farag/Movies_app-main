const apiKey ='1d6f069235ee2ec50c1a4d2102a76a02'
const lang = document.getElementById('lang');
let apiUrl =`https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=${lang.value}&page=1&sort_by=popularity.desc&api_key=${apiKey}`
let movieContainer = document.getElementById('Movies-list');
const searchBar = document.getElementById("search-input");
const searchBarBtn = document.getElementById("searchBarBtn");
async function searchAll(searchTerm) {
    const url = `https://api.themoviedb.org/3/search/tv?api_key=${apiKey}&language=en-US&query=${searchTerm}&page=1&include_adult=false`;
    const data = await fetchMovies(url)
    drawMovies(data);
  }
  searchBarBtn?.addEventListener("click", () => {
    movieContainer.innerHTML = "";
    searchAll(searchBar.value);
  });
const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZDZmMDY5MjM1ZWUyZWM1MGMxYTRkMjEwMmE3NmEwMiIsIm5iZiI6MTczNzc5NTEwMC45Njk5OTk4LCJzdWIiOiI2Nzk0YTYxYzVhN2Q4MDczMWQxODdhOWIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.gwUMrmhMs1oJgyN3rZbpg6rkt8gImCDHPUKj3Ops5D0'
    }
  };
  lang.addEventListener('change', () => {
    if (lang.value === 'en-US') {
        language = 'en-US';
         apiUrl =`https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=${lang.value}&page=1&sort_by=popularity.desc&api_key=${apiKey}`
    } else {
        language = 'ar';
        apiUrl =`https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=${lang.value}&page=1&sort_by=popularity.desc&api_key=${apiKey}`
    }
    movieContainer.innerHTML = ""
    fetchMovies(apiUrl , options).then((movies) => {
        drawMovies(movies);
    
     });
    });

async function fetchMovies(URL , option) {
    const response = await fetch(URL ,option);
    const data = await response.json();
    console.log(data.results);
    if(!data.results) {
        console.log('error');  
    }
    return data.results;
   
}

fetchMovies(apiUrl , options).then((movies) => {
    console.log(movies);
    drawMovies(movies);})


function drawMovies(movies) {
    movies.map((movie) => {
        if (movie.overview.length > 200) {
            movie.overview = movie.overview.slice(0, 100) + '...';
        }
        const movieCard = document.createElement('a');
        movieCard.setAttribute('class', 'movie-card');
        movieCard.setAttribute('href', `tvdetails.html?id=${movie.id}`);
        movieCard.classList.add('movie-card');
        movieCard.innerHTML = `
        <span class="movie-rate">${+(movie.vote_average).toFixed(1)*10}%</span>

        <div class="image">
            <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="${movie.title}">
          </div>
          <div class="movie-info">
            <h3>${movie.name}</h3>
          
        </div>
        <div class="overview">
            <p>${movie.first_air_date}</p>
        </div>
        </div>
        `;
        movieContainer?.appendChild(movieCard);
    })
}
if(localStorage.getItem('email') && localStorage.getItem('password')) {
    let Fchar =localStorage.getItem('name').split(' ')[0].charAt(0);
    let Schar =localStorage.getItem('name').split(' ')[1].charAt(0);
    document.getElementById('signin').innerHTML=`${Fchar}${Schar}`;
    document.getElementById('signin').setAttribute("class",'borderdPerson');
  }
  