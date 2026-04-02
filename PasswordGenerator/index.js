// CHARACTERS IN PASSWORDS
const characters = {
    lowercase: ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"],
    uppercase: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"],
    numbers: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"], // Added missing comma here
    symbols: ["!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "+", "-", "=", "[", "]", "{", "}", "|", ";", ":", "'", ",", ".", "<", ">", "/", "?", "`", "~"]
};

// DOM QUERIES
const lengthEl = document.getElementById("length-el");
const lengthVal = document.getElementById("length-val");
const passwordOneText = document.querySelector("#password-one-el .password-text");
const passwordTwoText = document.querySelector("#password-two-el .password-text");
const toggleBtn = document.getElementById("theme-toggle");

// EVENT LISTENERS AND MODE TOGGLE CONDITION
lengthEl.addEventListener("input", function() {
    lengthVal.textContent = lengthEl.value;
});
let isAnimating = false;

toggleBtn.addEventListener("click", () => {
    if (isAnimating) return;

    isAnimating = true;
    document.body.classList.toggle("light-mode");
    if (document.body.classList.contains("light-mode")) {
        toggleBtn.textContent = "☀️";
    } else {
        toggleBtn.textContent = "🌙";
    }
    setTimeout(() => {
        isAnimating = false;
    }, 600);
});

// GENERATE PASSWORD AND EXPORT BUTTONS FUNCTIONS
function generatePassword() {
    let charsetPool = [];

    if (document.getElementById("uppercase").checked) charsetPool = charsetPool.concat(characters.uppercase);
    if (document.getElementById("lowercase").checked) charsetPool = charsetPool.concat(characters.lowercase);
    if (document.getElementById("numbers").checked) charsetPool = charsetPool.concat(characters.numbers);
    if (document.getElementById("symbols").checked) charsetPool = charsetPool.concat(characters.symbols);

    if (charsetPool.length === 0) {
        alert("Warning! Select at least one character type!");
        return;
    }

    let pass1 = "";
    let pass2 = "";
    const length = lengthEl.value;

    for (let i = 0; i < length; i++) {
        pass1 += charsetPool[Math.floor(Math.random() * charsetPool.length)];
        pass2 += charsetPool[Math.floor(Math.random() * charsetPool.length)];
    }

    passwordOneText.textContent = pass1;
    passwordTwoText.textContent = pass2;
    updateStrengthUI(pass1, pass2);
}

function exportPasswords() {
    const pass1 = passwordOneText.textContent;
    const pass2 = passwordTwoText.textContent;

    if (pass1 === "..." || pass2 === "...") {
        alert("Generate passwords first!");
        return;
    }

    const content = `Generated Passwords:\n\nPassword 1: ${pass1}\nPassword 2: ${pass2}`;

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "passwords.txt";
    a.click();

    URL.revokeObjectURL(url);
}

// TOOLTIP FUNCTION
function setupCopy(el, textEl) {
    el.addEventListener("click", function() {
        const tooltip = el.querySelector(".tooltip");
        const text = textEl.textContent;
        if (text === "...") return;

        navigator.clipboard.writeText(text).then(() => {
            tooltip.textContent = "Copied!";
            setTimeout(() => { tooltip.textContent = "Copy Password"; }, 1000);
        });
    });
}

//STRENGTH FUNCTIONS
function evaluateStrength(password) {
    let score = 0;

    if (password.length >= 8) score++;
    if (password.length >= 12) score++;
    if (password.length >= 16) score++;

    if (/[a-z]/.test(password)) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    return score;
}

function updateStrengthUI(password) {
    const strengthFill = document.getElementById("strength-fill");
    const strengthText = document.getElementById("strength-text");

    const score = evaluateStrength(password);

    let width = 0;
    let color = "";
    let label = "";

    if (score <= 2) {
        width = 25;
        color = "red";
        label = "Weak";
    } else if (score <= 4) {
        width = 50;
        color = "orange";
        label = "Moderate";
    } else if (score <= 6) {
        width = 75;
        color = "yellowgreen";
        label = "Strong";
    } else {
        width = 100;
        color = "#00b51e";
        label = "Very Strong";
    }

    strengthFill.style.width = width + "%";
    strengthFill.style.background = color;
    strengthText.textContent = "Strength: " + label;
}

setupCopy(document.getElementById("password-one-el"), passwordOneText);
setupCopy(document.getElementById("password-two-el"), passwordTwoText);