const apiKey ='1d6f069235ee2ec50c1a4d2102a76a02'
const lang = document.getElementById('lang');
let apiUrl =`https://api.themoviedb.org/3/account/21773941/watchlist/tv?language=${lang.value}&page=1&sort_by=created_at.asc&api_key=${apiKey}`
const watchlist = document.getElementById('watchlist-list');

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
       apiUrl =`https://api.themoviedb.org/3/account/21773941/watchlist/tv?language=${lang.value}&page=1&sort_by=created_at.asc&api_key=${apiKey}`
  }else{
      language = 'ar';
       apiUrl =`https://api.themoviedb.org/3/account/21773941/watchlist/tv?language=${lang.value}&page=1&sort_by=created_at.asc&api_key=${apiKey}`
  }
  watchlist.innerHTML = ""
  fetchMovies(apiUrl,options ).then((movies) => {
      drawMovies(movies);
  
   });
  });

  

async function fetchMovies(url){
  const Apidata = await(fetch(url , options))
  const res = await(Apidata.json()) 
  const data = res.results
  // drawMovies(data)

  return data
}

let movies ;
 fetchMovies(apiUrl,options).then((res)=>{
  drawMovies(res)
})

function drawMovies(movies){
  movies.map((movie)=>{
  const movieLabel = document.createElement('label');
  movieLabel.setAttribute('class', 'movie-label');
  movieLabel.innerHTML=
  `
<div class="image">
            <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="${movie.title}">

</div>
<div class="movie-info">
    <div class="movie-name">
        <h3>${movie.name} <span>( ${movie.original_name} )</span></h3>  
        <p> ${movie.first_air_date}</p>
    </div>
    <div class="movie-description">
       <p> ${movie.overview}</p>
       <p> Movie origin Contry : ${movie.origin_country[0]}</p>
    </div>
    <div class="movie-overview">
        <p> Rate : ${movie.vote_average}</p>
        <div class="icons">
            <p><i class="fa-solid fa-star"></i>Rate it!</p>
            <p><i class="fa-solid fa-heart"></i>Favorite</p>
            <p><i class="fa-solid fa-list-ul"></i>Add to list</p>
            <p><i class="fa-solid fa-x"></i>Remove</p>
        </div>

    </div>
</div>


   `
   watchlist.appendChild(movieLabel);

})}

if(localStorage.getItem('email') && localStorage.getItem('password')) {
  let Fchar =localStorage.getItem('name').split(' ')[0].charAt(0);
  let Schar =localStorage.getItem('name').split(' ')[1].charAt(0);
  document.getElementById('signin').innerHTML=`${Fchar}${Schar}`;
  document.getElementById('signin').setAttribute("class",'borderdPerson');
}
