const holes = document.querySelectorAll(".hole");
const scoreBoard = document.querySelector(".score");
const moles = document.querySelectorAll(".mole");
const startBtn = document.querySelector(".start");
const scoreList = document.querySelector(".scoreList");
const timerCont = document.querySelector(".timer");

let lastHole;
let timeUp = false;
let score = 0;
let lastTime = 10;

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
  const hole = randomHole(holes);
  hole.classList.add("up");
  setTimeout(() => {
    hole.classList.remove("up");
    if (!timeUp) {
      upDown();
    }
  }, time);
}

function startGame() {
  scoreBoard.textContent = 0;
  timeUp = false;
  score = 0;
  upDown();
  setTimeout(() => {
    timeUp = true;
    addScore(score);
  }, 10000);
  setInterval(timer(lastTime), 1000);
}

function bonk(event) {
  if (!event.isTrusted) return;
  score++;
  this.classList.remove("up");
  scoreBoard.textContent = `Score: ${score}`;
}

function timer(lastTime) {
  if (lastTime == 0) {
    return (timerCont.textContent = `Time: ${lastTime}`);
  } else {
    console.log(lastTime);
    return (timerCont.textContent = `Time: ${lastTime * timer(lastTime - 1)}`);
  }
}
function addScore(score) {
  window.localStorage.setItem("Score", score);
  const ul = document.createElement("ul");
  scoreList.appendChild(ul);
  const li = document.createElement("li");
  li.classList.add("scoreItem");
  li.textContent = `Score: ${window.localStorage.getItem("Score")}`;
  ul.appendChild(li);
}

// function resetScore() {
//   if
// }

moles.forEach((mole) => mole.addEventListener("click", bonk));
startBtn.addEventListener("click", startGame);
