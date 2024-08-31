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

//пагинация
const arrowRight = document.querySelector(".right");
const arrowLeft = document.querySelector(".left");

const replaceCard = (way) => {
  if (way == "left") {
  } else {
  }
};

// const handleClick = (event, way) => {
//   const elem = event.target;
//   replaceCard(way);
// };

// arrowLeft.addEventListener("click", handleClick);
// arrowRight.addEventListener("click", handleClick);

// слайдер

// const cards = document.querySelectorAll(".card");
// cards.forEach((card) => {});

let petsData = [];
let currentSlide = 0;
let previousSlide = [];
let currentCard = 0;

//получение данных
fetch("./data/pets.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Ошибка " + response.statusText);
    }
    return response.json();
  })
  .then((jsonData) => (petsData = jsonData))
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

const slider = (data) => {
  if (window.screen.width >= 1280) {
  } else if (window.screen.width >= 768) {
  } else if (window.screen.width >= 320) {
  }
};

// попап
