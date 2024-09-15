console.log("самопроверка");

//

const video = new Video();
const play = document.querySelector(".play");
const pause = document.querySelector(".pause");

function playVideo() {
  video.src =
    "https://github.com/rolling-scopes-school/zagorky-JSFEPRESCHOOL2024Q2/blob/js30%231.3-custom-video/js30custom-video/assets/video/video.mp4";
  video.currentTime = 0;
  video.play();
}
function pauseVideo() {
  video.pause();
}
play.addEventListener("click", playVideo);
pause.addEventListener("click", pauseVideo);
