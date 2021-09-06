// Global Function
const get = (item) => document.querySelector(item);
const getAll = (all) => document.querySelectorAll(all);

// navbar
const navbar = get(".navbar-container");
const menu = get(".navbar__menu");
const navbarItem = getAll(".navbar__item");
const body = get("body");
const navbarContainer = get(".navbar-container");

let previousPosition = 0,
  currentPosition = 0;

//hide / show navbar on scrolling
window.onscroll = hideShowNav;

//hide / show  navbar on click
menu.addEventListener("click", activeNav);
navbarItem.forEach((e) => {
  e.addEventListener("click", removeNav);
});

//set height when resize window width
window.onresize = setNavHeight;

function hideShowNav() {
  currentPosition = window.scrollY;
  currentPosition > previousPosition
    ? navbar.classList.add("show")
    : navbar.classList.remove("show");
  previousPosition = currentPosition;
}
function activeNav() {
  navbarContainer.classList.toggle("active");
  navbarItem.forEach((e) => e.classList.toggle("active"));
  body.classList.toggle("overflow__x");
}
function removeNav() {
  navbarContainer.classList.remove("active");
}
function setNavHeight() {
  if (!window.matchMedia("(max-width: 768px)").matches) {
    removeNav();
  }
}
