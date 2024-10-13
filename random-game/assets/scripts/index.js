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
const levelDisplay = document.querySelector(".levelDisplay");

const modal = document.createElement("div");
const specialPrizeVideo = document.querySelector(".specialVideo");
const closeModalBtn = document.createElement("button");
closeModalBtn.classList.add("closeModalBtn");
const maxLevel = 5;

let lastHole;
let isTimeUp = false;
let score = 0;
let gameDuration = 10; // 10sec
let moleTimeout;
let switchSound = true;
let scores = JSON.parse(window.localStorage.getItem("Scores")) || [];
let minTimeToShowMole = 600; // 600ms
let maxTimeToShowMole = 1000; // 1000ms
let level = 1;
let goal = 50;

function startGame() {
  startBtn.setAttribute("disabled", true);
  isTimeUp = false;
  gameDuration = 10;
  showMole();
  timerCont.textContent = `Time: ${gameDuration}`;

  const timer = setInterval(() => {
    gameDuration--;
    if (gameDuration > 0) {
      timerCont.textContent = `Time: ${gameDuration}`;
    }
    if (gameDuration === 0) {
      clearInterval(timer);
      timerCont.textContent = "Time's up!";
      isTimeUp = true;
      announceTheEnd();
      startBtn.removeAttribute("disabled", true);
      changeLevel();
    }
  }, 1000);
}
function clearScore() {
  score = 0;
  scoreDisplay.textContent = `Score: ${score}`;
  level = 1;
  minTimeToShowMole = 600;
  maxTimeToShowMole = 1000;
  levelDisplay.textContent = `Level: ${level}`;
}
function clearModal() {
  modal.innerHTML = "";
  specialPrizeVideo.pause();
  specialPrizeVideo.currentTime = 0;
  specialPrizeVideo.style.display = "none";
}
function randomTime(minTimeToShowMole, maxTimeToShowMole) {
  return Math.round(
    Math.random() * (maxTimeToShowMole - minTimeToShowMole) + minTimeToShowMole
  );
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
function changeDurationShowMole() {
  minTimeToShowMole = Math.max(minTimeToShowMole - 100, 200);
  maxTimeToShowMole = Math.max(maxTimeToShowMole - 100, 600);
}
function changeLevelDisplay() {
  level++;
  levelDisplay.textContent = `Level: ${level}`;
}
function changeLevel() {
  if (level === maxLevel) {
    addScore(score);
    if (score >= goal) {
      createModal(`Your score is ${score}. You've won special prize!`, true);
    } else {
      createModal(`Your score is ${score}. Congratulations!`);
    }
    clearScore();
    return;
  }
  changeDurationShowMole();
  changeLevelDisplay();
  createModal(`Next level ${level}! Now you should be faster!`);
}
function showMole() {
  if (isTimeUp) return;
  const time = randomTime(minTimeToShowMole, maxTimeToShowMole);
  const hole = randomHole(holes);
  holes.forEach((hole) => hole.classList.remove("up"));
  hole.classList.add("up");

  moleTimeout = setTimeout(() => {
    hole.classList.remove("up");
    if (!isTimeUp) {
      showMole();
    }
  }, time);
}
function showModal() {
  modal.classList.add("modal");
  modal.style.display = "flex";
  document.body.appendChild(modal);
}
function createModal(message, showVideo) {
  clearModal();
  startBtn.setAttribute("disabled", true);
  createModalText(message);
  if (showVideo) {
    getSpecialPrize();
    finishSound.pause();
  }
  createCloseImg();
  modal.appendChild(closeModalBtn);
  showModal();
}
function createModalText(message) {
  const modalContent = document.createElement("p");
  modalContent.textContent = message;
  modal.appendChild(modalContent);
}
function createCloseImg() {
  const closeImg = document.createElement("img");
  closeImg.src = "../random-game/assets/img/close.svg";
  closeImg.alt = " ";
}
function getSpecialPrize() {
  specialPrizeVideo.style.display = "block";
  modal.appendChild(specialPrizeVideo);
  specialPrizeVideo.play();
}
function muteSounds() {
  if (switchSound) {
    sounds.classList.add("off");
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
  bonkSound();
  clearTimeout(moleTimeout);
  showMole();
}
function addScore(score) {
  scores.unshift(score);
  if (scores.length > 10) {
    scores.pop();
  }
  window.localStorage.setItem("Scores", JSON.stringify(scores));
  updateScoreItems(scores);
}
function updateScoreItems(scores) {
  scoreList.innerHTML = "";
  scores = scores.sort((a, b) => b - a);
  scores.forEach((score) => {
    const li = document.createElement("li");
    li.classList.add("scoreItem");
    li.textContent = `Score: ${score}`;
    scoreList.appendChild(li);
  });
}
function loadScores() {
  updateScoreItems(scores);
  hitSound.load();
  finishSound.load();
  specialPrizeVideo.load();
}

loadScores();

moles.forEach((mole) => mole.addEventListener("click", bonk));
startBtn.addEventListener("click", startGame);
sounds.addEventListener("click", muteSounds);
closeModalBtn.addEventListener("click", () => {
  modal.remove();
  finishSound.pause();
  finishSound.currentTime = 0;
  startBtn.removeAttribute("disabled", true);
});
