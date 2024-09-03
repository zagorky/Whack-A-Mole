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
                            <button class='btn'>Learn more</button>
              `;
      cardsContainer.appendChild(card);
      const btn = card.querySelector("btn");
      const popupContainer = document.createElement("div");
      popupContainer.classList.add("popup-cont", "hidden");
      popupContainer.innerHTML = `
            <div class='popup-content'>
            <h3>${pet.name}</h3>
            <h4>${pet.type} - ${pet.breed}</h4>
            <p>${pet.description}</p>
            <ul>
              <li><b>Age:</b>${pet.age}</li>
              <li><b>Inoculations:</b>${pet.inoculations}</li>
              <li><b>Diseases:</b>${pet.diseases}</li>
              <li><b>Parasites:</b>${pet.parasites}</li>
            </ul> 
            </div>`;
      document.body.appendChild(popupContainer);
      card.addEventListener("click", () => {
        popupContainer.classList.toggle("hidden");
      });
      popupContainer.addEventListener("click", (event) => {
        if (event.target.classList.contains("popup-cont"))
          popupContainer.classList.toggle("hidden");
      });
    });
  })
  .catch((error) => console.error("Ошибка при исполнении запроса: ", error));
