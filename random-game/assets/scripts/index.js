const holes = document.querySelectorAll(".hole");
const scoreDisplay = document.querySelector(".scoreDisplay");
const moles = document.querySelectorAll(".mole");
const startBtn = document.querySelector(".start");
const scoreItem = document.querySelector(".scoreItemsList");
const timerCont = document.querySelector(".timer");
const scoreList = document.querySelector(".scoreList");
const finishSound = document.querySelector(".finishSound");
const hitSound = document.querySelector(".hitSound");
const sounds = document.querySelector(".sounds");

let lastHole;
let isTimeUp = false;
let score = 0;
let gameTime = 10;
let moleTimeout;
let switchSound = true;
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
  const time = randomTime(300, 1000);
  const hole = randomHole(holes);
  holes.forEach((hole) => hole.classList.remove("up"));
  hole.classList.add("up");

  moleTimeout = setTimeout(() => {
    hole.classList.remove("up");
    if (!isTimeUp) {
      upDown();
    }
  }, time);
}

function startGame() {
  startBtn.setAttribute("disabled", true);

  scoreDisplay.textContent = `Score: ${score}`;
  isTimeUp = false;
  score = 0;
  gameTime = 10;
  upDown();
  timerCont.textContent = `Time: ${gameTime}`;

  const timer = setInterval(() => {
    gameTime--;
    if (gameTime > 0) {
      timerCont.textContent = `Time: ${gameTime}`;
    }
    if (gameTime === 0) {
      clearInterval(timer);
      timerCont.textContent = "Time's up!";
      isTimeUp = true;
      startBtn.removeAttribute("disabled", true);
      addScore(score);
      announceTheEnd();
      alert(`Your score is ${score}`);
    }
  }, 1000);
}

function muteSounds() {
  if (switchSound) {
    sounds.classList.add("off");
    sounds;
    hitSound.muted = true;
    finishSound.muted = true;
    switchSound = false;
  } else {
    sounds.classList.remove("off");
    hitSound.muted = false;
    finishSound.muted = false;
    switchSound = true;
  }
}

function announceTheEnd() {
  finishSound.play();
}
function bonkSound() {
  hitSound.currentTime = 0;
  hitSound.play();
}

function bonk(event) {
  if (!event.isTrusted || isTimeUp) return;
  score++;
  this.classList.remove("up");
  scoreDisplay.textContent = `Score: ${score}`;
  clearTimeout(moleTimeout);
  bonkSound();
  upDown();
}

function addScore(score) {
  let scores = JSON.parse(window.localStorage.getItem("Scores")) || [];
  scores.unshift(score);
  if (scores.length > 10) {
    scores.pop();
  }
  window.localStorage.setItem("Scores", JSON.stringify(scores));
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
sounds.addEventListener("click", muteSounds);
