import { audioData } from "../assets/data/data.js";

const player = document.querySelector(".player");
const audio = player.querySelector("audio");
const playPauseBtn = player.querySelector(".btn"); //кнопка play/pause
const progressBar = document.querySelector(".progress-filled");

let progression;
let currentTrack = 0;

window.addEventListener("load", () => {
  getTrack(currentTrack);
});
function playAudio() {
  if (audio.paused) {
    playPauseBtn.classList.add("pause");
    playPauseBtn.classList.remove("play");
    progression = window.setInterval(updateProgress, 100);
    audio.play();
    updateProgress();
  } else {
    audio.pause();
    playPauseBtn.classList.remove("pause");
    playPauseBtn.classList.add("play");
    clearInterval(progression);
    updateProgress();
  }
}
function updateProgress() {
  let prog = (audio.currentTime / audio.duration) * 100;
  progressBar.value = prog;
}

function getTrack(index) {
  const song = audioData[index];
  audio.src = song.src;
  document.body.style.backgroundImage = `url(${song.background})`;
  player.querySelector(".poster").src = song.background;
  player.querySelector(".artist").textContent = song.artist;
  player.querySelector(".song").textContent = song.song;
}
function nextTrack() {
  currentTrack = (currentTrack + 1) % audioData.length;
  getTrack(currentTrack);
  playAudio();
}

function prevTrack() {
  currentTrack = (currentTrack - 1 + audioData.length) % audioData.length;
  getTrack(currentTrack);
  playAudio();
}

playPauseBtn.addEventListener("click", playAudio);
document.querySelector(".next").addEventListener("click", nextTrack);
document.querySelector(".prev").addEventListener("click", prevTrack);
