document.addEventListener("DOMContentLoaded", function () {});

const gameConteiner = document.querySelector(".game-container");
const questionContainer = document.querySelector(".questionContainer");
const questionInput = document.querySelector(".questionInput");
const answerInput = document.querySelector(".answerInput");
const askBtn = document.querySelector(".askBtn");
const answerBtn = document.querySelector(".answerBtn");
const alphabetCont = document.querySelectorAll(".alphabetContainer button");

const questionText = document.createElement("p");
const answerText = document.createElement("p");

let word = "";

function addInfo(input, child) {
  child.textContent = `${input.value}`;
  questionContainer.appendChild(child);
}
askBtn.addEventListener("click", () => {
  questionText.textContent = `${questionInput.value}`;
  questionContainer.appendChild(questionText);
});
answerBtn.addEventListener("click", () => {
  answerText.textContent = `${answerInput.value}`;
  word = answerInput.value;
  answerInput.value = "";
  transformWord();
});

function transformWord() {
  word = word.toUpperCase().split("");
  console.log(word);
}

alphabetCont.forEach((button) => {
  button.addEventListener("click", () => {
    button.classList.add("disable");
    if (word[button.textContent]) {
      console.log(word[button.textContent]);
      button.classList.add("correct");
    }
    button.classList.add("incorrect");
  });
});
