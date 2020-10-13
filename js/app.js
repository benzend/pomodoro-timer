// selectors

const countdownClock = document.querySelector("#countdown-clock");
const totalTimeWorked = document.querySelector("#total-time");
const label = document.querySelector("#label");
const playBtn = document.querySelector("#play");
const pauseBtn = document.querySelector("#pause");
const resetBtn = document.querySelector("#reset");
const changeBgBtn = document.querySelector("#change-bg-btn");
const bg = document.querySelector("body");

// variables

let timeWorked = {
  seconds: 0,
  minutes: 0,
  hours: 0,
};
let currentBgIndex = 0;
let timerOrderIndex = 0;

//constructors
function Timer(minutes, description, isWorking) {
  this.minutes = minutes;
  this.description = description;
  this.isWorking = isWorking;
}

// objects
const pomodoro = new Timer(25, "Working on a Project...", true);
const smallBreak = new Timer(5, "Taking a small break...", false);
const largeBreak = new Timer(15, "Taking a nap....", false);

//arrays
const timerOrder = [
  pomodoro,
  smallBreak,
  pomodoro,
  smallBreak,
  pomodoro,
  smallBreak,
  pomodoro,
  largeBreak,
];

const backgrounds = [
  "https://images.pexels.com/photos/1236701/pexels-photo-1236701.jpeg?cs=srgb&dl=pexels-leo-cardelli-1236701.jpg&fm=jpg",
  "https://images.pexels.com/photos/814499/pexels-photo-814499.jpeg?cs=srgb&dl=pexels-martin-damboldt-814499.jpg&fm=jpg",
  "https://images.pexels.com/photos/459225/pexels-photo-459225.jpeg?cs=srgb&dl=pexels-pixabay-459225.jpg&fm=jpg",
];

// checkers
let nextInterval = false;
let isPaused = true;
let isReset = false;

// event listeners
pauseBtn.addEventListener("click", () => {
  isPaused = true;
});
playBtn.addEventListener("click", () => {
  isPaused = false;
});

changeBgBtn.addEventListener("click", () => {
  currentBgIndex++;
  if (currentBgIndex === backgrounds.length) currentBgIndex = 0;
  bg.style.background = `url(${backgrounds[currentBgIndex]}) no-repeat center center/cover`;
});

resetBtn.addEventListener("click", () => {
  isPaused = true;
  isReset = true;
  timeWorked = {
    seconds: 0,
    minutes: 0,
    hours: 0,
  };
  timerOrderIndex = 0;
  countdownClock.innerHTML = "0h 0m 0s";
  clearInterval(myInterval);
});
// updating interval
(function () {
  setTimer(timerOrder[0]);
  setInterval(() => {
    setTimeout(() => {
      if (timeWorked.seconds === 60) {
        timeWorked.minutes++;
        timeWorked.seconds = 0;
        if (timeWorked.minutes === 60) {
          timeWorked.hours++;
          timeWorked.minutes = 0;
          timeWorked.seconds = 0;
        }
      }
      if (timerOrder.length - 1 === timerOrderIndex) {
        timerOrderIndex = -1;
      }
      if (nextInterval) {
        timerOrderIndex++;
        setTimer(timerOrder[timerOrderIndex]);
        nextInterval = false;
      }
      totalTimeWorked.innerHTML = `${timeWorked.hours}h ${timeWorked.minutes}m ${timeWorked.seconds}s `;
    }, 10);
  }, 1000);
})();

function setTimer({ minutes, description, isWorking }) {
  let seconds = 0;
  countdownClock.innerHTML = `${minutes}m ${seconds}s`;

  let myInterval = setInterval(() => {
    if (isReset) {
      seconds = 60;
      isReset = false;
    }
    if (isPaused) {
      label.innerHTML = "Push the Play Button";
    }
    if (!isPaused) {
      label.innerHTML = description;
      seconds--;
      if (seconds < 0) {
        seconds = 59;
        minutes--;
        if (minutes < 0) {
          nextInterval = true;
          clearInterval(myInterval);
          return;
        }
      }
      if (isWorking) {
        timeWorked.seconds++;
      }

      countdownClock.innerHTML = `${minutes}m ${seconds}s`;
    }
  }, 1000);
}
