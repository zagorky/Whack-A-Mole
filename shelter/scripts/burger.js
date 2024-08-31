// бургер-меню

document.addEventListener("DOMContentLoaded", function () {
  const burgerMenu = document.getElementById("burger-menu");
  const navLinks = document.querySelectorAll(".nav-link a");
  const adaptive = document.getElementById("adaptive");
  const overlay = document.getElementById("overlay");
  const header = document.getElementById("header");
  const wrapperPets = document.getElementById("wrapper-header");
  const burgerIcon = document.querySelectorAll(".burger-line");
  let isPetsPage = window.location.href.includes("pets.html");

  //переключение бургера при нажатии

  const toggleMenu = () => {
    burgerMenu.classList.toggle("open");
    adaptive.classList.toggle("open");
    overlay.classList.toggle("show");
    document.body.classList.toggle("menu-open");
    navLinks.forEach((elem) => {
      elem.classList.remove("pets-page");
    });
    if (isPetsPage) {
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

  if (isPetsPage) {
    wrapperPets.classList.toggle("pets-page");
    header.classList.toggle("pets-page");
    if (isPetsPage) {
      burgerIcon.forEach((i) => {
        i.classList.toggle("dark");
      });
    }
  }
});
