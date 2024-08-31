// слайдер

let petsData = [];
let currentSlide = 0;
let previousSlide = [];
let currentCards = 0;

//получение данных
fetch("./data/pets.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Ошибка " + response.statusText);
    }
    return response.json();
  })
  .then((jsonData) => {
    petsData = jsonData;
    slider();
  })
  .catch((error) => console.error("Ошибка при исполнении запроса: ", error));

//генерация карточек
const createCard = (data) => {
  const card = document.createElement("div");
  card.classList.add("card");
  card.innerHTML = `
                <img src="${data.img}" alt="our-friends-pic" />
                <p>${data.name}</p>
                <button>Learn more</button>
  `;
  return card;
};

//генерация слайдов
const cardsContainer = document.querySelector(".cards");

const createSlide = () => {
  cardsContainer.innerHTML = "";
  let slide = [];
  let availablePets = petsData.filter((pet) => !previousSlide.includes(pet));
  while (slide.length < currentCards) {
    let randomCards = Math.floor(Math.random() * availablePets.length);
    let selectedPets = availablePets.splice(randomCards, 1)[0];
    slide.push(selectedPets);
  }
  slide.forEach((pet) => {
    cardsContainer.appendChild(createCard(pet));
  });
  previousSlide.length = 0;
  previousSlide.push(...slide);
};

// адаптивность слайдера
const updateSliderSize = () => {
  currentCards =
    window.screen.width >= 1280 ? 3 : window.screen.width >= 768 ? 2 : 1;
};

window.addEventListener("resize", () => {
  updateSliderSize(), createSlide();
});

//функция слайдера
const slider = () => {
  updateSliderSize();
  createSlide();
  window.addEventListener("resize", () => {
    updateSliderSize(), createSlide();
  });
};

//переходы

const sliderAnimation = (direction) => {
  cardsContainer.classList.add(`slide-${direction}`);
  setTimeout(() => {
    createSlide();
    cardsContainer.classList.remove(`slide-${direction}`);
  }, 500);
};

const slideLeft = () => {
  currentSlide--;
  if (currentSlide < 0) {
    currentSlide = petsData.length - 1;
  }
  sliderAnimation("left");
};

const slideRight = () => {
  currentSlide++;
  if (currentSlide >= petsData.length) {
    currentSlide = 0;
  }
  sliderAnimation("right");
};

//события на стрелках
const arrowRight = document.querySelector(".right");
const arrowLeft = document.querySelector(".left");

arrowLeft.addEventListener("click", slideLeft);
arrowRight.addEventListener("click", slideRight);

slider();
