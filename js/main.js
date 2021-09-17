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

    if (gridView) {
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
 *share button | task 5
 */
if (get(".share__container")) {
  let icon = get(".share__btn i");

  get(".share__btn").onclick = () => {
    get(".share").classList.toggle("active");
    if (icon.classList.contains("fa-plus")) {
      icon.classList.remove("fa-plus");
      icon.classList.add("fa-minus");
    } else {
      icon.classList.remove("fa-minus");
      icon.classList.add("fa-plus");
    }
  };
}

/*
Product item hover - task 5
*/
let productItems = getAll(".product__card");
if (productItems[0]) {
  VanillaTilt.init(productItems, {
    max: 15,
    speed: 400,
  });
}

/*
  to do list task 5
 */
let savedItem = []; //array to save the tasks entered by the user  to localStorage
let addTask = get(".todo__add__btn");
let taskTitle = get(".todo__add__input");

if (addTask && taskTitle) {
  addTask.addEventListener("click", () => {
    if (taskTitle.value.length > 0) {
      //add task to todo list
      addNewTask(taskTitle.value, true);
      taskTitle.value = "";
    }
  });
}

//function to add task to todo list
//addToList @param : prevent add item again to localstorage...
function addNewTask(title, addToList = false) {
  //get item from localStorage if exists
  if (localStorage.getItem("tasks") != null && addToList) {
    savedItem = JSON.parse(localStorage.getItem("tasks"));
  }

  //create elements to add to HTML body
  let tasks = get(".todo__ul");

  let li = document.createElement("li");
  let label = document.createElement("label");
  let checkbox = document.createElement("input");
  let p__title = document.createElement("p");
  let span = document.createElement("span");

  span.classList.add("todo__check");
  p__title.classList.add("todo__head");
  p__title.appendChild(document.createTextNode(title));
  checkbox.classList.add("todo__checkbox");
  checkbox.type = "checkbox";
  label.classList.add("todo__item__wrapper");
  li.classList.add("todo__item");

  label.append(checkbox, p__title, span);
  li.appendChild(label);

  //add task to HTML body
  tasks.appendChild(li);

  if (addToList) {
    //add tasks names to localstorage
    savedItem.push(title);
    localStorage.setItem("tasks", JSON.stringify(savedItem));
  }
}

//remove localStorage | remove all tasks
if (get(".todo__add-remove")) {
  get(".todo__add-remove").onclick = () => {
    if (localStorage.getItem("tasks") != null) {
      if (confirm("Remove All Task?")) {
        localStorage.clear();
        window.location.reload();
      }
    }
  };
}

//check localStorage when load the page
window.onload = () => {
  if (localStorage.getItem("tasks") != null && addTask && taskTitle) {
    //get item from localStorage to HTML boy
    savedItem = JSON.parse(localStorage.getItem("tasks"));
    savedItem.forEach((e) => {
      addNewTask(e);
    });
  }
};
