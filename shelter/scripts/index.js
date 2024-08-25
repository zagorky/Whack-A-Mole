// бургер-меню

document.addEventListener("DOMContentLoaded", function () {
  const burgerMenu = document.getElementById("burger-menu");
  const navLinks = document.querySelectorAll(".nav-links a");
  const adaptive = document.getElementById("adaptive");
  const overlay = document.getElementById("overlay");
  const header = document.getElementById("header");
  const wrapperPets = document.getElementById("wrapper-header");
  const burgerIcon = document.querySelectorAll(".burger-line");
  let url = window.location.href;

  function toggleMenu() {
    burgerMenu.classList.toggle("open");
    adaptive.classList.toggle("open");
    overlay.classList.toggle("show");
    document.body.classList.toggle("menu-open");
  }

  burgerMenu.addEventListener("click", toggleMenu);
  overlay.addEventListener("click", toggleMenu);
  navLinks.forEach((link) => {
    link.addEventListener("click", toggleMenu);
  });
  if (url.includes("pets.html")) {
    header.classList.toggle("pets-page");
    burgerIcon.forEach((i) => {
      i.classList.toggle("dark");
    });
    if (window.screen.width >= 768) {
      navLinks.forEach((link) => {
        link.classList.toggle("pets-page");
      });
    }
    // if (this.classList.includes("open")) {
    //   burgerIcon.forEach((elem) => {
    //     elem.style.background = "#F1CDB3";
    //   });
    // }

    wrapperPets.classList.toggle("pets-page");
  }
});

//пагинация

// слайдер

// попап
