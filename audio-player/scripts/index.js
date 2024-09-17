import { audioData } from "../assets/data/data.js";

const player = document.querySelector(".player");
const audio = player.querySelector("audio");
const playPauseBtn = player.querySelector(".play");
const progressBar = document.querySelector(".progress-filled");
const curTime = document.querySelector(".currentTime");
const dur = document.querySelector(".duration");
const volume = player.querySelector(".volume");
const soundMuteBtn = player.querySelector(".sound");
const shuffle = document.querySelector(".shuffle");

let progression;
let currentTrack = 0;

window.addEventListener("load", () => {
  getTrack(currentTrack);
});
function playAudio() {
  if (audio.paused) {
    playPauseBtn.classList.add("pause");
    playPauseBtn.classList.remove("play");
    progression = window.setInterval(updateProgress, 1000);
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
function autoPlay() {
  if (audio.ended) {
    nextTrack();
  }
}
function updateProgress() {
  let prog = (audio.currentTime / audio.duration) * 100;
  progressBar.value = prog;
  curTime.textContent = formatTime(audio.currentTime);
  if (audio.ended) {
    playPauseBtn.classList.remove("pause");
    playPauseBtn.classList.add("play");
    clearInterval(progression);
    autoPlay();
  }
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
function formatTime(seconds) {
  const min = Math.floor(seconds / 60);
  const sec = Math.floor(seconds % 60);
  return `${min}:${sec < 10 ? "0" + sec : sec}`;
}
function updateVolume(event) {
  let volumeLvl = event.target.value;
  audio.volume = volumeLvl;

  if (audio.volume > 0) {
    audio.muted = false;
    soundMuteBtn.classList.remove("mute");
    soundMuteBtn.classList.add("sound");
  } else {
    audio.muted = true;
    soundMuteBtn.classList.add("mute");
    soundMuteBtn.classList.remove("sound");
  }
}
function handleMute() {
  audio.muted = !audio.muted;
  if (audio.muted) {
    soundMuteBtn.classList.add("mute");
    soundMuteBtn.classList.remove("sound");
  } else {
    soundMuteBtn.classList.remove("mute");
    soundMuteBtn.classList.add("sound");
    if (audio.volume === 0) {
      audio.volume = 0.5;
      volume.value = 0.5;
    }
  }
}
function shuffleTracks() {
  let randomTrack = Math.floor(Math.random() * audioData.length);
  getTrack(randomTrack);
  playAudio();
}
playPauseBtn.addEventListener("click", playAudio);
document.querySelector(".next").addEventListener("click", nextTrack);
document.querySelector(".prev").addEventListener("click", prevTrack);
audio.addEventListener("loadedmetadata", () => {
  dur.textContent = formatTime(audio.duration);
});
audio.addEventListener("timeupdate", updateProgress);
progressBar.addEventListener("input", () => {
  const newCurTime = (progressBar.value / 100) * audio.duration;
  audio.currentTime = newCurTime;
  updateProgress();
});
soundMuteBtn.addEventListener("click", handleMute);
volume.addEventListener("change", updateVolume);
shuffle.addEventListener("click", shuffleTracks);
