// бургер-меню

document.addEventListener("DOMContentLoaded", function () {
  const burgerMenu = document.getElementById("burger-menu");
  const navLinks = document.querySelectorAll(".nav-link a");
  const adaptive = document.getElementById("adaptive");
  const overlay = document.getElementById("overlay");
  const header = document.getElementById("header");
  const wrapperPets = document.getElementById("wrapper-header");
  const burgerIcon = document.querySelectorAll(".burger-line");
  let url = window.location.href;
  const links = document.querySelectorAll(".link");

  //переключение бургера при нажатии

  const toggleMenu = () => {
    burgerMenu.classList.toggle("open");
    adaptive.classList.toggle("open");
    overlay.classList.toggle("show");
    document.body.classList.toggle("menu-open");
    navLinks.forEach((elem) => {
      elem.classList.remove("pets-page");
    });
    if (url.includes("pets.html")) {
      burgerIcon.forEach((i) => {
        i.classList.toggle("dark");
      });
    }
  };

  //события
  burgerMenu.addEventListener("click", toggleMenu);
  overlay.addEventListener("click", toggleMenu);
  navLinks.forEach((link) => {
    link.addEventListener("click", toggleMenu);
  });

  //при переходе на страницу pets

  if (url.includes("pets.html")) {
    wrapperPets.classList.toggle("pets-page");
    header.classList.toggle("pets-page");
    if (url.includes("pets.html")) {
      burgerIcon.forEach((i) => {
        i.classList.toggle("dark");
      });
    }
  }
});

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
  previousSlide = slide;
};

// адаптивность слайдера
const updateSliderSize = () => {
  if (window.screen.width >= 1280) {
    currentCards = 3;
  } else if (window.screen.width >= 768) {
    currentCards = 2;
  } else if (window.screen.width >= 320) {
    currentCards = 1;
  }
};

window.addEventListener("resize", () => {
  updateSliderSize(), createSlide();
});

//функция слайдера
const slider = () => {
  updateSliderSize();
  createSlide();
};

//переходы

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

const sliderAnimation = (direction) => {
  cardsContainer.classList.add(`slide-${direction}`);
  setTimeout(() => {
    createSlide();
    cardsContainer.classList.remove(`slide-${direction}`);
  }, 500);
};
// попап
