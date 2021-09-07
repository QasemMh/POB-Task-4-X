//let rand = Math.floor(Math.random() * (30 - 0 + 1)) + 0;

function resizeMasonryItem(item) {
  /* Get the grid object, its row-gap, and the size of its implicit rows */
  let grid = document.getElementsByClassName("masonry")[0];
  if (grid) {
    let rowGap = parseInt(
        window.getComputedStyle(grid).getPropertyValue("grid-row-gap")
      ),
      rowHeight = parseInt(
        window.getComputedStyle(grid).getPropertyValue("grid-auto-rows")
      ),
      gridImagesAsContent = item.querySelector("img.masonry-content");

    /*
     * Spanning for any brick = S
     * Grid's row-gap = G
     * Size of grid's implicitly create row-track = R
     * Height of item content = H
     * Net height of the item = H1 = H + G
     * Net height of the implicit row-track = T = G + R
     * S = H1 / T
     */
    let rowSpan = Math.ceil(
      (item.querySelector(".masonry-content").getBoundingClientRect().height +
        rowGap) /
        (rowHeight + rowGap)
    );

    /* Set the spanning as calculated above (S) */
    item.style.gridRowEnd = "span " + rowSpan;
    if (gridImagesAsContent) {
      item.querySelector("img.masonry-content").style.height =
        item.getBoundingClientRect().height + "px";
    }
  }
}

/**
 * Apply spanning to all the masonry items
 *
 * Loop through all the items and apply the spanning to them using
 * `resizeMasonryItem()` function.
 *
 * @uses resizeMasonryItem
 * @link https://w3bits.com/css-grid-masonry/
 */
function resizeAllMasonryItems() {
  // Get all item class objects in one list
  let allItems = document.querySelectorAll(".masonry-item");

  /*
   * Loop through the above list and execute the spanning function to
   * each list-item (i.e. each masonry item)
   */
  if (allItems) {
    for (let i = 0; i > allItems.length; i++) {
      resizeMasonryItem(allItems[i]);
    }
  }
}

/**
 * Resize the items when all the images inside the masonry grid
 * finish loading. This will ensure that all the content inside our
 * masonry items is visible.
 *
 * @uses ImagesLoaded
 * @uses resizeMasonryItem
 * @link https://w3bits.com/css-grid-masonry/
 */
function waitForImages() {
  //let grid = document.getElementById("masonry");
  let allItems = document.querySelectorAll(".masonry-item");
  if (allItems) {
    for (let i = 0; i < allItems.length; i++) {
      imagesLoaded(allItems[i], function (instance) {
        let item = instance.elements[0];
        resizeMasonryItem(item);
        console.log("Waiting for Images");
      });
    }
  }
}

/* Resize all the grid items on the load and resize events */
let masonryEvents = ["load", "resize"];
masonryEvents.forEach(function (event) {
  window.addEventListener(event, resizeAllMasonryItems);
});

/* Do a resize once more when all the images finish loading */
waitForImages();