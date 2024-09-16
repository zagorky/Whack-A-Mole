const player = document.querySelector(".player");
const audio = player.querySelector("audio");

const playPauseBtn = player.querySelector(".btn"); //кнопка play/pause
const progressBar = player.querySelector(".progress-filled");
const skipBtns = player.querySelectorAll(".btn[data-skip]");

let progression;
function playAudio() {
  if (audio.paused) {
    playPauseBtn.classList.add("pause");
    playPauseBtn.classList.remove("play");
    progression = window.setInterval(updateProgress, 100);
    audio.play();
    updateProgress();
  } else if (!audio.paused) {
    audio.pause();
    playPauseBtn.classList.remove("pause");
    playPauseBtn.classList.add("play");
    clearInterval(progression);
    updateProgress();
  }
}

function updateProgress() {
  let prog = audio.currentTime / audio.duration;
  progressBar.style.flexBasis = Math.floor(prog * 1000) / 10 + "%";
}
function goForward() {
  let value = Number(this.dataset.skip);
  video.currentTime = video.currentTime + value;
}

playPauseBtn.addEventListener("click", playAudio);
skipBtns.forEach((el) => {
  el.addEventListener("click", goForward);
});

let audioData = [];

// fetch("./assets/data/data.json")
//   .then((response) => {
//     if (!response.ok) {
//       throw new Error("Ошибка " + response.statusText);
//     }
//     return response.json();
//   })
//   .then((jsonData) => {
//     audioData = jsonData;
//     jsonData.forEach((track) => {
//       for (let i = 0; i < json.length; i++) {
//         audioData.push({ track });
//       }
//     });
//   });

fetch("../audio-player/assets/data/data.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Ошибка " + response.statusText);
    }
    return response.json();
  })
  .then((jsonData) => {
    audioData = jsonData;
    jsonData.forEach((el) => {
      for (let i = 0; i < 5; i++) {
        audioData.push({ ...el });
        console.log(audioData);
      }
    });
  });
// console.log(audioData);
