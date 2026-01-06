// ----- State -----
let array = [];
let isSorting = false;
let isPaused = false;
let speed = 200; // ms
let arraySize = 40; // default matches HTML slider

const MIN_VALUE = 5;
const MAX_VALUE = 100;

// ----- DOM elements -----
const barsContainer = document.getElementById("bars-container");
const generateBtn = document.getElementById("generate-array-btn");
const bubbleBtn = document.getElementById("bubble-sort-btn");
const selectionBtn = document.getElementById("selection-sort-btn");
const insertionBtn = document.getElementById("insertion-sort-btn");
const speedRange = document.getElementById("speed-range");
const sizeRange = document.getElementById("size-range");
const pauseBtn = document.getElementById("pause-btn");
const statusText = document.getElementById("status-text");

// ----- Utility: sleep -----
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// wait function that respects pause + speed
async function controlledSleep() {
  // stay here while paused
  while (isPaused) {
    await sleep(50);
  }
  await sleep(speed);
}

// ----- Array + bars generation -----
function generateRandomArray() {
  array = [];
  for (let i = 0; i < arraySize; i++) {
    const value =
      Math.floor(Math.random() * (MAX_VALUE - MIN_VALUE + 1)) + MIN_VALUE;
    array.push(value);
  }
}

function renderBars() {
  barsContainer.innerHTML = "";
  const maxVal = Math.max(...array);

  array.forEach((value) => {
    const bar = document.createElement("div");
    bar.classList.add("bar");
    const heightPercent = (value / maxVal) * 100;
    bar.style.height = `${heightPercent}%`;
    barsContainer.appendChild(bar);
  });
}

function resetBarClasses() {
  const bars = document.querySelectorAll(".bar");
  bars.forEach((bar) => {
    bar.classList.remove("comparing", "swapping", "sorted");
  });
}

// ----- Controls: enable/disable -----
function setSortingState(active) {
  isSorting = active;
  generateBtn.disabled = active;
  bubbleBtn.disabled = active;
  selectionBtn.disabled = active;
  insertionBtn.disabled = active;
  speedRange.disabled = active;
  sizeRange.disabled = active; // do not change size during sort
  pauseBtn.disabled = !active; // pause only usable while sorting
  if (!active) {
    isPaused = false;
    pauseBtn.textContent = "Pause";
  }
}

// ----- Bar helpers -----
function getBars() {
  return document.querySelectorAll(".bar");
}

function setBarHeight(bar, value, maxVal) {
  const heightPercent = (value / maxVal) * 100;
  bar.style.height = `${heightPercent}%`;
}

function markComparing(i, j) {
  const bars = getBars();
  bars[i].classList.add("comparing");
  bars[j].classList.add("comparing");
}

function unmarkComparing(i, j) {
  const bars = getBars();
  bars[i].classList.remove("comparing");
  bars[j].classList.remove("comparing");
}

function markSwapping(i, j) {
  const bars = getBars();
  bars[i].classList.add("swapping");
  bars[j].classList.add("swapping");
}

function unmarkSwapping(i, j) {
  const bars = getBars();
  bars[i].classList.remove("swapping");
  bars[j].classList.remove("swapping");
}

function markSorted(index) {
  const bars = getBars();
  bars[index].classList.add("sorted");
}

function markAllSorted() {
  const bars = getBars();
  bars.forEach((bar) => bar.classList.add("sorted"));
}

// ----- Sorting algorithms -----

// Bubble Sort
async function bubbleSort() {
  statusText.textContent = "Bubble Sort in progress...";
  setSortingState(true);
  resetBarClasses();

  const n = array.length;
  const bars = getBars();
  const maxVal = Math.max(...array);

  for (let i = 0; i < n - 1; i++) {
    let swapped = false;
    for (let j = 0; j < n - i - 1; j++) {
      markComparing(j, j + 1);
      await controlledSleep();

      if (array[j] > array[j + 1]) {
        markSwapping(j, j + 1);

        // Swap in array
        [array[j], array[j + 1]] = [array[j + 1], array[j]];

        // Update bar heights
        setBarHeight(bars[j], array[j], maxVal);
        setBarHeight(bars[j + 1], array[j + 1], maxVal);

        swapped = true;
        await controlledSleep();
        unmarkSwapping(j, j + 1);
      }

      unmarkComparing(j, j + 1);
    }
    markSorted(n - i - 1);

    if (!swapped) break;
  }

  // Mark remaining as sorted
  for (let k = 0; k < n; k++) {
    if (!getBars()[k].classList.contains("sorted")) {
      markSorted(k);
      await sleep(10);
    }
  }

  statusText.textContent = "Sorted (Bubble Sort)";
  setSortingState(false);
}

