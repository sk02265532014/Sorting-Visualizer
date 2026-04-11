

# 🔢 Sorting Visualizer

An interactive web-based application that visually demonstrates how different sorting algorithms work in real time. This project helps users understand the internal mechanics of sorting through dynamic animations and color-coded states.

---

## 🚀 Features

* 📊 Visual representation of array elements as bars
* 🔄 Supports multiple sorting algorithms:

  * Bubble Sort
  * Selection Sort
  * Insertion Sort
* 🎚️ Adjustable array size
* ⚡ Adjustable sorting speed
* ⏸️ Pause and resume functionality
* 🎨 Color-coded states:

  * Yellow → Comparing
  * Orange → Swapping
  * Green → Sorted

---

## 🛠️ Tech Stack

* **HTML5** – Structure of the application
* **CSS3** – Styling and animations
* **JavaScript (Vanilla JS)** – Logic and DOM manipulation

---

## 🧠 How It Works

* A random array is generated and displayed as vertical bars.
* Each bar’s height corresponds to the value of the array element.
* When a sorting algorithm is selected:

  * The algorithm runs step-by-step using asynchronous delays
  * Bars are updated dynamically to reflect comparisons and swaps
  * Colors indicate the current operation being performed

---

## ⚙️ Controls

* **Generate New Array** → Creates a fresh random array
* **Sorting Buttons** → Start selected sorting algorithm
* **Size Slider** → Adjust number of elements
* **Speed Slider** → Control animation speed
* **Pause/Resume** → Control execution flow

---

## 📌 Algorithms Implemented

| Algorithm      | Best Case | Average Case | Worst Case |
| -------------- | --------- | ------------ | ---------- |
| Bubble Sort    | O(n)      | O(n²)        | O(n²)      |
| Selection Sort | O(n²)     | O(n²)        | O(n²)      |
| Insertion Sort | O(n)      | O(n²)        | O(n²)      |

---

## ⚠️ Limitations

* Performance may degrade with very large arrays due to frequent DOM updates
* Currently supports only basic sorting algorithms
* Single-threaded execution

---

## 🔮 Future Improvements

* Add advanced algorithms (Merge Sort, Quick Sort, Heap Sort)
* Use Canvas for better performance
* Add algorithm explanations and step counters
* Improve mobile responsiveness

---

## 📷 Demo

<img width="1647" height="1013" alt="Screenshot 2026-04-02 132859" src="https://github.com/user-attachments/assets/3d01d071-91f3-4aba-88ac-a8e3ab9d87e8" />

---

## 📁 Project Structure

```
Sorting-Visualizer/
│── index.html
│── style.css
│── script.js
```

---

## 💡 Learning Outcome

This project demonstrates:

* Strong understanding of sorting algorithms
* DOM manipulation and event handling
* Asynchronous JavaScript (async/await)
* UI/UX design fundamentals

---

## 👨‍💻 Author

Sachin
B.Tech Computer Science Student

---

## ⭐ If you like this project

Give it a star ⭐ and feel free to fork it!
