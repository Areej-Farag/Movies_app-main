let elementId = window.location.search.split("=")[1];
const apiKey = "210b492d626133d52f8b057ceedfc6b4";
let language;
const lang = document.getElementById("lang");
let peopleDetailsURl = `https://api.themoviedb.org/3/person/${elementId}?language=${lang.value}&api_key=${apiKey}`;
const Cast = document.getElementById("cast-list");
const movieContainer = document.getElementById("movies-details");
const knownForUrl = `https://api.themoviedb.org/3/person/${elementId}/combined_credits?api_key=${apiKey}
`;
//language handling
lang.addEventListener("change", () => {
  if (lang.value === "en-US") {
    language = "en-US";
    peopleDetailsURl = `https://api.themoviedb.org/3/person/${elementId}?language=${language}&api_key=${apiKey}`;
  } else {
    language = "ar-EG";
    peopleDetailsURl = `https://api.themoviedb.org/3/person/${elementId}?language=${language}&api_key=${apiKey}`;
  }
  movieContainer.innerHTML = "";
  fetchData(peopleDetailsURl).then((people) => {
    drawPerson(people);
  });
});
//fetch data
async function fetchData(URL) {
  const response = await fetch(URL);
  const data = await response.json();
  console.log(data);
  if (data) {
    return data;
  }
}
//fetching actor info and drawing them
let person = fetchData(peopleDetailsURl).then((people) => {
  drawPerson(people);
});
//drawing actors function
function drawPerson(item) {
  if (item.gender === 1) {
    item.gender = "Female";
  } else if (item.gender === 2) {
    item.gender = "Male";
  }
  movieContainer.innerHTML = `
             <div class="itemContainer personContainer">
             <div class="itemImg">
                        <img src="https://image.tmdb.org/t/p/w500/${
                          item.profile_path
                        }" alt="${item.name}">
                   </div>
                        <div class="itemInfo">
                        <h3 class="title">${item.name}</h3>
                        <p class="info">${item.gender}</p> 
                        </div>
                        <div class="Biography">
                        <h3>Biography</h3>
                        <p >${
                          item.biography ||
                          "We don't have a biography translated in English. Help us expand our database by adding one. "
                        }</p>
                    </div>
                    </div>
                  
            </div> 
    `;
  movieContainer.style.backgroundImage = `url(https://image.tmdb.org/t/p/w500/${item.profile_path})`;
  movieContainer.style.backgroundSize = "cover";
}
//fetching actor Works and drawing them
fetchData(knownForUrl).then((cast) => {
  let castArr = cast.cast;
  castArr.map((movie) => {
    drawKnownFor(movie);
  });
});

//drawing actor's works
function drawKnownFor(item) {
  const actorCard = document.createElement("a");
  actorCard.setAttribute("class", "actorCard");
  actorCard.setAttribute("href", `movieDetails.html?id=${item.id}`);
  actorCard.innerHTML = `
                      <img src="https://image.tmdb.org/t/p/w500/${
                        item.poster_path
                      }" alt="${item.title}">

                  <div class="itemInfo">
                      <p class="title">${item.title || item.name}</p>
                      </div>  `;
  Cast.appendChild(actorCard);
}
//Check if the user is logged in
if (localStorage.getItem("email") && localStorage.getItem("password")) {
  let Fchar = localStorage.getItem("name").split(" ")[0].charAt(0);
  let Schar = localStorage.getItem("name").split(" ")[1].charAt(0);
  document.getElementById("signin").innerHTML = `${Fchar}${Schar}`;
  document.getElementById("signin").setAttribute("class", "borderdPerson");
}
