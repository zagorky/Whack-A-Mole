// import data from "./assets/data/data.js";

const searchingFor = document.querySelector("input");
const content = document.querySelector(".content");
const url = `https://api.unsplash.com/photos/random?query=${searchingFor.value}&client_id=fg3V91GfUO8v970NVSOQw1IFhoi9XfHHoaTSN7sCZQE`;

async function getData() {
  const res = await fetch(url);
  const data = await res.json();
  console.log(data);
}
getData();
