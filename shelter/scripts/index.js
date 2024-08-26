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

    if (burgerMenu.classList.contains("open")) {
      burgerIcon.forEach((i) => {
        i.classList.remove("dark");
      });
    } else {
      if (url.includes("pets.html")) {
        burgerIcon.forEach((i) => {
          i.classList.add("dark");
        });
      }
    }
  }

  burgerMenu.addEventListener("click", toggleMenu);
  overlay.addEventListener("click", toggleMenu);
  navLinks.forEach((link) => {
    link.addEventListener("click", toggleMenu);
  });
  if (url.includes("pets.html")) {
    navLinks[1].classList.toggle("active");
    header.classList.toggle("pets-page");
    burgerIcon.forEach((i) => {
      i.classList.add("dark");
    });

    if (window.screen.width >= 768) {
      navLinks.forEach((link) => {
        link.classList.toggle("pets-page");
      });
    }
    wrapperPets.classList.toggle("pets-page");
  }
  if (url.includes("index.html")) {
    navLinks[0].classList.toggle("active");
  }
});

//пагинация

// слайдер

// попап
