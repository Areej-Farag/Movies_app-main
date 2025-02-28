const apiKey = "210b492d626133d52f8b057ceedfc6b4";
let language;
const lang = document.getElementById("lang");
let peopleUrl = `https://api.themoviedb.org/3/person/popular?language=${lang.value}&page=1&api_key=${apiKey}`;
const peopleContainer = document.getElementById("people-list");
const searchBar = document.getElementById("search-input");
const searchBarBtn = document.getElementById("searchBarBtn");
//search handler
async function searchAll(searchTerm) {
  const url = `https://api.themoviedb.org/3/search/person?api_key=${apiKey}&language=en-US&query=${searchTerm}&page=1&include_adult=false`;
  const data = await fetchData(url);
  const dataArr = data.results;
  dataArr.map((person) => drawActor(person));
}
searchBarBtn?.addEventListener("click", () => {
  peopleContainer.innerHTML = "";
  searchAll(searchBar.value);
});

//language handling
lang.addEventListener("change", () => {
  if (lang.value === "en-US") {
    language = "en-US";
    peopleUrl = `https://api.themoviedb.org/3/person/popular?language=${lang.value}&page=1&api_key=${apiKey}`;
  } else {
    language = "ar";
    peopleUrl = `https://api.themoviedb.org/3/person/popular?language=${lang.value}&page=1&api_key=${apiKey}`;
  }
  peopleContainer.innerHTML = "";
  fetchData(peopleUrl).then((people) => {
    drawActor(people);
  });
});
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZDZmMDY5MjM1ZWUyZWM1MGMxYTRkMjEwMmE3NmEwMiIsIm5iZiI6MTczNzc5NTEwMC45Njk5OTk4LCJzdWIiOiI2Nzk0YTYxYzVhN2Q4MDczMWQxODdhOWIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.gwUMrmhMs1oJgyN3rZbpg6rkt8gImCDHPUKj3Ops5D0",
  },
};
//fetch data function
async function fetchData(URL) {
  const response = await fetch(URL);
  const data = await response.json();
  // console.log(data.results);
  if (!data.results) {
    console.log("error");
  }
  return data;
}
//fetch actors and drawing them
fetchData(peopleUrl).then((items) => {
  let actorsList = items.results;
  actorsList.map((actor) => {
    drawActor(actor);
  });
});
//draw actors cards
function drawActor(item) {
  const personeCard = document.createElement("a");
  personeCard.setAttribute("class", "person_card");
  personeCard.setAttribute("href", `peopleinfo.html?id=${item.id}`);
  personeCard.classList.add("person_card");
  personeCard.innerHTML = `
        <div class="image">
            <img src="https://image.tmdb.org/t/p/w500/${
              item.profile_path
            }" alt="${item.title}">
          </div>
          <div class="movie-info">
            <h3>${item.name}</h3>
        </div>
        <div class="overview">
            <h3>Known For</h3>
             ${item.known_for[0].title || item.known_for[0].name}  , ${
    item.known_for[1].title || item.known_for[1].name
  }  , ${item.known_for[2].title || item.known_for[2].name} 
        </div>
        </div>
        `;
  peopleContainer?.appendChild(personeCard);
}
//Check if the user is logged in
if (localStorage.getItem("email") && localStorage.getItem("password")) {
  let Fchar = localStorage.getItem("name").split(" ")[0].charAt(0);
  let Schar = localStorage.getItem("name").split(" ")[1].charAt(0);
  document.getElementById("signin").innerHTML = `${Fchar}${Schar}`;
  document.getElementById("signin").setAttribute("class", "borderdPerson");
}
