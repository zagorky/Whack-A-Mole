// console.log(
//   "Вёрстка: вёрстка видеоплеера: есть само видео, в панели управления есть кнопка Play/Pause, прогресс-бар, кнопка Volume/Mute, регулятор громкости звука +5 - ; в футере приложения есть ссылка на гитхаб автора приложения, год создания приложения, логотип курса со ссылкой на курс +5 + ; Кнопка Play/Pause на панели управления: при клике по кнопке Play/Pause запускается или останавливается проигрывание видео +5+; внешний вид и функционал кнопки изменяется в зависимости от того, проигрывается ли видео в данный момент +5+; Прогресс-бар отображает прогресс проигрывания видео. При перемещении ползунка прогресс-бара вручную меняется текущее время проигрывания видео. Разный цвет прогресс-бара до и после ползунка +10;- При перемещении ползунка регулятора громкости звука можно сделать звук громче или тише. Разный цвет регулятора громкости звука до и после ползунка +10-; При клике по кнопке Volume/Mute можно включить или отключить звук. Одновременно с включением/выключением звука меняется внешний вид кнопки. Также внешний вид кнопки меняется, если звук включают или выключают перетягиванием регулятора громкости звука от нуля или до нуля +10-; Кнопка Play/Pause в центре видео +10-; есть кнопка Play/Pause в центре видео при клике по которой запускается видео и отображается панель управления +5-; когда видео проигрывается, кнопка Play/Pause в центре видео скрывается, когда видео останавливается, кнопка снова отображается +5-; Очень высокое качество оформления приложения и/или дополнительный не предусмотренный в задании функционал, улучшающий качество приложения +10-; высокое качество оформления приложения предполагает собственное оригинальное оформление равное или отличающееся в лучшую сторону по сравнению с демо"
// );

//
const player = document.querySelector(".player");
const video = player.querySelector("video");

// constrols
const playPauseBtn = player.querySelector(".btn"); //кнопка play/pause
const volume = player.querySelector(".volume"); // интуп с громкостью
const playbackRate = player.querySelector(".playbackRate"); //инпут
const skipBtns = player.querySelectorAll(".btn[date-skip]"); //кнопки перемотки
const fullscreenBtn = player.querySelector(".fullscreen");
const progressCont = player.querySelector(".progress");
const progressBar = player.querySelector(".progress-filled");

let isPlay = false;
let progression;

function playVideo() {
  if (video.paused) {
    playPauseBtn.classList.add("pause");
    playPauseBtn.classList.remove("play");
    progression = window.setInterval(updateProgress, 100);
    video.play();
    updateProgress();
  } else if (!video.paused) {
    video.pause();
    playPauseBtn.classList.remove("pause");
    playPauseBtn.classList.add("play");
    clearInterval(progression);
    updateProgress();
  }
}

function updateProgress() {
  let prog = video.currentTime / video.duration;
  progressBar.style.flexBasis = Math.floor.apply(prog * 1000) / 10 + "%";
}

function updateVolume() {
  let volume = this.value;
  video.volume = volume;
}
function updateRate() {
  let rate = this.value;
  video.playbackRate = rate;
}

playPauseBtn.addEventListener("click", playVideo);
video.addEventListener("click", playVideo);
volume.addEventListener("change", updateVolume);
playbackRate.addEventListener("change", updateRate);
