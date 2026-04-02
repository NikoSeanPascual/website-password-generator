# 🔐 Password Generator Pro

A sleek, interactive web application designed to generate secure, randomized passwords. Built with a focus on **User Experience (UX)** and **Security**, this tool allows users to customize their password criteria and export results instantly.

[**🚀 View Live Demo**](https://password-generator-v4.netlify.app/)

---

## ✨ Features

- **Dual Generation:** Generates two unique passwords simultaneously.
- **Customizable Length:** Adjustable slider to set password length.
- **Advanced Filters:** Toggle Uppercase, Lowercase, Numbers, and Symbols.
- **Strength Indicator:** Real-time feedback on password security (Weak, Medium, Strong).
- **One-Click Copy:** Instant clipboard integration with "Copied!" visual feedback.
- **Export to File:** Download your generated passwords as a `.txt` file for safe keeping.
- **Dark/Light Mode:** Seamless theme switching for better accessibility.
- **Mobile Responsive:** Fully optimized for desktops, tablets, and smartphones.

---

## 🛠️ Tech Stacks

- **HTML5:** Semantic structure.
- **CSS3:** Modern layouts using Flexbox, custom animations, and tooltips.
- **JavaScript (ES6):** Logic for randomization, clipboard API, and file blob generation.
- **Netlify:** Continuous deployment and hosting.

---
## ⚙️ How It Works

The application follows a secure generation flow based on user-defined parameters:

1.  **Character Set Mapping:** A predefined `characters` object stores categorized arrays (Lowercase, Uppercase, Numbers, and Symbols).
2.  **Dynamic Pool Construction:** Upon clicking "Generate," the script checks which options are toggled. It then uses `.concat()` to merge the selected categories into a single `charsetPool`.
3.  **Randomization Loop:** 
    *   The app retrieves the desired length from the slider input.
    *   A `for` loop runs for the specified duration.
    *   In each iteration, `Math.random()` and `Math.floor()` select a random index from the pool to build the password string.
4.  **Strength Evaluation:** The generated string is instantly passed through a regex-based validation function that scores the password based on length and character diversity.
5.  **Output & Interaction:** The resulting strings are injected into the DOM, and the "Copy to Clipboard" and "Export to .txt" functions are enabled.


## 📂 Project Structure

```text
PasswordGenerator
│
├── index.html     # Main structure & SEO metadata
├── styles.css     # UI Styling, Themes & Responsive Design
└── index.js       # Core Logic & Clipboard API