// Selection Sort
async function selectionSort() {
  statusText.textContent = "Selection Sort in progress...";
  setSortingState(true);
  resetBarClasses();

  const n = array.length;
  const bars = getBars();
  const maxVal = Math.max(...array);

  for (let i = 0; i < n; i++) {
    let minIdx = i;

    for (let j = i + 1; j < n; j++) {
      markComparing(minIdx, j);
      await controlledSleep();

      if (array[j] < array[minIdx]) {
        unmarkComparing(minIdx, j);
        minIdx = j;
        markComparing(minIdx, j);
        await controlledSleep();
      }

      unmarkComparing(minIdx, j);
    }

    if (minIdx !== i) {
      markSwapping(i, minIdx);

      [array[i], array[minIdx]] = [array[minIdx], array[i]];
      setBarHeight(bars[i], array[i], maxVal);
      setBarHeight(bars[minIdx], array[minIdx], maxVal);

      await controlledSleep();
      unmarkSwapping(i, minIdx);
    }

    markSorted(i);
  }

  statusText.textContent = "Sorted (Selection Sort)";
  setSortingState(false);
}

// Insertion Sort
async function insertionSort() {
  statusText.textContent = "Insertion Sort in progress...";
  setSortingState(true);
  resetBarClasses();

  const n = array.length;
  const bars = getBars();
  const maxVal = Math.max(...array);

  for (let i = 1; i < n; i++) {
    let key = array[i];
    let j = i - 1;

    // Highlight current key
    bars[i].classList.add("swapping");
    await controlledSleep();

    while (j >= 0 && array[j] > key) {
      markComparing(j, j + 1);
      await controlledSleep();

      array[j + 1] = array[j];
      setBarHeight(bars[j + 1], array[j + 1], maxVal);

      unmarkComparing(j, j + 1);
      j--;
    }

    array[j + 1] = key;
    setBarHeight(bars[j + 1], array[j + 1], maxVal);

    bars[i].classList.remove("swapping");

    // Optional: briefly show that the position is "placed"
    bars[j + 1].classList.add("swapping");
    await sleep(speed / 2);
    bars[j + 1].classList.remove("swapping");
  }

  markAllSorted();
  statusText.textContent = "Sorted (Insertion Sort)";
  setSortingState(false);
}

// ----- Event listeners -----
generateBtn.addEventListener("click", () => {
  if (isSorting) return;
  statusText.textContent = "New array generated";
  generateRandomArray();
  renderBars();
  resetBarClasses();
});

bubbleBtn.addEventListener("click", () => {
  if (isSorting) return;
  bubbleSort();
});

selectionBtn.addEventListener("click", () => {
  if (isSorting) return;
  selectionSort();
});

insertionBtn.addEventListener("click", () => {
  if (isSorting) return;
  insertionSort();
});

speedRange.addEventListener("input", (e) => {
  // Map slider (10-500) -> delay ms directly
  speed = Number(e.target.value);
});

// Array size slider
sizeRange.addEventListener("input", (e) => {
  if (isSorting) return; // do not change size during sort
  arraySize = Number(e.target.value);
  statusText.textContent = `Array size: ${arraySize}`;
  generateRandomArray();
  renderBars();
  resetBarClasses();
});

// Pause / Resume button
pauseBtn.addEventListener("click", () => {
  if (!isSorting) return;
  isPaused = !isPaused;
  pauseBtn.textContent = isPaused ? "Resume" : "Pause";
  statusText.textContent = isPaused ? "Paused" : "Sorting...";
});

// ----- Initial load -----
generateRandomArray();
renderBars();
statusText.textContent = "Ready (array generated)";

