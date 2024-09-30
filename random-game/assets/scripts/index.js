const holes = document.querySelectorAll(".hole");
const scoreBoard = document.querySelector(".score");
const moles = document.querySelectorAll(".mole");
const startBtn = document.querySelector(".start");
const scoreItem = document.querySelector(".scoreItemsList");
const timerCont = document.querySelector(".timer");
const scoreList = document.querySelector(".scoreList");

let lastHole;
let timeUp = false;
let score = 0;
let gameTime = 10;
let moleTimeout;
let scores = JSON.parse(window.localStorage.getItem("Scores")) || [];

function randomTime(min, max) {
  return Math.round(Math.random() * (max - min) + min);
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
  const time = randomTime(200, 1000);
  const hole = randomHole(holes);
  holes.forEach((hole) => hole.classList.remove("up"));
  hole.classList.add("up");
  moleTimeout = setTimeout(() => {
    hole.classList.remove("up");
    if (!timeUp) {
      upDown();
    }
  }, time);
}

function startGame() {
  scoreBoard.textContent = `Score: ${score}`;
  timeUp = false;
  score = 0;
  gameTime = 10;
  upDown();

  const timer = setInterval(() => {
    gameTime--;
    timerCont.textContent = `Time: ${gameTime}`;
    if (gameTime === 0) {
      clearInterval(timer);
      timeUp = true;
      addScore(score);
    } else if (gameTime === 1) {
      announceTheEnd();
    }
  }, 1000);
}

function announceTheEnd() {
  const finishSound = document.querySelector(".finishSound");
  finishSound.play();
}
function bonkSound() {
  const hitSound = document.querySelector(".hitSound");
  hitSound.currentTime = 0;
  hitSound.play();
}

function bonk(event) {
  if (!event.isTrusted || timeUp) return;
  score++;
  this.classList.remove("up");
  scoreBoard.textContent = `Score: ${score}`;
  clearTimeout(moleTimeout);
  bonkSound();
  upDown();
}

function addScore(score) {
  let scores = JSON.parse(window.localStorage.getItem("Scores")) || [];
  scores.push(score);
  if (scores.length > 10) {
    scores.shift();
  }
  window.localStorage.setItem("Scores", JSON.stringify(scores));
  console.log(
    "Saved scores:",
    JSON.parse(window.localStorage.getItem("Scores"))
  );

  updateScoreItems(scores);
}

function updateScoreItems(scores) {
  scoreList.innerHTML = "";
  scores.forEach((score) => {
    const li = document.createElement("li");
    li.classList.add("scoreItem");
    li.textContent = `Score: ${score}`;
    scoreList.appendChild(li);
  });
}

function loadScores() {
  updateScoreItems(scores);
}
loadScores();

moles.forEach((mole) => mole.addEventListener("click", bonk));
startBtn.addEventListener("click", startGame);
