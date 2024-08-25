// бургер-меню

document.addEventListener("DOMContentLoaded", function () {
  const burgerMenu = document.getElementById("burger-menu");
  const navLinks = document.querySelectorAll(".nav-links a");
  const adaptive = document.getElementById("adaptive");
  const overlay = document.getElementById("overlay");

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
});

//пагинация

// слайдер

// попап
