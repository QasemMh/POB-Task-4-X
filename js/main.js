// Global Function
const get = (item) => document.querySelector(item);
const getAll = (all) => document.querySelectorAll(all);
//back to top button
document.querySelector(".back_To_Top").onclick = () => {
  window.scrollTo(0, 0);
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
  if (window.matchMedia("(min-width: 768px)").matches) {
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

let oneCol = get("#i1");
let towCol = get("#i2");
let threeCol = get("#i3");
let fourCol = get("#i4");
let masonry = get(".grid_view__grid");

oneCol.onclick = () => {
  resizeGrid("repeat(1, minmax(200px, 1fr))", "600px");
};
towCol.onclick = () => {
  resizeGrid("repeat(2, minmax(200px, 1fr))", "768px");
};
threeCol.onclick = () => {
  resizeGrid("repeat(3, minmax(200px, 1fr))", "1024px");
};
fourCol.onclick = () => {
  resizeGrid("repeat(4, minmax(200px, 1fr))", "1200px");
};
function resizeGrid(column, maxWidth) {
  masonry.style.gridTemplateColumns = column;
  masonry.style.maxWidth = maxWidth;
}

let windowWidth = document.documentElement.clientWidth,
  windowHeight = document.documentElement.clientHeight;
window.onresize = () => {
   if (
    document.documentElement.clientHeight != windowHeight ||
    document.documentElement.clientWidth != windowWidth
  ) {
    setNavHeight();

    if (window.matchMedia("only screen and (min-width: 600px)").matches) {
      masonry.style.gridTemplateColumns =
        "repeat(auto-fit, minmax(200px, 1fr))";
    } else {
      masonry.style.gridTemplateColumns = "1fr";
    }

    masonry.style.maxWidth = "1200px";

    windowWidth = document.documentElement.clientWidth;
    windowHeight = document.documentElement.clientHeight;
  }
 
};

/**lazysizes.js | lazy loading image*/

// const images = getAll('img[loading="lazy"]');
// images.forEach((img) => {
//   img.src = img.dataset.src;
// });
