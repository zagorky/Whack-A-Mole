let petsData = [];
const cardsContainer = document.querySelector(".container-cards-pets-page");

fetch("./data/pets.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Ошибка " + response.statusText);
    }
    return response.json();
  })
  .then((jsonData) => {
    petsData = jsonData;
    petsData.forEach((pet) => {
      const card = document.createElement("div");
      card.classList.add("card");
      card.innerHTML = `
                            <img src="${pet.img}" alt="our-friends-pic" />
                            <p>${pet.name}</p>
                            <button>Learn more</button>
              `;
      cardsContainer.appendChild(card);
    });
  })
  .catch((error) => console.error("Ошибка при исполнении запроса: ", error));
