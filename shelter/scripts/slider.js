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
const createCard = (pet) => {
  const card = document.createElement("div");
  card.classList.add("card");
  card.innerHTML = `
                <img src="${pet.img}" alt="our-friends-pic" />
                <p>${pet.name}</p>
                <button>Learn more</button>
  `;
  const popupContainer = document.createElement("div");
  popupContainer.classList.add("popup-cont", "hidden");
  popupContainer.innerHTML = `
      <div class="popup-container">
  <svg class="close-popup"
    width="52"
    height="52"
    viewBox="0 0 52 52"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      x="1"
      y="1"
      width="50"
      height="50"
      rx="25"
      stroke="#F1CDB3"
      stroke-width="2"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M27.4262 26L31.7046 21.7216C32.0985 21.3277 32.0985 20.6892 31.7046 20.2954C31.3108 19.9016 30.6723 19.9016 30.2785 20.2954L26 24.5739L21.7215 20.2954C21.3276 19.9015 20.6892 19.9015 20.2953 20.2954C19.9016 20.6892 19.9016 21.3277 20.2953 21.7215L24.5738 26L20.2953 30.2785C19.9016 30.6723 19.9016 31.3108 20.2953 31.7046C20.6892 32.0985 21.3276 32.0985 21.7215 31.7046L26 27.4261L30.2785 31.7046C30.6723 32.0985 31.3108 32.0985 31.7046 31.7046C32.0985 31.3108 32.0985 30.6723 31.7046 30.2785L27.4262 26Z"
      fill="#292929"
    />
  </svg>
<div class="popup-content">
  <img src="${pet.img}" alt="our-friends-pic" />
  <div class="popup-text">
    <h3>${pet.name}</h3>
    <h4>${pet.type} - ${pet.breed}</h4>
    <p>${pet.description}</p>
    <ul>
      <li><b>Age:</b>${pet.age}</li>
      <li><b>Inoculations:</b>${pet.inoculations}</li>
      <li><b>Diseases:</b>${pet.diseases}</li>
      <li><b>Parasites:</b>${pet.parasites}</li>
    </ul>
  </div>
</div>
</div>
`;
  document.body.appendChild(popupContainer);
  card.addEventListener("click", () => {
    popupContainer.classList.toggle("hidden");
    document.body.classList.toggle("no-scroll");
  });
  popupContainer.addEventListener("click", (event) => {
    if (
      event.target.classList.contains("popup-cont") ||
      event.target.classList.contains("close-popup")
    ) {
      popupContainer.classList.toggle("hidden");
      document.body.classList.remove("no-scroll");
    }
  });
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
