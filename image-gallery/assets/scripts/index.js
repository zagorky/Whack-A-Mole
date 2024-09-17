const searchBox = document.querySelector(".search-box input");
const searchBtn = document.querySelector(".search");
let searchingFor = "";
const content = document.querySelector(".content");
let url = `https://api.unsplash.com/photos/random?query=${searchingFor}&count=6&orientation=landscape&client_id=fg3V91GfUO8v970NVSOQw1IFhoi9XfHHoaTSN7sCZQE`;
async function getData() {
  const res = await fetch(url);
  const data = await res.json();
  data.forEach((el) => createImg(el));
}
getData();

function createImg(data) {
  const image = content.createElement("img");
  image.classList.add("img");
  image.src = `${data.urls.regular}`;
  image.alt = `${data.alt_description}`;
  content.append(image);
}

function infinityScroll() {
  const windowHeight = window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight;
  const scrollPos = window.scrollY;
  if (documentHeight - (windowHeight + scrollPos) <= 100) {
    getData();
  }
}
searchBtn.addEventListener("click", () => {
  searchingFor = searchBox.value.trim();
  console.log(searchingFor);
  if (searchingFor) getData();
});
// window.addEventListener("scroll", infinityScroll);
