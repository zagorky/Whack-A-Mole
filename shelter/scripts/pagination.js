// let petsArray = [];
// const generatePetsArray = () => {
//   let pets = [...petsData];
//   while (pets.length < 48) {
//     pets = pets.concat(petsData);
//   }
//   petsArray = pets.sort(() => Math.random() - 0.5);
//   console.log(petsArray);
// };
// console.log(generatePetsArray());

// const getCardsPerPage = () => {
//   if (window.innerWidth >= 1280) return 8;
//   else if (window.innerWidth >= 768) return 6;
//   else return 3;
// };

// function renderPage(pageNumber, petsData) {
//   cardsContainer.innerHTML = "";
//   const cardsPerPage = getCardsPerPage();
//   const start = (pageNumber - 1) * cardsPerPage;
//   const end = start + cardsPerPage;
//   const page = petsData.slice(start, end);

//   petsData.forEach((pet) => {
//     const card = document.createElement("div");
//     card.classList.add("card");
//     card.innerHTML = `
//                           <img src="${pet.img}" alt="our-friends-pic" />
//                           <p>${pet.name}</p>
//                           <button class='btn'>Learn more</button>
//             `;
//     cardsContainer.appendChild(card);
//   });
// }
