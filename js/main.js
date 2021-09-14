// Global Function
const get = (item) => document.querySelector(item);
const getAll = (all) => document.querySelectorAll(all);

/*
 *back to top button*
 */
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
  navbar.classList.toggle("active");
  navbarItem.forEach((e) => e.classList.toggle("active"));
  //body.classList.toggle("overflow__x");
}
function removeNav() {
  navbar.classList.remove("active");
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
 *Grid View*
 */

let oneCol = get("#i1");
let towCol = get("#i2");
let threeCol = get("#i3");
let fourCol = get("#i4");
let gridView = get(".grid_view__grid");

if (oneCol && towCol && threeCol && fourCol) {
  oneCol.addEventListener("click", () => {
    resizeGrid("repeat(1, minmax(200px, 1fr))", "600px");
  });
  towCol.addEventListener("click", () => {
    resizeGrid("repeat(2, minmax(200px, 1fr))", "768px");
  });
  threeCol.addEventListener("click", () => {
    resizeGrid("repeat(3, minmax(200px, 1fr))", "1024px");
  });
  fourCol.addEventListener("click", () => {
    resizeGrid("repeat(4, minmax(200px, 1fr))", "1200px");
  });
}

function resizeGrid(column, maxWidth) {
  gridView.style.gridTemplateColumns = column;
  gridView.style.maxWidth = maxWidth;
}

let windowWidth = document.documentElement.clientWidth,
  windowHeight = document.documentElement.clientHeight;

window.onresize = () => {
  if (
    document.documentElement.clientHeight != windowHeight ||
    document.documentElement.clientWidth != windowWidth
  ) {
    //set height when window resize
    setNavHeight();

    //fix resize problem on mobile
    if (window.matchMedia("only screen and (min-width: 600px)").matches) {
      gridView.style.gridTemplateColumns =
        "repeat(auto-fit, minmax(200px, 1fr))";
    } else {
      gridView.style.gridTemplateColumns = "1fr";
    }

    gridView.style.maxWidth = "1200px";

    windowWidth = document.documentElement.clientWidth;
    windowHeight = document.documentElement.clientHeight;
  }
};

/*
 *lazysizes.js | lazy loading image*
 */

if ("loading" in HTMLImageElement.prototype) {
  const images = getAll('img[loading="lazy"]');
  images.forEach((img) => {
    img.src = img.dataset.src;
  });
} else {
  // Dynamically import the LazySizes library
  const comment = document.createComment("*lazysizes.js | lazy loading image*");
  const script = document.createElement("script");
  script.src =
    "https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js";
  document.body.append(comment);
  document.body.appendChild(script);
}

/*
 *Task 5
 */
/**
 * news | list/grid View
 */
let newsContent = get(".news__articale__content");
let lView = get(".news__articale__btn-1");
let gView = get(".news__articale__btn-2");
if (newsContent) {
  lView.addEventListener("click", () => {
    changeView("repeat(1, minmax(300px, 1fr))");
  });
  gView.addEventListener("click", () => {
    changeView("repeat(auto-fill, minmax(250px, 1fr))");
  });
}
function changeView(column) {
  newsContent.style.gridTemplateColumns = column;
}

/*
 *share button
 */
if (get(".share__container")) {
  get(".share__btn").onclick = () => {
    get(".share").classList.toggle("active");

    if (get(".share__btn i").classList.contains("fa-plus")) {
      get(".share__btn i").classList.remove("fa-plus");
      get(".share__btn i").classList.add("fa-minus");
    } else {
      get(".share__btn i").classList.remove("fa-minus");
      get(".share__btn i").classList.add("fa-plus");
    }
  };
}
