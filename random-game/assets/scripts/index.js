const holes = document.querySelectorAll(".hole");
const scoreBoard = document.querySelector(".score");
const moles = document.querySelectorAll(".mole");

let lastHole;

function randomTime(min, max) {
  return Math.round(Math.random() * (max - min) * min);
}

function randomHole(holes) {
  const i = Math.floor(Math.random() * holes.length);
  const hole = holes[i];
  if (hole === lastHole) {
    return randomHole(holes);
  }
  lastHole = hole;
  return hole;
}

function upDown() {
  const time = randomTime(20, 100);
  console.log(time);
  const hole = randomHole(holes);
  hole.classList.add("up");
  setTimeout(() => {
    hole.classList.remove("up");
    upDown();
  }, time);
}

upDown();
