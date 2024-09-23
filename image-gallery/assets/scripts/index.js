console.log(
  "верстка +10; загрузка данных с апи +10; обновление данных по поиску +10; поиск: курсор в поле ввода +5, плейсхолдер +5, отключено автозаполнение +5, поиск по энтеру +5; поисковой запрос отображается после поиска +5, крестик в поле поиска +5; "
);

const searchBox = document.querySelector(".search-box input");
const searchBtn = document.querySelector(".search");
const skipBtn = document.querySelector(".skip");
const content = document.querySelector(".content");

let searchingFor = "";
let isLoading = false;
let debounce;

let url = `https://api.unsplash.com/photos/random?query=&count=6&orientation=landscape&client_id=fg3V91GfUO8v970NVSOQw1IFhoi9XfHHoaTSN7sCZQE`;
async function getData() {
  if (isLoading) return;
  isLoading = true;

  try {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error("Server Error");
    }
    const data = await res.json();
    data.forEach((el) => createImg(el));
  } catch (error) {
    isError();
  } finally {
    isLoading = false;
  }
}
getData();

function isError() {
  if (content.children.length === 0) {
    content.style.display = "flex";
    const errorDiv = document.createElement("div");
    errorDiv.classList.add("error");
    errorDiv.innerHTML = `<h2>Sorry, something went wrong. Visit us later</h2>`;
    content.appendChild(errorDiv);
  }
}
function createImg(data) {
  const image = document.createElement("img");
  image.classList.add("img");
  image.src = `${data.urls.regular}`;
  image.alt = `${data.alt_description}`;
  content.append(image);
}
function infinityScroll() {
  const documentHeight = document.documentElement.scrollHeight;
  const scrollPos = window.scrollY + window.innerHeight;
  if (scrollPos >= documentHeight - 100 && !isLoading) {
    if (searchingFor === "")
      url = `https://api.unsplash.com/photos/random?query=${searchingFor}&count=3&orientation=landscape&client_id=fg3V91GfUO8v970NVSOQw1IFhoi9XfHHoaTSN7sCZQE`;
    getData();
  }
}
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

document.addEventListener("scroll", () => {
  clearTimeout(debounce);
  debounce = setTimeout(infinityScroll, 1000);
});
document.addEventListener("DOMContentLoaded", () => searchBox.focus());
searchBtn.addEventListener("click", goSearching);
skipBtn.addEventListener("click", goClearing);
searchBox.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    goSearching();
  }
});
searchBox.setAttribute("autocomplete", "off");
