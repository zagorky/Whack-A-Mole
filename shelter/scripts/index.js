let petsData = [];
let shuffledData = [];
let petsPerPage = 8;
let currentPage = 1;
let totalPage = 6;

const cardsContainer = document.querySelector(".container-cards-pets-page");
const pageNumElem = document.querySelector(".current");
const first = document.querySelector(".first");
const prev = document.querySelector(".prev");
const next = document.querySelector(".next");
const last = document.querySelector(".last");

fetch("./data/pets.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Ошибка " + response.statusText);
    }
    return response.json();
  })
  .then((jsonData) => {
    petsData = jsonData;
    jsonData.forEach((pet) => {
      for (let i = 0; i < 5; i++) {
        petsData.push({ ...pet });
      }
    });
    function shuffle(arr) {
      return arr.sort(() => Math.random() - 0.5);
    }

    function shuffleData(petsData) {
      let newData = [];
      for (let i = 0; i < petsData.length; i += 8) {
        let chunk = petsData.slice(i, i + 8);
        newData.push(...shuffle(chunk));
      }
      return newData;
    }
    shuffledData = shuffleData(petsData);
    console.log(shuffledData);
    updatePetsPetPage();
    renderCards();
  })
  .catch((error) => console.error("Ошибка при исполнении запроса: ", error));

function renderCards() {
  const start = (currentPage - 1) * petsPerPage;
  const end = start + petsPerPage;
  const petsShowed = shuffledData.slice(start, end);
  cardsContainer.innerHTML = "";
  petsShowed.forEach((pet) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
                          <img src="${pet.img}" alt="our-friends-pic" />
                          <p>${pet.name}</p>
                          <button class='btn'>Learn more</button>
            `;
    cardsContainer.appendChild(card);
    createPopup(card, pet);
  });
  updatePagination();
}

function createPopup(card, pet) {
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
}

function updatePagination() {
  pageNumElem.textContent = currentPage;

  first.classList.toggle("off", currentPage === 1);
  prev.classList.toggle("off", currentPage === 1);
  next.classList.toggle("off", currentPage === totalPage);
  last.classList.toggle("off", currentPage === totalPage);
}

first.addEventListener("click", () => {
  if (currentPage !== 1) {
    currentPage = 1;
    renderCards();
  }
});
prev.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    renderCards();
  }
});
next.addEventListener("click", () => {
  if (currentPage < totalPage) {
    currentPage++;
    renderCards();
  }
});
last.addEventListener("click", () => {
  if (currentPage !== totalPage) {
    currentPage = totalPage;
    renderCards();
  }
});
function updatePetsPetPage() {
  const width = window.innerWidth;
  if (width >= 1280) {
    petsPerPage = 8;
    totalPage = 6;
  } else if (width >= 768) {
    petsPerPage = 6;
    totalPage = 8;
  } else {
    petsPerPage = 3;
    totalPage = 16;
  }
  renderCards();
}

window.addEventListener("resize", () => {
  updatePetsPetPage();
});

updatePetsPetPage();

console.log(
  "с массивами конечно у меня ничего не получилось, пусть будет предполагаемая оценка 70"
);
