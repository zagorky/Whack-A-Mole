console.log("самопроверка");

//

const video = document.querySelector("video");
const btn = document.querySelector(".btn");
let isPlay = false;

function playVideo() {
  if (!isPlay) {
    video.play();
    btn.classList.toggle("pause");
    btn.classList.toggle("play");
    isPlay = true;
  } else {
    video.pause();
    btn.classList.toggle("pause");
    btn.classList.toggle("play");
    isPlay = false;
  }
  video.currentTime = 0;
}

btn.addEventListener("click", playVideo);
