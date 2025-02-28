const clock = document.getElementById("binaryClock");
const timeDisplay = document.getElementById("decimalTime");
const speedControl = document.getElementById("speedControl");
let darkMode = false;
let isSquare = false;
let timeFormat = 24;
let updateSpeed = 1000;

function createClock() {
    clock.innerHTML = "";
    for (let i = 0; i < 3; i++) {
        let column = document.createElement("div");
        column.classList.add("column");
        for (let j = 0; j < 6; j++) {
            let dot = document.createElement("div");
            dot.classList.add("dot");
            column.appendChild(dot);
        }
        let label = document.createElement("div");
        label.classList.add("label");
        label.textContent = ["Hours", "Minutes", "Seconds"][i];
        column.appendChild(label);
        clock.appendChild(column);
    }
}

function updateClock() {
    let now = new Date();
    let hours = now.getHours();
    if (timeFormat === 12) hours = hours % 12 || 12;
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();

    let timeValues = [hours, minutes, seconds];
    let binaryTime = timeValues.map(num => num.toString(2).padStart(6, "0"));

    let columns = document.querySelectorAll(".column");
    columns.forEach((col, i) => {
        let dots = col.querySelectorAll(".dot");
        dots.forEach((dot, j) => {
            dot.classList.toggle("on", binaryTime[i][j] === "1");
        });
    });

    timeDisplay.textContent = `Decimal Time: ${hours}:${minutes}:${seconds}`;

    // Play beep only at 15, 30, 45, and 60 minutes
    if (minutes % 15 === 0 && seconds === 0) {
        playBeep();
    }
}

function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
    darkMode = !darkMode;
}

function toggleShape() {
    let dots = document.querySelectorAll(".dot");
    dots.forEach(dot => {
        dot.style.borderRadius = isSquare ? "50%" : "0";
    });
    isSquare = !isSquare;
}

function playBeep() {
    let audio = new Audio("https://www.fesliyanstudios.com/play-mp3/4381");
    audio.volume = 0.1;
    audio.play();
}

function toggleTimeFormat() {
    timeFormat = parseInt(document.getElementById("timeFormat").value);
    updateClock();
}

function changeSpeed() {
    updateSpeed = 1100 - speedControl.value * 100;
    clearInterval(interval);
    interval = setInterval(updateClock, updateSpeed);
}

function startQuiz() {
    let num = Math.floor(Math.random() * 64);
    let binary = num.toString(2).padStart(6, "0");
    let answer = prompt(`What is the decimal value of ${binary}?`);
    alert(answer == num ? "Correct!" : `Wrong! The correct answer is ${num}.`);
}

createClock();
updateClock();
let interval = setInterval(updateClock, updateSpeed);
