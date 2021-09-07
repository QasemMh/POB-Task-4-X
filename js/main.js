// Global Function
const get = (item) => document.querySelector(item);
const getAll = (all) => document.querySelectorAll(all);
//back to top button
document.querySelector(".back_To_Top").onclick = () => {
  window.scrollTo(0,0);
};
/*
 *Navbar*
 */
const navbar = get(".navbar-container");
const menu = get(".navbar__menu");
const navbarItem = getAll(".navbar__item");
const body = get("body");
const navbarContainer = get(".navbar-container");
const dropDownBtn = get(".navbar__drop__btn");
const dropDownList = get(".navbar__drop__ul");
const dropDownIcon = get(".navbar__drop__i");

let previousPosition = 0,
  currentPosition = 0;

//hide / show navbar on scrolling
window.onscroll = hideShowNav;

//hide / show  navbar on click
menu.addEventListener("click", activeNav);
navbarItem.forEach((e, index) => {
  if (index != 2) {
    e.addEventListener("click", removeNav);
  }
});

//set height when resize window width

//hide / show dropdown Menu
dropDownBtn.addEventListener("click", dropDownMenu);

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
  body.classList.remove("overflow__x");
}
function setNavHeight() {
  if (!window.matchMedia("(max-width: 768px)").matches) {
    removeNav();
  }
}
function dropDownMenu() {
  dropDownList.classList.toggle("active");

  if (dropDownIcon.classList.contains("fa-angle-down")) {
    dropDownIcon.classList.replace("fa-angle-down", "fa-angle-up");
  } else {
    dropDownIcon.classList.replace("fa-angle-up", "fa-angle-down");
  }
}

/*
 *masonry*
 */

let icon1 = document.querySelector("#i1");
let icon2 = document.querySelector("#i2");
let icon3 = document.querySelector("#i3");
let icon4 = document.querySelector("#i4");
let masonry = document.querySelector(".masonry");
icon1.onclick = () => {
  masonry.style.gridTemplateColumns = "repeat(1, minmax(100px, 1fr))";
};
icon2.onclick = () => {
  masonry.style.gridTemplateColumns = "repeat(2, minmax(100px, 1fr))";
};
icon3.onclick = () => {
  masonry.style.gridTemplateColumns = "repeat(3, minmax(100px, 1fr))";
};
icon4.onclick = () => {
  masonry.style.gridTemplateColumns = "repeat(4, minmax(100px, 1fr))";
};

window.onresize = () => {
  setNavHeight();

  if (window.matchMedia("(max-width: 1023px) and (min-width: 600px)").matches) {
    masonry.style.gridTemplateColumns = "repeat(3, minmax(100px, 1fr))";
  } else if (window.matchMedia("(min-width: 1024px) ").matches) {
    masonry.style.gridTemplateColumns = "repeat(4, minmax(100px, 1fr))";
  } else {
    masonry.style.gridTemplateColumns = "repeat(1, minmax(100px, 1fr))";
  }

  if (window.matchMedia("(max-width: 768px) and (min-width: 600px)").matches) {
    masonry.style.gridTemplateColumns = "repeat(2, minmax(100px, 1fr))";
  }
};
