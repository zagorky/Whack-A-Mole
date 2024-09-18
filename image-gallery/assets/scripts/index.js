console.log(
  "верстка +10; загрузка данных с апи +10; обновление данных по поиску +10; поиск: курсор в поле ввода +5, плейсхолдер +5, отключено автозаполнение +5, поиск по энтеру +5; поисковой запрос отображается после поиска +5, крестик в поле поиска +5; "
);

const searchBox = document.querySelector(".search-box input");
const searchBtn = document.querySelector("button[type='submit']");
let searchingFor = "";
const content = document.querySelector(".content");

let url = `https://api.unsplash.com/photos/random?query=&count=6&orientation=landscape&client_id=fg3V91GfUO8v970NVSOQw1IFhoi9XfHHoaTSN7sCZQE`;
async function getData() {
  const res = await fetch(url);
  const data = await res.json();
  data.forEach((el) => createImg(el));
}
getData();

function createImg(data) {
  const image = document.createElement("img");
  image.classList.add("img");
  image.src = `${data.urls.regular}`;
  image.alt = `${data.alt_description}`;
  content.append(image);
}
// function infinityScroll() {
//   const windowHeight = window.innerHeight;
//   const documentHeight = document.documentElement.scrollHeight;
//   const scrollPos = window.scrollY;
//   if (documentHeight - (windowHeight + scrollPos) >= 100) {
//     if (searchingFor === "")
//       url = `https://api.unsplash.com/photos/random?query=&count=3&orientation=landscape&client_id=fg3V91GfUO8v970NVSOQw1IFhoi9XfHHoaTSN7sCZQE`;
//     getData();
//   } else {
//     url = `https://api.unsplash.com/photos/random?query=${searchingFor}&count=3&orientation=landscape&client_id=fg3V91GfUO8v970NVSOQw1IFhoi9XfHHoaTSN7sCZQE`;
//     getData();
//   }
// }
function goSearching() {
  searchingFor = searchBox.value.trim().toString();
  url = `https://api.unsplash.com/photos/random?query=${searchingFor}&count=6&orientation=landscape&client_id=fg3V91GfUO8v970NVSOQw1IFhoi9XfHHoaTSN7sCZQE`;
  content.innerHTML = "";
  searchBox.value = searchingFor;
  getData();
}
function goClearing() {
  searchBox.value = "";
  url = `https://api.unsplash.com/photos/random?query=&count=6&orientation=landscape&client_id=fg3V91GfUO8v970NVSOQw1IFhoi9XfHHoaTSN7sCZQE`;
  content.innerHTML = "";
  getData();
}
function isClean() {
  if (searchBox.value !== "") {
    searchBtn.classList.remove("search");
    searchBtn.classList.add("clear");
  } else if (searchBox.value === "") {
    searchBtn.classList.add("search");
    searchBtn.classList.remove("clear");
  }
}
function changeFunctionality(event) {
  if (searchBtn.classList.contains("search")) {
    event.preventDefault();
    goSearching();
  } else {
    event.preventDefault();
    goClearing();
  }
}

// document.addEventListener("scroll", infinityScroll);
document.addEventListener("DOMContentLoaded", () => searchBox.focus());
searchBtn.addEventListener("click", changeFunctionality);
searchBox.addEventListener("input", isClean);
searchBox.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    goSearching();
  }
});
